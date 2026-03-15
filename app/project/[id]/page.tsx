"use client";

// ============================================================
// app/projects/[id]/page.tsx
// Halaman detail proyek — dynamic route berdasarkan project id
// ============================================================

import { notFound } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Globe,
  Target,
  Layers,
  BarChart2,
  Database,
  Brain,
  Filter,
  RefreshCw,
  Bell,
  Zap,
  Code2,
} from "lucide-react";
import { getProjectById, type ProjectDetail, type Feature } from "@/lib/projects-data";

// Map icon name string → Lucide component
const iconComponents: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Target, Layers, BarChart2, Database, Brain, Filter, RefreshCw, Bell, Zap, Code2, CheckCircle2, Globe,
};

function FeatureIcon({ name }: { name?: string }) {
  const Icon = (name && iconComponents[name]) ? iconComponents[name] : Zap;
  return <Icon size={20} />;
}

// Status badge styling
const statusStyle: Record<string, string> = {
  "Completed":   "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "In Progress": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Archived":    "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

// Layer colors fallback
const layerColorMap: Record<string, string> = {
  "bg-amber-700/30": "bg-amber-700/30 border-amber-600/40",
  "bg-slate-400/20": "bg-slate-400/20 border-slate-400/30",
  "bg-yellow-400/20": "bg-yellow-400/20 border-yellow-400/30",
};

// ---- Reusable section heading ----
function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-xs font-bold text-accent opacity-60">{number}</span>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

// ---- Main page component ----
export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = typeof params?.id === "string" ? params.id : undefined;
  const project: ProjectDetail | undefined = id ? getProjectById(id) : undefined;

  if (!project) {
    notFound();
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ---- HERO ---- */}
      <div className={`relative overflow-hidden border-b border-border bg-gradient-to-br ${project.gradient}`}>
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at 70% 50%, var(--accent) 0%, transparent 60%)" }}
        />

        <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => router.back()}
            className="mb-10 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </motion.button>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            {/* Badge row */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[project.status] ?? statusStyle["Completed"]}`}>
                {project.status}
              </span>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {project.badge}
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground font-mono">
                {project.year}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className={`text-4xl font-bold md:text-5xl lg:text-6xl ${project.color}`}
            >
              {project.title}
            </motion.h1>

            {/* Tagline */}
            <motion.p variants={itemVariants} className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {project.tagline}
            </motion.p>

            {/* Links */}
            <motion.div variants={itemVariants} className="mt-2 flex flex-wrap gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-accent/50 hover:text-accent"
                >
                  <Github size={16} /> GitHub
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {project.links.docs && (
                <a
                  href={project.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-5 py-2.5 text-sm font-semibold text-muted-foreground backdrop-blur-sm transition-all hover:border-border hover:text-foreground"
                >
                  <BookOpen size={16} /> Docs
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ---- CONTENT ---- */}
      <div className="mx-auto max-w-5xl px-6 py-16 flex flex-col gap-20">

        {/* 01 — OVERVIEW */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading number="01" title="Overview" />
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {project.overview}
            </p>
          </div>
        </motion.section>

        {/* 02 — MY ROLE */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading number="02" title="My Role" />
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className={`mb-6 text-xl font-bold ${project.color}`}>{project.role.title}</p>
            <ul className="flex flex-col gap-3">
              {project.role.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* 03 — PROBLEM STATEMENT */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading number="03" title="Problem Statement" />
          <div className="rounded-2xl border border-accent-secondary/30 bg-accent-secondary/5 p-8">
            <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {project.problemStatement}
            </p>
          </div>
        </motion.section>

        {/* 04 — ARCHITECTURE / SYSTEM DESIGN */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading number="04" title="Architecture / System Design" />
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-8">
              <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                {project.architecture.description}
              </p>
            </div>

            {/* Architecture diagram image */}
            {project.architecture.imageSrc && (
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.architecture.imageSrc}
                  alt={project.architecture.imageAlt ?? "Architecture Diagram"}
                  className="w-full object-contain"
                  loading="lazy"
                />
              </div>
            )}

            {/* Medallion / Layer breakdown */}
            {project.architecture.layers && project.architecture.layers.length > 0 && (
              <div className="grid gap-4 md:grid-cols-3">
                {project.architecture.layers.map((layer, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-xl border p-5 ${layerColorMap[layer.color] ?? "border-border bg-card"}`}
                  >
                    <p className="mb-2 text-sm font-bold text-foreground">{layer.name}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{layer.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* 05 — TECH STACK */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading number="05" title="Tech Stack" />
          <div className="flex flex-wrap gap-4">
            {project.techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-accent/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.08)]"
              >
                {tech.icon && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tech.icon} alt={tech.name} className="h-9 w-9 object-contain" loading="lazy" />
                )}
                <span className="text-xs font-medium text-foreground">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 06 — DATA PIPELINE WORKFLOW */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading number="06" title="Data Pipeline Workflow" />
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-muted-foreground mb-2">{project.pipeline.description}</p>

            {/* Pipeline steps — horizontal flow on desktop */}
            <div className="relative flex flex-col gap-4 md:flex-row md:items-stretch md:gap-0">
              {project.pipeline.steps.map((step, i) => (
                <div key={i} className="relative flex items-stretch md:flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex w-full flex-col gap-2 rounded-xl border border-border bg-card p-5 hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-accent">
                        {String(step.step).padStart(2, "0")}
                      </span>
                      {step.tool && (
                        <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground font-mono">
                          {step.tool}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                  </motion.div>

                  {/* Arrow connector between steps (desktop only) */}
                  {i < project.pipeline.steps.length - 1 && (
                    <div className="hidden items-center px-1 text-muted-foreground md:flex">
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 07 — KEY FEATURES */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading number="07" title="Key Features" />
          <div className="grid gap-4 md:grid-cols-2">
            {project.features.map((feature: Feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-xl border border-border bg-card p-5 hover:border-accent/30 transition-colors"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <FeatureIcon name={feature.icon} />
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold text-foreground">{feature.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 08 — RESULTS / INSIGHTS */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading number="08" title="Results / Insights" />
          <div className="flex flex-col gap-6">
            <p className="rounded-2xl border border-border bg-card p-8 text-base leading-relaxed text-muted-foreground">
              {project.results.summary}
            </p>

            {/* Metrics grid */}
            <div className="grid gap-4 md:grid-cols-3">
              {project.results.metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-1 rounded-xl border border-accent/20 bg-accent/5 p-6 text-center"
                >
                  <span className={`text-4xl font-bold ${project.color}`}>{m.metric}</span>
                  <span className="text-sm font-semibold text-foreground">{m.label}</span>
                  {m.description && (
                    <span className="text-xs text-muted-foreground mt-1">{m.description}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 09 — SCREENSHOTS / DEMO */}
        {project.screenshots.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading number="09" title="Screenshots / Demo" />
            <div className="grid gap-6 md:grid-cols-2">
              {project.screenshots.map((shot, i) => (
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      // Placeholder jika gambar tidak ditemukan
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {shot.caption && (
                    <figcaption className="px-4 py-3 text-center text-xs text-muted-foreground border-t border-border">
                      {shot.caption}
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              {/* [EDIT: Hapus baris ini jika semua screenshot sudah tersedia] */}
              ⚠️ Gambar di atas memerlukan file screenshot di folder{" "}
              <code className="font-mono text-accent">/public/images/projects/</code>
            </p>
          </motion.section>
        )}

        {/* 10 — GITHUB / DEMO LINK (bottom CTA) */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-card p-10 text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Interested in this project?
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Check out the source code or see it in action.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent/50 hover:text-accent"
              >
                <Github size={16} /> View on GitHub
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground"
              >
                <BookOpen size={16} /> Documentation
              </a>
            )}
            {!project.links.github && !project.links.demo && !project.links.docs && (
              <p className="text-sm text-muted-foreground italic">
                Links belum tersedia — tambahkan di <code className="font-mono text-accent">lib/projects-data.ts</code>
              </p>
            )}
          </div>
        </motion.section>

        {/* Back button (bottom) */}
        <div className="pb-8 text-center">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mx-auto text-sm text-muted-foreground transition-colors hover:text-foreground group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}