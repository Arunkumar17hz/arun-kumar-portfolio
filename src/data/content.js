/**
 * ============================================================
 *  ARUN KUMAR — Portfolio content
 *  Edit this one file to customize the whole website.
 * ============================================================
 */

export const profile = {
  name: 'Arun Kumar',
  firstName: 'Arun',
  lastName: 'Kumar',
  roles: ['Full-Stack Developer', 'Software Developer'],
  tagline: 'Building Digital Experiences That Make an Impact.',
  intro:
    'Motivated Information Technology graduate crafting responsive web apps and practical software — from pixel-perfect React frontends to solid Python backends and databases. I turn ideas into fast, accessible products people love to use.',
  location: 'Kallakurichi, Tamil Nadu, India',
  email: 'arunkumar17hz@gmail.com',
  phone: '+91 9943519949',
  phoneHref: 'tel:+919943519949',
  whatsapp: 'https://wa.me/919943519949',
  linkedin: 'https://linkedin.com/in/arun-kumar-855320357/',
  github: 'https://github.com/arunkumar-dev',
  resume: 'resume/Arun_Kumar_Resume.pdf',
  availability: 'Open to entry-level Software / Web Developer roles',
  portrait: 'images/portrait-hero.png',
  portraitAlt: 'images/portrait-office.jpg',
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/* ---------------- SKILLS ---------------- */

export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Interfaces that feel alive',
    accent: '#ff5a63',
    skills: [
      { name: 'HTML', level: 92 },
      { name: 'CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'React.js', level: 82 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'Logic, APIs & services',
    accent: '#e5b567',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Node.js', level: 72 },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    subtitle: 'Structured, reliable data',
    accent: '#60a5fa',
    skills: [
      { name: 'SQL', level: 84 },
      { name: 'MySQL', level: 82 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    subtitle: 'Ship with confidence',
    accent: '#a78bfa',
    skills: [
      { name: 'Git', level: 82 },
      { name: 'GitHub', level: 80 },
      { name: 'VS Code', level: 92 },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    subtitle: 'Agents that do the heavy lifting',
    accent: '#34d399',
    skills: [
      { name: 'AI Agents', level: 75 },
      { name: 'Workflow Automation', level: 78 },
      { name: 'API Integration', level: 82 },
    ],
  },
]

/* ---------------- PROJECTS ---------------- */

export const projectRows = [
  {
    id: 'featured',
    title: 'Featured Projects',
    subtitle: 'Hand-picked builds — press play on quality',
    projects: [
      {
        id: 'student-ms',
        title: 'Student Management System',
        year: '2025',
        match: '98% Match',
        rating: 'Featured',
        image: 'images/proj-dashboard.jpg',
        tech: ['Python', 'MySQL', 'HTML', 'CSS'],
        description:
          'Academic information system that organises student records, enrolment and grades — designed for fast lookups and a clean admin workflow.',
        longDescription:
          'A full CRUD application for managing student records: admissions, courses, attendance and results. Includes role-aware forms, validation, search/filter and a SQL-backed data layer built for reliability.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Software Development',
      },
      {
        id: 'business-suite',
        title: 'Business Website Suite',
        year: '2025',
        match: '96% Match',
        rating: 'Popular',
        image: 'images/proj-business.jpg',
        tech: ['React.js', 'JavaScript', 'CSS3'],
        description:
          'Responsive multi-page business websites with modern layouts, smooth navigation and conversion-focused landing sections.',
        longDescription:
          'A suite of production-style business sites: hero sections, service grids, testimonial carousels and contact flows — all mobile-first, accessible and tuned for Core Web Vitals.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Web Development',
      },
      {
        id: 'ai-workflow',
        title: 'AI Workflow Automation',
        year: '2026',
        match: '97% Match',
        rating: 'New',
        image: 'images/proj-ai.jpg',
        tech: ['Python', 'AI Agents', 'API Integration'],
        description:
          'Agent-driven pipelines that triage requests, call APIs and automate repetitive workflows end-to-end.',
        longDescription:
          'An automation hub where AI agents classify inputs, route tasks and chain REST APIs together — cutting manual busywork with logged, replayable runs.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'AI Automation',
      },
      {
        id: 'portfolio-3d',
        title: '3D Developer Portfolio',
        year: '2026',
        match: '99% Match',
        rating: 'Award-style',
        image: 'images/proj-portfolio.jpg',
        tech: ['React', 'Three.js', 'GSAP', 'Tailwind'],
        description:
          'This cinematic portfolio — Netflix-inspired UI, WebGL scenes, scroll-driven storytelling and buttery 60fps motion.',
        longDescription:
          'A production-ready portfolio featuring React Three Fiber scenes, GSAP ScrollTrigger choreography, glassmorphism UI and full accessibility — SEO-friendly and blazing fast.',
        demo: '#home',
        github: 'https://github.com/arunkumar-dev',
        category: 'Personal Projects',
      },
    ],
  },
  {
    id: 'web',
    title: 'Web Development',
    subtitle: 'Responsive sites with cinematic polish',
    projects: [
      {
        id: 'landing-redesign',
        title: 'Startup Landing Redesign',
        year: '2025',
        match: '94% Match',
        rating: 'Top 10',
        image: 'images/proj-business.jpg',
        tech: ['HTML5', 'CSS3', 'JavaScript'],
        description:
          'High-conversion landing page with animated stats, sticky CTA and lazy-loaded media.',
        longDescription:
          'Rebuilt a marketing landing page from wireframe to deploy: semantic HTML, custom CSS animations and vanilla JS interactions with zero jQuery.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Web Development',
      },
      {
        id: 'dashboard-ui',
        title: 'Analytics Dashboard UI',
        year: '2025',
        match: '93% Match',
        rating: 'Trending',
        image: 'images/proj-dashboard.jpg',
        tech: ['React.js', 'CSS3', 'Chart UX'],
        description:
          'Dark-mode dashboard with KPI cards, filterable tables and animated data visualisation.',
        longDescription:
          'A component-driven dashboard: responsive grid, theme tokens, accessible form controls and smooth micro-interactions on every data change.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Web Development',
      },
      {
        id: 'ecommerce-front',
        title: 'E-Commerce Frontend',
        year: '2025',
        match: '92% Match',
        rating: 'Popular',
        image: 'images/proj-portfolio.jpg',
        tech: ['React.js', 'JavaScript', 'REST API'],
        description:
          'Product catalogue, cart and checkout flow wired to a REST API with optimistic UI.',
        longDescription:
          'A storefront frontend with search, filters, persistent cart and loading/error states — built as a reusable component library.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Web Development',
      },
      {
        id: 'portfolio-classic',
        title: 'Personal Portfolio v1',
        year: '2024',
        match: '90% Match',
        rating: 'Classic',
        image: 'images/proj-portfolio.jpg',
        tech: ['HTML', 'CSS', 'JavaScript'],
        description:
          'My first portfolio — responsive, user-friendly and the foundation for everything after it.',
        longDescription:
          'A clean single-page portfolio showcasing skills, projects and contact info. Focused on responsive layout, accessibility and fast load times.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Personal Projects',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI Automation',
    subtitle: 'Agents, pipelines & smart integrations',
    projects: [
      {
        id: 'inbox-agent',
        title: 'Smart Inbox Agent',
        year: '2026',
        match: '95% Match',
        rating: 'New',
        image: 'images/proj-ai.jpg',
        tech: ['Python', 'AI Agents', 'API Integration'],
        description:
          'An agent that drafts replies, labels threads and escalates urgent messages automatically.',
        longDescription:
          'LLM-backed agent with tool-calling for email APIs, confidence thresholds and human-in-the-loop review before anything is sent.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'AI Automation',
      },
      {
        id: 'data-pipeline',
        title: 'Automated Data Pipeline',
        year: '2025',
        match: '93% Match',
        rating: 'Engineering',
        image: 'images/proj-security.jpg',
        tech: ['Python', 'SQL', 'Workflow Automation'],
        description:
          'Scheduled ETL jobs that clean, validate and load data into MySQL with alerting.',
        longDescription:
          'A resilient pipeline: retries, idempotent loads, schema validation and notification hooks when anything drifts.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'AI Automation',
      },
      {
        id: 'api-hub',
        title: 'Universal API Hub',
        year: '2025',
        match: '91% Match',
        rating: 'Utility',
        image: 'images/proj-code.jpg',
        tech: ['Node.js', 'REST', 'API Integration'],
        description:
          'One gateway to authenticate, rate-limit and monitor multiple third-party APIs.',
        longDescription:
          'A middleware hub with token vaulting, retry policies, request logging and a small ops dashboard for uptime.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'AI Automation',
      },
    ],
  },
  {
    id: 'software',
    title: 'Software Development',
    subtitle: 'Desktop & systems work, engineered cleanly',
    projects: [
      {
        id: 'sms-core',
        title: 'Student Records Core',
        year: '2025',
        match: '96% Match',
        rating: 'Academic',
        image: 'images/proj-dashboard.jpg',
        tech: ['Python', 'MySQL', 'DBMS'],
        description:
          'Backend engine for student information management with relational schema design.',
        longDescription:
          'Normalised MySQL schema, transactional writes and report queries that power the Student Management System UI.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Software Development',
      },
      {
        id: 'secure-scan',
        title: 'Web App Security Scanner',
        year: '2025',
        match: '94% Match',
        rating: 'Cyber',
        image: 'images/proj-security.jpg',
        tech: ['Python', 'Cyber Security', 'HTTP'],
        description:
          'Internship build that checks common web vulnerabilities and prints a risk report.',
        longDescription:
          'Built during the Thiranex cyber security internship: headers audit, input fuzzing hints and OWASP Top 10 checks with clear remediation notes.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Software Development',
      },
      {
        id: 'cli-toolkit',
        title: 'Dev CLI Toolkit',
        year: '2024',
        match: '89% Match',
        rating: 'Utility',
        image: 'images/proj-code.jpg',
        tech: ['Python', 'Git', 'Automation'],
        description:
          'Command-line helpers that scaffold projects, clean branches and automate git chores.',
        longDescription:
          'A set of tested CLI scripts that remove repetitive dev-ops friction — templating, changelog generation and repo hygiene checks.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Software Development',
      },
    ],
  },
  {
    id: 'personal',
    title: 'Personal Projects',
    subtitle: 'Where experiments become products',
    projects: [
      {
        id: 'blog-engine',
        title: 'Markdown Blog Engine',
        year: '2025',
        match: '90% Match',
        rating: 'Writer’s Pick',
        image: 'images/proj-code.jpg',
        tech: ['JavaScript', 'Markdown', 'CSS3'],
        description:
          'Zero-dependency static blog with syntax highlighting and dark mode.',
        longDescription:
          'Write posts in Markdown, ship static HTML — with RSS, tags and an editorial dark theme.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Personal Projects',
      },
      {
        id: 'quiz-app',
        title: 'Rapid Quiz App',
        year: '2024',
        match: '88% Match',
        rating: 'Fun',
        image: 'images/proj-portfolio.jpg',
        tech: ['React.js', 'JavaScript'],
        description:
          'Timed quiz game with streaks, local high-scores and shareable results.',
        longDescription:
          'A playful single-player quiz with animated transitions, difficulty tiers and offline persistence.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Personal Projects',
      },
      {
        id: 'expense-tracker',
        title: 'Expense Tracker',
        year: '2024',
        match: '91% Match',
        rating: 'Practical',
        image: 'images/proj-dashboard.jpg',
        tech: ['Python', 'SQL', 'HTML', 'CSS'],
        description:
          'Track spending by category with monthly summaries and simple charts.',
        longDescription:
          'Personal finance tool with CRUD entries, category budgets and MySQL-backed history.',
        demo: '#projects',
        github: 'https://github.com/arunkumar-dev',
        category: 'Personal Projects',
      },
    ],
  },
]

/* ---------------- ABOUT ---------------- */

export const stats = [
  { value: 15, suffix: '+', label: 'Projects Built' },
  { value: 5, suffix: '+', label: 'Core Technologies' },
  { value: 100, suffix: '%', label: 'Commitment' },
  { value: 24, suffix: '/7', label: 'Learning Mode', raw: true },
]

export const about = {
  headline: 'Developer. Designer. Lifelong learner.',
  paragraphs: [
    'I am an Information Technology graduate from Tamil Nadu who fell in love with the moment code turns into something people can actually use. My sweet spot is the full stack — React interfaces up front, Python and Node services behind, SQL keeping everything honest.',
    'During my cyber security internship at Thiranex I learned to think like an attacker and build like a defender — a mindset I bring to every project through clean architecture, validation and careful edge cases.',
    'My goal: join a professional development team as an entry-level Software Developer, keep compounding my skills, and ship products with real impact.',
  ],
  education: {
    degree: 'B.E. — Information Technology',
    school: 'Annamalai University, Faculty of Engineering',
    place: 'Chidambaram, Tamil Nadu, India',
  },
  expertise: [
    'Responsive, accessible frontend engineering',
    'REST API design & third-party integrations',
    'Relational database modelling (SQL / MySQL)',
    'AI agents & workflow automation',
    'Git-based collaborative delivery',
  ],
  softSkills: [
    'Problem Solving',
    'Quick Learning',
    'Team Collaboration',
    'Communication',
    'Adaptability',
    'Time Management',
  ],
  languages: ['Tamil', 'English'],
}

/* ---------------- EXPERIENCE / EDUCATION ---------------- */

export const timeline = [
  {
    id: 'edu-1',
    type: 'education',
    date: 'Graduated',
    title: 'B.E. Information Technology',
    org: 'Annamalai University — Chidambaram, TN',
    points: [
      'Core coursework: DBMS, data structures, web technologies, software engineering.',
      'Built academic projects in Python, SQL and React.js.',
    ],
  },
  {
    id: 'intern-1',
    type: 'experience',
    date: 'Internship',
    title: 'Cyber Security Intern',
    org: 'Thiranex Internship Platform',
    points: [
      'Studied network security and web application security fundamentals.',
      'Completed hands-on labs: OWASP Top 10, secure coding and traffic analysis.',
      'Delivered a lightweight web security scanner as the capstone deliverable.',
    ],
  },
  {
    id: 'proj-1',
    type: 'experience',
    date: '2025 — 2026',
    title: 'Freelance Full-Stack Developer',
    org: 'Independent — Tamil Nadu, India',
    points: [
      'Designed and shipped responsive business websites for local clients.',
      'Owned delivery end-to-end: requirements, UI, deployment and iteration.',
      'Automated repetitive tasks with Python scripts and API integrations.',
    ],
  },
  {
    id: 'next',
    type: 'goal',
    date: 'Next',
    title: 'Software Developer Role',
    org: 'Product-minded engineering teams',
    points: [
      'Grow into a full-stack role owning features from design to production.',
      'Deepen expertise in scalable systems, AI tooling and cloud services.',
    ],
  },
]

/* ---------------- CONTACT ---------------- */

export const contact = {
  headline: 'Let’s build something unforgettable.',
  blurb:
    'Open to entry-level Software Developer and Web Developer opportunities, freelance builds and collaborations. I usually reply within 24 hours.',
  channels: [
    {
      id: 'email',
      label: 'Email',
      value: 'arunkumar17hz@gmail.com',
      href: 'mailto:arunkumar17hz@gmail.com?subject=Hello%20Arun%20—%20Let%27s%20talk',
      icon: 'mail',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/arun-kumar-855320357',
      href: profile.linkedin,
      icon: 'linkedin',
      external: true,
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'github.com/arunkumar-dev',
      href: profile.github,
      icon: 'github',
      external: true,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: '+91 9943519949',
      href: profile.whatsapp,
      icon: 'whatsapp',
      external: true,
    },
  ],
}

export const footerNote = {
  builtWith: ['React', 'Vite', 'Tailwind CSS', 'Three.js', 'GSAP', 'Framer Motion'],
  tagline: 'Design & build — Arun Kumar. All rights reserved.',
}
