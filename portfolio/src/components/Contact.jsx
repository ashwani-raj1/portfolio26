import { useState } from 'react'
import { profile } from '../data/profile.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

/**
 * Leave this empty and the form composes an email in the visitor's own mail app —
 * no backend, no keys, works the moment you deploy. Paste a Formspree endpoint
 * (https://formspree.io/f/xxxxxxx) or any URL that accepts JSON POST, and the form
 * submits directly instead.
 */
const FORM_ENDPOINT = ''

const EMPTY = { name: '', email: '', message: '' }

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Add your name so I know who I am replying to.'

  if (!values.email.trim()) {
    errors.email = 'Add an email address so I can reply.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'That address is missing something — check for a typo.'
  }

  if (values.message.trim().length < 12) {
    errors.message = 'Tell me a little more — a sentence or two is plenty.'
  }

  return errors
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const update = (field) => (event) => {
    setValues((v) => ({ ...v, [field]: event.target.value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      setStatus({ state: 'error', message: 'Check the highlighted fields and try again.' })
      return
    }

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`)
      const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus({
        state: 'sent',
        message: 'Your email app is opening with the message ready to send.',
      })
      return
    }

    setStatus({ state: 'sending', message: 'Sending…' })

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error(String(response.status))

      setValues(EMPTY)
      setStatus({ state: 'sent', message: 'Message sent. I usually reply within a day.' })
    } catch {
      setStatus({
        state: 'error',
        message: `That did not go through. Email me directly at ${profile.email}.`,
      })
    }
  }

  const inputClass =
    'w-full rounded border bg-panel px-3 py-2.5 text-fg outline-none transition-colors placeholder:text-muted focus:border-cyan'

  return (
    <Section
      id="contact"
      label="~/contact"
      title="Hiring, or building something? Say hello."
      lead="I am open to full-time and internship roles in full-stack and AI engineering, and I answer everything."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <dl className="space-y-6">
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-lg text-cyan underline decoration-line underline-offset-4 hover:decoration-cyan"
                >
                  {profile.email}
                </a>
              </dd>
            </div>

            <div>
              <dt className="eyebrow">Phone</dt>
              <dd className="mt-2">
                <a
                  href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
                  className="mono text-lg text-fg hover:text-cyan"
                >
                  {profile.phone}
                </a>
              </dd>
            </div>

            <div>
              <dt className="eyebrow">Based in</dt>
              <dd className="mono mt-2 text-fg">{profile.location}</dd>
            </div>

            <div>
              <dt className="eyebrow">Elsewhere</dt>
              <dd className="mt-2 space-y-1">
                {profile.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mono block text-muted hover:text-cyan"
                  >
                    {link.label} <span className="text-amber">/{link.handle}</span>
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={handleSubmit} noValidate className="card p-6 md:p-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="eyebrow mb-2 block">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={update('name')}
                  aria-invalid={errors.name ? 'true' : undefined}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="Priya Sharma"
                  className={`${inputClass} ${errors.name ? 'border-amber' : 'border-line'}`}
                />
                {errors.name ? (
                  <p id="name-error" className="mono mt-2 text-amber">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="email" className="eyebrow mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="priya@company.com"
                  className={`${inputClass} ${errors.email ? 'border-amber' : 'border-line'}`}
                />
                {errors.email ? (
                  <p id="email-error" className="mono mt-2 text-amber">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="message" className="eyebrow mb-2 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={values.message}
                  onChange={update('message')}
                  aria-invalid={errors.message ? 'true' : undefined}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="What are you working on?"
                  className={`${inputClass} resize-y ${errors.message ? 'border-amber' : 'border-line'}`}
                />
                {errors.message ? (
                  <p id="message-error" className="mono mt-2 text-amber">
                    {errors.message}
                  </p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              disabled={status.state === 'sending'}
              className="mono mt-6 w-full rounded bg-amber px-4 py-3 font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
            >
              {status.state === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`mono mt-4 min-h-[1.25rem] ${
                status.state === 'error' ? 'text-amber' : 'text-cyan'
              }`}
            >
              {status.message}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
