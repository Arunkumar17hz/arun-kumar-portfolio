import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Github, X, Star, Info } from 'lucide-react'
import { projectRows } from '../data/content.js'
import SectionHeading from './SectionHeading.jsx'

/* ------------------------------------------------------------------ */
/* Detail modal (Netflix "jawbone" style)                              */
/* ------------------------------------------------------------------ */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  if (!project) return null

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/12 bg-carbon shadow-[0_-20px_80px_-20px_rgba(229,9,20,0.35)] sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* hero image */}
        <div className="relative aspect-[16/7] overflow-hidden">
          <img
            src={project.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-ember-600"
            aria-label="Close project details"
          >
            <X size={18} />
          </button>

          <div className="absolute inset-x-6 bottom-5">
            <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className="rounded bg-ember-600 px-2 py-0.5 font-bold text-white">
                {project.rating}
              </span>
              <span className="text-emerald-400">{project.match}</span>
              <span className="text-slate-400">· {project.year}</span>
            </div>
            <h3 className="font-display text-3xl tracking-wide text-white sm:text-4xl">
              {project.title}
            </h3>
          </div>
        </div>

        {/* body */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/14 bg-white/6 px-3 py-1 font-mono text-[11px] tracking-wide text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="mt-5 leading-relaxed text-slate-300">{project.longDescription}</p>

          <div className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
            <a href={project.demo} className="btn-ember" onClick={onClose}>
              <Play size={17} fill="currentColor" aria-hidden="true" /> Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost"
            >
              <Github size={17} aria-hidden="true" /> View Source
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Netflix-style content card                                          */
/* ------------------------------------------------------------------ */
function ProjectCard({ project, index, onOpen }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const cardRef = useRef(null)

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: -py * 10, y: px * 14 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.07, 0.35), ease: [0.22, 1, 0.36, 1] }}
      className="w-[250px] shrink-0 snap-start sm:w-[290px]"
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false)
          setTilt({ x: 0, y: 0 })
        }}
        className="preserve-3d relative"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hover ? 'scale(1.06) translateY(-10px)' : 'scale(1)'}`,
          transition: 'transform .45s cubic-bezier(.22,1,.36,1)',
          zIndex: hover ? 30 : 1,
        }}
      >
        <button
          onClick={() => onOpen(project)}
          className="group block w-full overflow-hidden rounded-xl border border-white/12 bg-carbon text-left shadow-card transition-[border-color,box-shadow] duration-400 focus-visible:outline-none"
          style={{
            borderColor: hover ? 'rgba(229,9,20,0.65)' : 'rgba(255,255,255,0.12)',
            boxShadow: hover
              ? '0 30px 70px -20px rgba(229,9,20,0.45), 0 0 0 1px rgba(229,9,20,0.35)'
              : '0 24px 60px -30px rgba(0,0,0,0.95)',
          }}
          aria-label={`Open details for ${project.title}`}
        >
          {/* poster */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              width={640}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            {/* badges */}
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              <span className="w-fit rounded bg-ember-600/95 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white shadow-glow">
                {project.rating}
              </span>
              <span className="w-fit rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] tracking-wider text-emerald-400 backdrop-blur">
                {project.match}
              </span>
            </div>
            <span className="absolute right-3 top-3 rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] text-slate-300 backdrop-blur">
              {project.year}
            </span>

            {/* play affordance */}
            <span
              className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300"
              style={{ opacity: hover ? 1 : 0 }}
              aria-hidden="true"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-black/45 backdrop-blur transition-transform duration-300 group-hover:scale-100">
                <Play size={22} fill="white" className="ml-0.5 text-white" />
              </span>
            </span>
          </div>

          {/* meta — expands on hover */}
          <div className="relative px-4 pb-4 pt-3">
            <h4 className="truncate font-semibold text-white transition-colors group-hover:text-ember-300">
              {project.title}
            </h4>

            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[10px] text-slate-400"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            {/* expandable description */}
            <div
              className="grid transition-all duration-500 ease-out"
              style={{ gridTemplateRows: hover ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="pt-3 text-[12.5px] leading-relaxed text-slate-400">
                  {project.description}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ember-400">
                    <Info size={13} /> Details
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-slate-500">
                    <Github size={13} /> Source
                  </span>
                </div>
              </div>
            </div>

            {!hover && (
              <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-slate-600">
                <Star size={11} className="text-gold" /> HOVER TO EXPAND
              </p>
            )}
          </div>
        </button>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Row                                                                 */
/* ------------------------------------------------------------------ */
function ProjectRow({ row, onOpen }) {
  const scroller = useRef(null)
  const scrollBy = (dir) => scroller.current?.scrollBy({ left: dir * 640, behavior: 'smooth' })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6 }}
      className="group/row relative"
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl tracking-[0.1em] text-white sm:text-3xl">
            {row.title.toUpperCase()}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{row.subtitle}</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scrollBy(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-slate-300 transition hover:border-ember-500 hover:text-ember-400"
            aria-label={`Scroll ${row.title} left`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-slate-300 transition hover:border-ember-500 hover:text-ember-400"
            aria-label={`Scroll ${row.title} right`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-6 pt-3"
      >
        {row.projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={onOpen} />
        ))}
      </div>

      {/* edge fade */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-midnight to-transparent sm:w-24"
        aria-hidden="true"
      />
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="projects" className="relative py-24 sm:py-28" aria-labelledby="projects-title">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 35% at 50% 0%, rgba(229,9,20,0.12), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <SectionHeading
          id="projects-title"
          eyebrow="Now Streaming"
          title="PROJECT SERIES"
          description="Five curated rows of real builds. Hover any card to expand it — click for the full episode details, live demo and source."
        />

        <div className="mt-14 space-y-16">
          {projectRows.map((row) => (
            <ProjectRow key={row.id} row={row} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
