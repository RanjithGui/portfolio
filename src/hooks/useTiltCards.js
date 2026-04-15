import { useEffect } from "react";

export function useTiltCards() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const cards = document.querySelectorAll("[data-tilt]");
    const cleanups = [];

    cards.forEach((card) => {
      const handleEnter = () => {
        card.style.transition = "transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 320ms ease";
        card.style.transform  = "translateY(-14px) scale(1.025)";
      };

      const handleMove = (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width  - 0.5;
        const y = (event.clientY - rect.top)  / rect.height - 0.5;
        card.style.transition = "none";
        card.style.transform  = `translateY(-14px) scale(1.025) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg)`;
      };

      const handleLeave = () => {
        card.style.transition = "transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 420ms ease";
        card.style.transform  = "";
      };

      card.addEventListener("pointerenter", handleEnter);
      card.addEventListener("pointermove",  handleMove);
      card.addEventListener("pointerleave", handleLeave);

      cleanups.push(() => {
        card.removeEventListener("pointerenter", handleEnter);
        card.removeEventListener("pointermove",  handleMove);
        card.removeEventListener("pointerleave", handleLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);
}
