import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Sparkles } from 'lucide-react'
import { navLinks, profile } from '../data/content.js'

/** Tracks which section is in view for the glowing active indicator. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.05, 0.2, 0.5] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids.join('|')])

  return active
}

const IDS = navLinks.map((l) => l.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/8 bg-black/70 backdrop-blur-xl shadow-[0_8px_40px_-16px_rgba(0,0,0,0.9)]'
            : 'border-b border-transparent bg-gradient-to-b from-black/75 to-transparent'
        }`}
      >
        <nav className="section-shell flex h-16 items-center justify-between gap-4 md:h-[72px]" aria-label="Primary">
          {/* Brand */}
          <button
            onClick={() => go('home')}
            className="group flex items-center gap-2.5"
            aria-label="Arun Kumar — home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ember-600 to-ember-800 font-display text-xl leading-none text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
              A
            </span>
            <span className="hidden font-display text-xl tracking-[0.22em] text-white sm:block">
              ARUN <span className="text-ember-500">KUMAR</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id} className="relative">
                  <button
                    onClick={() => go(link.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-glow"
                        className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-ember-500 shadow-[0_0_12px_2px_rgba(229,9,20,0.9)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={profile.resume}
              download
              className="hidden items-center gap-2 rounded-md border border-ember-600/50 bg-ember-600/10 px-4 py-2 text-sm font-semibold text-ember-100 transition-all duration-300 hover:bg-ember-600 hover:shadow-glow md:inline-flex"
            >
              <Download size={15} aria-hidden="true" /> Resume
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-white transition hover:border-ember-500/60 hover:text-ember-400 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Progress hairline */}
        <div className="hairline h-px w-full opacity-40" aria-hidden="true" />
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-black/95 pt-20 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="section-shell flex flex-col gap-1 py-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className={`flex w-full items-center justify-between border-b border-white/8 py-4 text-left font-display text-3xl tracking-[0.18em] transition-colors ${
                      active === link.id ? 'text-ember-500' : 'text-slate-200'
                    }`}
                  >
                    {link.label.toUpperCase()}
                    <Sparkles size={16} className="text-ember-600/60" />
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="section-shell mt-auto pb-10">
              <a href={profile.resume} download className="btn-ember w-full">
                <Download size={17} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
