import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Rocket } from 'lucide-react'
import { timeline } from '../data/content.js'
import SectionHeading from './SectionHeading.jsx'

const TYPE_META = {
  education: {
    icon: GraduationCap,
    color: '#e5b567',
    label: 'Education',
  },
  experience: {
    icon: Briefcase,
    color: '#ff5a63',
    label: 'Experience',
  },
  goal: {
    icon: Rocket,
    color: '#34d399',
    label: 'Next Goal',
  },
}

function Milestone({ entry, index, isLast }) {
  const meta = TYPE_META[entry.type] ?? TYPE_META.experience
  const Icon = meta.icon
  const fromLeft = index % 2 === 0

  return (
    <li className="relative grid gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-0">
      {/* content side */}
      <motion.div
        initial={{ opacity: 0, x: fromLeft ? -48 : 48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 order-2 md:order-none md:pb-14 ${
          fromLeft
            ? 'md:col-start-1 md:row-start-1 md:pr-12 md:text-right'
            : 'md:col-start-3 md:row-start-1 md:pl-12'
        }`}
      >
        <article
          className="group glass-card relative overflow-hidden p-6 transition-all duration-400 hover:-translate-y-1"
          style={{
            borderColor: `${meta.color}33`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${meta.color}99`
            e.currentTarget.style.boxShadow = `0 24px 60px -24px ${meta.color}55, 0 0 0 1px ${meta.color}44`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${meta.color}33`
            e.currentTarget.style.boxShadow = ''
          }}
        >
          {/* accent bar */}
          <span
            className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
            style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
            aria-hidden="true"
          />

          <div
            className={`mb-3 flex items-center gap-3 ${
              fromLeft ? 'md:flex-row-reverse' : ''
            }`}
          >
            <span
              className="rounded-md border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{
                borderColor: `${meta.color}66`,
                color: meta.color,
                background: `${meta.color}14`,
              }}
            >
              {entry.date}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              {meta.label}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white">{entry.title}</h3>
          <p className="mt-1 text-sm font-medium" style={{ color: meta.color }}>
            {entry.org}
          </p>

          <ul className={`mt-4 space-y-2 ${fromLeft ? 'md:text-right' : ''}`}>
            {entry.points.map((p) => (
              <li key={p} className="text-sm leading-relaxed text-slate-400">
                {p}
              </li>
            ))}
          </ul>
        </article>
      </motion.div>

      {/* node */}
      <div className="relative order-1 mx-auto md:order-none md:col-start-2 md:row-start-1">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-carbon"
          style={{
            borderColor: meta.color,
            boxShadow: `0 0 22px -4px ${meta.color}, inset 0 0 12px -6px ${meta.color}`,
          }}
        >
          <Icon size={19} style={{ color: meta.color }} aria-hidden="true" />
        </motion.div>

        {/* connection line */}
        {!isLast && (
          <span
            className="absolute bottom-0 left-1/2 top-12 hidden w-px -translate-x-1/2 md:block"
            aria-hidden="true"
            style={{
              background: `linear-gradient(180deg, ${meta.color}88, rgba(255,255,255,0.10))`,
              boxShadow: `0 0 10px -2px ${meta.color}`,
            }}
          />
        )}
        {!isLast && (
          <span
            className="absolute left-1/2 top-12 h-16 w-px -translate-x-1/2 md:hidden"
            aria-hidden="true"
            style={{
              background: `linear-gradient(180deg, ${meta.color}88, transparent)`,
              zIndex: 0,
            }}
          />
        )}
      </div>
    </li>
  )
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-x-hidden py-24 sm:py-28"
      aria-labelledby="experience-title"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 85% 30%, rgba(229,9,20,0.09), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <SectionHeading
          id="experience-title"
          eyebrow="The Journey"
          title="TIMELINE"
          description="Education, internship and shipping experience — connected by one glowing path forward."
          align="center"
        />

        <ol className="relative mx-auto mt-16 max-w-5xl">
          {timeline.map((entry, i) => (
            <Milestone
              key={entry.id}
              entry={entry}
              index={i}
              isLast={i === timeline.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
