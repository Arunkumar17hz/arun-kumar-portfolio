import { motion } from 'framer-motion'

/**
 * Shared cinematic section header — eyebrow + display title + description
 * with a red light-sweep underline.
 */
export default function SectionHeading({ eyebrow, title, description, id, align = 'left' }) {
  const alignCls = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <motion.header
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${alignCls} max-w-3xl`}
    >
      <span className="mb-3 inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-ember-400">
        <span className="h-px w-8 bg-ember-600" aria-hidden="true" />
        {eyebrow}
      </span>

      <h2
        id={id}
        className="font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.95] tracking-[0.04em] text-white"
      >
        {title}
      </h2>

      <div className="relative mt-4 h-0.5 w-40 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <motion.span
          initial={{ x: '-110%' }}
          whileInView={{ x: '110%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-ember-500 to-transparent"
        />
      </div>

      {description && (
        <p className="mt-5 text-[15px] leading-relaxed text-slate-400 sm:text-base">{description}</p>
      )}
    </motion.header>
  )
}
