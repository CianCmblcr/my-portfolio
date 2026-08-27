import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const POSITION_CLASS = ["is-front", "is-mid", "is-back"];

const ProjectCardStack = ({ projects }) => {
  const [frontIndex, setFrontIndex] = useState(0);
  const count = projects.length;

  const goNext = () => setFrontIndex((i) => (i + 1) % count);
  const goPrev = () => setFrontIndex((i) => (i - 1 + count) % count);
  const goTo = (i) => setFrontIndex(i);

  const positionOf = (i) => (i - frontIndex + count) % count;

  return (
    <div className="project-stack-wrap">
      <div className="project-stack">
        {projects.map((project, i) => {
          const position = positionOf(i);
          const isFront = position === 0;

          return (
            <article
              key={project.id}
              className={`project-card project-card--${project.id} premium-card ${POSITION_CLASS[position]}`}
              style={{ zIndex: count - position }}
              aria-hidden={!isFront}
            >
              <div className="project-card-media">
                <img src={project.image} alt={`${project.title} project`} />
                <span className="project-card-index">{project.index}</span>
                <span className="project-card-type">{project.type}</span>
              </div>
              <div className="project-card-content">
                <div className="project-card-meta">
                  <span>{project.year}</span>
                  <span>{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <Link
                  className="project-card-cta"
                  to={project.link}
                  tabIndex={isFront ? 0 : -1}
                >
                  View project <FaChevronRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="project-stack-controls">
        <button type="button" className="project-stack-arrow" onClick={goPrev} aria-label="Previous project">
          <FaChevronLeft aria-hidden="true" />
        </button>
        <div className="project-stack-pills" role="tablist" aria-label="Select project">
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={i === frontIndex}
              aria-label={project.title}
              className={`project-stack-pill ${i === frontIndex ? "is-active" : ""}`}
              onClick={() => goTo(i)}
            >
              {project.index}
            </button>
          ))}
        </div>
        <button type="button" className="project-stack-arrow" onClick={goNext} aria-label="Next project">
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCardStack;
