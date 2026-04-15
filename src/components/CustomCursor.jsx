import { useRef, useEffect } from "react";

const COLORS = ["#ff6b6b", "#fff200", "#45b7d1", "#96ceb4", "#ffeaa7"];
const REMOVE_DELAY = 400;

export function CustomCursor() {
  const svgRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const svg = svgRef.current;
    if (!svg) return;

    let animationId;

    class Follower {
      constructor(stage, color) {
        this.points = [];
        this.stage  = stage;
        this.color  = color;
        this.line   = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.line.style.fill        = color;
        this.line.style.stroke      = color;
        this.line.style.strokeWidth = "1";
        this.stage.appendChild(this.line);
      }

      getDrift() {
        return (Math.random() - 0.5) * 3;
      }

      add(position) {
        const direction = { x: 0, y: 0 };
        if (this.points[0]) {
          direction.x = (position.x - this.points[0].position.x) * 0.25;
          direction.y = (position.y - this.points[0].position.y) * 0.25;
        }

        const point = {
          position,
          time: Date.now(),
          drift: {
            x: this.getDrift() + direction.x / 2,
            y: this.getDrift() + direction.y / 2,
          },
          age: 0,
          direction,
        };

        const roll   = Math.random();
        const chance = 0.1;
        if      (roll < chance)     this.makeCircle(point);
        else if (roll < chance * 2) this.makeSquare(point);
        else if (roll < chance * 3) this.makeTriangle(point);

        this.points.unshift(point);
      }

      createLine(points) {
        const path = [points.length ? "M" : ""];
        if (points.length > 0) {
          let forward = true;
          let i = 0;
          while (i >= 0) {
            const pt      = points[i];
            const offsetX = pt.direction.x * ((i - points.length) / points.length) * 0.6;
            const offsetY = pt.direction.y * ((i - points.length) / points.length) * 0.6;
            const x = pt.position.x + (forward ? offsetY : -offsetY);
            const y = pt.position.y + (forward ? offsetX : -offsetX);
            pt.age += 0.2;
            path.push(x + pt.drift.x * pt.age);
            path.push(y + pt.drift.y * pt.age);
            i += forward ? 1 : -1;
            if (i === points.length) { i--; forward = false; }
          }
        }
        return path.join(" ");
      }

      trim() {
        if (this.points.length > 0) {
          const last = this.points[this.points.length - 1];
          if (last.time < Date.now() - REMOVE_DELAY) this.points.pop();
        }
        this.line.setAttribute("d", this.createLine(this.points));
      }

      moveShape(shape, point) {
        this.stage.appendChild(shape);
        const driftX = point.position.x + point.direction.x * (Math.random() * 20) + point.drift.x * (Math.random() * 10);
        const driftY = point.position.y + point.direction.y * (Math.random() * 20) + point.drift.y * (Math.random() * 10);
        shape.style.transform  = `translate(${point.position.x}px, ${point.position.y}px)`;
        shape.style.transition = "all 0.5s ease-out";
        setTimeout(() => {
          shape.style.transform = `translate(${driftX}px, ${driftY}px) scale(0) rotate(${Math.random() * 360}deg)`;
          setTimeout(() => { if (this.stage.contains(shape)) this.stage.removeChild(shape); }, 500);
        }, 10);
      }

      makeCircle(point) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const r  = (Math.abs(point.direction.x) + Math.abs(point.direction.y));
        el.setAttribute("r",  String(r));
        el.setAttribute("cx", "0");
        el.setAttribute("cy", "0");
        el.style.fill = this.color;
        this.moveShape(el, point);
      }

      makeSquare(point) {
        const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5;
        const el   = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        el.setAttribute("width",  String(size));
        el.setAttribute("height", String(size));
        el.style.fill = this.color;
        this.moveShape(el, point);
      }

      makeTriangle(point) {
        const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5;
        const el   = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        el.setAttribute("points", `0,0 ${size},${size / 2} 0,${size}`);
        el.style.fill = this.color;
        this.moveShape(el, point);
      }

      destroy() {
        if (this.stage.contains(this.line)) this.stage.removeChild(this.line);
      }
    }

    const followers = COLORS.map((c) => new Follower(svg, c));

    const onMouseMove = (e) => {
      followers.forEach((f) => f.add({ x: e.clientX, y: e.clientY }));
    };

    const loop = () => {
      followers.forEach((f) => f.trim());
      animationId = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    loop();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
      followers.forEach((f) => f.destroy());
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        zIndex:        9999,
      }}
    />
  );
}
