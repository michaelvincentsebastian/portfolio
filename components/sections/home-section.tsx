"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useSection } from "@/lib/section-context";
import { useEffect, useState, useRef } from "react";

function TerminalCard() {
  const { t } = useLanguage();
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const totalLines = t.home.terminalLines.length;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setDisplayedLines(current);
      if (current >= totalLines) clearInterval(interval);
    }, 400);

    // Count up visitor number
    const target = 1610;
    let count = 0;
    const step = Math.ceil(target / 40);
    const counterInterval = setInterval(() => {
      count = Math.min(count + step, target);
      setVisitorCount(count);
      if (count >= target) clearInterval(counterInterval);
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(counterInterval);
    };
  }, [t.home.terminalLines.length]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full max-w-md rounded-xl border border-border bg-terminal-bg overflow-hidden"
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">bash</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-sm leading-relaxed">
        {t.home.terminalLines.map((line, i) => {
          if (i >= displayedLines) return null;
          if ("prompt" in line && "command" in line) {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex"
              >
                <span className="text-green-400">{line.prompt}</span>
                <span className="text-terminal-text">{line.command}</span>
                {i === displayedLines - 1 && (
                  <span className="terminal-cursor ml-0.5 inline-block h-4 w-2 bg-terminal-text" />
                )}
              </motion.div>
            );
          }
          if ("output" in line) {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-accent"
              >
                {line.output}
              </motion.div>
            );
          }
          return null;
        })}
      </div>

      {/* Visitor count */}
      <div className="border-t border-border px-4 py-3 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="font-mono text-xs text-muted-foreground">
          {t.home.visitors}: {visitorCount.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
}

export function HomeSection() {
  const { t } = useLanguage();
  const { setActiveSection } = useSection();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        {/* Left content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1"
        >
          <motion.p
            variants={itemVariants}
            className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl"
          >
            {t.home.greeting}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold text-accent md:text-5xl lg:text-6xl text-balance"
          >
            {t.home.name}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-2 inline-block rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-sm font-medium text-accent"
          >
            {t.home.position}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty"
          >
            {t.home.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-8 flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection("contact")}
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-shadow hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              {t.home.hireMeBtn}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection("projects")}
              className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              {t.home.seeWorkBtn}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right terminal card */}
        <div className="flex-shrink-0">
          <TerminalCard />
        </div>
      </div>

      {/* What I Like tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16"
      >
        <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-muted-foreground">
          {t.home.whatILikeTitle}
        </h3>
        <div className="flex flex-wrap gap-3">
          {t.home.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.05 }}
              whileHover={{
                scale: 1.08,
                backgroundColor: "var(--accent)",
                color: "var(--accent-foreground)",
              }}
              className="cursor-default rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
