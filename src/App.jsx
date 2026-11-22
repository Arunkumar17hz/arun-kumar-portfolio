import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

/** Cinematic section reveals + parallax via GSAP ScrollTrigger. */
function useGsapChoreography() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Fade-up reveals for section shells
      gsap.utils.toArray('.section-shell').forEach((el) => {
        if (el.closest('#home')) return // hero handles its own intro
        gsap.from(el, {
          y: 46,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        })
      })

      // Subtle parallax on ambient backdrops
      gsap.utils.toArray('section > div[aria-hidden="true"]').forEach((el) => {
        gsap.to(el, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])
}

/** Fixed red scroll-progress bar. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-ember-700 via-ember-500 to-orange-400 shadow-[0_0_12px_rgba(229,9,20,0.9)]"
      aria-hidden="true"
    />
  )
}

export default function App() {
  useGsapChoreography()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* skip link — accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-md focus:bg-ember-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <Preloader />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />

      {/* mobile back-to-top FAB */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={false}
        animate={{ opacity: showTop ? 1 : 0, pointerEvents: showTop ? 'auto' : 'none' }}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-ember-600/50 bg-black/80 text-ember-400 shadow-glow backdrop-blur-lg transition hover:bg-ember-600 hover:text-white sm:hidden"
        aria-label="Back to top"
      >
        ↑
      </motion.button>
    </div>
  )
}
