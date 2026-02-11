"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Briefcase, Users, Trophy } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const iconMap = [GraduationCap, Users, Trophy, Award, Award, Briefcase];
const colorMap = [
  "bg-accent/20 text-accent border-accent/30",
  "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
  "bg-accent-secondary/20 text-accent-secondary border-accent-secondary/30",
];

export function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-foreground md:text-5xl text-balance">
          {t.experience.title}{" "}
          <span className="text-accent">{t.experience.titleAccent}</span>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          {t.experience.description}
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative mt-12">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-accent via-accent/50 to-transparent md:left-1/2" />

        <div className="flex flex-col gap-8">
          {t.experience.items.map((item, i) => {
            const Icon = iconMap[i] || Award;
            const color = colorMap[i] || colorMap[0];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={`relative flex items-start gap-6 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 z-10 flex h-full items-start md:left-1/2 md:-translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border ${color} backdrop-blur-sm`}
                  >
                    <Icon size={20} />
                  </motion.div>
                </div>

                {/* Content card */}
                <div
                  className={`ml-20 w-full md:ml-0 md:w-[calc(50%-3rem)] ${
                    isLeft ? "md:pr-4" : "md:pl-4"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.06)]"
                  >
                    <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {item.date}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
