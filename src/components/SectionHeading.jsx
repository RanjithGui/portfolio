export function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading reveal" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}
