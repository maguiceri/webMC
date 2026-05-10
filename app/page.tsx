"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Reveal from "./components/Reveal";
import VideoBackground from "./components/VideoBackground";

/* ---------- Placeholder data – replace with your own ---------- */

const PROFILE = {
  name: "Magali Cerisola",
  role: "Frontend Developer",
  tagline: `Hi! 👋 I’m Frontend Developer with more than 4 years of experience building responsive and scalable web applications. Passionate about technology, problem-solving, and creating modern user experiencesw. Currently studying Artificial Intelligence Engineering, with a strong interest in automation, innovation, and continuous learning.

I enjoy taking on new challenges, solving problems and turning ideas into high-quality digital products.`,
  location: "Buenos Aires, Argentina",
  email: "magui.cerisola@gmail.com",
  available: true,
  cvUrl: "/cv.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/magali-cerisola-1a5111167/",
    github: "https://github.com/maguiceri",
  },
};

const SKILLS: { title: string; icon: keyof typeof CategoryIcons; items: string[] }[] = [
  {
    title: "Frontend",
    icon: "code",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Sass",
      "Redux",
      "MongoDB",
      "PostgreSQL",
      "Dumbo",
    ],
  },
  {
    title: "UI / UX",
    icon: "design",
    items: [
      "Figma",
      "Responsive Design",
      "Accessibility (WCAG)",
      "Design Systems",
      "Pixel-Perfect UI",
    ],
  },
  {
    title: "Tooling",
    icon: "tools",
    items: ["Git", "GitHub", "Jest", "Jira", "Confluence"],
  },
  {
    title: "Other",
    icon: "globe",
    items: ["English (B2)", "Spanish (Native)"],
  },
];

const WORK: {
  role: string;
  company: string;
  period?: string;
  location?: string;
  current?: boolean;
  bullets: string[];
  tech?: string[];
}[] = [
  {
    role: "Frontend Developer",
    company: "Banco Santander",
    period: "2020 — 2026",
    location: "Buenos Aires, AR",
    bullets: [
      "Worked as a Frontend Developer, participating in both projects built from scratch and refactoring / modernization processes for internal and customer-facing applications.",
      "Responsible for the development and maintenance of web interfaces, implementing new features, visual improvements, performance optimizations, accessibility enhancements and reusable component maintenance.",
      "Contributed to improving both user experience and product quality across multiple banking products.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Freelance Projects",
    location: "Buenos Aires, AR",
    bullets: [
      "Translated Figma designs into pixel-perfect, responsive interfaces for several clients.",
      "Delivered modern landing pages with a focus on accessibility and performance.",
      "Coordinated with designers to iterate on UI details and micro-interactions.",
    ],
  },
];

const EDUCATION: {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}[] = [
  {
    degree: "Ingeniería en Inteligencia Artificial",
    institution: "Universidad de Palermo (UP)",
    period: "2025 — Present",
    description: `I am currently studying Artificial Intelligence Engineering, where I am expanding my knowledge in programming, algorithms, software development, data analysis and intelligent systems.

My studies are helping me strengthen problem-solving, analytical thinking and technology skills focused on innovation and automation.`,
  },
  {
    degree: "Full-Stack Web Development Bootcamp",
    institution: "CourseIT",
    period: "2020",
    description: `Completed a Full Stack Developer Bootcamp at CourseIT, where I gained practical experience in frontend and backend development, working with technologies such as HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, Git and REST APIs.

The program focused on building responsive and scalable web applications, problem-solving, database management and modern development best practices.`,
  },
  {
    degree: "Technical Degree in Computer Programming",
    institution: "Universidad Nacional de San Martín (UNSAM)",
    period: "2016 — 2019",
    description: `Developed knowledge in programming logic, algorithms, databases, software development, object-oriented programming and computer science fundamentals.

The program provided both theoretical and practical training focused on problem-solving and software development.`,
  },
];

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "education", label: "Studies" },
  { id: "contact", label: "Contact" },
];

/* ---------- Inline icons ---------- */

const CategoryIcons = {
  code: (
    <path d="M8 8 4 12l4 4M16 8l4 4-4 4M14 4l-4 16" />
  ),
  design: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
    </>
  ),
  tools: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 1 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.6 2.6L13 9.4l1.7-3.1Z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
};

function Icon({
  children,
  className = "h-5 w-5",
  strokeWidth = 1.75,
}: {
  children: React.ReactNode;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/* ---------- Page ---------- */

export default function Home() {
  const [showHeader, setShowHeader] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current) {
        setShowHeader(true);
      } else if (currentScrollY > 80) {
        setShowHeader(false);
      }

      if (currentScrollY === 0) setShowHeader(true);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile drawer: lock body scroll + close on ESC
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [mobileOpen]);

  return (
    <div
      id="main-content"
      tabIndex={-1}
      className="relative min-h-screen overflow-x-hidden text-slate-100 outline-none"
    >
      <VideoBackground />

      {/* ============ Sticky nav ============ */}
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto mt-3 flex max-w-5xl items-center justify-between rounded-2xl border border-sky-400/15 bg-slate-950/60 px-5 py-3 backdrop-blur-md shadow-[0_10px_40px_-20px_rgba(56,189,248,0.45)]">
          <a
            href="#about"
            className="font-mono text-sm tracking-[0.25em] text-sky-300 transition hover:text-sky-200"
          >
            Magali Cerisola
          </a>

          {/* Desktop nav (md+) */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-x-5 text-sm text-slate-200/85">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="rounded px-1.5 py-1 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile hamburger (< md) */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/25 bg-slate-950/50 text-sky-200 transition hover:border-sky-300/60 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 md:hidden"
          >
            <Icon className="h-5 w-5" strokeWidth={2}>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </Icon>
          </button>
        </div>
      </header>

      {/* ============ Mobile drawer ============ */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close navigation menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 cursor-default bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Side panel */}
        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className={`absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col border-l border-sky-400/15 bg-slate-950/95 p-6 shadow-[0_30px_80px_-20px_rgba(56,189,248,0.35)] backdrop-blur-md transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-sky-300/80">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/20 bg-slate-950/60 text-sky-200 transition hover:border-sky-300/60 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
            >
              <Icon className="h-4 w-4" strokeWidth={2}>
                <path d="M6 6 18 18M18 6 6 18" />
              </Icon>
            </button>
          </div>

          <nav className="mt-8">
            <ul className="space-y-1">
              {NAV.map((item, i) => (
                <li
                  key={item.id}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 50 + 80}ms` : "0ms",
                  }}
                  className={`transform transition-all duration-300 ${
                    mobileOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  }`}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base text-slate-100 transition hover:bg-sky-500/10 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-sky-300/60">
                        0{i + 1}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <Icon className="h-4 w-4 text-sky-300/70" strokeWidth={2}>
                      <path d="M9 6l6 6-6 6" />
                    </Icon>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto border-t border-white/5 pt-6">
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_15px_40px_-15px_rgba(56,189,248,0.7)]"
            >
              <Icon className="h-4 w-4" strokeWidth={2}>
                <path d="M4 4h16v16H4z" />
                <path d="m4 6 8 7 8-7" />
              </Icon>
              Get in touch
            </a>
            <div className="mt-3 flex justify-center gap-2">
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-400/25 bg-slate-950/40 text-sky-200 transition hover:border-sky-300/60 hover:text-sky-100"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.14.92-2.06 2.06-2.06s2.06.92 2.06 2.06c0 1.14-.92 2.07-2.06 2.07zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-400/25 bg-slate-950/40 text-sky-200 transition hover:border-sky-300/60 hover:text-sky-100"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                  <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.76.4-1.27.74-1.56-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.6.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
                </svg>
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* ============ Hero / About ============ */}
      <section
        id="about"
        className="relative mx-auto flex min-h-screen max-w-5xl scroll-mt-28 flex-col-reverse items-center justify-center gap-6 px-6 py-20 md:flex-row md:items-center md:gap-12 md:py-24"
      >
        {/* Intro copy (left on desktop) */}
        <div className="flex-1 text-center md:text-left">
          <p
            style={{ animationDelay: "0.25s" }}
            className="fadeDown font-mono text-xs uppercase tracking-[0.35em] text-sky-300/80"
          >
            Curriculum Vitae
          </p>

          <h1
            style={{ animationDelay: "0.4s" }}
            className="fadeDown gradientText mt-2 text-balance text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
          >
            {PROFILE.name}
          </h1>
          <h2
            style={{ animationDelay: "0.55s" }}
            className="fadeDown mt-2 text-base font-medium text-sky-100/90 sm:text-lg"
          >
            {PROFILE.role}{" "}
            <span className="text-slate-300/70">·</span>{" "}
            <span className="text-slate-200/70">{PROFILE.location}</span>
          </h2>
          <p
            style={{ animationDelay: "0.7s" }}
            className="fadeDown mx-auto mt-4 max-w-xl text-balance text-sm leading-relaxed text-slate-200/80 sm:text-base md:mx-0"
          >
            {PROFILE.tagline.split(/\n\s*\n/)[0]}
          </p>

          {/* CTAs */}
          <div
            style={{ animationDelay: "0.85s" }}
            className="fadeDown mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in new tab)"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/25 bg-slate-950/50 text-sky-200 backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-300/60 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.14.92-2.06 2.06-2.06s2.06.92 2.06 2.06c0 1.14-.92 2.07-2.06 2.07zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in new tab)"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/25 bg-slate-950/50 text-sky-200 backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-300/60 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.76.4-1.27.74-1.56-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.6.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Planet-style avatar (right on desktop) */}
        <div
          style={{ animationDelay: "0.15s" }}
          className="fadeDown relative shrink-0"
        >
          <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-blue-500/45 via-indigo-500/25 to-blue-800/40 blur-3xl" />

          <div
            className="absolute -inset-8 rounded-full border border-blue-300/20"
            style={{ animation: "orbit 38s linear infinite reverse" }}
          >
            <span
              aria-hidden
              className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-200/90 shadow-[0_0_10px_rgba(147,197,253,0.85)]"
            />
          </div>

          <div
            className="absolute -inset-4 rounded-full border border-sky-300/30"
            style={{ animation: "orbit 22s linear infinite" }}
          >
            <span
              aria-hidden
              className="absolute left-1/2 -top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-sky-200 shadow-[0_0_14px_rgba(186,230,253,0.95)]"
            />
            <span
              aria-hidden
              className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-300/80 shadow-[0_0_8px_rgba(147,197,253,0.7)]"
            />
          </div>

          <div className="relative h-32 w-32 overflow-hidden rounded-full border border-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_25px_70px_-20px_rgba(59,130,246,0.65)] sm:h-48 sm:w-48 md:h-56 md:w-56">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 rounded-full"
              style={{
                boxShadow:
                  "inset 0 0 40px rgba(186,230,253,0.18), inset 12px -12px 60px rgba(2,6,23,0.55)",
              }}
            />
            <Image
              src="/profile.jpeg"
              alt={`Portrait of ${PROFILE.name}`}
              width={240}
              height={240}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ============ Skills ============ */}
      <section
        id="skills"
        className="relative mx-auto max-w-5xl scroll-mt-28 px-6 py-20"
      >
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.35em] text-sky-300/80">
          02 / Toolbox
        </Reveal>
        <Reveal
          as="h2"
          delayMs={120}
          className="mt-3 text-3xl font-bold text-slate-50 sm:text-4xl"
        >
          Skills &amp; tools
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {SKILLS.map((group, gi) => (
            <Reveal
              key={group.title}
              delayMs={gi * 120}
              direction={gi % 2 === 0 ? "left" : "right"}
              className="group relative overflow-hidden rounded-2xl border border-sky-400/15 bg-slate-950/50 p-6 backdrop-blur-md transition hover:border-sky-300/40 hover:shadow-[0_30px_80px_-40px_rgba(56,189,248,0.55)]"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-500/10 text-sky-200">
                  <Icon className="h-4 w-4">{CategoryIcons[group.icon]}</Icon>
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
                  {group.title}
                </h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item, idx) => (
                  <li
                    key={item}
                    className="float inline-flex items-center rounded-full border border-sky-400/25 bg-sky-500/10 px-3 py-1 text-xs text-sky-100 transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-500/20 hover:shadow-[0_0_18px_rgba(56,189,248,0.35)]"
                    style={{ animationDelay: `${(idx % 5) * -0.7}s` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Work Experience ============ */}
      <section
        id="work"
        className="relative mx-auto max-w-5xl scroll-mt-28 px-6 py-20"
      >
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.35em] text-sky-300/80">
          04 / Career
        </Reveal>
        <Reveal
          as="h2"
          delayMs={120}
          className="mt-3 text-3xl font-bold text-slate-50 sm:text-4xl"
        >
          Work experience
        </Reveal>

        <ol className="relative mt-12 space-y-10 pl-8 md:pl-12">
          <span
            aria-hidden
            className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-sky-300/70 via-blue-400/40 to-transparent md:left-4"
          />

          {WORK.map((entry, i) => (
            <li key={`${entry.company}-${i}`} className="relative">
              <span
                aria-hidden
                className="pulseGlow absolute left-2 top-2 h-3 w-3 rounded-full bg-sky-400 ring-4 ring-sky-400/20 md:left-3"
              />
              <Reveal delayMs={i * 120} direction="right">
                <article className="group relative overflow-hidden rounded-2xl border border-sky-400/15 bg-slate-950/55 p-6 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-sky-300/40 hover:shadow-[0_30px_80px_-40px_rgba(56,189,248,0.55)]">
                  <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="flex flex-wrap items-center gap-2 text-lg font-semibold text-slate-50">
                      {entry.role}
                      {entry.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Current
                        </span>
                      )}
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-wider text-sky-300/90">
                      {entry.period}
                    </span>
                  </header>
                  <p className="mt-1 text-sm text-sky-200/85">
                    {entry.company}
                    {entry.location && (
                      <>
                        <span className="mx-2 text-sky-400/40">•</span>
                        <span className="text-slate-300/80">{entry.location}</span>
                      </>
                    )}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-200/80">
                    {entry.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/80"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {entry.tech && entry.tech.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {entry.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-sky-400/15 bg-sky-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-sky-200/85"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ Education ============ */}
      <section
        id="education"
        className="relative mx-auto max-w-5xl scroll-mt-28 px-6 py-20"
      >
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.35em] text-sky-300/80">
          05 / Studies
        </Reveal>
        <Reveal
          as="h2"
          delayMs={120}
          className="mt-3 text-3xl font-bold text-slate-50 sm:text-4xl"
        >
          Education
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {EDUCATION.map((entry, i) => (
            <Reveal
              key={entry.degree}
              delayMs={i * 140}
              direction="up"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-blue-400/15 bg-slate-950/55 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-blue-300/40 hover:shadow-[0_30px_80px_-35px_rgba(59,130,246,0.55)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-blue-400/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
              />

              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/25 bg-blue-500/10 text-blue-200">
                  <Icon className="h-4 w-4">
                    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                    <path d="M6 12v5c2 2 10 2 12 0v-5" />
                  </Icon>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-300/80">
                  {entry.period}
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-50">
                {entry.degree}
              </h3>
              <p className="mt-1 text-sm text-blue-200/85">{entry.institution}</p>
              {entry.description && (
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-200/75">
                  {entry.description}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Contact ============ */}
      <section
        id="contact"
        className="relative mx-auto max-w-5xl scroll-mt-28 px-6 py-24"
      >
        <Reveal
          className="relative overflow-hidden rounded-3xl border border-sky-400/15 bg-slate-950/60 p-10 backdrop-blur-md md:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
            <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl" />
          </div>

          <div className="relative text-center">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-sky-300/80">
              06 / Contact
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(
                  "Hi Magali — let's work together"
                )}&body=${encodeURIComponent(
                  `Hi Magali,\n\nI came across your portfolio and would love to chat about a project.\n\n— `
                )}`}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_15px_40px_-15px_rgba(56,189,248,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(56,189,248,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Icon className="h-4 w-4" strokeWidth={2}>
                  <path d="M4 4h16v16H4z" />
                  <path d="m4 6 8 7 8-7" />
                </Icon>
                {PROFILE.email}
              </a>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/25 bg-slate-950/40 text-sky-200 backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-300/60 hover:text-sky-100"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.14.92-2.06 2.06-2.06s2.06.92 2.06 2.06c0 1.14-.92 2.07-2.06 2.07zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in new tab)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/25 bg-slate-950/40 text-sky-200 backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-300/60 hover:text-sky-100"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.76.4-1.27.74-1.56-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.6.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ Footer ============ */}
      <footer className="relative mx-auto max-w-5xl px-6 pb-12 pt-2">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 text-xs text-slate-300/55 md:flex-row">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Designed &amp; built with <span className="text-sky-300">Next.js</span>{" "}
            &amp; <span className="text-sky-300">Tailwind</span>
          </p>
          <a
            href="#about"
            className="rounded-full border border-sky-400/20 bg-slate-950/40 px-3 py-1.5 text-[11px] text-sky-200 transition hover:-translate-y-0.5 hover:border-sky-300/50 hover:text-sky-100"
          >
            ↑ Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
