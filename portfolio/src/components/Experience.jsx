import { experience } from '../data/profile.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

export default function Experience() {
  return (
    <Section
      id="work"
      label="~/work"
      title="Three internships, all shipping to real users."
      lead="Ordered most recent first. Dates are the sequence that matters here, so they lead."
    >
      <ol className="relative">
        {/* The spine. Sits under the date column on desktop, hard left on mobile.
            Underscores are Tailwind's escape for spaces — calc() needs them
            around the operator or the declaration is invalid CSS. */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[5px] top-2 w-px bg-line md:left-[calc(11rem_+_5px)]"
        />

        {experience.map((job, i) => (
          <li key={job.company}>
            <Reveal
              delay={i * 90}
              className={`relative flex flex-col gap-1 pl-8 md:flex-row md:gap-8 md:pl-0 ${
                i === experience.length - 1 ? 'pb-0' : 'pb-14'
              }`}
            >
              <div className="mono shrink-0 text-muted md:w-44 md:pt-1 md:text-right">
                {job.period}
              </div>

              {/* The marker. Amber and filled for the current role, hollow otherwise. */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-2 h-[11px] w-[11px] rounded-full border-2 md:left-[11rem] ${
                  job.current ? 'border-amber bg-amber' : 'border-line bg-ink'
                }`}
              />

              <div>
                <h3 className="text-xl md:text-[1.35rem]">
                  {job.company}
                  {job.current ? (
                    <span className="mono ml-3 align-middle text-amber">now</span>
                  ) : null}
                </h3>

                <p className="mono mt-1 text-cyan">
                  {job.title} <span className="text-muted">· {job.place}</span>
                </p>

                <ul className="mt-4 space-y-2.5">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-muted">
                      <span aria-hidden="true" className="mt-[0.55rem] h-px w-3 shrink-0 bg-amber" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Only some roles have public artifacts, so this stays out of the
                    way when `links` is absent. */}
                {job.links?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                    {job.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mono text-cyan underline decoration-line underline-offset-4 transition-colors hover:decoration-cyan"
                        >
                          {link.label} <span aria-hidden="true">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <li key={tech} className="mono rounded border border-line px-2 py-1 text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
