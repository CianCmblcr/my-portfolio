import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const STACK_GROUPS = [
  {
    label: "Frontend",
    items: ["Next.js", "React.js", "React Native", "Styled Components", "Tailwind CSS"],
  },
  {
    label: "Languages",
    items: ["JavaScript", "PHP", "Python", "TypeScript"],
  },
  {
    label: "Backend",
    items: ["Express", "Node.js"],
  },
  {
    label: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL"],
  },
  {
    label: "Tooling",
    items: ["Vite"],
  },
];

const TechStack = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="tech-stack">
      <button
        type="button"
        className="tech-stack-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Tech stack
        <FaChevronDown className={`tech-stack-chevron ${open ? "is-open" : ""}`} aria-hidden="true" />
      </button>

      <div className={`tech-stack-panel ${open ? "is-open" : ""}`}>
        <div className="tech-stack-groups">
          {STACK_GROUPS.map((group) => (
            <div key={group.label} className="tech-stack-group">
              <p className="tech-stack-group-label">{group.label}</p>
              <div className="tech-stack-pills">
                {group.items.map((tech) => (
                  <span key={tech} className="tech-stack-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
