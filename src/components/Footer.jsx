import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { profile, footerNote, navLinks } from '../data/content.js'

export default function Footer() {
  const year = new Date().getFullYear()

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/8 bg-black/60 backdrop-blur-xl">
      {/* red hairline */}
      <div className="hairline absolute inset-x-0 top-0 h-px" aria-hidden="true" />

      <div className="section-shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* brand */}
          <div>
            <button onClick={toTop} className="group flex items-center gap-2.5" aria-label="Back to top">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-ember-600 to-ember-800 font-display text-2xl leading-none text-white shadow-glow transition-transform group-hover:scale-105">
                A
              </span>
              <span className="font-display text-2xl tracking-[0.2em] text-white">
                ARUN <span className="text-ember-500">KUMAR</span>
              </span>
            </button>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              Full-Stack &amp; Software Developer building digital experiences that make an impact —
              React up front, Python behind, care all the way through.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { href: `mailto:${profile.email}`, Icon: Mail, label: 'Email' },
                { href: profile.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                { href: profile.github, Icon: Github, label: 'GitHub' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-slate-400 transition-all duration-300 hover:border-ember-600 hover:bg-ember-600 hover:text-white hover:shadow-glow"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* nav */}
          <nav aria-label="Footer">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ember-400">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() =>
                      document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* stack */}
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ember-400">
              Built With
            </p>
            <ul className="flex flex-wrap gap-2">
              {footerNote.builtWith.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-slate-400"
                >
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={profile.resume}
              download
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ember-400 transition-colors hover:text-ember-300"
            >
              Download Resume →
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="font-mono text-[11px] tracking-wider text-slate-600">
            © {year} {footerNote.tagline}
          </p>

          <button
            onClick={toTop}
            className="group flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-ember-500 hover:text-white"
            aria-label="Back to top"
          >
            BACK TO TOP
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
