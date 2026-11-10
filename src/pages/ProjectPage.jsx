import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import RiseText from "../components/RiseText";
import ProjectCard from "../components/ProjectCard";
import NotFound from "./NotFound";
import { useContent } from "../content/ContentProvider";
import { resolveImage } from "../content/assets";
import { coverTransitionName } from "../lib/transitions";

const delay = (ms) => ({ "--d": `${ms}ms` });

const ProjectPage = () => {
  const { slug } = useParams();
  const { content } = useContent();
  const { projects, site } = content;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  useEffect(() => {
    if (project) document.title = `${project.title} | ${site.name}`;
  }, [project, site.name]);

  if (!project) return <NotFound title="Project not found" />;

  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;

  return (
    <>
      <Nav />

      <main key={slug} className="case">
        <header className="wrap case-head">
          <Link to="/#work" viewTransition className="back-link load-fade" style={delay(0)}>
            <FaArrowLeft aria-hidden="true" /> All work
          </Link>
          <h1 className="case-title">
            <RiseText text={project.title} className="rise--auto" delay={120} step={18} />
          </h1>
          <p className="lead load-fade" style={delay(450)}>{project.description}</p>
          <p className="case-meta load-fade" style={delay(520)}>
            {[project.type, project.category, project.year].filter(Boolean).join(", ")}
          </p>
        </header>

        <div className="wrap">
          <div className="case-cover">
            <img
              src={resolveImage(project.cover)}
              alt={`${project.title} cover`}
              style={{ viewTransitionName: coverTransitionName(project.slug) }}
            />
          </div>
        </div>

        <div className="wrap case-gallery">
          {(project.gallery ?? []).map((shot, i) => (
            <Reveal key={`${shot.src}-${i}`} variant="wipe" className="case-shot">
              <div className="project-media">
                <img src={resolveImage(shot.src)} alt={shot.alt || `${project.title} image ${i + 1}`} loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>

        {next && (
          <section className="wrap case-next">
            <h2 className="case-next-title">Next project</h2>
            <ProjectCard project={next} featured cta="View next project" />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProjectPage;
