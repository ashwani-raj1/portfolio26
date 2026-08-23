import { achievements, hackathons } from '../data/profile.js'
import { useInView } from '../hooks/useReveal.js'
import Reveal from './Reveal.jsx'

const wins = hackathons.wins
const total = Math.max(hackathons.entered, wins.length)

export default function WinRecord() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  const cells = Array.from({ length: total }, (_, i) => ({
    won: i < wins.length,
    ...(wins[i] || {}),
  }))

  return (
    <section id="record" className="border-t border-line py-20 md:py-28">
      <Reveal>
        <div className="mb-5 flex items-center gap-4">
          <span className="eyebrow text-amber">~/record</span>
          <span className="rule" aria-hidden="true" />
        </div>

        <h2 className="max-w-2xl text-3xl md:text-[2.6rem]">
          Seven wins from ten hackathons.
        </h2>

        <p className="mt-4 max-w-2xl text-muted">
          A weekend hackathon is the shortest possible feedback loop on shipping: build
          something real, in front of judges, before the clock runs out. This is the record.
        </p>
      </Reveal>

      {/* The tally. Ten cells for ten entries; the seven wins fill in sequence as it
          scrolls into view. The three unfilled cells stay visible on purpose — the
          ratio is the claim, and hiding the losses would turn it into a boast. */}
      <div ref={ref} className="mt-12">
        <div className="tally" aria-hidden="true">
          {cells.map((cell, i) => (
            <div
              key={i}
              className={`tally-cell ${inView ? 'is-filled' : ''}`}
              data-won={String(cell.won)}
              style={{ '--cell-delay': `${i * 70}ms` }}
            >
              {cell.won ? (
                <span className="tally-label">
                  {cell.event}
                  <br />
                  {cell.host}
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <p className="sr-only">
          Won {wins.length} of {total} hackathons entered:{' '}
          {wins.map((w) => `${w.event} at ${w.host}, ${w.placement}`).join('; ')}.
        </p>

        <p className="mono mt-4 text-muted">
          <span className="text-amber">■</span> won &nbsp;·&nbsp; ▨ entered &nbsp;·&nbsp; hover a
          win for the event
        </p>

        {/* The placements, spelled out. The tally gives you the ratio at a glance;
            this is where you check it. */}
        <ol className="mt-8 grid gap-px overflow-hidden border border-line sm:grid-cols-2 lg:grid-cols-3">
          {wins.map((win, i) => (
            <Reveal
              as="li"
              key={`${win.event}-${i}`}
              delay={i * 50}
              className="flex items-baseline justify-between gap-4 bg-panel px-4 py-3"
            >
              <span>
                <span className="block text-[0.95rem] text-fg">{win.event}</span>
                <span className="mono text-muted">{win.host}</span>
              </span>
              <span className="mono shrink-0 text-right text-amber">{win.placement}</span>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* The rest of the track record, kept plain so the tally stays the loud part. */}
      <dl className="mt-16 grid gap-px overflow-hidden border border-line sm:grid-cols-3">
        {achievements.map((item, i) => (
          <Reveal key={item.label} delay={i * 90} className="bg-panel p-6">
            <dt className="font-display text-4xl font-extrabold text-amber" style={{ fontStretch: '112%' }}>
              {item.stat}
            </dt>
            <dd className="mt-1">
              <span className="mono block text-fg">{item.label}</span>
              <span className="mt-2 block text-sm text-muted">{item.detail}</span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
