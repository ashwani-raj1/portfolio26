import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A horizontal film strip: one row, fixed height, scrolls sideways.
 *
 * Used for the photo and certificate walls so neither one turns the page into a
 * scroll marathon — a group is one row tall no matter how many images land in
 * it, which is also what keeps both sections safe to keep adding to.
 *
 * Native overflow scrolling does the moving, so trackpad, touch, and arrow keys
 * all work without any of it being reimplemented here. The buttons are a visible
 * affordance on top of that, and the hairline underneath reports position.
 *
 * `resetKey` — change it to send the strip back to the start (used when a filter
 * swaps the contents out from under it).
 */
export default function Carousel({ label, count, resetKey, children }) {
  const trackRef = useRef(null)
  const [pos, setPos] = useState({ atStart: true, atEnd: true, progress: 0, span: 1 })

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return

    const max = el.scrollWidth - el.clientWidth
    const next = {
      atStart: el.scrollLeft <= 4,
      atEnd: max - el.scrollLeft <= 4,
      progress: max > 0 ? el.scrollLeft / max : 0,
      span: el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1,
    }

    // Bail out when nothing moved. Without this, the resize/load listeners below
    // would hand back a fresh object every time and re-render on a loop.
    setPos((prev) =>
      prev.atStart === next.atStart &&
      prev.atEnd === next.atEnd &&
      Math.abs(prev.progress - next.progress) < 0.002 &&
      Math.abs(prev.span - next.span) < 0.002
        ? prev
        : next,
    )
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    measure()
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)

    // Lazy images arrive after first paint and change the scroll width, so the
    // strip has to re-measure as they land.
    const images = Array.from(el.querySelectorAll('img'))
    images.forEach((img) => img.addEventListener('load', measure))

    const observer =
      typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null
    observer?.observe(el)

    return () => {
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      images.forEach((img) => img.removeEventListener('load', measure))
      observer?.disconnect()
    }
  }, [measure])

  useEffect(() => {
    const el = trackRef.current
    if (!el || resetKey === undefined) return
    el.scrollTo({ left: 0, behavior: 'auto' })
    measure()
  }, [resetKey, measure])

  const step = (direction) => {
    const el = trackRef.current
    if (!el) return

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    el.scrollBy({
      left: direction * Math.max(el.clientWidth * 0.8, 240),
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  const nudge = 'grid h-8 w-8 place-items-center rounded border border-line text-muted transition-colors enabled:hover:border-amber enabled:hover:text-amber disabled:opacity-25'

  return (
    <div>
      <div className="mb-5 flex items-center gap-4">
        <h3 className="eyebrow">{label}</h3>
        <span className="rule" aria-hidden="true" />
        <span className="mono text-muted">{String(count).padStart(2, '0')}</span>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={pos.atStart}
            aria-label={`${label}: previous`}
            className={nudge}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14.5 5 8 12l6.5 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={pos.atEnd}
            aria-label={`${label}: next`}
            className={nudge}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9.5 5 16 12l-6.5 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Focusable because it scrolls: a keyboard user needs somewhere to land
          before the arrow keys mean anything. The list semantics stay, so it is
          announced as "<label>, list, N items". */}
      <ul ref={trackRef} className="film-strip" tabIndex={0} aria-label={label}>
        {children}
      </ul>

      {/* Position, not decoration: the bar's width is how much of the strip fits
          on screen, and it slides as you go. */}
      <div className="mt-4 h-px w-full bg-line" aria-hidden="true">
        <div
          className="h-px bg-amber transition-[width,margin-left] duration-200 ease-out"
          style={{
            width: `${pos.span * 100}%`,
            marginLeft: `${pos.progress * (100 - pos.span * 100)}%`,
          }}
        />
      </div>
    </div>
  )
}
