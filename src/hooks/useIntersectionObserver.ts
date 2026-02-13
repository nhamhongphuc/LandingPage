import { useState, useEffect, useRef } from "react";

/**
 * Hook that returns `true` once the target element enters the viewport.
 * Uses IntersectionObserver and disconnects after the first intersection
 * (animate-once pattern).
 */
export function useIntersectionObserver(
  threshold = 0.1
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
