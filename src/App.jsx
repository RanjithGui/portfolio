import { useEffect, useState } from "react";
import { BackgroundFX } from "./components/BackgroundFX";
import { CustomCursor } from "./components/CustomCursor";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ResumeSection } from "./components/ResumeSection";
import { ContactSection } from "./components/ContactSection";
import { portfolioData } from "./data/portfolioData";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import { useTiltCards } from "./hooks/useTiltCards";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`scroll-to-top${visible ? " scroll-to-top--visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function App() {
  useRevealOnScroll();
  useTiltCards();

  return (
    <>
      <CustomCursor />
      <BackgroundFX />
      <main>
        <HeroSection hero={portfolioData.hero} navigation={portfolioData.navigation} />
        <AboutSection about={portfolioData.about} />
        <ProjectsSection projects={portfolioData.projects} />
        <ResumeSection resume={portfolioData.resume} />
        <ContactSection contact={portfolioData.contact} />
      </main>
      <ScrollToTop />
    </>
  );
}
