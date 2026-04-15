import { motion } from "framer-motion";

/**
 * ShiningText — a gradient shimmer that sweeps across text infinitely.
 * Accepts either Tailwind classes (className) or inline style overrides.
 */
export function ShiningText({ text, style = {}, className = "" }) {
  return (
    <motion.span
      className={className}
      style={{
        display: "inline-block",
        backgroundImage:
          "linear-gradient(110deg, #6b8a00 0%, #8aaa00 28%, #C3E41D 42%, #ffffff 50%, #C3E41D 58%, #8aaa00 72%, #6b8a00 100%)",
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        ...style,
      }}
      initial={{ backgroundPosition: "300% 0" }}
      animate={{ backgroundPosition: "-300% 0" }}
      transition={{
        duration: 2,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
}
