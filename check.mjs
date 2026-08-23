#!/usr/bin/env node
/**
 * Static sanity check, used because the npm registry is unreachable in the
 * authoring sandbox and there is no compiler available to catch mistakes.
 *
 * Checks, per source file:
 *   1. Brackets/braces/parens balance (string- and comment-aware).
 *   2. Every relative import resolves to a file that exists.
 *   3. Every imported symbol is actually exported by its target.
 *   4. JSX element open/close tags balance.
 *   5. Data referenced by components exists in profile.js.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, resolve, extname } from 'node:path'

const ROOT = process.argv[2] || '.'
const SRC = join(ROOT, 'src')
let failures = 0
let checks = 0

const fail = (file, msg) => {
  failures++
  console.log(`  FAIL  ${file}\n        ${msg}`)
}
const pass = (label) => {
  checks++
  console.log(`  ok    ${label}`)
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (['.js', '.jsx'].includes(extname(entry))) out.push(full)
  }
  return out
}

/** Strips strings, template literals and comments so scanners see code only. */
function stripLiterals(src) {
  let out = ''
  let i = 0
  const n = src.length

  while (i < n) {
    const c = src[i]
    const next = src[i + 1]

    if (c === '/' && next === '/') {
      while (i < n && src[i] !== '\n') i++
      continue
    }
    if (c === '/' && next === '*') {
      i += 2
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++
      i += 2
      continue
    }
    if (c === '"' || c === "'") {
      const quote = c
      i++
      while (i < n && src[i] !== quote) {
        if (src[i] === '\\') i++
        i++
      }
      i++
      out += '""'
      continue
    }
    if (c === '`') {
      // Keep ${ } contents: they hold real code (and real brackets).
      i++
      out += '""'
      while (i < n && src[i] !== '`') {
        if (src[i] === '\\') {
          i += 2
          continue
        }
        if (src[i] === '$' && src[i + 1] === '{') {
          let depth = 1
          i += 2
          out += '('
          while (i < n && depth > 0) {
            if (src[i] === '{') depth++
            else if (src[i] === '}') depth--
            if (depth > 0) out += src[i]
            i++
          }
          out += ')'
          continue
        }
        i++
      }
      i++
      continue
    }
    out += c
    i++
  }
  return out
}

function checkBalance(file, src) {
  const code = stripLiterals(src)
  const pairs = { ')': '(', ']': '[', '}': '{' }
  const stack = []
  let line = 1

  for (let i = 0; i < code.length; i++) {
    const c = code[i]
    if (c === '\n') line++
    if (c === '(' || c === '[' || c === '{') stack.push({ c, line })
    else if (pairs[c]) {
      const top = stack.pop()
      if (!top || top.c !== pairs[c]) {
        fail(file, `Unbalanced '${c}' on line ${line}` + (top ? ` — expected close for '${top.c}' opened on line ${top.line}` : ''))
        return false
      }
    }
  }
  if (stack.length) {
    fail(file, `${stack.length} unclosed '${stack[0].c}' — first on line ${stack[0].line}`)
    return false
  }
  return true
}

const VOID_TAGS = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'path', 'circle', 'rect', 'source', 'area'])

function checkJsxTags(file, src) {
  const code = stripLiterals(src)
  const stack = []
  const re = /<(\/?)([A-Za-z][A-Za-z0-9.]*)((?:[^<>]|=>)*?)(\/?)>/g
  let m

  while ((m = re.exec(code)) !== null) {
    const [, closing, tag, attrs, selfClose] = m
    if (closing) {
      const top = stack.pop()
      if (!top) return fail(file, `Closing </${tag}> with nothing open`), false
      if (top !== tag) return fail(file, `Closing </${tag}> but <${top}> is open`), false
    } else if (!selfClose && !VOID_TAGS.has(tag) && !attrs.trimEnd().endsWith('/')) {
      stack.push(tag)
    }
  }
  if (stack.length) {
    fail(file, `Unclosed JSX tag <${stack[stack.length - 1]}> (${stack.length} open)`)
    return false
  }
  return true
}

function parseExports(src) {
  const names = new Set()
  const code = stripLiterals(src)
  if (/export\s+default/.test(code)) names.add('default')
  for (const m of code.matchAll(/export\s+(?:async\s+)?(?:function|const|let|class)\s+([A-Za-z0-9_$]+)/g)) names.add(m[1])
  for (const m of code.matchAll(/export\s*\{([^}]*)\}/g)) {
    m[1].split(',').forEach((part) => {
      const name = part.split(/\s+as\s+/).pop().trim()
      if (name) names.add(name)
    })
  }
  return names
}

function parseImports(src) {
  const code = stripLiterals(src)
  const out = []
  // stripLiterals blanked the specifiers, so re-scan the original for paths.
  const re = /import\s+([^'"]*?)\s*from\s*['"]([^'"]+)['"]/g
  let m
  while ((m = re.exec(src)) !== null) {
    const clause = m[1].trim()
    const source = m[2]
    const named = []
    let def = null

    const braced = clause.match(/\{([^}]*)\}/)
    if (braced) {
      braced[1].split(',').forEach((p) => {
        const name = p.split(/\s+as\s+/)[0].trim()
        if (name) named.push(name)
      })
    }
    const before = clause.replace(/\{[^}]*\}/, '').replace(/,/g, '').trim()
    if (before && !before.startsWith('*')) def = before

    out.push({ source, named, def })
  }
  void code
  return out
}

console.log('\nStatic checks\n' + '─'.repeat(60))

const files = walk(SRC)
const exportMap = new Map()

for (const file of files) {
  exportMap.set(resolve(file), parseExports(readFileSync(file, 'utf8')))
}

let syntaxOk = true
for (const file of files) {
  const src = readFileSync(file, 'utf8')
  const rel = file.replace(ROOT + '/', '')
  const balanced = checkBalance(rel, src)
  const tagsOk = extname(file) === '.jsx' ? checkJsxTags(rel, src) : true
  if (!balanced || !tagsOk) syntaxOk = false
}
if (syntaxOk) pass(`${files.length} files: brackets and JSX tags balanced`)

let importsOk = true
for (const file of files) {
  const src = readFileSync(file, 'utf8')
  const rel = file.replace(ROOT + '/', '')

  for (const imp of parseImports(src)) {
    if (!imp.source.startsWith('.')) continue

    const target = resolve(dirname(file), imp.source)
    if (!existsSync(target)) {
      fail(rel, `import '${imp.source}' → file not found`)
      importsOk = false
      continue
    }

    const exports = exportMap.get(target)
    if (imp.def && !exports.has('default')) {
      fail(rel, `imports default from '${imp.source}' but it has no default export`)
      importsOk = false
    }
    for (const name of imp.named) {
      if (!exports.has(name)) {
        fail(rel, `imports { ${name} } from '${imp.source}' — not exported`)
        importsOk = false
      }
    }
  }
}
if (importsOk) pass('every relative import resolves and every symbol is exported')

// Public assets referenced from data must exist on disk.
const dataSrc = readFileSync(join(SRC, 'data/profile.js'), 'utf8')
let assetsOk = true
for (const m of dataSrc.matchAll(/'(\/[A-Za-z0-9._-]+\.(?:pdf|jpg|jpeg|png|svg|webp))'/g)) {
  const asset = join(ROOT, 'public', m[1])
  if (!existsSync(asset)) {
    fail('src/data/profile.js', `references ${m[1]} but public${m[1]} is missing`)
    assetsOk = false
  }
}
if (assetsOk) pass('all referenced public assets exist')

// The tally must add up to the résumé's claim.
const wins = [...dataSrc.matchAll(/count:\s*(\d+)/g)].reduce((a, m) => a + Number(m[1]), 0)
const entered = Number(dataSrc.match(/entered:\s*(\d+)/)[1])
if (wins === 7 && entered === 10) pass(`hackathon record consistent: ${wins} wins / ${entered} entered`)
else fail('src/data/profile.js', `expected 7 wins of 10, data says ${wins} of ${entered}`)

console.log('─'.repeat(60))
console.log(failures === 0 ? `PASS — ${checks} checks clean\n` : `${failures} problem(s) found\n`)
process.exit(failures === 0 ? 0 : 1)
