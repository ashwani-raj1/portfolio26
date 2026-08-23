import { projects } from '../data/profile.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M18 14.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4.5" />
    </svg>
  )
}

function ProjectCard({ project }) {
  const featured = Boolean(project.featured)

  return (
    <article className="card flex h-full flex-col p-6 md:p-8">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className={featured ? 'text-2xl md:text-[2rem]' : 'text-xl'}>{project.name}</h3>
        <span className="mono text-muted">{project.date}</span>
      </header>

      {featured ? (
        <p className="mono mt-3 text-amber">Most recent build</p>
      ) : null}

      <p className={`mt-4 text-muted ${featured ? 'max-w-2xl text-[1.05rem]' : ''}`}>
        {project.summary}
      </p>

      <ul className={`mt-5 space-y-2.5 ${featured ? 'md:columns-2 md:gap-8 md:space-y-0' : ''}`}>
        {project.points.map((point) => (
          <li key={point} className="flex gap-3 text-sm text-muted md:break-inside-avoid md:pb-2.5">
            <span aria-hidden="true" className="mt-[0.5rem] h-px w-3 shrink-0 bg-amber" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="mono rounded border border-line bg-panel-2 px-2 py-1 text-muted">
            {tech}
          </li>
        ))}
      </ul>

      {/* Buttons appear only once a URL exists in profile.js. */}
      {project.demo || project.code ? (
        <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="mono inline-flex items-center gap-2 text-cyan underline decoration-line underline-offset-4 hover:decoration-cyan"
            >
              <LinkIcon />
              {project.demoLabel || 'Live demo'}
            </a>
          ) : null}

          {project.code ? (
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer noopener"
              className="mono inline-flex items-center gap-2 text-cyan underline decoration-line underline-offset-4 hover:decoration-cyan"
            >
              <LinkIcon />
              Source
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      label="~/projects"
      title="Four things I built, and what each one had to get right."
      lead="Blockchain verification, assistive hardware, retrieval-augmented agents, and a full-stack platform. Different problems, same habit of finishing."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.name}
            delay={i * 80}
            className={project.featured ? 'h-full md:col-span-2' : 'h-full'}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
