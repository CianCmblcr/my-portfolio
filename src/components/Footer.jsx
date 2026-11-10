import { useRef } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { useContent } from "../content/ContentProvider";
import useInView from "../hooks/useInView";
import FitText from "./FitText";
import RiseText from "./RiseText";

const Footer = () => {
  const { content } = useContent();
  const { site, socials } = content;
  const signRef = useRef(null);
  const signIn = useInView(signRef, { threshold: 0.4 });

  return (
    <footer className="footer" data-nav-dark>
      <div className="wrap footer-top">
        <div>
          <p className="footer-role">{site.role}</p>
          <p className="footer-muted">{site.location}</p>
        </div>

        <ul className="footer-links">
          <li>
            <a href={`mailto:${site.email}`}>Email</a>
          </li>
          {socials.map((social, i) => (
            <li key={`${social.label}-${i}`}>
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <button type="button" className="footer-up" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to top <FaArrowUp aria-hidden="true" />
        </button>
      </div>

      <div ref={signRef} className={`wrap footer-sign ${signIn ? "is-in" : ""}`}>
        <FitText>
          <RiseText text={site.name} step={45} />
        </FitText>
      </div>

      <div className="wrap footer-bottom">
        <p>&copy; {new Date().getFullYear()} {site.name}</p>
        <p>Designed &amp; built by {site.shortName}</p>
      </div>
    </footer>
  );
};

export default Footer;
