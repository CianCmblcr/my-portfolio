import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaBehance, FaChevronRight, FaLinkedinIn, FaXmark, FaXTwitter } from "react-icons/fa6";
import logo from "../assets/Frame 3.png";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "home", index: "01", label: "Home" },
  { id: "about", index: "02", label: "About" },
  { id: "projects", index: "03", label: "Projects" },
  { id: "contact", index: "04", label: "Let's connect" },
];

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleScroll = (section) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      <div
        className={`sidenav-backdrop ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <button
        type="button"
        className={`sidenav-handle ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <FaChevronRight className="sidenav-handle-icon" aria-hidden="true" />
      </button>

      <aside className={`sidenav-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="sidenav-panel-inner">
          <div className="sidenav-top">
            <button
              type="button"
              className="sidenav-logo"
              onClick={() => handleScroll("home")}
              tabIndex={open ? 0 : -1}
            >
              <img src={logo} className="h-8 w-auto" alt="" />
              <span>Cian Combalicer</span>
            </button>
            <button
              type="button"
              className="sidenav-close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              tabIndex={open ? 0 : -1}
            >
              <FaXmark aria-hidden="true" />
            </button>
          </div>

          <p className="sidenav-eyebrow">Navigate</p>
          <nav className="sidenav-links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="sidenav-link"
                onClick={() => handleScroll(item.id)}
                tabIndex={open ? 0 : -1}
              >
                <span className="sidenav-link-index">{item.index}</span>
                <span className="sidenav-link-label">{item.label}</span>
                <FaArrowRight className="sidenav-link-arrow" aria-hidden="true" />
              </button>
            ))}
          </nav>

          <div className="sidenav-footer">
            <div className="sidenav-social">
              <a href="https://linkedin.com/in/ciancmblcr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon" tabIndex={open ? 0 : -1}><FaLinkedinIn aria-hidden="true" /></a>
              <a href="https://twitter.com/cian_cmblcr" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="social-icon" tabIndex={open ? 0 : -1}><FaXTwitter aria-hidden="true" /></a>
              <a href="https://behance.net/cianjacob" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="social-icon" tabIndex={open ? 0 : -1}><FaBehance aria-hidden="true" /></a>
            </div>
            <div className="sidenav-theme-row">
              <span>Appearance</span>
              <ThemeToggle tabIndex={open ? 0 : -1} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNav;
