import { useState } from 'react'
import { momentGroups, moments } from '../data/profile.js'
import Carousel from './Carousel.jsx'
import Lightbox from './Lightbox.jsx'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

// One flat list drives the lightbox, so the arrow keys walk every photo in the
// section rather than stopping at the end of the strip you opened from.
const items = moments.map((moment) => ({
  src: `/moments/${moment.file}`,
  title: moment.caption,
  subtitle: moment.date,
  meta: '',
  alt: moment.alt,
  group: moment.group,
  wide: Boolean(moment.wide),
}))

const known = momentGroups.map((group) => group.kind)

// A photo added later with a `group` that isn't in momentGroups still shows up.
const strips = [
  ...momentGroups.map((group) => ({
    key: group.kind,
    label: group.label,
    photos: items.filter((item) => item.group === group.kind),
  })),
  {
    key: '_other',
    label: 'More',
    photos: items.filter((item) => !known.includes(item.group)),
  },
].filter((strip) => strip.photos.length > 0)

export default function Moments() {
  const [open, setOpen] = useState(null)

  if (moments.length === 0) return null

  return (
    <Section
      id="moments"
      label="~/moments"
      title="The part that does not fit on a résumé."
      lead={`${moments.length} photographs — cheques, teams, and campus. Each row scrolls sideways: drag it, or use the arrows. Click a photo to open it full size.`}
    >
      <div className="space-y-16">
        {strips.map((strip, s) => (
          <Reveal key={strip.key} delay={s * 80}>
            <Carousel label={strip.label} count={strip.photos.length}>
              {strip.photos.map((item) => (
                <li
                  key={item.src}
                  className={
                    item.wide
                      ? 'w-[78vw] sm:w-[30rem] lg:w-[34rem]'
                      : 'w-[78vw] sm:w-[20rem] lg:w-[21.5rem]'
                  }
                >
                  <button
                    type="button"
                    onClick={() => setOpen(items.indexOf(item))}
                    className="card group flex h-full w-full flex-col overflow-hidden p-0 text-left"
                  >
                    {/* Responsive image frame.
                        Size stays the same, but the complete photo fits inside. */}
                    <span
                      className={
                        item.wide
                          ? 'relative block aspect-[16/7] w-full overflow-hidden border-b border-line bg-panel-2'
                          : 'relative block aspect-[4/3] w-full overflow-hidden border-b border-line bg-panel-2'
                      }
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-contain
                          p-1
                          transition-transform
                          duration-500
                          group-hover:scale-[1.02]
                        "
                      />
                    </span>

                    <span className="flex flex-1 flex-col justify-between gap-2 p-4">
                      <span className="text-[0.95rem] leading-snug text-fg">
                        {item.title}
                      </span>

                      <span className="mono text-muted">
                        {item.subtitle}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </Carousel>
          </Reveal>
        ))}
      </div>

      {open !== null ? (
        <Lightbox
          items={items}
          index={open}
          onStep={setOpen}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </Section>
  )
}