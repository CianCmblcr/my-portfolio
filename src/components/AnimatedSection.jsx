import { useEffect, useRef, useState } from "react";

// Reveals its children once they scroll into view. `group` skips the
// wrapper's own fade so `.stagger-item` children can animate one by one.
const AnimatedSection = ({ children, delay = 0, group = false, className = "", as = "div" }) => {
  const Tag = as;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={sectionRef}
      className={`${group ? "" : "reveal"} ${isVisible ? "is-visible" : ""} ${className}`}
      style={delay ? { "--delay": `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default AnimatedSection;
