import { useEffect } from "react";

export function useHeroParallax(stageRef) {
  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return undefined;
    }

    const orbiters = Array.from(stage.querySelectorAll("[data-depth]"));

    const handleMove = (event) => {
      const rect = stage.getBoundingClientRect();
      const pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      const pointerY = (event.clientY - rect.top) / rect.height - 0.5;

      orbiters.forEach((item) => {
        const depth = Number(item.dataset.depth || 0.2);
        const rotation = Number(item.dataset.rotate || 0);
        const moveX = pointerX * depth * 90;
        const moveY = pointerY * depth * 70;
        item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotation}deg)`;
      });
    };

    const handleLeave = () => {
      orbiters.forEach((item) => {
        const rotation = Number(item.dataset.rotate || 0);
        item.style.transform = `translate3d(0, 0, 0) rotate(${rotation}deg)`;
      });
    };

    stage.addEventListener("pointermove", handleMove);
    stage.addEventListener("pointerleave", handleLeave);

    return () => {
      stage.removeEventListener("pointermove", handleMove);
      stage.removeEventListener("pointerleave", handleLeave);
    };
  }, [stageRef]);
}
