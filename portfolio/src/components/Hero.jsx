import { profile } from '../data/profile.js'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h13M12.5 5.5 19 12l-6.5 6.5" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="top" className="grid items-center gap-12 py-16 md:grid-cols-12 md:py-24">
      <div className="md:col-span-7">
        <p className="eyebrow rise" style={{ '--rise-delay': '60ms' }}>
          {profile.eyebrow}
        </p>

        <h1
          className="rise mt-5 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.2rem]"
          style={{ '--rise-delay': '140ms' }}
        >
          {profile.headline}
        </h1>

        <p
          className="rise mt-6 max-w-xl text-[1.05rem] text-muted"
          style={{ '--rise-delay': '240ms' }}
        >
          {profile.intro}
        </p>

        <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ '--rise-delay': '340ms' }}>
          <a
            href="#projects"
            className="mono inline-flex items-center gap-2 rounded bg-amber px-4 py-2.5 font-medium text-ink transition-opacity hover:opacity-90"
          >
            See the work
            <ArrowIcon />
          </a>

          <a
            href={profile.resume}
            download
            className="mono inline-flex items-center gap-2 rounded border border-line px-4 py-2.5 text-fg transition-colors hover:border-amber hover:text-amber"
          >
            Download résumé
          </a>
        </div>

        <ul
          className="rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-2"
          style={{ '--rise-delay': '420ms' }}
        >
          {profile.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mono text-muted underline decoration-line underline-offset-4 transition-colors hover:text-cyan hover:decoration-cyan"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="rise md:col-span-5" style={{ '--rise-delay': '300ms' }}>
        {/* The portrait sits on a warm plate. `multiply` against a near-white plate
            drops the photo's own white background out cleanly without muddying the
            midtones, so the cutout works on both themes. */}
        <figure className="relative mx-auto max-w-[340px] border border-line p-2 md:max-w-none">
          <div className="relative overflow-hidden" style={{ backgroundColor: '#FAF9F6' }}>
            <img
              src={profile.photo}
              alt={`${profile.name}, ${profile.role}`}
              width="720"
              height="800"
              loading="eager"
              decoding="async"
              className="block h-auto w-full"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>

          <figcaption className="mono mt-2 flex items-center justify-between text-muted">
            <span>{profile.shortLocation}</span>
            <span className="text-amber">open to roles</span>
          </figcaption>

          {/* Crop marks, borrowed from a contact sheet. */}
          <span aria-hidden="true" className="absolute -left-px -top-px h-3 w-3 border-l border-t border-amber" />
          <span aria-hidden="true" className="absolute -right-px -top-px h-3 w-3 border-r border-t border-amber" />
        </figure>
      </div>
    </section>
  )
}
