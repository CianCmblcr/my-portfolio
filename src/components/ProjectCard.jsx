import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Reveal from "./Reveal";
import { resolveImage } from "../content/assets";
import { coverTransitionName } from "../lib/transitions";

const ProjectCard = ({ project, featured = false, cta = "View case study" }) => (
  <Reveal variant="wipe" className={`project-card ${featured ? "project-card--featured" : ""}`}>
    <Link to={`/projects/${project.slug}`} viewTransition className="project-link">
      <div className="project-media">
        <img
          src={resolveImage(project.cover)}
          alt=""
          decoding="async"
          style={{ viewTransitionName: coverTransitionName(project.slug) }}
        />
      </div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <p className="project-meta">{[project.type, project.year].filter(Boolean).join(", ")}</p>
        <span className="project-cta">
          {cta} <FaArrowRight aria-hidden="true" />
        </span>
      </div>
    </Link>
  </Reveal>
);

export default ProjectCard;
