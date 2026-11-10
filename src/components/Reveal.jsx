import { useRef } from "react";
import useInView from "../hooks/useInView";

// Adds `is-in` when scrolled into view. `variant` picks the transition styled
// in motion.css: fade, curtain, tilt, draw, wipe.
const Reveal = ({ as = "div", variant = "fade", threshold, className = "", children, ...rest }) => {
  const Tag = as;
  const ref = useRef(null);
  const inView = useInView(ref, threshold ? { threshold } : undefined);

  return (
    <Tag ref={ref} className={`reveal reveal--${variant} ${inView ? "is-in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
