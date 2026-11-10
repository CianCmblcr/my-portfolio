import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import useInView from "../hooks/useInView";
import { resolveImage } from "../content/assets";
import { coverTransitionName } from "../lib/transitions";

const MAX_DESKTOP = 5;
const MAX_MOBILE = 3;
const SWIPE_DISTANCE = 40;
const WHEEL_DISTANCE = 60;
const WHEEL_COOLDOWN = 450;

const useMaxVisible = () => {
  const query = "(max-width: 760px)";
  const [max, setMax] = useState(() => (window.matchMedia(query).matches ? MAX_MOBILE : MAX_DESKTOP));
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMax(media.matches ? MAX_MOBILE : MAX_DESKTOP);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return max;
};

// Where card `i` sits: in the fan (offset from its center), or waiting behind
// one end of it as a faint card once there are more projects than fit.
const placeCard = (i, start, n, visible) => {
  const center = (visible - 1) / 2;
  const dist = (((i - start) % n) + n) % n;

  if (dist < visible) {
    const o = dist - center;
    return { inFan: true, o, z: 100 - Math.round(Math.abs(o) * 2), s: 1, a: 1 };
  }

  const rest = n - visible;
  const j = dist - visible;
  const right = j < Math.ceil(rest / 2);
  const k = right ? j : n - 1 - dist;
  const o = (right ? 1 : -1) * (center + 0.55 + k * 0.45);
  return { inFan: false, o, z: 10 - k, s: 0.9 - k * 0.05, a: k === 0 ? 0.32 : k === 1 ? 0.16 : 0 };
};

// Project cards fanned out like a hand of cards. They deal out of a stacked
// deck when scrolled into view. With more projects than fit, the rest wait
// faintly behind the fan, and buttons, swipes, trackpad scrolls or arrow keys
// cycle through the deck.
const ProjectSpread = ({ projects }) => {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const maxVisible = useMaxVisible();
  const n = projects.length;
  const visible = Math.min(n, maxVisible);
  const canCycle = n > visible;

  const [start, setStart] = useState(0);
  const [hovered, setHovered] = useState(null);
  // Stagger only applies while dealing; afterwards cards react instantly.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setSettled(true), 900 + n * 90);
    return () => clearTimeout(timer);
  }, [inView, n]);

  const step = useCallback(
    (dir) => {
      if (!canCycle) return;
      setHovered(null);
      setStart((s) => (s + dir + n) % n);
    },
    [canCycle, n],
  );

  // Horizontal trackpad scrolling steps through the deck.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !canCycle) return;
    let total = 0;
    let lockedUntil = 0;
    const onWheel = (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (performance.now() < lockedUntil) return;
      total += event.deltaX;
      if (Math.abs(total) >= WHEEL_DISTANCE) {
        step(total > 0 ? 1 : -1);
        total = 0;
        lockedUntil = performance.now() + WHEEL_COOLDOWN;
      }
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [canCycle, step]);

  // Touch, pen and mouse drags step through the deck; a drag never counts as a click.
  const drag = useRef({ x: 0, y: 0, active: false, moved: false });
  const onPointerDown = (event) => {
    if (!canCycle) return;
    drag.current = { x: event.clientX, y: event.clientY, active: true, moved: false };
  };
  const onPointerMove = (event) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = event.clientX - d.x;
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(event.clientY - d.y)) d.moved = true;
  };
  const onPointerUp = (event) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    const dx = event.clientX - d.x;
    if (d.moved && Math.abs(dx) >= SWIPE_DISTANCE) step(dx < 0 ? 1 : -1);
  };
  const onClickCapture = (event) => {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  if (!n) return null;

  const centerIndex = (start + Math.floor((visible - 1) / 2)) % n;
  const current = projects[hovered ?? centerIndex];
  const hoveredPlace = hovered === null ? null : placeCard(hovered, start, n, visible);

  return (
    <div
      ref={ref}
      className={`spread ${inView ? "is-in" : ""} ${settled ? "is-settled" : ""}`}
      onKeyDown={canCycle ? onKeyDown : undefined}
    >
      <ul
        ref={stageRef}
        className={`spread-stage ${canCycle ? "can-cycle" : ""}`}
        style={{ "--n": visible }}
        onMouseLeave={() => setHovered(null)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current.active = false)}
        onClickCapture={onClickCapture}
      >
        {projects.map((project, i) => {
          const place = placeCard(i, start, n, visible);
          const isHovered = hovered === i;
          // Cards on either side of the hovered one part to make room.
          const push =
            hoveredPlace && place.inFan && !isHovered ? (place.o < hoveredPlace.o ? -44 : 44) : 0;
          return (
            <li
              key={`${project.slug}-${i}`}
              className={`spread-card ${place.inFan ? "" : "is-back"} ${isHovered ? "is-hovered" : ""}`}
              inert={!place.inFan}
              style={{
                "--i": place.inFan ? place.o + (visible - 1) / 2 : 0,
                "--o": place.o,
                "--o2": Math.min(place.o * place.o, ((visible - 1) / 2) ** 2 + 1),
                "--z": place.z,
                "--s": place.s,
                "--a": place.a,
                "--push": `${push}px`,
              }}
            >
              <Link
                to={`/projects/${project.slug}`}
                viewTransition
                className="spread-link"
                draggable={false}
                onMouseEnter={() => place.inFan && setHovered(i)}
                onFocus={() => place.inFan && setHovered(i)}
                onBlur={() => setHovered(null)}
              >
                <span className="spread-media">
                  <img
                    src={resolveImage(project.cover)}
                    alt=""
                    decoding="async"
                    draggable={false}
                    style={{ viewTransitionName: coverTransitionName(project.slug) }}
                  />
                </span>
                <span className="spread-label">
                  <span className="spread-title">{project.title}</span>
                  <span className="spread-type">{project.type}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {current && (
        <div className="spread-caption" aria-live="polite">
          <div key={current.slug} className="spread-caption-inner">
            <h3 className="spread-caption-title">{current.title}</h3>
            <p className="spread-caption-desc">{current.description}</p>
            <p className="project-meta">{[current.type, current.year].filter(Boolean).join(", ")}</p>
            <Link to={`/projects/${current.slug}`} viewTransition className="project-cta">
              View case study <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}

      {canCycle && (
        <div className="spread-controls">
          <button type="button" className="icon-btn" aria-label="Previous project" onClick={() => step(-1)}>
            <FaArrowLeft aria-hidden="true" />
          </button>
          <span className="spread-count" aria-live="polite">
            {centerIndex + 1} / {n}
          </span>
          <button type="button" className="icon-btn" aria-label="Next project" onClick={() => step(1)}>
            <FaArrowRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectSpread;
