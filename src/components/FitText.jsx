import { useLayoutEffect, useRef } from "react";

// Scales a single line of text to exactly fill its parent's width.
const FitText = ({ children, className = "" }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      const style = getComputedStyle(parent);
      const width = parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      el.style.fontSize = "100px";
      const ratio = width / el.scrollWidth;
      el.style.fontSize = `${Math.floor(100 * ratio * 100) / 100}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [children]);

  return (
    <span ref={ref} className={`fit-text ${className}`}>
      {children}
    </span>
  );
};

export default FitText;
