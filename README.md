# ARUN KUMAR — Cinematic 3D Developer Portfolio

A premium, Netflix-inspired developer portfolio with an original identity — cinematic dark UI,
deep-red accents, WebGL scenes, scroll-driven storytelling, and buttery 60fps motion.

> Original branding only: **ARUN KUMAR**. No Netflix logos, assets, or copyrighted material are used.

---

## ✨ Features

| Area | What you get |
|---|---|
| **Hero** | Full-screen billboard with a live Three.js scene (code particles, floating wireframes, mouse-parallax camera), 3D-tilting portrait, animated badges |
| **Nav** | Sticky glass navbar with a glowing red active indicator, smooth-scroll anchors, resume download, mobile full-screen menu |
| **Skills** | Netflix-style horizontal rows per category, 3D hover tilt, glowing borders, animated proficiency bars |
| **Projects** | 5 carousels (Featured / Web / AI / Software / Personal), expand-on-hover cards, tilt on mouse, detail modal with Live Demo + GitHub |
| **About** | Count-up statistics, parallax portrait, education / goals / expertise glass cards |
| **Experience** | Alternating cinematic timeline with glowing nodes and connection lines |
| **Contact** | Interactive CSS-3D envelope, channel cards, validated contact form (opens a mailto draft — zero backend needed) |
| **Motion** | GSAP ScrollTrigger section reveals + parallax, Framer Motion entrances, CSS 3D transforms, scroll progress bar |
| **Quality** | Responsive (mobile / tablet / desktop), keyboard accessible, SEO meta + JSON-LD, reduced-motion support, error boundary fallback for WebGL |

---

## 🛠 Tech Stack

- **React 18 + Vite 5** — instant dev server, optimized production build
- **Tailwind CSS 3** — design tokens, glass utilities, cinematic gradients
- **Three.js + React Three Fiber** — hero WebGL scene
- **GSAP + ScrollTrigger** — scroll choreography
- **Framer Motion** — component entrances, layout animations, springs
- **Lucide React** — crisp icon set

---

## 🚀 Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
npm run preview    # serve the production build
```

---

## 🎨 Customizing (easy, one-file edits)

Everything editable lives in **`src/data/content.js`**:

```js
profile   // name, roles, tagline, intro, email, phone, socials, resume path
navLinks  // navigation items
skillCategories  // skill rows + proficiency levels (0–100)
projectRows      // project carousels — add/remove cards freely
stats            // animated counters
about            // paragraphs, education, expertise, soft skills
timeline         // experience & education milestones
contact          // headline, channels, form copy
footerNote       // built-with chips
```

### Swapping images

| File | Used in |
|---|---|
| `public/images/portrait-hero.png` | Hero portrait |
| `public/images/portrait-office.jpg` | About portrait |
| `public/images/proj-*.jpg` | Project card artwork |
| `public/resume/Arun_Kumar_Resume_With_AI_Projects.pdf` | Download Resume buttons |

### Colors & type

- `tailwind.config.js` → `colors.ember` (red accents), `colors.midnight/carbon` (backgrounds)
- Fonts: Bebas Neue (display), Inter (body), JetBrains Mono (code) — loaded in `index.html`

---

## 📁 Project Structure

```
src/
├── App.jsx                  # layout, GSAP choreography, scroll progress
├── index.css                # tailwind layers, glass/glow utilities, a11y
├── data/content.js          # ← ALL editable content
└── components/
    ├── Preloader.jsx        # cinematic intro
    ├── Navbar.jsx           # sticky nav + active tracking
    ├── Hero.jsx             # billboard hero
    ├── HeroScene.jsx        # Three.js particles & floating objects
    ├── ErrorBoundary.jsx    # WebGL fallback
    ├── SectionHeading.jsx   # shared section headers
    ├── About.jsx            # stats + profile
    ├── Skills.jsx           # skill carousels
    ├── Projects.jsx         # project rows + modal
    ├── Experience.jsx       # timeline
    ├── Contact.jsx          # 3D envelope + form
    └── Footer.jsx
public/
├── images/                  # portraits & project art
└── resume/                  # downloadable PDF
```

---

## ✅ Verified

Automated browser tests (Playwright) — **47/47 checks passing** across
desktop (1440px), tablet (768px) and mobile (390px):

- zero console errors / page errors on all viewports
- every section reveals, all images load, resume downloads
- card hover-expand, modal open/close (Esc), row carousels, nav active state
- mobile menu open/close + anchor navigation, horizontal touch scroll
- contact form validation + success state, 3D envelope mouse-tilt

---

## ♿ Accessibility & SEO

- Semantic landmarks, `aria-label`s, visible focus rings, skip link
- `prefers-reduced-motion` disables non-essential animation
- Title, description, Open Graph/Twitter cards, JSON-LD `Person` schema
- Lazy-loaded imagery, code-split vendor chunks (three / motion / vendor)

---

Built with ❤️ by **Arun Kumar** — *Building Digital Experiences That Make an Impact.*
