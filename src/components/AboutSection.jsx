import { ContainerScroll } from "./ui/container-scroll-animation";

// SVG icons for the three highlight cards
const HighlightIcons = {
  "01": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8h10M7 11h6" strokeLinecap="round" />
    </svg>
  ),
  "02": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  "03": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

export function AboutSection({ about }) {
  return (
    <section id="about" className="section section-grid" style={{ paddingBottom: 0 }}>
      <ContainerScroll
        titleComponent={
          <div className="section-heading" style={{ maxWidth: "54rem", margin: "0 auto" }}>
            <p className="eyebrow">About</p>
            <h2>{about.title}</h2>
          </div>
        }
      >
        <div className="about-grid" style={{ padding: "1.5rem" }}>
          {about.cards.map((card) => (
            <article key={card.title} className="glass info-card" data-tilt>
              <p className="card-kicker">{card.kicker}</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}

          <article className="glass stack-card" data-tilt>
            <p className="card-kicker">Core Stack</p>
            <div className="tag-grid">
              {about.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>

          <article className="glass highlights-card" data-tilt>
            {about.highlights.map((item) => (
              <div key={item.id} className="highlight-row">
                <div className="highlight-icon-wrap">
                  {HighlightIcons[item.id]}
                </div>
                <div className="highlight-body">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </article>
        </div>
      </ContainerScroll>
    </section>
  );
}
