import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Trackpad and touch scroll the track natively (scroll-snap does the
// settling); mouse users can click-drag, and a fast flick advances one slide.
const ProjectCarousel = ({ projects }) => {
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const animationRef = useRef(0);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const count = projects.length;

  const stopAnimation = () => {
    cancelAnimationFrame(animationRef.current);
    trackRef.current?.classList.remove("is-animating");
  };

  const offsetFor = (index) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    return slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2;
  };

  // Per-slide distance from center drives scale, opacity and image parallax.
  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Infinity;

    slideRefs.current.forEach((slide, i) => {
      const signed = (slide.offsetLeft + slide.offsetWidth / 2 - center) / slide.offsetWidth;
      const distance = Math.min(Math.abs(signed), 1);
      slide.style.setProperty("--d", distance.toFixed(3));
      slide.style.setProperty("--s", Math.max(-1, Math.min(1, signed)).toFixed(3));
      if (Math.abs(signed) < nearestDistance) {
        nearestDistance = Math.abs(signed);
        nearest = i;
      }
    });

    setActive(nearest);
  }, []);

  const goTo = useCallback(
    (index) => {
      const track = trackRef.current;
      const target = Math.max(0, Math.min(count - 1, index));
      const from = track.scrollLeft;
      const to = offsetFor(target);
      setInteracted(true);
      stopAnimation();

      if (prefersReducedMotion() || Math.abs(to - from) < 1) {
        track.scrollLeft = to;
        return;
      }

      const duration = Math.min(700, 380 + Math.abs(to - from) * 0.25);
      const start = performance.now();
      track.classList.add("is-animating");

      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        track.scrollLeft = from + (to - from) * easeOutQuart(t);
        if (t < 1) animationRef.current = requestAnimationFrame(step);
        else track.classList.remove("is-animating");
      };
      animationRef.current = requestAnimationFrame(step);
    },
    [count]
  );

  useLayoutEffect(() => {
    update();
  }, [update]);

  useEffect(() => {
    const track = trackRef.current;
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    const onUserInput = () => {
      stopAnimation();
      setInteracted(true);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("wheel", onUserInput, { passive: true });
    track.addEventListener("touchstart", onUserInput, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(animationRef.current);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("wheel", onUserInput);
      track.removeEventListener("touchstart", onUserInput);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  const onPointerDown = (event) => {
    suppressClickRef.current = false;
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    stopAnimation();
    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startScroll: trackRef.current.scrollLeft,
      startIndex: active,
      dragging: false,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const track = trackRef.current;

    if (!drag.dragging) {
      // Small threshold so a plain click on a link still works.
      if (Math.abs(dx) < 5) return;
      drag.dragging = true;
      track.classList.add("is-dragging");
      track.setPointerCapture(event.pointerId);
      setInteracted(true);
    }

    const now = performance.now();
    const dt = now - drag.lastTime;
    if (dt > 0) drag.velocity = (event.clientX - drag.lastX) / dt;
    drag.lastX = event.clientX;
    drag.lastTime = now;
    track.scrollLeft = drag.startScroll - dx;
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    if (!drag.dragging) return;

    const track = trackRef.current;
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    suppressClickRef.current = true;

    // A quick flick moves one slide even if the drag distance was short.
    const isFlick = Math.abs(drag.velocity) > 0.45 && performance.now() - drag.lastTime < 80;
    if (isFlick) goTo(drag.startIndex + (drag.velocity < 0 ? 1 : -1));
    else {
      update();
      const center = track.scrollLeft + track.clientWidth / 2;
      const nearest = slideRefs.current.reduce((best, slide, i) => {
        const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
        return distance < best.distance ? { i, distance } : best;
      }, { i: 0, distance: Infinity }).i;
      goTo(nearest);
    }
  };

  const onClickCapture = (event) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  };

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected projects"
      onKeyDown={onKeyDown}
    >
      <div
        ref={trackRef}
        className="carousel-track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {projects.map((project, i) => {
          const isActive = i === active;
          return (
            <div
              key={project.id}
              ref={(el) => (slideRefs.current[i] = el)}
              className={`carousel-slide ${isActive ? "is-active" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${project.title}`}
              onClick={(event) => {
                if (!isActive) {
                  event.preventDefault();
                  goTo(i);
                }
              }}
            >
              <article className={`project-card project-card--${project.id}`} data-spotlight>
                <div className="project-card-media">
                  <img src={project.image} alt={`${project.title} project`} draggable={false} />
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
                  <Link className="project-card-cta" to={project.link} draggable={false}>
                    View project <FaChevronRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <div className="carousel-footer">
        <div className="project-stack-controls">
          <button
            type="button"
            className="project-stack-arrow"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous project"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <div className="project-stack-pills" role="tablist" aria-label="Select project">
            {projects.map((project, i) => (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={project.title}
                className={`project-stack-pill ${i === active ? "is-active" : ""}`}
                onClick={() => goTo(i)}
              >
                {project.index}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="project-stack-arrow"
            onClick={() => goTo(active + 1)}
            disabled={active === count - 1}
            aria-label="Next project"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
        <p className={`carousel-hint ${interacted ? "is-hidden" : ""}`} aria-hidden="true">
          Swipe, drag or scroll sideways <FaArrowRight className="carousel-hint-arrow" />
        </p>
      </div>
    </div>
  );
};

export default ProjectCarousel;
