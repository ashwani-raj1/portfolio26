import { useCallback, useEffect, useRef } from 'react'

/**
 * A modal image viewer shared by the certificates and moments galleries.
 *
 * Accessibility rules it follows, because a lightbox is the easiest place on a
 * page to trap a keyboard user:
 *   · Escape closes, arrows step, Home/End jump to the ends.
 *   · Focus moves into the dialog on open and returns to the thumbnail on close.
 *   · Tab is cycled inside the dialog, so you cannot land on the page behind it.
 *   · Background scrolling is locked while it is open.
 *
 * `items` is an array of { src, title, subtitle, meta, alt }, and `index` is the
 * one being shown. The parent owns the index so both galleries can reuse this.
 */
export default function Lightbox({ items, index, onClose, onStep }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const restoreTo = useRef(null)

  const item = items[index]
  const count = items.length

  const step = useCallback(
    (delta) => onStep((index + delta + count) % count),
    [index, count, onStep]
  )

  // Remember what had focus, move focus in, and put it back on unmount.
  useEffect(() => {
    restoreTo.current = document.activeElement
    closeRef.current?.focus()

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
      if (restoreTo.current instanceof HTMLElement) restoreTo.current.focus()
    }
  }, [])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (count > 1) {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          step(1)
          return
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          step(-1)
          return
        }
        if (event.key === 'Home') {
          event.preventDefault()
          onStep(0)
          return
        }
        if (event.key === 'End') {
          event.preventDefault()
          onStep(count - 1)
          return
        }
      }

      // Keep Tab inside the dialog.
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button, [href]')
        if (!focusable || focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [count, onClose, onStep, step])

  if (!item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      ref={dialogRef}
      onClick={(event) => {
        // Only the backdrop closes; clicks that bubble up from the panel do not.
        if (event.target === event.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
    >
      <div className="flex w-full max-w-4xl items-center justify-between gap-4">
        <p className="mono text-muted">
          {index + 1} / {count}
        </p>

        <button
          type="button"
          ref={closeRef}
          onClick={onClose}
          className="mono rounded border border-line px-3 py-1.5 text-fg transition-colors hover:border-amber hover:text-amber"
        >
          Close <span aria-hidden="true">✕</span>
        </button>
      </div>

      <figure className="flex min-h-0 w-full max-w-4xl flex-1 flex-col items-center justify-center gap-4">
        <img
          src={item.src}
          alt={item.alt || item.title}
          className="max-h-[62vh] w-auto max-w-full rounded border border-line object-contain"
        />

        <figcaption className="w-full text-center">
          <p className="font-display text-lg font-extrabold" style={{ fontStretch: '112%' }}>
            {item.title}
          </p>
          {item.subtitle ? <p className="mono mt-1 text-cyan">{item.subtitle}</p> : null}
          {item.meta ? <p className="mt-2 text-sm text-muted">{item.meta}</p> : null}
        </figcaption>
      </figure>

      {count > 1 ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            className="mono rounded border border-line px-4 py-2 text-fg transition-colors hover:border-amber hover:text-amber"
          >
            <span aria-hidden="true">←</span> Previous
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="mono rounded border border-line px-4 py-2 text-fg transition-colors hover:border-amber hover:text-amber"
          >
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
