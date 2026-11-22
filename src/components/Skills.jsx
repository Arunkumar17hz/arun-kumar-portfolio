import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Server,
  Database,
  Wrench,
  Bot,
} from 'lucide-react'
import { skillCategories } from '../data/content.js'
import SectionHeading from './SectionHeading.jsx'

const ICONS = {
  frontend: Code2,
  backend: Server,
  database: Database,
  tools: Wrench,
  ai: Bot,
}

/** Horizontal cinematic row with arrow controls + snap scrolling. */
function SkillRow({ category, index }) {
  const scroller = useRef(null)
  const [hovered, setHovered] = useState(null)
  const Icon = ICONS[category.id] ?? Code2

  const scrollBy = (dir) => {
    scroller.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group/row relative"
      aria-label={`${category.title} skills`}
    >
      {/* Row header */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl border"
            style={{
              borderColor: `${category.accent}55`,
              background: `${category.accent}14`,
              color: category.accent,
              boxShadow: `0 0 22px -6px ${category.accent}`,
            }}
          >
            <Icon size={19} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-2xl tracking-[0.12em] text-white">
              {category.title.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-500">{category.subtitle}</p>
          </div>
        </div>

        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scrollBy(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-slate-300 transition hover:border-ember-500 hover:text-ember-400"
            aria-label={`Scroll ${category.title} skills left`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-slate-300 transition hover:border-ember-500 hover:text-ember-400"
            aria-label={`Scroll ${category.title} skills right`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        ref={scroller}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 pt-1"
      >
        {category.skills.map((skill, i) => {
          const isHot = hovered === skill.name
          return (
            <div
              key={skill.name}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(skill.name)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              className="perspective-1200 relative w-[240px] shrink-0 snap-start sm:w-[264px]"
              style={{ transform: isHot ? 'translateY(-6px)' : 'none', transition: 'transform .35s cubic-bezier(.22,1,.36,1)' }}
            >
              <div
                className="preserve-3d relative h-full overflow-hidden rounded-2xl border bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 backdrop-blur-xl transition-all duration-400"
                style={{
                  borderColor: isHot ? `${category.accent}99` : 'rgba(255,255,255,0.1)',
                  boxShadow: isHot
                    ? `0 18px 50px -18px ${category.accent}66, 0 0 0 1px ${category.accent}44, inset 0 1px 0 rgba(255,255,255,0.08)`
                    : '0 16px 40px -24px rgba(0,0,0,0.9)',
                  transform: isHot ? 'rotateY(-5deg) rotateX(4deg) scale(1.02)' : 'none',
                  transition: 'transform .4s cubic-bezier(.22,1,.36,1), border-color .3s, box-shadow .4s',
                }}
              >
                {/* glow sweep */}
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl transition-opacity duration-500"
                  style={{ background: category.accent, opacity: isHot ? 0.35 : 0.12 }}
                  aria-hidden="true"
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-slate-500">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h4 className="mt-1 text-lg font-bold text-white">{skill.name}</h4>
                  </div>
                  <Icon size={16} style={{ color: category.accent }} aria-hidden="true" />
                </div>

                {/* progress */}
                <div className="relative mt-6">
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-slate-500">
                    <span>PROFICIENCY</span>
                    <span style={{ color: category.accent }}>{skill.level}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${category.accent}66, ${category.accent})`,
                        boxShadow: `0 0 12px ${category.accent}`,
                      }}
                    />
                  </div>
                </div>

                {/* animated corner bracket */}
                <span
                  className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 transition-all duration-300"
                  style={{
                    borderColor: isHot ? category.accent : 'transparent',
                    marginBottom: isHot ? 8 : 0,
                    marginRight: isHot ? 8 : 0,
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          )
        })}
      </div>
    </motion.article>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28" aria-labelledby="skills-title">
      {/* ambient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 85% 20%, rgba(229,9,20,0.10), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(96,165,250,0.07), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <SectionHeading
          id="skills-title"
          eyebrow="The Repertoire"
          title="SKILL ROWS"
          description="Five categories. Every card glows, tilts and tracks real proficiency — hover to feel the depth."
        />

        <div className="mt-14 space-y-14">
          {skillCategories.map((cat, i) => (
            <SkillRow key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
