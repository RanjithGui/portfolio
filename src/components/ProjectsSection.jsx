import { SectionHeading } from "./SectionHeading";

function ProjectVisual({ variant }) {
  if (variant === "billing") {
    return (
      <div className="project-visual billing-visual">
        <div className="ui-window glass">
          <span className="ui-dot" />
          <span className="ui-dot" />
          <span className="ui-dot" />
        </div>
        <div className="project-device">
          <div className="device-notch" />
          <div className="device-ui">
            <h3>Billing Hub</h3>
            <p>Past, current, and future bills with secure PDF access.</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "retail") {
    return (
      <div className="project-visual retail-visual">
        <div className="floating-ticket glass">
          <strong>Retail Check-In</strong>
          <p>Reduce waiting with online pre-check-in.</p>
        </div>
      </div>
    );
  }

  if (variant === "auto") {
    return (
      <div className="project-visual auto-visual">
        <div className="car-card glass">
          <p className="screen-label">Toyota i-Connect</p>
          <h3>Secure onboarding</h3>
          <p>Registration and ownership verification flows.</p>
        </div>
      </div>
    );
  }

  if (variant === "verizon") {
    return (
      <div className="project-visual verizon-visual">
        <div className="compose-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  // StayCured visual
  return (
    <div className="project-visual staycured-visual">
      <div className="sc-phone glass">
        <div className="sc-status-bar">
          <span className="sc-time">9:41</span>
          <span className="sc-brand">StayCured</span>
        </div>
        <div className="sc-hero-card">
          <div className="sc-pulse">
            <svg viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="0,10 6,10 9,2 12,18 15,6 18,14 21,10 40,10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="sc-label">Heart Rate</p>
          <strong className="sc-value">72 bpm</strong>
        </div>
        <div className="sc-stat-row">
          <div className="sc-stat">
            <span>Steps</span>
            <strong>8,240</strong>
          </div>
          <div className="sc-stat">
            <span>Sleep</span>
            <strong>7h 20m</strong>
          </div>
          <div className="sc-stat">
            <span>Water</span>
            <strong>2.1 L</strong>
          </div>
        </div>
        <div className="sc-pill">
          <span className="sc-dot" />
          Appointment Today · 3 PM
        </div>
      </div>
      <div className="sc-badge glass">
        <span>Techunity</span>
      </div>
    </div>
  );
}

export function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="section">
      <SectionHeading eyebrow="Projects" title={projects.title} />

      <div className="project-grid">
        {projects.items.map((project) => (
          <article key={project.title} className="project-card glass reveal" data-reveal data-tilt style={{ transitionDelay: "0ms" }}>
            <ProjectVisual variant={project.variant} />
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-grid compact">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="project-actions">
                {project.actions.map((action, idx) => (
                  <a
                    key={action.label}
                    className={`btn-clay ${idx === 0 ? "btn-clay--lime" : "btn-clay--cyan"}`}
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noreferrer" : undefined}
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
