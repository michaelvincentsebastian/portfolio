"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Section = "home" | "techstack" | "projects" | "experience" | "contact";

type SectionContextType = {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<Section>("home");

  const setActiveSection = useCallback((section: Section) => {
    setActiveSectionState(section);
  }, []);

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within SectionProvider");
  }
  return context;
}
