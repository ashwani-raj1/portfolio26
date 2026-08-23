import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/profile.js'
import { useActiveSection } from '../hooks/useReveal.js'

const NAV_IDS = navLinks.map((l) => l.id)

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A8.2 8.2 0 1 1 9.5 4a6.6 6.6 0 0 0 10.5 10.5Z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M4.5 20h15" />
    </svg>
  )
}

export default function Nav({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(NAV_IDS)
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  // Close the mobile menu on Escape, and stop the page scrolling behind it.
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-6 px-5 md:px-8">
        <a
          href="#top"
          className="font-display text-[0.95rem] font-extrabold tracking-tight whitespace-nowrap"
          style={{ fontStretch: '112%' }}
        >
          Ashwani&nbsp;Raj
        </a>

        <nav aria-label="Sections" className="ml-auto hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'true' : undefined}
              className={`mono rounded px-2.5 py-1.5 transition-colors ${
                active === link.id ? 'text-amber' : 'text-muted hover:text-fg'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
            className="grid h-9 w-9 place-items-center rounded border border-line text-muted transition-colors hover:border-amber hover:text-amber"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            href={profile.resume}
            download
            className="mono hidden items-center gap-2 rounded border border-amber px-3 py-2 text-amber transition-colors hover:bg-amber hover:text-ink sm:inline-flex"
          >
            <DownloadIcon />
            résumé
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded border border-line text-muted md:hidden"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Sections"
          className="border-t border-line bg-panel px-5 py-3 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="mono block border-b border-line py-3 text-muted last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.resume}
            download
            onClick={() => setOpen(false)}
            className="mono mt-3 inline-flex items-center gap-2 rounded border border-amber px-3 py-2 text-amber"
          >
            <DownloadIcon />
            download résumé
          </a>
        </nav>
      ) : null}
    </header>
  )
}
