import { useEffect, useState } from "react";

/**
 * Types `text` character-by-character after `startDelay` ms.
 * Returns { displayed, done } where:
 *   - displayed  = the substring rendered so far
 *   - done       = true once the full string has been typed
 */
export function useTypewriter(text, { speed = 32, startDelay = 0 } = {}) {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || index >= text.length) return;
    const t = setTimeout(() => setIndex((i) => i + 1), speed);
    return () => clearTimeout(t);
  }, [started, index, text, speed]);

  return { displayed: text.slice(0, index), done: index >= text.length };
}
