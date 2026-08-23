import { profile } from '../data/profile.js'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="mono text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <p className="mono text-muted">
          
          <a href="#top" className="text-cyan hover:underline">
            back to top
          </a>
        </p>
      </div>
    </footer>
  )
}
