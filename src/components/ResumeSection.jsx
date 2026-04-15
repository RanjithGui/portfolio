import { ContainerScroll } from "./ui/container-scroll-animation";

export function ResumeSection({ resume }) {
  return (
    <section id="resume" className="section section-grid" style={{ paddingBottom: 0 }}>
      <ContainerScroll
        titleComponent={
          <div className="section-heading" style={{ maxWidth: "54rem", margin: "0 auto" }}>
            <p className="eyebrow">Resume</p>
            <h2>{resume.title}</h2>
          </div>
        }
      >
        <div className="resume-layout" style={{ padding: "1.5rem" }}>
          <article className="glass resume-summary" data-tilt>
            <p className="card-kicker">Professional Summary</p>
            <h3>{resume.summaryTitle}</h3>
            <p>{resume.summary}</p>
            <a className="btn-clay btn-clay--lime" href={resume.downloadHref} download>
              Download Resume
            </a>
          </article>

          <div className="timeline">
            {resume.timeline.map((item) => (
              <article key={item.title} className="timeline-item glass" data-tilt>
                <span className="timeline-date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
