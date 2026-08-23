import { education, roles } from '../data/profile.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

export default function Education() {
  return (
    <Section
      id="education"
      label="~/education"
      title="Campus, and what I do on it."
      lead="Final year at Roorkee Institute of Technology, with two roles that keep me building alongside other students."
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="eyebrow mb-6">Positions of responsibility</h3>

          <div className="space-y-4">
            {roles.map((role, i) => (
              <Reveal key={role.title} delay={i * 90}>
                <article className="card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-lg">{role.title}</h4>
                    <span className="mono text-amber">{role.period}</span>
                  </div>
                  <p className="mono mt-1 text-cyan">{role.org}</p>
                  <p className="mt-3 text-sm text-muted">{role.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-6">Education</h3>

          <ol className="border-t border-line">
            {education.map((item, i) => (
              <Reveal
                key={item.school}
                delay={i * 90}
                as="li"
                className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <h4 className="text-base leading-snug">{item.school}</h4>
                  <p className="mt-1 text-sm text-muted">{item.qualification}</p>
                </div>

                <div className="mono shrink-0 text-muted sm:text-right">
                  <div>{item.period}</div>
                  {item.result ? <div className="mt-1 text-amber">{item.result}</div> : null}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
