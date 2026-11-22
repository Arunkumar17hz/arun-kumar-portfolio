import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Cinematic intro: monogram reveal + red light sweep.
 * Auto-dismisses; respects users by never trapping interaction.
 */
export default function Preloader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1900)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
          aria-hidden="true"
        >
          {/* red backdrop sweep */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(229,9,20,0.28), transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1.1, 1.1, 1.4] }}
            transition={{ duration: 1.8, times: [0, 0.3, 0.7, 1] }}
          />

          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              className="flex h-24 w-24 items-center justify-center rounded-2xl border border-ember-600/60 bg-black/70 shadow-glow"
              initial={{ rotateX: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotateX: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-display text-6xl leading-none text-ember-600 drop-shadow-[0_0_18px_rgba(229,9,20,0.8)]">
                A
              </span>
            </motion.div>

            <motion.p
              className="font-display text-2xl tracking-[0.45em] text-slate-300"
              initial={{ opacity: 0, y: 12, letterSpacing: '0.8em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.45em' }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              ARUN KUMAR
            </motion.p>

            <div className="h-px w-52 overflow-hidden bg-white/10">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-transparent via-ember-500 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.1, delay: 0.4, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
