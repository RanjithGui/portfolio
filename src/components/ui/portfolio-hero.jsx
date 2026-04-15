import { useState, useEffect, useRef, useMemo } from "react";

/**
 * BlurText — animates text in word-by-word or letter-by-letter
 * with a blur + translate fade-in on first viewport intersection.
 */
export function BlurText({
  text,
  delay = 50,
  startDelay = 0,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { setInView(entry.isIntersecting); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={{ margin: 0, padding: 0, ...style }}>
      {segments.map((seg, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${startDelay + i * delay}ms`,
          }}
        >
          {seg}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
}
