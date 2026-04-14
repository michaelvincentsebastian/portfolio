"use client";

import { notFound } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Github, ExternalLink, BookOpen,
  CheckCircle2, ArrowRight, Database, HardDrive,
  Server, Monitor, Settings, GitBranch, Mail,
  Lock, User, TrendingUp, Sparkles, Zap, Brain,
  Filter, RefreshCw, Bell, Target, Layers, BarChart2,
  ChevronDown, ChevronUp,
} from "lucide-react";
import {
  getProjectById,
  type ProjectDetail, type Feature,
  type HomeTab, type TechnicalTab, type ResultTab,
  type ComponentCard,
} from "@/lib/projects-data";
import { useLanguage } from "@/lib/language-context";

// ── Icon map ────────────────────────────────────────────────
type LucideComp = React.ComponentType<{ size?: number; className?: string }>;
const ICONS: Record<string, LucideComp> = {
  Database, HardDrive, Server, Monitor, Settings, GitBranch,
  Mail, Lock, User, TrendingUp, Sparkles, Zap, Brain,
  Filter, RefreshCw, Bell, Target, Layers, BarChart2,
  BookOpen, CheckCircle2,
};
function DynIcon({ name, size = 20 }: { name?: string; size?: number }) {
  const C = (name && ICONS[name]) ? ICONS[name] : Zap;
  return <C size={size} />;
}

// ── Status style ────────────────────────────────────────────
const STATUS: Record<string, string> = {
  "Completed":   "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "In Progress": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Archived":    "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

// ── Shared helpers ───────────────────────────────────────────
function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-xs font-bold text-accent opacity-60">{number}</span>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

// ── Tab label map ────────────────────────────────────────────
const TAB_LABELS: Record<string, Record<"en"|"id", string>> = {
  home:      { en: "Home",      id: "Beranda"  },
  technical: { en: "Technical", id: "Teknikal" },
  result:    { en: "Result",    id: "Hasil"    },
};

// ── Component accordion card ─────────────────────────────────
function ComponentAccordion({ card }: { card: ComponentCard }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <DynIcon name={card.icon} size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{card.title}</p>
          <p className="text-xs text-muted-foreground truncate">{card.summary}</p>
        </div>
        <div className="shrink-0 text-muted-foreground">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 text-sm leading-relaxed text-muted-foreground border-t border-border">
              {card.detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════
// TAB CONTENTS
// ════════════════════════════════════════════════════════════

function HomeContent({ data, locale }: { data: HomeTab; locale: "en"|"id" }) {
  const labels = {
    vision:  locale === "en" ? "Vision" : "Visi",
    mission: locale === "en" ? "Mission" : "Misi",
    users:   locale === "en" ? "Target Users" : "Target Pengguna",
    problems:  locale === "en" ? "Problems" : "Hambatan",
    solutions: locale === "en" ? "Solutions" : "Solusi",
  };

  return (
    <div className="flex flex-col gap-14">
      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg leading-relaxed text-muted-foreground"
      >
        {data.tagline}
      </motion.p>

      {/* Vision & Mission */}
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: labels.vision,  text: data.vision,  color: "border-accent/40 bg-accent/5" },
          { label: labels.mission, text: data.mission, color: "border-fuchsia-400/40 bg-fuchsia-400/5" },
        ].map(({ label, text, color }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border p-6 ${color}`}
          >
            <p className="mb-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">{label}</p>
            <p className="text-sm leading-relaxed text-foreground">{text}</p>
          </motion.div>
        ))}
      </div>

      {/* Target Users */}
      <div>
        <SectionHeading number="01" title={labels.users} />
        <div className="grid gap-4 md:grid-cols-3">
          {data.targetUsers.map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <User size={18} />
              </div>
              <p className="mb-1 text-sm font-bold text-foreground">{u.role}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{u.motivation}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Problems */}
      <div>
        <SectionHeading number="02" title={labels.problems} />
        <div className="flex flex-col gap-4">
          {data.problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 rounded-xl border border-accent-secondary/25 bg-accent-secondary/5 p-5"
            >
              <span className="font-mono text-lg font-bold text-accent-secondary/50 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="mb-1 text-sm font-semibold text-foreground">{p.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Solutions */}
      <div>
        <SectionHeading number="03" title={labels.solutions} />
        <div className="flex flex-col gap-4">
          {data.solutions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 rounded-xl border border-accent/25 bg-accent/5 p-5"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <CheckCircle2 size={14} />
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-foreground">{s.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechnicalContent({ data, locale }: { data: TechnicalTab; locale: "en"|"id" }) {
  const labels = {
    components: locale === "en" ? "Components" : "Komponen",
    pipeline:   locale === "en" ? "Data Pipeline Layers" : "Layer Data Pipeline",
    techStack:  locale === "en" ? "Tech Stack" : "Tech Stack",
    features:   locale === "en" ? "Key Features" : "Fitur Utama",
  };

  return (
    <div className="flex flex-col gap-14">
      {/* Overview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-8"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">{data.overview}</p>
      </motion.div>

      {/* Components — accordion */}
      <div>
        <SectionHeading number="01" title={labels.components} />
        <div className="grid gap-3 md:grid-cols-2">
          {data.components.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <ComponentAccordion card={c} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pipeline Layers */}
      <div>
        <SectionHeading number="02" title={labels.pipeline} />
        <div className="grid gap-4 md:grid-cols-3">
          {data.pipelineLayers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border p-5 ${layer.color} ${layer.borderColor}`}
            >
              <p className="mb-3 text-sm font-bold text-foreground">{layer.name}</p>
              <ul className="flex flex-col gap-2">
                {layer.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <SectionHeading number="03" title={labels.techStack} />
        <div className="flex flex-wrap gap-3">
          {data.techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3, scale: 1.05 }}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 hover:border-accent/50 transition-all"
            >
              {tech.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tech.icon} alt={tech.name} className="h-8 w-8 object-contain" loading="lazy" />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Zap size={14} />
                </div>
              )}
              <span className="text-[11px] font-medium text-foreground text-center">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <SectionHeading number="04" title={labels.features} />
        <div className="grid gap-4 md:grid-cols-2">
          {data.features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex gap-4 rounded-xl border border-border bg-card p-5 hover:border-accent/30 transition-colors"
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <DynIcon name={f.icon} />
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-foreground">{f.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultContent({ data, locale }: { data: ResultTab; locale: "en"|"id" }) {
  const screenshotLabel = locale === "en" ? "Screenshots / Demo" : "Screenshot / Demo";
  return (
    <div className="flex flex-col gap-12">
      {/* Confidentiality note */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
            <Lock size={16} />
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{data.note}</p>
        </div>
      </motion.div>

      {/* Screenshots */}
      {data.screenshots.length > 0 && (
        <div>
          <SectionHeading number="01" title={screenshotLabel} />
          <div className="grid gap-6 md:grid-cols-2">
            {data.screenshots.map((shot, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="w-full object-cover"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {shot.caption && (
                  <figcaption className="border-t border-border px-4 py-3 text-center text-xs text-muted-foreground">
                    {shot.caption}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            {locale === "en"
              ? "Place screenshot files at "
              : "Letakkan file screenshot di "}
            <code className="font-mono text-accent">/public/images/projects/</code>
          </p>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// NON-TABBED LAYOUT (ProspectingEngine fallback)
// ════════════════════════════════════════════════════════════
const LAYER_COLOR: Record<string, string> = {
  "bg-amber-700/30": "bg-amber-700/30 border-amber-600/40",
  "bg-slate-400/20": "bg-slate-400/20 border-slate-400/30",
  "bg-yellow-400/20": "bg-yellow-400/20 border-yellow-400/30",
};

function DefaultContent({ project }: { project: ProjectDetail }) {
  return (
    <div className="flex flex-col gap-20">
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <SectionHeading number="01" title="Overview" />
        <div className="rounded-2xl border border-border bg-card p-8">
          <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">{project.overview}</p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
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

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <SectionHeading number="03" title="Problem Statement" />
        <div className="rounded-2xl border border-accent-secondary/30 bg-accent-secondary/5 p-8">
          <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">{project.problemStatement}</p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <SectionHeading number="04" title="Architecture / System Design" />
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">{project.architecture.description}</p>
          </div>
          {project.architecture.imageSrc && (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.architecture.imageSrc} alt={project.architecture.imageAlt ?? "Architecture"} className="w-full object-contain" loading="lazy" />
            </div>
          )}
          {project.architecture.layers && project.architecture.layers.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {project.architecture.layers.map((layer, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`rounded-xl border p-5 ${LAYER_COLOR[layer.color] ?? "border-border bg-card"}`}>
                  <p className="mb-2 text-sm font-bold text-foreground">{layer.name}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{layer.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <SectionHeading number="05" title="Tech Stack" />
        <div className="flex flex-wrap gap-4">
          {project.techStack.map((tech, i) => (
            <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4, scale: 1.05 }} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-5 py-4 hover:border-accent/50 transition-all">
              {tech.icon && <img src={tech.icon} alt={tech.name} className="h-9 w-9 object-contain" loading="lazy" />}
              <span className="text-xs font-medium text-foreground">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <SectionHeading number="06" title="Data Pipeline Workflow" />
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-muted-foreground mb-2">{project.pipeline.description}</p>
          <div className="relative flex flex-col gap-4 md:flex-row md:items-stretch md:gap-0">
            {project.pipeline.steps.map((step, i) => (
              <div key={i} className="relative flex items-stretch md:flex-1">
                <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex w-full flex-col gap-2 rounded-xl border border-border bg-card p-5 hover:border-accent/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent">{String(step.step).padStart(2, "0")}</span>
                    {step.tool && <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground font-mono">{step.tool}</span>}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{step.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                </motion.div>
                {i < project.pipeline.steps.length - 1 && (
                  <div className="hidden items-center px-1 text-muted-foreground md:flex"><ArrowRight size={14} /></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <SectionHeading number="07" title="Key Features" />
        <div className="grid gap-4 md:grid-cols-2">
          {project.features.map((feature: Feature, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex gap-4 rounded-xl border border-border bg-card p-5 hover:border-accent/30 transition-colors">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <DynIcon name={feature.icon} />
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-foreground">{feature.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <SectionHeading number="08" title="Results / Insights" />
        <div className="flex flex-col gap-6">
          <p className="rounded-2xl border border-border bg-card p-8 text-base leading-relaxed text-muted-foreground">{project.results.summary}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {project.results.metrics.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-1 rounded-xl border border-accent/20 bg-accent/5 p-6 text-center">
                <span className={`text-4xl font-bold ${project.color}`}>{m.metric}</span>
                <span className="text-sm font-semibold text-foreground">{m.label}</span>
                {m.description && <span className="text-xs text-muted-foreground mt-1">{m.description}</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {project.screenshots.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <SectionHeading number="09" title="Screenshots / Demo" />
          <div className="grid gap-6 md:grid-cols-2">
            {project.screenshots.map((shot, i) => (
              <motion.figure key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="overflow-hidden rounded-2xl border border-border bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt={shot.alt} className="w-full object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {shot.caption && <figcaption className="px-4 py-3 text-center text-xs text-muted-foreground border-t border-border">{shot.caption}</figcaption>}
              </motion.figure>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════════
export default function ProjectDetailPage() {
  const params  = useParams();
  const router  = useRouter();
  const { locale } = useLanguage();
  const lang = locale as "en" | "id";

  const id      = typeof params?.id === "string" ? params.id : undefined;
  const project: ProjectDetail | undefined = id ? getProjectById(id) : undefined;

  const [activeTab, setActiveTab] = useState<"home" | "technical" | "result">("home");

  if (!project) notFound();

  const tabbed = project.tabbed;

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── HERO ────────────────────────────────────────── */}
      <div className={`relative overflow-hidden border-b border-border bg-gradient-to-br ${project.gradient}`}>
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 70% 50%, var(--accent) 0%, transparent 60%)" }} />

        <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
          <motion.button
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            onClick={() => router.back()}
            className="mb-10 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground group transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${STATUS[project.status] ?? STATUS["Completed"]}`}>{project.status}</span>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">{project.badge}</span>
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground font-mono">{project.year}</span>
            </div>

            <h1 className={`text-4xl font-bold md:text-5xl lg:text-6xl ${project.color}`}>{project.title}</h1>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">{project.tagline}</p>

            <div className="mt-2 flex flex-wrap gap-3">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm hover:border-accent/50 hover:text-accent transition-all">
                  <Github size={16} /> GitHub
                </a>
              )}
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {project.links.docs && (
                <a href={project.links.docs} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-5 py-2.5 text-sm font-semibold text-muted-foreground backdrop-blur-sm hover:text-foreground transition-all">
                  <BookOpen size={16} /> Docs
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── TABS (only for tabbed projects) ─────────────── */}
      {tabbed && (
        <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex gap-0">
              {tabbed.tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-4 text-sm font-semibold transition-colors ${
                    activeTab === tab
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {TAB_LABELS[tab][lang]}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" transition={{ type: "spring", stiffness: 400, damping: 35 }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CONTENT ─────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 py-14">
        {tabbed ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "home"      && <HomeContent      data={tabbed.home[lang]}      locale={lang} />}
              {activeTab === "technical" && <TechnicalContent data={tabbed.technical[lang]} locale={lang} />}
              {activeTab === "result"    && <ResultContent    data={tabbed.result[lang]}    locale={lang} />}
            </motion.div>
          </AnimatePresence>
        ) : (
          <DefaultContent project={project} />
        )}

        {/* Back button */}
        <div className="mt-16 pb-8 text-center">
          <button onClick={() => router.back()} className="flex items-center gap-2 mx-auto text-sm text-muted-foreground hover:text-foreground group transition-colors">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}