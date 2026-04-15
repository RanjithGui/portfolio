import { useEffect, useRef } from "react";

// ─── Screen configs ────────────────────────────────────────────────────────
// entryX/Y = start position offset, exitX/Y = end position offset
// Each screen enters from a unique direction for spatial variety
const backgroundScreens = [
  {
    id: "billing",
    accent: "cyan",
    width: "14.8rem",
    height: "29.6rem",
    tilt: "-10deg",
    phase: 0.35,
    entryX: -520, entryY: -380,   // top-left
    exitX:   280, exitY:   420,   // bottom-right
    rotate: -14, swing: 5, wobbleX: 14, wobbleY: 10
  },
  {
    id: "usage",
    accent: "violet",
    width: "13rem",
    height: "25.8rem",
    tilt: "11deg",
    phase: 1.2,
    entryX:  620, entryY: -120,   // right
    exitX:  -460, exitY:   160,   // left
    rotate: 10, swing: 4.2, wobbleX: 11, wobbleY: 12
  },
  {
    id: "checkin",
    accent: "green",
    width: "12.5rem",
    height: "24rem",
    tilt: "-14deg",
    phase: 2.1,
    entryX:  -80, entryY:  560,   // bottom
    exitX:   120, exitY:  -520,   // top
    rotate: -8, swing: 3.5, wobbleX: 9, wobbleY: 11
  },
  {
    id: "onboarding",
    accent: "rose",
    width: "14rem",
    height: "27rem",
    tilt: "12deg",
    phase: 2.8,
    entryX:  480, entryY:  460,   // bottom-right
    exitX:  -400, exitY:  -400,   // top-left
    rotate: 9, swing: 4.8, wobbleX: 12, wobbleY: 9
  },
  {
    id: "dashboard",
    accent: "blue",
    width: "11rem",
    height: "22rem",
    tilt: "8deg",
    phase: 3.7,
    entryX:  160, entryY: -540,   // top
    exitX:  -200, exitY:  560,    // bottom
    rotate: 6, swing: 3, wobbleX: 8, wobbleY: 8
  }
];

// ─── Logo badge configs ────────────────────────────────────────────────────
const backgroundLogos = [
  {
    id: "tmobile",
    label: "T-Mobile",
    color: "#E20074",
    phase: 0.8,
    entryX: -720, entryY:   80,   // left
    exitX:   720, exitY:   -80,   // right
    rotate: -6, swing: 3, wobbleX: 10, wobbleY: 8
  },
  {
    id: "verizon",
    label: "Verizon",
    color: "#CD040B",
    phase: 1.9,
    entryX:  560, entryY: -480,   // top-right
    exitX:  -480, exitY:  420,    // bottom-left
    rotate: 8, swing: 3.5, wobbleX: 9, wobbleY: 10
  },
  {
    id: "android",
    label: "Android",
    color: "#3DDC84",
    phase: 3.0,
    entryX: -540, entryY:  480,   // bottom-left
    exitX:   440, exitY:  -420,   // top-right
    rotate: -10, swing: 4, wobbleX: 11, wobbleY: 9
  },
  {
    id: "reactnative",
    label: "React Native",
    color: "#61DAFB",
    phase: 4.1,
    entryX:  680, entryY:  200,   // right
    exitX:  -660, exitY:  -140,   // left
    rotate: 5, swing: 2.8, wobbleX: 8, wobbleY: 10
  }
];

// On mobile: 3 screens + 2 logos
const MOBILE_SCREEN_IDS = new Set(["billing", "checkin", "onboarding"]);
const MOBILE_LOGO_IDS   = new Set(["android", "reactnative"]);

// ─── Logo SVG icons ────────────────────────────────────────────────────────
function LogoIcon({ id, color }) {
  if (id === "tmobile") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={color} />
        <text x="16" y="23" textAnchor="middle" fill="white" fontSize="20" fontWeight="900" fontFamily="sans-serif">T</text>
      </svg>
    );
  }
  if (id === "verizon") {
    return (
      <svg viewBox="0 0 80 20" fill="none" aria-hidden="true">
        <text x="0" y="16" fill={color} fontSize="14" fontWeight="800" fontFamily="sans-serif">Verizon</text>
        <path d="M72 2 L78 14 L84 2" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    );
  }
  if (id === "android") {
    return (
      <svg viewBox="0 0 24 24" fill={color} aria-hidden="true">
        <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5S11 23.33 11 22.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zm-2.5-1C2.67 17 2 16.33 2 15.5v-7C2 7.67 2.67 7 3.5 7S5 7.67 5 8.5v7c0 .83-.67 1.5-1.5 1.5zm17 0c-.83 0-1.5-.67-1.5-1.5v-7c0-.83.67-1.5 1.5-1.5S23 7.67 23 8.5v7c0 .83-.67 1.5-1.5 1.5zM12 1C8.14 1 4.92 3.38 3.54 6.73l-.04.1h17l-.04-.1C19.08 3.38 15.86 1 12 1zm-2 4H9V4h1v1zm5 0h-1V4h1v1z" />
      </svg>
    );
  }
  // React Native — atom rings
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.4" transform="rotate(-60 12 12)" />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  );
}

// ─── Screen content ────────────────────────────────────────────────────────
function BackgroundScreenContent({ id }) {
  if (id === "billing") {
    return (
      <>
        <div className="background-screen__status">
          <span>9:41</span><span>Billing</span>
        </div>
        <div className="background-screen__hero">
          <p>Current Due</p><strong>$128.40</strong>
        </div>
        <div className="background-screen__chart">
          <span /><span /><span /><span />
        </div>
        <div className="background-screen__rows">
          <div><span>Current</span><strong>$84.20</strong></div>
          <div><span>Future</span><strong>$44.20</strong></div>
          <div><span>PDF</span><strong>Ready</strong></div>
        </div>
      </>
    );
  }
  if (id === "usage") {
    return (
      <>
        <div className="background-screen__status">
          <span>5G</span><span>Usage</span>
        </div>
        <div className="background-screen__hero">
          <p>Monthly Data</p><strong>82%</strong>
        </div>
        <div className="background-screen__donut">
          <div className="background-screen__donut-ring" />
          <span>18GB left</span>
        </div>
        <div className="background-screen__chips">
          <span>5G</span><span>Roaming</span><span>Alerts</span>
        </div>
      </>
    );
  }
  if (id === "checkin") {
    return (
      <>
        <div className="background-screen__status">
          <span>Store</span><span>Check-In</span>
        </div>
        <div className="background-screen__ticket">
          <strong>Queue 02:12</strong>
          <p>Online pre-check-in confirmed</p>
        </div>
        <div className="background-screen__steps">
          <span className="is-active" /><span className="is-active" /><span />
        </div>
        <div className="background-screen__rows compact">
          <div><span>Visit</span><strong>Today</strong></div>
          <div><span>Status</span><strong>Ready</strong></div>
        </div>
      </>
    );
  }
  if (id === "onboarding") {
    return (
      <>
        <div className="background-screen__status">
          <span>Toyota</span><span>Onboarding</span>
        </div>
        <div className="background-screen__hero">
          <p>Vehicle Setup</p><strong>Step 3/4</strong>
        </div>
        <div className="background-screen__progress">
          <span className="is-active" /><span className="is-active" />
          <span className="is-active" /><span />
        </div>
        <div className="background-screen__rows">
          <div><span>Registration</span><strong>Done</strong></div>
          <div><span>Ownership</span><strong>Verified</strong></div>
          <div><span>Profile</span><strong>Pending</strong></div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="background-screen__status">
        <span>Compose</span><span>Dashboard</span>
      </div>
      <div className="background-screen__analytics">
        <span /><span /><span />
      </div>
      <div className="background-screen__rows compact">
        <div><span>Modules</span><strong>30+</strong></div>
        <div><span>Impact</span><strong>9%</strong></div>
      </div>
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────
export function BackgroundFX() {
  const screenRefs = useRef([]);
  const logoRefs   = useRef([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile      = window.matchMedia("(max-width: 600px)").matches;

    const screenNodes = screenRefs.current.filter(Boolean);
    const logoNodes   = logoRefs.current.filter(Boolean);
    const allNodes    = [...screenNodes, ...logoNodes];

    if (reducedMotion || allNodes.length === 0) return undefined;

    const motionScale      = isMobile ? 0.45 : 1;
    const baseSequenceSpeed = isMobile ? 0.042 : 0.058;
    let frameSkip = 0;

    const pointer = { x: 0, y: 0, active: false };
    const scene   = { speedMultiplier: 1, targetMultiplier: 1 };
    let hoveredCount = 0;
    let frameId = 0;

    const handlePointerMove = (e) => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true; };
    const handlePointerLeave = () => { pointer.active = false; scene.targetMultiplier = 1; };

    const cleanups = allNodes.map((node) => {
      const onEnter = () => { hoveredCount++; scene.targetMultiplier = 0.55; };
      const onLeave = () => { hoveredCount = Math.max(0, hoveredCount - 1); scene.targetMultiplier = hoveredCount > 0 ? 0.55 : 1; };
      node.addEventListener("pointerenter", onEnter);
      node.addEventListener("pointerleave", onLeave);
      return () => { node.removeEventListener("pointerenter", onEnter); node.removeEventListener("pointerleave", onLeave); };
    });

    // Build unified item list with config refs for the animation loop
    const screenItems = screenNodes.map((node, i) => ({ node, config: backgroundScreens[i], isLogo: false }));
    const logoItems   = logoNodes.map((node, i)   => ({ node, config: backgroundLogos[i],   isLogo: true }));
    const items = [...screenItems, ...logoItems];
    const total = items.length;

    const animate = (time) => {
      frameId = requestAnimationFrame(animate);

      if (isMobile) { frameSkip = (frameSkip + 1) % 2; if (frameSkip !== 0) return; }

      const seconds  = time / 1000;
      const cycle    = seconds * baseSequenceSpeed * scene.speedMultiplier;
      const pointerX = pointer.active ? pointer.x / window.innerWidth  - 0.5 : 0;
      const pointerY = pointer.active ? pointer.y / window.innerHeight - 0.5 : 0;

      items.forEach(({ node, config, isLogo }, index) => {
        const progress = (cycle + index / total) % 1;
        const eased    = progress * progress * (3 - 2 * progress); // smoothstep

        // Positional travel along each item's unique directional vector
        const travelX  = config.entryX + (config.exitX - config.entryX) * eased;
        const travelY  = config.entryY + (config.exitY - config.entryY) * eased;
        const travelZ  = -1220 + eased * 1760;
        const scale    = isLogo ? (0.28 + eased * 0.88) : (0.34 + eased * 0.92);

        const swayX    = Math.sin(seconds * 0.72 + config.phase) * (config.wobbleX * (0.45 + eased * 0.8)) * motionScale;
        const swayY    = Math.cos(seconds * 0.64 + config.phase) * (config.wobbleY * (0.4  + eased * 0.6)) * motionScale;
        const pullX    = pointerX * (22 + eased * 30) * motionScale;
        const pullY    = pointerY * (12 + eased * 16) * motionScale;

        const x        = travelX + swayX + pullX;
        const y        = travelY + swayY + pullY;
        const rotation = config.rotate
          + Math.sin(seconds * 0.55 + config.phase) * config.swing * motionScale
          + pointerX * 5 * motionScale;

        let opacity = 0.14 + eased * 0.52;
        if (isMobile) opacity *= 0.72;
        if (progress < 0.08) opacity *= progress / 0.08;
        if (progress > 0.86) opacity *= Math.max(0, (1 - progress) / 0.14);

        node.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${travelZ.toFixed(2)}px) rotateZ(${rotation.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        node.style.zIndex    = String(100 + Math.round(eased * 100));
        node.style.setProperty("--screen-opacity", opacity.toFixed(3));
      });

      scene.speedMultiplier += (scene.targetMultiplier - scene.speedMultiplier) * 0.065;
    };

    // Set initial transforms so screens don't flash at origin
    items.forEach(({ node, config, isLogo }, index) => {
      const p = index / total;
      const e = p * p * (3 - 2 * p);
      node.style.transform = `translate3d(${(config.entryX + (config.exitX - config.entryX) * e).toFixed(2)}px,${(config.entryY + (config.exitY - config.entryY) * e).toFixed(2)}px,${(-1220 + e * 1760).toFixed(2)}px) scale(${((isLogo ? 0.28 : 0.34) + e * 0.92).toFixed(3)})`;
      node.style.setProperty("--screen-opacity", (0.16 + e * 0.48).toFixed(3));
      node.style.zIndex = String(100 + Math.round(e * 100));
    });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <>
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="ambient ambient-c" />
      <div className="noise" />

      {/* ── Mobile screens: 3; Desktop: all 5 ── */}
      <div className="background-screens" aria-hidden="true">
        {backgroundScreens.map((screen, index) => (
          <div
            key={screen.id}
            ref={(node) => { screenRefs.current[index] = node; }}
            className={[
              "background-screen-orbit",
              `background-screen-orbit--${screen.accent}`,
              !MOBILE_SCREEN_IDS.has(screen.id) ? "background-screen-orbit--desktop-only" : ""
            ].join(" ").trim()}
            style={{
              top: "50%", left: "50%",
              width: screen.width, height: screen.height,
              marginLeft: `calc(${screen.width} / -2)`,
              marginTop:  `calc(${screen.height} / -2)`,
              "--screen-tilt": screen.tilt
            }}
          >
            <div className={`background-screen background-screen--${screen.id}`}>
              <div className="background-screen__display">
                <BackgroundScreenContent id={screen.id} />
              </div>
            </div>
          </div>
        ))}

        {/* ── Logo badges — icon only, 2× size ── */}
        {backgroundLogos.map((logo, index) => (
          <div
            key={logo.id}
            ref={(node) => { logoRefs.current[index] = node; }}
            className={[
              "background-logo-orbit",
              !MOBILE_LOGO_IDS.has(logo.id) ? "background-screen-orbit--desktop-only" : ""
            ].join(" ").trim()}
            style={{ top: "50%", left: "50%", "--logo-color": logo.color }}
          >
            <div className="background-logo">
              <div className="background-logo__icon">
                <LogoIcon id={logo.id} color={logo.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
