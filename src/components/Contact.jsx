import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  Send,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { contact, profile } from '../data/content.js'
import SectionHeading from './SectionHeading.jsx'

const ICONS = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  whatsapp: MessageCircle,
}

/* ------------------------------------------------------------------ */
/* Interactive 3D envelope (CSS 3D transforms)                         */
/* ------------------------------------------------------------------ */
function Envelope3D() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-py * 22).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * 26).toFixed(2)}deg`)
  }
  const onLeave = () => {
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="perspective-1200 relative mx-auto flex h-64 w-full max-w-sm items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="preserve-3d relative h-44 w-72 transition-transform duration-300 ease-out"
        style={{
          transform: 'rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* glow */}
        <div className="absolute -inset-8 rounded-full bg-ember-600/25 blur-3xl" />

        {/* envelope body */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 overflow-hidden rounded-xl border border-ember-600/40 bg-gradient-to-br from-[#17171f] to-[#0c0c12] shadow-[0_30px_70px_-24px_rgba(229,9,20,0.55)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* letter peeking out */}
          <motion.div
            initial={{ y: 40 }}
            animate={inView ? { y: -14 } : {}}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 right-6 top-5 h-32 rounded-lg border border-white/15 bg-white/95 p-3 shadow-xl"
            style={{ transform: 'translateZ(6px)' }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="h-6 w-6 rounded bg-ember-600" />
              <span className="h-2 w-24 rounded bg-slate-300" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded bg-slate-200" />
              <div className="h-1.5 w-5/6 rounded bg-slate-200" />
              <div className="h-1.5 w-2/3 rounded bg-slate-200" />
            </div>
            <p className="mt-2 font-mono text-[9px] font-bold tracking-widest text-ember-600">
              TO: {profile.email.toUpperCase()}
            </p>
          </motion.div>

          {/* envelope flap (opens) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={inView ? { rotateX: -168 } : {}}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 h-1/2 origin-top"
            style={{
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(160deg, #22222c 0%, #101018 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              borderBottom: '1px solid rgba(229,9,20,0.35)',
              filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.5))',
            }}
          />

          {/* bottom fold lines */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 288 176"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 176 L144 88 L288 176" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          </svg>

          {/* stamp */}
          <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded border-2 border-dashed border-ember-600/60 bg-ember-600/10 rotate-6">
            <Mail size={18} className="text-ember-400" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */
function ContactForm() {
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const message = String(fd.get('message') || '').trim()

    const errs = {}
    if (!name) errs.name = 'Please tell me your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address'
    if (message.length < 10) errs.message = 'Message should be at least 10 characters'
    setErrors(errs)
    if (Object.keys(errs).length) return

    setBusy(true)
    // Compose a mailto: draft — works with no backend.
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setBusy(false)
      setSent(true)
    }, 600)
  }

  const field =
    'w-full rounded-lg border border-white/12 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder:text-slate-600 backdrop-blur transition-all duration-300 focus:border-ember-500/70 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(229,9,20,0.18)] focus:outline-none'

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card flex flex-col items-center gap-4 p-10 text-center"
      >
        <CheckCircle2 size={44} className="text-emerald-400" aria-hidden="true" />
        <h3 className="font-display text-2xl tracking-wide text-white">MESSAGE READY</h3>
        <p className="max-w-sm text-sm text-slate-400">
          Your email app should be opening with the draft. If nothing happened, write to{' '}
          <a href={`mailto:${profile.email}`} className="text-ember-400 underline">
            {profile.email}
          </a>
          .
        </p>
        <button onClick={() => setSent(false)} className="btn-ghost">
          <Sparkles size={16} /> Send another
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass-card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-slate-400">
            Name
          </label>
          <input id="c-name" name="name" type="text" placeholder="Your name" className={field} />
          {errors.name && (
            <p role="alert" className="mt-1.5 text-xs text-ember-400">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-slate-400">
            Email
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            placeholder="you@company.com"
            className={field}
          />
          {errors.email && (
            <p role="alert" className="mt-1.5 text-xs text-ember-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="c-subject" className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-slate-400">
          Subject
        </label>
        <input
          id="c-subject"
          name="subject"
          type="text"
          placeholder="Project, role, collaboration…"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="c-message" className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-slate-400">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          placeholder="Tell me about your idea, team or role…"
          className={`${field} resize-none`}
        />
        {errors.message && (
          <p role="alert" className="mt-1.5 text-xs text-ember-400">
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={busy} className="btn-ember w-full disabled:opacity-70">
        <Send size={17} aria-hidden="true" />
        {busy ? 'Opening mail client…' : 'Send Message'}
      </button>

      <p className="text-center font-mono text-[10px] tracking-wider text-slate-600">
        NO BACKEND NEEDED — DRAFTS STRAIGHT TO YOUR MAIL APP
      </p>
    </form>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-28" aria-labelledby="contact-title">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(229,9,20,0.14), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <SectionHeading
          id="contact-title"
          eyebrow="End Credits"
          title="GET IN TOUCH"
          description={contact.blurb}
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left: envelope + channels */}
          <div className="flex flex-col items-center gap-8">
            <Envelope3D />

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {contact.channels.map((ch, i) => {
                const Icon = ICONS[ch.icon] ?? Mail
                return (
                  <motion.a
                    key={ch.id}
                    href={ch.href}
                    target={ch.external ? '_blank' : undefined}
                    rel={ch.external ? 'noreferrer noopener' : undefined}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.55 }}
                    className="group glass-card flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-600/60 hover:shadow-glow"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ember-600/40 bg-ember-600/10 text-ember-400 transition-all duration-300 group-hover:bg-ember-600 group-hover:text-white">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
                        {ch.label}
                      </span>
                      <span className="block truncate text-sm font-semibold text-white">
                        {ch.value}
                      </span>
                    </span>
                  </motion.a>
                )
              })}
            </div>

            <p className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-slate-500">
              <MapPin size={13} className="text-ember-500" aria-hidden="true" />
              {profile.location}
            </p>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
