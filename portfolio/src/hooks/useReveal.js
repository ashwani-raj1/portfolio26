import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when the element scrolls into view. One-shot on purpose: content
 * that fades out again as you scroll back up is distracting to re-read.
 */
export function useInView(options) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver (or very old browser): show everything immediately
    // rather than leaving the page blank.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return [ref, inView]
}

/**
 * Tracks which section is currently on screen so the nav and the gutter rail can
 * mark it. Returns the id of the section nearest the top of the viewport.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const seen = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          seen.set(entry.target.id, entry)
        })

        // Of everything currently visible, pick whichever starts highest.
        const visible = [...seen.values()]
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-88px 0px -55% 0px', threshold: 0 }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return active
}
