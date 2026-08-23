import Reveal from './Reveal.jsx'

/**
 * Every section shares one frame: a hairline, a mono path label, the trailing
 * rule, then the heading. Repeating the frame exactly is what lets the tally in
 * the record section read as special.
 */
export default function Section({ id, label, title, lead, children }) {
  return (
    <section id={id} className="border-t border-line py-20 md:py-28">
      <Reveal>
        <div className="mb-5 flex items-center gap-4">
          <span className="eyebrow text-amber">{label}</span>
          <span className="rule" aria-hidden="true" />
        </div>

        <h2 className="max-w-2xl text-3xl md:text-[2.6rem]">{title}</h2>

        {lead ? <p className="mt-4 max-w-2xl text-muted">{lead}</p> : null}
      </Reveal>

      <div className="mt-12">{children}</div>
    </section>
  )
}
