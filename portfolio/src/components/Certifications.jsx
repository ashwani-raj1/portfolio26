import { useState } from 'react'
import { certificationGroups, certifications } from '../data/profile.js'
import Carousel from './Carousel.jsx'
import Lightbox from './Lightbox.jsx'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

const items = certifications.map((cert) => ({
  src: `/certificates/${cert.file}`,
  title: cert.title,
  subtitle: cert.issuer,
  meta: [cert.date, cert.note].filter(Boolean).join(' · '),
  alt: `Certificate: ${cert.title}, issued by ${cert.issuer}, ${cert.date}`,
  kind: cert.kind,
}))

export default function Certifications() {
  const [open, setOpen] = useState(null)

  return (
    <Section
      id="certifications"
      label="~/proof"
      title="Every claim on this page, on paper."
      lead={`${certifications.length} certificates — industry simulations, competitions, and the events I helped run. Three rows, each one scrolls sideways. Click any certificate to read it full size.`}
    >
      <div className="space-y-16">
        {certificationGroups.map((group, g) => {
          const inGroup = items.filter(
            (item) => item.kind === group.kind
          )

          if (inGroup.length === 0) return null

          return (
            <Reveal key={group.kind} delay={g * 80}>
              <Carousel
                label={group.label}
                count={inGroup.length}
              >
                {inGroup.map((item) => (
                  <li
                    key={item.src}
                    className="
                      w-[82vw]
                      sm:w-[20rem]
                      md:w-[22rem]
                      lg:w-[24rem]
                      xl:w-[26rem]
                      shrink-0
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpen(items.indexOf(item))
                      }
                      className="
                        card
                        group
                        flex
                        h-full
                        w-full
                        flex-col
                        overflow-hidden
                        p-0
                        text-left
                      "
                    >
                      {/* Responsive certificate frame */}
                      <span
                        className="
                          relative
                          block
                          w-full
                          aspect-[4/3]
                          overflow-hidden
                          border-b
                          border-line
                          bg-panel-2
                        "
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
                            p-2
                            transition-transform
                            duration-500
                            group-hover:scale-[1.02]
                          "
                        />
                      </span>

                      {/* Certificate information */}
                      <span className="flex flex-1 flex-col p-4">
                        <span
                          className="
                            block
                            font-display
                            text-[0.98rem]
                            font-extrabold
                            leading-snug
                          "
                          style={{ fontStretch: '112%' }}
                        >
                          {item.title}
                        </span>

                        <span className="mono mt-1.5 block text-muted">
                          {item.subtitle}
                        </span>

                        {item.meta && (
                          <span className="mono mt-1 block text-xs text-muted">
                            {item.meta}
                          </span>
                        )}

                        <span
                          className="
                            mono
                            mt-auto
                            pt-3
                            text-amber
                            opacity-0
                            transition-opacity
                            group-hover:opacity-100
                            group-focus-visible:opacity-100
                          "
                        >
                          View →
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </Carousel>
            </Reveal>
          )
        })}
      </div>

      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          onStep={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </Section>
  )
}