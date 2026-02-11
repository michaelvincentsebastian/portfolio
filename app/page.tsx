"use client";

import { Sidebar } from "@/components/sidebar";
import { Particles } from "@/components/particles";
import { SectionWrapper } from "@/components/section-wrapper";
import { HomeSection } from "@/components/sections/home-section";
import { TechStackSection } from "@/components/sections/techstack-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import { useSection, type Section } from "@/lib/section-context";
import { useEffect, useCallback } from "react";

const sections: Section[] = ["home", "techstack", "projects", "experience", "contact"];

export default function Home() {
  const { activeSection, setActiveSection } = useSection();

  const navigateSection = useCallback(
    (direction: "next" | "prev") => {
      const currentIndex = sections.indexOf(activeSection);
      const nextIndex =
        direction === "next"
          ? Math.min(currentIndex + 1, sections.length - 1)
          : Math.max(currentIndex - 1, 0);
      setActiveSection(sections[nextIndex]);
    },
    [activeSection, setActiveSection]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        navigateSection("next");
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        navigateSection("prev");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateSection]);

  return (
    <main className="relative h-screen bg-background overflow-y-auto overflow-x-hidden">
      <Particles />

      {/* Ambient glow effects */}
      <div
        className="pointer-events-none fixed top-0 right-0 z-0 h-96 w-96 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 z-0 h-64 w-64 rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <Sidebar />

      <div className="relative z-10">
        <SectionWrapper isActive={activeSection === "home"} sectionKey="home">
          <HomeSection />
        </SectionWrapper>

        <SectionWrapper
          isActive={activeSection === "techstack"}
          sectionKey="techstack"
        >
          <TechStackSection />
        </SectionWrapper>

        <SectionWrapper
          isActive={activeSection === "projects"}
          sectionKey="projects"
        >
          <ProjectsSection />
        </SectionWrapper>

        <SectionWrapper
          isActive={activeSection === "experience"}
          sectionKey="experience"
        >
          <ExperienceSection />
        </SectionWrapper>

        <SectionWrapper
          isActive={activeSection === "contact"}
          sectionKey="contact"
        >
          <ContactSection />
        </SectionWrapper>
      </div>
    </main>
  );
}
