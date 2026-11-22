import { Suspense, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Play, Download, MapPin, Mail, ChevronDown, Zap } from 'lucide-react'
import HeroScene from './HeroScene.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import { profile } from '../data/content.js'

/** Animated count-up used by the tiny hero stats. */
function CountUp({ to, duration = 1400 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 2.15 } },
}
const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const sectionRef = useRef(null)
  const portraitWrap = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // 3D tilt on portrait (mouse-follow)
  useEffect(() => {
    const el = portraitWrap.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--rx', `${(-py * 14).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(px * 16).toFixed(2)}deg`)
    }
    const onLeave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16"
      aria-label="Featured developer hero"
    >
      {/* Three.js cinematic background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <ErrorBoundary>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </ErrorBoundary>
      </motion.div>

      {/* top gradient for nav legibility */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black/70 to-transparent" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="section-shell relative z-10 grid items-center gap-12 pt-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8"
      >
        {/* ---------------- Copy ---------------- */}
        <motion.div variants={container} initial="hidden" animate="show">
          {/* kicker */}
          <motion.div variants={item} className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-ember-600/40 bg-ember-600/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-ember-300">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-ember-500" />
              Top Billed Developer
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-slate-300 backdrop-blur">
              <Zap size={12} className="text-gold" aria-hidden="true" /> {profile.availability}
            </span>
          </motion.div>

          {/* name */}
          <motion.h1
            variants={item}
            className="font-display text-[clamp(3.4rem,11vw,8.5rem)] leading-[0.88] tracking-[0.02em] text-white"
          >
            <span className="block">ARUN</span>
            <span className="text-gradient-ember block drop-shadow-[0_0_40px_rgba(229,9,20,0.35)]">
              KUMAR
            </span>
          </motion.h1>

          {/* roles */}
          <motion.p
            variants={item}
            className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm font-medium tracking-[0.18em] text-slate-300 sm:text-base"
          >
            <span className="text-ember-400">{'//'}</span>
            <span>FULL-STACK DEVELOPER</span>
            <span className="text-slate-600">|</span>
            <span>SOFTWARE DEVELOPER</span>
          </motion.p>

          {/* tagline */}
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-balance text-lg font-semibold leading-snug text-slate-100 sm:text-xl"
          >
            “{profile.tagline}”
          </motion.p>

          {/* intro */}
          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400"
          >
            {profile.intro}
          </motion.p>

          {/* buttons */}
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <button onClick={() => scrollTo('projects')} className="btn-ember group">
              <Play size={18} fill="currentColor" aria-hidden="true" />
              Explore Portfolio
            </button>
            <a href={profile.resume} download className="btn-ghost">
              <Download size={18} aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>

          {/* meta strip */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-400"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-ember-500" aria-hidden="true" />
              {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail size={15} className="text-ember-500" aria-hidden="true" />
              {profile.email}
            </a>
            <span className="hidden font-mono text-xs text-slate-600 sm:inline">
              v2.0 — available now
            </span>
          </motion.div>
        </motion.div>

        {/* ---------------- Portrait ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 18 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 2.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
        >
          {/* glow behind */}
          <div
            className="absolute -inset-8 rounded-[2.5rem] opacity-70 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 50% 40%, rgba(229,9,20,0.45), rgba(229,9,20,0.06) 55%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          <div
            ref={portraitWrap}
            className="preserve-3d relative mx-auto aspect-[4/5] w-full max-w-[380px] transition-transform duration-300 ease-out lg:max-w-[440px]"
            style={{
              transform: 'perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))',
            }}
          >
            {/* frame */}
            <div className="absolute -inset-3 rounded-3xl border border-white/12 bg-gradient-to-b from-white/10 to-transparent shadow-card" />
            <div className="absolute -inset-3 rounded-3xl border border-ember-600/30 shadow-glow-soft" />

            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-carbon">
              <img
                src={profile.portrait}
                alt="Arun Kumar, Full-Stack Developer — professional portrait"
                className="h-full w-full object-cover object-top"
                width={880}
                height={1100}
              />
              {/* cinematic grade */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(229,9,20,0.14),transparent_45%)] mix-blend-screen" />

              {/* name plate */}
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                <div>
                  <p className="font-display text-2xl tracking-[0.14em] text-white">ARUN KUMAR</p>
                  <p className="font-mono text-[11px] tracking-wider text-ember-300">
                    FULL-STACK · SOFTWARE
                  </p>
                </div>
                <span className="rounded-md border border-white/20 bg-black/50 px-2 py-1 font-mono text-[10px] tracking-widest text-slate-300 backdrop-blur">
                  2026
                </span>
              </div>
            </div>

            {/* floating badges */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass absolute -left-6 top-10 rounded-xl px-3.5 py-2.5 shadow-card sm:-left-10"
            >
              <p className="font-mono text-[10px] tracking-widest text-slate-400">STACK</p>
              <p className="text-sm font-bold text-white">React · Python · SQL</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="glass absolute -right-4 top-1/3 rounded-xl px-3.5 py-2.5 shadow-card sm:-right-8"
            >
              <p className="font-mono text-[10px] tracking-widest text-emerald-400">● SHIPPING</p>
              <p className="text-sm font-bold text-white">Fast & accessible</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
              className="glass absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-xl px-4 py-2.5 shadow-card"
            >
              <p className="text-center font-mono text-[11px] tracking-wider text-slate-300">
                <span className="text-ember-400 font-bold">
                  <CountUp to={15} />+
                </span>{' '}
                projects shipped
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1 }}
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-slate-500 transition-colors hover:text-ember-400 sm:flex"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={18} />
        </motion.span>
      </motion.button>
    </section>
  )
}
