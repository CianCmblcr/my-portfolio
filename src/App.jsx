import AnimatedSection from "./components/AnimatedSection";
import SideNav from "./components/SideNav";
import ProjectCardStack from "./components/ProjectCardStack";
import TechStack from "./components/TechStack";
import ProfilePhoto from "./assets/profile pic me.jpg";
import SpotifyProject from "./assets/spotify-cover.png";
import GlowNestProject from "./assets/glownest-cover.png";
import LifeLaneProject from "./assets/lifelane-cover.png";
import Button from "./components/ui/Button";
import Badge from "./components/ui/Badge";
import { FaBehance, FaFigma, FaLinkedinIn, FaReact, FaXTwitter } from "react-icons/fa6";

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

function  App () {
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
    <p className="eyebrow mb-6 fade-in-up-animation">Independent designer & developer</p>
    <div className="figma-frame max-w-4xl fade-in-up-animation">
      <span className="figma-handle figma-handle--tl" aria-hidden="true" />
      <span className="figma-handle figma-handle--tr" aria-hidden="true" />
      <span className="figma-handle figma-handle--bl" aria-hidden="true" />
      <span className="figma-handle figma-handle--br" aria-hidden="true" />
      <h1 className="text-6xl font-black leading-[0.95] tracking-[-0.04em] md:text-8xl lg:text-[9.5rem]">Cian Combalicer</h1>
    </div>
    <h2 className="mx-auto mt-8 max-w-2xl text-xl font-light leading-relaxed text-[var(--color-text-secondary)] md:text-3xl fade-in-up-animation">Crafting digital products with clarity, character, and a human point of view.</h2>
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)] fade-in-up-animation">
      <Badge>Figma</Badge><Badge>React</Badge><Badge>Visual design</Badge>
    </div>
    <div className="mt-10 fade-in-up-animation">
      <a href="#projects"><Button>Explore selected work <span aria-hidden="true">-&gt;</span></Button></a>
    </div>
  </div>
</section>

      {/* About Section */}
      <section id="about" className="relative flex min-h-screen items-center justify-center px-6 py-32">
  <AnimatedSection animationClass="fade-in-up-animation">
    <div className="premium-card mx-auto grid max-w-5xl gap-10 rounded-lg p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12 md:p-12">
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
        <a href="https://linkedin.com/in/ciancmblcr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon"><FaLinkedinIn aria-hidden="true" /></a>
        <a href="https://twitter.com/cian_cmblcr" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="social-icon"><FaXTwitter aria-hidden="true" /></a>
        <a href="https://behance.net/cianjacob" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="social-icon"><FaBehance aria-hidden="true" /></a>
      </div>
      <div className="text-center md:col-start-2 md:text-left">
        <TechStack />
      </div>
    </div>
  </AnimatedSection>
</section>

      {/* Projects Section */}
<section id="projects" className="relative px-6 py-32">
  <div className="container mx-auto px-4">
    <div className="mb-12 flex items-end justify-between gap-6">
      <div><p className="eyebrow mb-3">Selected work</p><h2 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">Projects</h2></div>
      <p className="hidden max-w-xs text-right text-sm leading-relaxed text-[var(--color-text-muted)] md:block">A small collection of interfaces shaped around real people and real problems.</p>
    </div>
    
    <div className="fade-in-up-animation">
      <ProjectCardStack projects={projects} />
    </div>
  </div>
</section>

     {/* Contact Section */}
<section
  id="contact"
  className="h-screen flex flex-col items-center justify-center py-40"
>
  <h1 className="text-4xl font-bold text-[var(--color-text-primary)] custom-satoshi mb-10">
    Let’s Connect
  </h1>

  {/* Social Links */}
  <div className="flex space-x-10 text-[var(--color-text-primary)] text-6xl">
    <a
      href="https://linkedin.com/in/ciancmblcr"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-400 transition"
    >
      <i className="fa-brands fa-linkedin"></i>
    </a>

    <a
      href="https://twitter.com/cian_cmblcr"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-black transition"
    >
      <i className="fa-brands fa-x-twitter"></i>
    </a>

    <a
      href="https://behance.net/cianjacob"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-300 transition"
    >
      <i className="fa-brands fa-behance"></i>
    </a>

    <a
      href="mailto:jacob.cian443@gmail.com"
      className="hover:text-red-400 transition"
    >
      <i className="fa-solid fa-envelope"></i>
    </a>
  </div>

  <p className="text-[var(--color-text-muted)] mt-10 custom-satoshi text-center px-6">
    Open for freelance work, collaborations, or just say hello.
  </p>
</section>


      <footer className="bg-[var(--color-footer-bg)] text-[var(--color-text-primary)] py-8 text-center custom-satoshi border-t border-[var(--color-border)]">
        <div className="container mx-auto">
          <p>&copy; 2025 Cian Combalicer. All rights reserved.</p>
          <p className="mt-2">Design by Cian Combalicer</p>
        </div>
      </footer>
    </div>
  );
}

export default App;