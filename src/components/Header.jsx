import { useEffect, useState } from "react";

export function Header({ navigation }) {
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    // Collect all section elements that match nav hrefs
    const sectionIds = navigation
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean);

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost entry that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navigation]);

  return (
    <header className="site-header">
      <div className="site-header__shell">
        <a className="brand" href="#top">
          <span className="brand-mark">RA</span>
          <span className="brand-copy">
            <strong>Ranjith Anthoti</strong>
            <span>Senior Android Developer</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeHref === item.href ? "is-active" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contact">
          Let&apos;s Talk
        </a>
      </div>
    </header>
  );
}
