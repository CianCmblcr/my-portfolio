import AnimatedSection from "./components/AnimatedSection";
import SideNav from "./components/SideNav";
import ProjectCarousel from "./components/ProjectCarousel";
import TechStack from "./components/TechStack";
import SplitWords from "./components/SplitWords";
import Marquee from "./components/Marquee";
import CopyEmail from "./components/CopyEmail";
import ProfilePhoto from "./assets/profile pic me.jpg";
import SpotifyProject from "./assets/spotify-cover.png";
import GlowNestProject from "./assets/glownest-cover.png";
import LifeLaneProject from "./assets/lifelane-cover.png";
import Button from "./components/ui/Button";
import Badge from "./components/ui/Badge";
import {
  FaArrowUp,
  FaBehance,
  FaCode,
  FaEnvelope,
  FaFigma,
  FaLinkedinIn,
  FaPenRuler,
  FaReact,
  FaWandMagicSparkles,
  FaXTwitter,
} from "react-icons/fa6";

const EMAIL = "jacob.cian443@gmail.com";

const projects = [
  {
    id: "spotify",
    index: "01",
    type: "UI / Product",
    year: "2024",
    category: "Desktop experience",
    title: "Spotify Desktop Reimagined",
    description: "A modern redesign focused on clarity, spacing, and usability.",
    image: SpotifyProject,
    link: "/projects/spotify",
  },
  {
    id: "glownest",
    index: "02",
    type: "Web / Brand",
    year: "2024",
    category: "Interior design",
    title: "GlowNest Interior Website",
    description: "A warm, minimalist website shaped by strong branding and visuals.",
    image: GlowNestProject,
    link: "/projects/glownest",
  },
  {
    id: "lifelane",
    index: "03",
    type: "Mobile / UX",
    year: "2024",
    category: "Emergency care",
    title: "LifeLane",
    description: "An ambulance booking app designed to streamline emergency care.",
    image: LifeLaneProject,
    link: "/projects/lifelane",
  },
];

const MARQUEE_ITEMS = [
  "UI Design",
  "Figma",
  "React",
  "Prototyping",
  "Tailwind CSS",
  "Next.js",
  "Visual Design",
  "TypeScript",
  "Node.js",
  "Design Systems",
];

const SERVICES = [
  {
    icon: FaPenRuler,
    title: "UI & Product Design",
    description: "Interfaces for web, desktop and mobile, from flows and wireframes to polished, high-fidelity screens.",
    tags: ["Figma", "Wireframes", "Prototypes"],
  },
  {
    icon: FaCode,
    title: "Front-end Development",
    description: "Turning designs into fast, responsive, accessible interfaces with clean, maintainable code.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    icon: FaWandMagicSparkles,
    title: "Brand & Visual Design",
    description: "Visual direction that gives a product its character: type, color, imagery and the details in between.",
    tags: ["Identity", "Layout", "Motion"],
  },
];

const PROCESS = [
  { title: "Understand", description: "Learn the people, the problem and the constraints before drawing anything." },
  { title: "Explore", description: "Sketch, wireframe and prototype directions quickly to find what works." },
  { title: "Build", description: "Refine the chosen design and build it with care, pixel to production." },
  { title: "Refine", description: "Test, gather feedback and polish until it feels right to use." },
];

const SOCIALS = [
  { href: "https://linkedin.com/in/ciancmblcr", label: "LinkedIn", icon: FaLinkedinIn },
  { href: "https://twitter.com/cian_cmblcr", label: "X / Twitter", icon: FaXTwitter },
  { href: "https://behance.net/cianjacob", label: "Behance", icon: FaBehance },
];

const delay = (ms) => ({ "--delay": `${ms}ms` });

function App() {
  return (
    <div className="premium-shell relative min-h-screen overflow-hidden text-[var(--color-text-primary)] flex flex-col">
      <div className="premium-grid pointer-events-none absolute inset-0" />

      <SideNav />

      {/* Home Section */}
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32"
      >
        <div className="w-full max-w-5xl text-center">
          <div className="mb-8 fade-in-up-animation" style={delay(0)}>
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              Available for freelance work
            </span>
          </div>
          <p className="eyebrow mb-6 fade-in-up-animation" style={delay(80)}>Independent designer & developer</p>
          <div className="figma-frame max-w-4xl">
            <span className="figma-handle figma-handle--tl" aria-hidden="true" />
            <span className="figma-handle figma-handle--tr" aria-hidden="true" />
            <span className="figma-handle figma-handle--bl" aria-hidden="true" />
            <span className="figma-handle figma-handle--br" aria-hidden="true" />
            <h1
              className="text-6xl font-black leading-[0.95] tracking-[-0.04em] md:text-8xl lg:text-[9.5rem]"
              aria-label="Cian Combalicer"
            >
              <SplitWords text="Cian Combalicer" baseDelay={150} />
            </h1>
          </div>
          <h2 className="mx-auto mt-8 max-w-2xl text-xl font-light leading-relaxed text-[var(--color-text-secondary)] md:text-3xl fade-in-up-animation" style={delay(450)}>
            Crafting digital products with clarity, character, and a human point of view.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)] fade-in-up-animation" style={delay(550)}>
            <Badge>Figma</Badge><Badge>React</Badge><Badge>Visual design</Badge>
          </div>
          <div className="mt-10 fade-in-up-animation" style={delay(650)}>
            <a href="#projects"><Button>Explore selected work <span aria-hidden="true">-&gt;</span></Button></a>
          </div>
        </div>

        <div className="scroll-cue fade-in-up-animation" style={delay(1200)} aria-hidden="true">
          Scroll
          <span className="scroll-cue-line" />
        </div>
      </section>

      <Marquee items={MARQUEE_ITEMS} />

      {/* About Section */}
      <section id="about" className="relative flex min-h-screen items-center justify-center px-6 py-32">
        <AnimatedSection>
          <div className="premium-card mx-auto grid max-w-5xl gap-10 rounded-lg p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12 md:p-12" data-spotlight>
            <div className="flex flex-col items-center gap-4">
              <div className="h-32 w-32 overflow-hidden rounded-full border border-[var(--color-accent-strong)]/50 shadow-[inset_0_0_0_8px_rgba(255,255,255,0.02)]">
                <img src={ProfilePhoto} alt="Cian Combalicer" className="h-full w-full object-cover grayscale" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="eyebrow mb-4">About Cian</p>
              <h1 className="mb-5 text-3xl font-bold tracking-tight md:text-4xl">A deliberate approach to digital work.</h1>
              <p className="max-w-2xl text-base font-light leading-relaxed text-[var(--color-text-secondary)]">
                I focus on UI design and front-end development, creating clear and considered digital experiences from visual concept to polished implementation. Based in Metro Manila, Philippines, I combine thoughtful interaction design with dependable, user-focused code.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)] md:justify-start">
                <span className="inline-flex items-center gap-2"><FaFigma className="text-[var(--color-accent)]" aria-hidden="true" /> UI design</span>
                <span className="inline-flex items-center gap-2"><FaReact className="text-[var(--color-accent)]" aria-hidden="true" /> Front-end development</span>
              </div>
            </div>
            <div className="flex justify-center gap-3 md:flex-col">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="social-icon"><Icon aria-hidden="true" /></a>
                );
              })}
            </div>
            <div className="text-center md:col-start-2 md:text-left">
              <TechStack />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Services Section */}
      <section id="services" className="relative px-6 py-32">
        <div className="container mx-auto max-w-6xl px-4">
          <AnimatedSection className="section-head">
            <div>
              <p className="eyebrow mb-3">What I do</p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">From first sketch to shipped code.</h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-relaxed text-[var(--color-text-muted)] md:block">
              Design and development under one roof, so nothing gets lost in the handoff.
            </p>
          </AnimatedSection>

          <AnimatedSection group className="grid gap-5 md:grid-cols-3">
            {SERVICES.map(({ icon, title, description, tags }, i) => {
              const Icon = icon;
              return (
              <div key={title} className="stagger-item" style={{ "--i": i }}>
                <article className="premium-card service-card" data-spotlight>
                  <div className="mb-10 flex items-center justify-between">
                    <span className="service-icon"><Icon aria-hidden="true" /></span>
                    <span className="service-index">0{i + 1}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold tracking-tight">{title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{description}</p>
                  <div className="service-tags">
                    {tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </article>
              </div>
              );
            })}
          </AnimatedSection>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative px-6 pb-32">
        <div className="container mx-auto max-w-6xl px-4">
          <AnimatedSection className="mb-14">
            <p className="eyebrow mb-3">How I work</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">A simple, honest process.</h2>
          </AnimatedSection>

          <AnimatedSection group className="process grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <span className="process-line hidden lg:block" aria-hidden="true" />
            {PROCESS.map((step, i) => (
              <div key={step.title} className="stagger-item" style={{ "--i": i + 1 }}>
                <span className="process-step-num">0{i + 1}</span>
                <h3 className="mb-2 mt-6 text-lg font-bold tracking-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{step.description}</p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative overflow-hidden px-6 py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="section-head">
            <div>
              <p className="eyebrow mb-3">Selected work</p>
              <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">Projects</h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-relaxed text-[var(--color-text-muted)] md:block">
              A small collection of interfaces shaped around real people and real problems.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <ProjectCarousel projects={projects} />
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative flex min-h-screen items-center justify-center px-6 py-32">
        <AnimatedSection className="w-full max-w-5xl">
          <div className="premium-card contact-card" data-spotlight>
            <p className="eyebrow mb-5">Let's connect</p>
            <h2 className="max-w-3xl text-4xl font-black leading-[1] tracking-[-0.03em] md:text-7xl">
              Have a project in mind? Let's build it together.
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              Open for freelance work, collaborations, or just say hello.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <CopyEmail email={EMAIL} />
              <a href={`mailto:${EMAIL}`} className="social-icon !h-[3.1rem] !w-[3.1rem]" aria-label="Send an email">
                <FaEnvelope aria-hidden="true" />
              </a>
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="social-icon !h-[3.1rem] !w-[3.1rem]">
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-footer-bg)] px-6 py-8 text-[var(--color-text-primary)] custom-satoshi">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <div className="text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Cian Combalicer. All rights reserved.</p>
            <p className="mt-1 text-[var(--color-text-muted)]">Design by Cian Combalicer</p>
          </div>
          <button type="button" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top <FaArrowUp aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
