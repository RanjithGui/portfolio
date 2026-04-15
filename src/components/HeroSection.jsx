import { useRef, useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { BlurText } from "./ui/portfolio-hero";
import { useCountUp } from "../hooks/useCountUp";

// ── helpers ────────────────────────────────────────────────────────────────
function parseMetric(value) {
  const m = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
  if (!m) return { prefix: "", number: 0, suffix: value };
  return { prefix: m[1], number: parseInt(m[2], 10), suffix: m[3] };
}

function MetricPill({ metric }) {
  const { prefix, number, suffix } = parseMetric(metric.value);
  const { ref, count } = useCountUp(number, 1600);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <span
        style={{
          display: "block",
          fontFamily: "'Fira Code', monospace",
          fontWeight: 700,
          fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
          color: "#C3E41D",
          lineHeight: 1.1,
        }}
      >
        {prefix}{count}{suffix}
      </span>
      <span
        style={{
          display: "block",
          fontSize: "clamp(0.62rem, 1vw, 0.78rem)",
          color: "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginTop: "0.25rem",
        }}
      >
        {metric.label}
      </span>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────
export function HeroSection({ hero, navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef   = useRef(null);
  const btnRef    = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        btnRef.current &&
        !menuRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const navItems = navigation
    ? [{ label: "Home", href: "#top", highlight: true }, ...navigation]
    : [];

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* ── Hamburger header ────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "1.5rem",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1536px",
            margin: "0 auto",
          }}
        >
          {/* Menu button + dropdown */}
          <div style={{ position: "relative" }}>
            <button
              ref={btnRef}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                background: "none",
                border: "none",
                padding: "0.5rem",
                cursor: "none",
                color: "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {menuOpen
                ? <X size={32} strokeWidth={2} />
                : <Menu size={32} strokeWidth={2} />}
            </button>

            {menuOpen && (
              <div
                ref={menuRef}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: "0.5rem",
                  marginLeft: "1rem",
                  width: "220px",
                  background: "rgba(4,7,13,0.96)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "0.75rem",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
                  backdropFilter: "blur(16px)",
                  zIndex: 100,
                }}
              >
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "0.45rem 0.6rem",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: item.highlight ? "#C3E41D" : "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                      borderRadius: "6px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C3E41D")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = item.highlight ? "#C3E41D" : "rgba(255,255,255,0.85)")}
                  >
                    {item.label.toUpperCase()}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Signature monogram */}
          <span
            style={{
              fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
              fontSize: "2.5rem",
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1,
            }}
          >
            R
          </span>

          {/* Eyebrow pill */}
          <span
            style={{
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--cyan)",
              border: "1px solid rgba(103,232,249,0.25)",
              borderRadius: "999px",
              padding: "0.3rem 0.85rem",
            }}
          >
            {hero.eyebrow}
          </span>
        </nav>
      </header>

      {/* ── Body: name + photo + bottom content in normal flow ─────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "6rem",   /* clear the fixed header */
          paddingBottom: "7rem", /* clear the chevron */
          gap: 0,
          textAlign: "center",
          width: "100%",
        }}
      >
        {/* Name + photo block — fills viewport width like the reference */}
        <div style={{ position: "relative", width: "100%", lineHeight: 0, overflow: "visible" }}>
          {/* First name */}
          <BlurText
            text="RANJITH"
            delay={80}
            startDelay={0}
            animateBy="letters"
            direction="top"
            className="justify-center whitespace-nowrap"
            style={{
              fontFamily: "'Fira Code', monospace",
              fontWeight: 700,
              fontSize: "clamp(4.5rem, 17.5vw, 17rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              color: "#C3E41D",
              display: "flex",
              margin: 0,
              padding: 0,
            }}
          />

          {/* Profile photo — absolutely centred over both name rows */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 50,
              lineHeight: 0,
              width: "clamp(52px, 6.5vw, 100px)",
              height: "clamp(80px, 10.5vw, 160px)",
              transition: "transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.45s ease",
              borderRadius: "999px",
              overflow: "hidden",
              boxShadow: "0 16px 48px rgba(0,0,0,0.8)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(-50%, -50%) scale(5)";
              e.currentTarget.style.boxShadow = "0 40px 120px rgba(0,0,0,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.8)";
            }}
          >
            <img
              src="/assets/profilePic.png"
              alt="Ranjith Anthoti"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Last name — starts after RANJITH finishes (7 letters × 80ms + 500ms transition) */}
          <BlurText
            text="ANTHOTI"
            delay={80}
            startDelay={1060}
            animateBy="letters"
            direction="top"
            className="justify-center whitespace-nowrap"
            style={{
              fontFamily: "'Fira Code', monospace",
              fontWeight: 700,
              fontSize: "clamp(4.5rem, 17.5vw, 17rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              color: "#C3E41D",
              display: "flex",
              margin: 0,
              padding: 0,
            }}
          />
        </div>

        {/* Divider */}
        <div style={{ width: "48px", height: "1px", background: "rgba(255,255,255,0.12)", margin: "2.5rem auto 2rem" }} />

        {/* Tagline — starts after both names finish (1060 + 7×80 + 500) */}
        <BlurText
          text={hero.description.split(".")[0] + "."}
          delay={40}
          startDelay={2120}
          animateBy="words"
          direction="top"
          className="justify-center text-center"
          style={{
            fontFamily: "'Antic', sans-serif",
            fontSize: "clamp(0.82rem, 1.3vw, 1rem)",
            color: "rgba(255,255,255,0.45)",
            maxWidth: "52ch",
            lineHeight: 1.7,
            padding: "0 1.5rem",
          }}
        />

        {/* Metrics */}
        <div
          style={{
            display: "flex",
            gap: "clamp(1.5rem, 4vw, 4rem)",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          {hero.metrics.map((m) => (
            <MetricPill key={m.label} metric={m} />
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", justifyContent: "center", marginTop: "2rem" }}>
          {hero.actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`btn-clay ${action.variant === "primary" ? "btn-clay--lime" : "btn-clay--cyan"}`}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Scroll chevron ──────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ChevronDown
          size={28}
          style={{ color: "rgba(255,255,255,0.3)", display: "block" }}
        />
      </div>
    </section>
  );
}
