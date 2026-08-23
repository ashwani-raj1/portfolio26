import { Analytics } from "@vercel/analytics/next"
import Certifications from './components/Certifications.jsx'
import Contact from './components/Contact.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Moments from './components/Moments.jsx'
import Nav from './components/Nav.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import WinRecord from './components/WinRecord.jsx'
import { useTheme } from './hooks/useTheme.js'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <a
        href="#main"
        className="mono sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-amber focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <Nav theme={theme} onToggleTheme={toggle} />

      <main id="main" className="relative z-10 mx-auto max-w-[1120px] px-5 md:px-8">
        <Hero />
        <WinRecord />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Education />
        <Moments />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
