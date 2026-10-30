import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";

// Route wrapper: page fade, scroll reset, scroll progress bar, and the
// pointer position that drives `[data-spotlight]` highlights.
const GlobalEffects = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const progressRef = useRef(null);

  useEffect(() => {
    if (navigationType === "PUSH") window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, navigationType]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event) => {
      const el = event.target.closest?.("[data-spotlight]");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <div key={pathname} className="page-enter">
        <Outlet />
      </div>
    </>
  );
};

export default GlobalEffects;
