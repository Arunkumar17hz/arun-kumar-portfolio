import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Target, Layers, Languages, Quote } from 'lucide-react'
import { about, stats, profile } from '../data/content.js'
import SectionHeading from './SectionHeading.jsx'

function Counter({ value, suffix, raw, duration = 1600 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  if (raw) {
    return (
      <span ref={ref} className="tabular-nums">
        {n}
        {suffix}
      </span>
    )
  }
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  )
}

function StatCard({ stat, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card group relative overflow-hidden p-5 text-center transition-all duration-400 hover:border-ember-600/50 hover:shadow-glow-soft"
    >
      <span
        className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-gradient-to-r from-transparent via-ember-500 to-transparent transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <p className="font-display text-4xl tracking-wide text-white sm:text-5xl">
        <Counter value={stat.value} suffix={stat.suffix} raw={stat.raw} />
      </p>
      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
        {stat.label}
      </p>
    </motion.div>
  )
}

/** Parallax 3D portrait panel. */
function PortraitPanel() {
  const wrap = useRef(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--rx', `${(-py * 12).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(px * 14).toFixed(2)}deg`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="relative" aria-hidden="false">
      <div
        ref={wrap}
        className="preserve-3d relative mx-auto aspect-[4/5] w-full max-w-[400px] transition-transform duration-300"
        style={{ transform: 'perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))' }}
      >
        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-ember-600/30 via-transparent to-blue-500/20 blur-2xl" />
        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/15 shadow-card">
          <img
            src={profile.portraitAlt}
            alt="Arun Kumar at work in a modern office"
            className="h-full w-full object-cover object-top"
            loading="lazy"
            width={768}
            height={1024}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* floating quote card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="glass absolute -left-4 bottom-16 max-w-[230px] rounded-xl p-3.5 shadow-card sm:-left-8"
          >
            <Quote size={14} className="mb-1.5 text-ember-500" aria-hidden="true" />
            <p className="text-[12.5px] leading-snug text-slate-200">
              “Clean code is not a goal — it's how the next feature ships faster.”
            </p>
          </motion.div>
        </div>

        {/* education chip */}
        <div className="glass absolute -right-3 top-6 rounded-xl px-3.5 py-2.5 shadow-card sm:-right-6">
          <p className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-slate-400">
            <GraduationCap size={13} className="text-gold" aria-hidden="true" /> EDUCATION
          </p>
          <p className="mt-0.5 text-[13px] font-bold text-white">B.E. IT — Annamalai Univ.</p>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28" aria-labelledby="about-title">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 12% 30%, rgba(229,9,20,0.10), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <SectionHeading
          id="about-title"
          eyebrow="Behind the Build"
          title="ABOUT ME"
          description="The origin story — who I am, what I've studied, and where I'm headed next."
        />

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} i={i} />
          ))}
        </div>

        {/* Main grid */}
        <div className="mt-16 grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: -12 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="perspective-1200"
          >
            <PortraitPanel />
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="font-display text-3xl tracking-wide text-white sm:text-4xl">
                {about.headline.toUpperCase()}
              </h3>
              <div className="mt-5 space-y-4">
                {about.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.6 }}
                    className="leading-relaxed text-slate-400"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-card p-5 transition hover:border-gold/40"
              >
                <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
                  <GraduationCap size={14} aria-hidden="true" /> Education
                </p>
                <p className="font-bold text-white">{about.education.degree}</p>
                <p className="mt-1 text-sm text-slate-400">{about.education.school}</p>
                <p className="text-sm text-slate-500">{about.education.place}</p>
              </motion.div>

              {/* Career goals */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="glass-card p-5 transition hover:border-ember-600/50"
              >
                <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ember-400">
                  <Target size={14} aria-hidden="true" /> Career Goal
                </p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Begin as an entry-level Software Developer, apply my stack daily, learn emerging
                  technologies, and grow with a professional product team.
                </p>
              </motion.div>

              {/* Technical expertise */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.26 }}
                className="glass-card p-5 sm:col-span-2"
              >
                <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-sky-400">
                  <Layers size={14} aria-hidden="true" /> Technical Expertise
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {about.expertise.map((e, i) => (
                    <motion.li
                      key={e}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * i }}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500 shadow-[0_0_8px_rgba(229,9,20,0.9)]"
                        aria-hidden="true"
                      />
                      {e}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Soft skills + languages */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card p-5 sm:col-span-2"
              >
                <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-violet-400">
                  <Languages size={14} aria-hidden="true" /> Soft Skills & Languages
                </p>
                <div className="flex flex-wrap gap-2">
                  {about.softSkills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-ember-500/60 hover:text-white"
                    >
                      {s}
                    </span>
                  ))}
                  <span className="rounded-full border border-ember-600/40 bg-ember-600/10 px-3 py-1.5 text-xs font-medium text-ember-200">
                    தமிழ் · English
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
