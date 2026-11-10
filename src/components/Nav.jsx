import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContent } from "../content/ContentProvider";

const LINKS = [
  ["about", "About"],
  ["services", "Services"],
  ["work", "Work"],
  ["contact", "Contact"],
];

const Nav = () => {
  const { content } = useContent();
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Switch to dark glass while the bar sits over a dark section.
  const [onDark, setOnDark] = useState(false);
  useEffect(() => {
    const targets = document.querySelectorAll("[data-nav-dark]");
    if (!targets.length || typeof IntersectionObserver === "undefined") return;
    const hits = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? hits.add(entry.target) : hits.delete(entry.target)));
        setOnDark(hits.size > 0);
      },
      { rootMargin: "-44px 0px -94% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""} ${onDark && !open ? "is-dark" : ""}`}>
      <nav className="nav-bar glass" aria-label="Main">
        <Link to="/" className="nav-logo" viewTransition>
          {content.site.shortName}
          <span className="nav-logo-dot" aria-hidden="true" />
        </Link>

        <ul className="nav-links">
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <Link to={`/#${id}`}>{label}</Link>
            </li>
          ))}
        </ul>

        <Link to="/#contact" className="btn btn--dark btn--sm nav-cta">
          Let&apos;s talk
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-sheet"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div id="nav-sheet" className="nav-sheet glass" inert={!open}>
        <ul>
          {LINKS.map(([id, label], i) => (
            <li key={id} style={{ "--i": i }}>
              <Link to={`/#${id}`}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Nav;
