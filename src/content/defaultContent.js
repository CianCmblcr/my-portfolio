// Default site content. The live site loads saved edits from Supabase (made
// at /admin) and falls back to this when nothing has been saved yet.
//
// Image fields hold either a path inside src/assets ("spotify/spotify-cover.png")
// or a full URL to a file uploaded through the admin.
export const defaultContent = {
  site: {
    name: "Cian Combalicer",
    shortName: "Cian",
    role: "UI Designer & Front-end Developer",
    location: "Metro Manila, Philippines",
    email: "jacob.cian443@gmail.com",
  },

  hero: {
    tagline: "Crafting digital products with clarity, character, and a human point of view.",
  },

  about: {
    heading: "A deliberate approach to digital work.",
    body: "I focus on UI design and front-end development, creating clear and considered digital experiences from visual concept to polished implementation. Based in Metro Manila, Philippines, I combine thoughtful interaction design with dependable, user-focused code.",
    photo: "profile pic me.jpg",
  },

  services: {
    heading: "From first sketch to shipped code.",
    intro: "Design and development under one roof, so nothing gets lost in the handoff.",
    items: [
      {
        title: "UI & Product Design",
        description: "Interfaces for web, desktop and mobile, from flows and wireframes to polished, high-fidelity screens.",
        tags: ["Figma", "Wireframes", "Prototypes"],
      },
      {
        title: "Front-end Development",
        description: "Turning designs into fast, responsive, accessible interfaces with clean, maintainable code.",
        tags: ["React", "Next.js", "Tailwind"],
      },
      {
        title: "Brand & Visual Design",
        description: "Visual direction that gives a product its character: type, color, imagery and the details in between.",
        tags: ["Identity", "Layout", "Motion"],
      },
    ],
  },

  process: {
    heading: "A simple, honest process.",
    steps: [
      { title: "Understand", description: "Learn the people, the problem and the constraints before drawing anything." },
      { title: "Explore", description: "Sketch, wireframe and prototype directions quickly to find what works." },
      { title: "Build", description: "Refine the chosen design and build it with care, pixel to production." },
      { title: "Refine", description: "Test, gather feedback and polish until it feels right to use." },
    ],
  },

  work: {
    heading: "Projects",
    intro: "A small collection of interfaces shaped around real people and real problems.",
  },

  projects: [
    {
      slug: "spotify",
      title: "Spotify Desktop Reimagined",
      type: "UI / Product",
      year: "2024",
      category: "Desktop experience",
      description: "A modern redesign focused on clarity, spacing, and usability.",
      cover: "spotify-cover.png",
      gallery: [
        { src: "spotify/spotify-cover.png", alt: "Spotify Reimagined cover" },
        { src: "spotify/spotify-final.png", alt: "Final design" },
        { src: "spotify/spotify-full.png", alt: "Full interface" },
        { src: "spotify/spotify-overview.png", alt: "Project overview" },
        { src: "spotify/spotify-problem.png", alt: "Identifying the problem" },
        { src: "spotify/spotify-solution.png", alt: "Solutions" },
        { src: "spotify/thankyou.png", alt: "Thank you" },
      ],
    },
    {
      slug: "glownest",
      title: "GlowNest Interior Website",
      type: "Web / Brand",
      year: "2024",
      category: "Interior design",
      description: "A warm, minimalist website shaped by strong branding and visuals.",
      cover: "glownest-cover.png",
      gallery: [
        { src: "glownest/glownest-hero.png", alt: "GlowNest hero" },
        { src: "glownest/glownest-overview.png", alt: "Overview screens" },
        { src: "glownest/glownest-full.png", alt: "Full page" },
      ],
    },
    {
      slug: "lifelane",
      title: "LifeLane",
      type: "Mobile / UX",
      year: "2024",
      category: "Emergency care",
      description: "An ambulance booking app designed to streamline emergency care.",
      cover: "lifelane-cover.png",
      gallery: [
        { src: "lifelane/lifelane-1.png", alt: "LifeLane hero" },
        { src: "lifelane/lifelane-2.png", alt: "LifeLane interface" },
        { src: "lifelane/lifelane-3.png", alt: "LifeLane screens" },
      ],
    },
  ],

  contact: {
    heading: "Have a project in mind? Let's build it together.",
    body: "Open for freelance work, collaborations, or just say hello.",
  },

  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/ciancmblcr" },
    { label: "X / Twitter", href: "https://twitter.com/cian_cmblcr" },
    { label: "Behance", href: "https://behance.net/cianjacob" },
  ],

  stack: [
    { label: "Frontend", items: ["Next.js", "React.js", "React Native", "Styled Components", "Tailwind CSS"] },
    { label: "Languages", items: ["JavaScript", "PHP", "Python", "TypeScript"] },
    { label: "Backend", items: ["Express", "Node.js"] },
    { label: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL"] },
    { label: "Tooling", items: ["Vite"] },
  ],
};

const isPlainObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

// Saved content wins per section; object sections are merged one level deep so
// fields added to the defaults later still show up.
export const mergeContent = (defaults, saved) => {
  if (!isPlainObject(saved)) return defaults;
  const merged = { ...defaults };
  for (const [key, value] of Object.entries(saved)) {
    merged[key] = isPlainObject(value) && isPlainObject(defaults[key]) ? { ...defaults[key], ...value } : value;
  }
  return merged;
};
