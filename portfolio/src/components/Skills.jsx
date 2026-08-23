import { skills } from '../data/profile.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

export default function Skills() {
  return (
    <Section
      id="skills"
      label="~/skills"
      title="What I reach for."
      lead="Grouped by how I actually use them, not by how confident I want to sound."
    >
      <div className="border-t border-line">
        {skills.map((group, i) => (
          <Reveal
            key={group.group}
            delay={i * 70}
            className="grid gap-3 border-b border-line py-6 md:grid-cols-[11rem_1fr] md:gap-8"
          >
            <h3 className="mono self-start font-medium tracking-wider text-amber uppercase">
              {group.group}
            </h3>

            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="mono rounded border border-line bg-panel px-2.5 py-1.5 text-fg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
