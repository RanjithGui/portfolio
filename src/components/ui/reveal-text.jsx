import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ShiningText } from "./shining-text";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=2070&q=80",
];

// ANTHOTI total: 1100 + 480 + 700 + 300 + 400 + 150 = 3130 ms
const BOTH_NAMES_DONE_MS = 3200;
const SHINE_DURATION_MS  = 2000;

export function RevealText({
  text = "RANJITH",
  textColor = "#C3E41D",
  overlayColor = "#ffffff",
  fontSize = "clamp(4.5rem, 17.5vw, 17rem)",
  fontFamily = "'Fira Code', monospace",
  fontWeight = 700,
  letterSpacing = "-0.03em",
  lineHeight = 0.88,
  letterDelay = 0.08,
  startDelay = 0,
  overlayDelay = 0.05,
  overlayDuration = 0.4,
  springDuration = 700,
  letterImages = DEFAULT_IMAGES,
  style = {},
}) {
  const containerRef = useRef(null);

  const [isInView,    setIsInView]    = useState(false);
  const [animVersion, setAnimVersion] = useState(0);   // bumped each re-entry → replays spring
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showShine,   setShowShine]   = useState(false);
  const [shineDone,   setShineDone]   = useState(false);

  // ── Intersection observer — watch the container ────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Animation phases — restart every time the section comes into view ──
  useEffect(() => {
    if (!isInView) {
      // Reset everything when scrolled away so it replays on return
      setShowOverlay(false);
      setShowShine(false);
      setShineDone(false);
      return;
    }

    // Bump key so framer-motion remounts & replays spring entrance
    setAnimVersion((v) => v + 1);

    const overlayStart =
      startDelay * 1000 + (text.length - 1) * letterDelay * 1000 + springDuration;
    const shineStart = BOTH_NAMES_DONE_MS;
    const shineEnd   = shineStart + SHINE_DURATION_MS + 200;

    const t1 = setTimeout(() => setShowOverlay(true), overlayStart);
    const t2 = setTimeout(() => setShowShine(true),   shineStart);
    const t3 = setTimeout(() => setShineDone(true),   shineEnd);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  const baseStyle = {
    fontSize, fontFamily, fontWeight, letterSpacing, lineHeight,
    display: "flex", justifyContent: "center",
    ...style,
  };

  return (
    <div ref={containerRef} style={baseStyle}>
      {text.split("").map((letter, index) => (
        <motion.span
          // key includes animVersion → forces remount & spring replay on re-entry
          key={`${animVersion}_${index}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ position: "relative", display: "inline-block", cursor: "default" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: startDelay + index * letterDelay,
            type: "spring",
            damping: 8,
            stiffness: 200,
            mass: 0.8,
          }}
        >
          {/* Phase 3: single shine sweep */}
          {showShine && !shineDone && hoveredIndex !== index && (
            <ShiningText
              text={letter}
              style={{
                position: "absolute",
                inset: 0,
                fontSize: "inherit",
                fontFamily: "inherit",
                fontWeight: "inherit",
                letterSpacing: "inherit",
                lineHeight: "inherit",
              }}
            />
          )}

          {/* Phase 1 / 4: solid lime */}
          <motion.span
            style={{ color: textColor, position: "absolute", inset: 0, display: "block" }}
            animate={{
              opacity:
                showShine && !shineDone && hoveredIndex !== index ? 0
                : hoveredIndex === index                           ? 0
                : 1,
            }}
            transition={{ duration: showShine && !shineDone ? 0.5 : 0.1 }}
          >
            {letter}
          </motion.span>

          {/* Hover: image-fill texture */}
          <motion.span
            animate={{
              opacity: hoveredIndex === index ? 1 : 0,
              backgroundPosition: hoveredIndex === index ? "10% center" : "0% center",
            }}
            transition={{
              opacity: { duration: 0.15 },
              backgroundPosition: { duration: 3, ease: "easeInOut" },
            }}
            style={{
              display: "block",
              backgroundImage: `url('${letterImages[index % letterImages.length]}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {letter}
          </motion.span>

          {/* Phase 2: one-time white sweep */}
          {showOverlay && (
            <motion.span
              style={{
                position: "absolute", inset: 0, display: "block",
                color: overlayColor, pointerEvents: "none",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                delay: index * overlayDelay,
                duration: overlayDuration,
                times: [0, 0.1, 0.7, 1],
                ease: "easeInOut",
              }}
            >
              {letter}
            </motion.span>
          )}
        </motion.span>
      ))}
    </div>
  );
}
