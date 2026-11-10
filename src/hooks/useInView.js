import { useLayoutEffect, useState } from "react";

// True once the element has entered the viewport. Elements already on screen
// at mount are marked in view synchronously, so they never flash hidden during
// a page transition.
const useInView = (ref, { threshold = 0.2, rootMargin = "0px 0px -8% 0px" } = {}) => {
  const [inView, setInView] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, inView, threshold, rootMargin]);

  return inView;
};

export default useInView;
