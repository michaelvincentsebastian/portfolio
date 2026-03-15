"use client";

// ============================================================
// components/sections/projects-section.tsx (UPDATED)
// Perubahan: ProjectCard sekarang bisa dinavigasi ke halaman detail
// menggunakan next/navigation dan next/link
// ============================================================

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Project = {
  id: string;
  tags: string[];
  color: string;
  gradient: string;
};

const projectsData: Project[] = [
  {
    id: "campussly",
    tags: ["DuckDB", "PostgreSQL", "MinIO", "DuckLake", "SQLMesh", "SmolLM2"],
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 to-teal-500/20",
  },
  {
    id: "prospectingEngine",
    tags: ["Docker", "n8n", "AI Agent", "Gemini 2.5", "TwentyCRM", "PostgreSQL"],
    color: "text-fuchsia-400",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const projectContent =
    project.id === "campussly" ? t.projects.campussly : t.projects.prospectingEngine;

  function handleClick() {
    router.push(`/projects/${project.id}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {/* Card header with gradient */}
      <div
        className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
      >
        <motion.div
          animate={isHovered ? { scale: 1.1, rotate: 2 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-wrap justify-center gap-2 px-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-background/30 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground/80 border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Hover overlay — "View Details" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: isHovered ? 1 : 0.8 }}
            className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            <ExternalLink size={16} />
            <span>View Details</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`text-lg font-bold ${project.color}`}>
            {projectContent.name}
          </h3>
          {/* Arrow icon yang muncul saat hover */}
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -4 }}
            className="shrink-0 text-muted-foreground"
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {projectContent.description}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.05 }}
              className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* "View Details" text link di bagian bawah */}
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-accent">
          View project details
          <ArrowUpRight size={12} />
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-foreground md:text-5xl text-balance">
          {t.projects.title}{" "}
          <span className="text-accent">{t.projects.titleAccent}</span>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          {t.projects.description}
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projectsData.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}