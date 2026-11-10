import { useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import { useContent } from "../content/ContentProvider";

const supportsViewTransitions = typeof document !== "undefined" && "startViewTransition" in document;
const positions = new Map();

// Route wrapper: waits for saved content, then handles scrolling (hash links,
// back/forward restore, top on new pages) and the page fade fallback for
// browsers without view transitions.
const GlobalEffects = () => {
  const { ready } = useContent();
  const location = useLocation();
  const navigationType = useNavigationType();
  const lastPath = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    let frame = 0;
    const save = () => {
      frame = 0;
      positions.set(location.key, window.scrollY);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(save);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [location.key]);

  useLayoutEffect(() => {
    if (!ready) return;
    const samePage = lastPath.current === location.pathname;
    lastPath.current = location.pathname;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = samePage && !reduce ? "smooth" : "instant";

    if (navigationType === "POP" && positions.has(location.key)) {
      window.scrollTo({ top: positions.get(location.key), behavior: "instant" });
      return;
    }
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior });
        return;
      }
    }
    if (navigationType !== "POP") window.scrollTo({ top: 0, behavior });
  }, [ready, location.pathname, location.hash, location.key, navigationType]);

  if (!ready) {
    return (
      <div className="page-loader" role="status">
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <span />
        <span />
      </div>
      {supportsViewTransitions ? (
        <Outlet />
      ) : (
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default GlobalEffects;
