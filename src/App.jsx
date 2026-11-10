import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowUpRightFromSquare, FaEnvelope } from "react-icons/fa6";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import RiseText from "./components/RiseText";
import CopyEmail from "./components/CopyEmail";
import SocialIcon from "./components/SocialIcon";
import ProjectSpread from "./components/ProjectSpread";
import useScrollProgress from "./hooks/useScrollProgress";
import { useContent } from "./content/ContentProvider";
import { resolveImage } from "./content/assets";

const delay = (ms) => ({ "--d": `${ms}ms` });

function App() {
  const { content } = useContent();
  const { site, hero, about, services, process, work, projects, contact, socials, stack } = content;
  const contactRef = useRef(null);
  useScrollProgress(contactRef);

  useEffect(() => {
    document.title = `${site.name} | ${site.role}`;
  }, [site.name, site.role]);

  return (
    <>
      <Nav />

      <main>
        {/* Hero: characters rise from a masked line on load */}
        <section id="home" className="hero">
          <div className="wrap hero-inner">
            <h1 className="hero-title">
              <RiseText text={site.name} className="rise--auto" delay={100} />
            </h1>
            <div className="hero-foot">
              <p className="hero-tagline load-fade" style={delay(650)}>{hero.tagline}</p>
              <div className="hero-actions load-fade" style={delay(750)}>
                <Link to="/#work" className="btn btn--dark">
                  View selected work <FaArrowRight aria-hidden="true" />
                </Link>
                <CopyEmail email={site.email} className="btn btn--glass" />
              </div>
            </div>
          </div>
        </section>

        {/* About: layered curtain swipes up to reveal */}
        <Reveal as="section" id="about" variant="curtain" threshold={0.25} className="section about">
          <div className="wrap curtain-content about-grid">
            <figure className="about-photo">
              <img src={resolveImage(about.photo)} alt={site.name} />
            </figure>

            <div>
              <h2 className="h2">{about.heading}</h2>
              <p className="lead">{about.body}</p>

              <dl className="about-details">
                <div className="about-row">
                  <dt>Based in</dt>
                  <dd>{site.location}</dd>
                </div>
                <div className="about-row">
                  <dt>Focus</dt>
                  <dd>{site.role}</dd>
                </div>
                {stack.map((group, i) => (
                  <div key={`${group.label}-${i}`} className="about-row">
                    <dt>{group.label}</dt>
                    <dd>{group.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>

              <div className="about-links">
                {socials.map((social, i) => (
                  <a
                    key={`${social.label}-${i}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-link"
                  >
                    <SocialIcon {...social} />
                    {social.label}
                    <FaArrowUpRightFromSquare className="about-link-arrow" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Services: cards fan in from a 3D tilt */}
        <section id="services" className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <h2 className="h2">{services.heading}</h2>
              <p className="section-intro">{services.intro}</p>
            </Reveal>

            <Reveal variant="tilt" className="services-grid">
              {services.items.map((service, i) => (
                <article key={`${service.title}-${i}`} className="card glass tilt-item" style={{ "--i": i }}>
                  <h3 className="h3">{service.title}</h3>
                  <p className="body-sm">{service.description}</p>
                  {service.tags.length > 0 && <p className="card-tags">{service.tags.join(", ")}</p>}
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Process: a line draws across and each step lights up as it passes */}
        <section id="process" className="section section--tight">
          <div className="wrap">
            <Reveal className="section-head">
              <h2 className="h2">{process.heading}</h2>
            </Reveal>

            <Reveal variant="draw" className="process">
              <span className="process-line" aria-hidden="true" />
              <ol className="process-steps">
                {process.steps.map((step, i) => (
                  <li key={`${step.title}-${i}`} className="process-step" style={{ "--i": i }}>
                    <span className="process-dot" aria-hidden="true" />
                    <h3 className="h3">{step.title}</h3>
                    <p className="body-sm">{step.description}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* Work: cards deal out of a deck into a fanned spread */}
        <section id="work" className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <h2 className="h2">{work.heading}</h2>
              <p className="section-intro">{work.intro}</p>
            </Reveal>

            <ProjectSpread projects={projects} />
          </div>
        </section>

        {/* Contact: zooms through to full-bleed black as you scroll in */}
        <section id="contact" ref={contactRef} className="contact" data-nav-dark>
          <div className="contact-panel">
            <Reveal className="wrap contact-inner">
              <h2 className="contact-title">{contact.heading}</h2>
              <p className="contact-body">{contact.body}</p>
              <div className="contact-actions">
                <CopyEmail email={site.email} />
                <a href={`mailto:${site.email}`} className="icon-btn icon-btn--dark" aria-label="Send an email">
                  <FaEnvelope aria-hidden="true" />
                </a>
                {socials.map((social, i) => (
                  <a
                    key={`${social.label}-${i}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="icon-btn icon-btn--dark"
                  >
                    <SocialIcon {...social} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
