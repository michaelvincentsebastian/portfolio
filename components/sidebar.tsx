"use client";

import { motion } from "framer-motion";
import {
  Home,
  Settings,
  Code2,
  Route,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";
import { useSection, type Section } from "@/lib/section-context";
import { cn } from "@/lib/utils";

function ThemeIcon({ size = 18 }: { size?: number }) {
  return (
    <>
      <Sun size={size} className="hidden dark:block" />
      <Moon size={size} className="block dark:hidden" />
    </>
  );
}

const navItems: { id: Section; icon: typeof Home }[] = [
  { id: "home", icon: Home },
  { id: "techstack", icon: Settings },
  { id: "projects", icon: Code2 },
  { id: "experience", icon: Route },
  { id: "contact", icon: Mail },
];

const sectionColors: Record<Section, string> = {
  home: "text-accent shadow-[0_0_15px_rgba(6,182,212,0.4)]",
  techstack: "text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]",
  projects: "text-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.4)]",
  experience: "text-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.4)]",
  contact: "text-accent-secondary shadow-[0_0_15px_rgba(239,68,68,0.4)]",
};

const sectionBorderColors: Record<Section, string> = {
  home: "border-accent",
  techstack: "border-emerald-400",
  projects: "border-fuchsia-400",
  experience: "border-pink-400",
  contact: "border-accent-secondary",
};

export function Sidebar() {
  const { activeSection, setActiveSection } = useSection();
  const { setTheme, resolvedTheme } = useTheme();
  const { locale, setLocale } = useLanguage();

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex"
      >
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-card/80 p-2 backdrop-blur-xl border border-border">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300",
                  isActive
                    ? cn(
                        "bg-card border",
                        sectionColors[item.id],
                        sectionBorderColors[item.id]
                      )
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                aria-label={item.id}
              >
                <Icon size={20} />
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className={cn(
                      "absolute -left-2 h-6 w-1 rounded-full bg-current"
                    )}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Theme & Language toggles */}
        <div className="mt-2 flex flex-col items-center gap-2 rounded-2xl bg-card/80 p-2 backdrop-blur-xl border border-border">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
            aria-label="Toggle theme"
          >
            <ThemeIcon size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocale(locale === "en" ? "id" : "en")}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
            aria-label="Toggle language"
          >
            <span className="text-xs font-bold font-mono">
              {locale === "en" ? "ID" : "EN"}
            </span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Bottom Nav */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 md:hidden"
      >
        <div className="flex items-center gap-1 rounded-2xl bg-card/90 p-2 backdrop-blur-xl border border-border">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                  isActive
                    ? cn(
                        "bg-card border",
                        sectionColors[item.id],
                        sectionBorderColors[item.id]
                      )
                    : "text-muted-foreground"
                )}
                aria-label={item.id}
              >
                <Icon size={18} />
              </motion.button>
            );
          })}

          {/* Divider */}
          <div className="mx-1 h-6 w-px bg-border" />

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground"
            aria-label="Toggle theme"
          >
            <ThemeIcon size={16} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setLocale(locale === "en" ? "id" : "en")}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground"
            aria-label="Toggle language"
          >
            <span className="text-[10px] font-bold font-mono">
              {locale === "en" ? "ID" : "EN"}
            </span>
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
}
