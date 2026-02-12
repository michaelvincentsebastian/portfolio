"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

type TechItem = {
  name: string;
  icon: string;
  soon?: boolean;
  invertDark?: boolean;
};

type TechCategory = {
  key: string;
  items: TechItem[];
};

const techData: TechCategory[] = [
  {
    key: "programmingLanguages",
    items: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", invertDark: true },
    ],
  },
  {
    key: "dataStorage",
    items: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "DuckDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/duckdb/duckdb-original.svg" },
      { name: "MinIO", icon: "/images/minio.svg" }, // Diubah ke lokal
      { name: "DuckLake", icon: "https://ducklake.select/images/logo/DuckLake-dark-icon.png" },
    ],
  },
  {
    key: "dataOrchestration",
    items: [
      { name: "n8n", icon: "/images/n8n.webp" }, // Diubah ke lokal
      { name: "Airflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg", soon: true },
    ],
  },
  {
    key: "dataTransformation",
    items: [
      { name: "dbt", icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAiZAAZAA0", soon: true },
      { name: "SQLMesh", icon: "https://cdn.prod.website-files.com/67f7cdf0feddc96ca194ff1a/67f7cdf0feddc96ca1950030_symbol-sqlmesh.svg" },
      { name: "Talend", icon: "https://upload.wikimedia.org/wikipedia/commons/7/70/TalendLogoCoral.png" },
      { name: "Apache Spark", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg", soon: true },
    ],
  },
  {
    key: "dataIngestion",
    items: [
      { name: "Airbyte", icon: "/images/airbyte.png", soon: true }, // Diubah ke lokal
      { name: "Kafka", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg", soon: true, invertDark: true },
      { name: "Python Script", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],
  },
  {
    key: "cloudPlatforms",
    items: [
      { name: "AWS S3", icon: "/images/aws-s3.svg" }, // Diubah ke lokal
    ],
  },
  {
    key: "dataVisualization",
    items: [
      { name: "Power BI", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/250px-New_Power_BI_Logo.svg.png" },
      { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg" },
    ],
  },
  {
    key: "professionalTools",
    items: [
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invertDark: true },
      { name: "Notion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg", invertDark: true },
    ],
  },
];

function TechCard({ item, index }: { item: TechItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{
        scale: 1.05,
        y: -4,
      }}
      className="group relative flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]"
    >
      {item.soon && (
        <span className="absolute -top-2 -right-2 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent border border-accent/30">
          Soon
        </span>
      )}
      <div className="flex h-12 w-12 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.icon}
          alt={item.name}
          className={`h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110 ${item.invertDark ? "dark:invert" : "dark:brightness-90 dark:contrast-125"}`}
          loading="lazy"
          crossOrigin="anonymous"
        />
      </div>
      <span className="text-xs font-medium text-card-foreground text-center">
        {item.name}
      </span>
    </motion.div>
  );
}

export function TechStackSection() {
  const { t } = useLanguage();

  const categories = t.techStack.categories;
  const categoryNames = Object.keys(categories) as Array<
    keyof typeof categories
  >;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-foreground md:text-5xl text-balance">
          {t.techStack.title}{" "}
          <span className="text-accent">{t.techStack.titleAccent}</span>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          {t.techStack.description}
        </p>
      </motion.div>

      <div className="mt-12 flex flex-col gap-10">
        {techData.map((category, catIndex) => {
          const catKey = categoryNames[catIndex];
          if (!catKey) return null;
          return (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1, duration: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <h3 className="text-xs font-bold tracking-[0.2em] text-muted-foreground whitespace-nowrap">
                  {categories[catKey]}
                </h3>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {category.items.map((item, i) => (
                  <TechCard
                    key={item.name}
                    item={item}
                    index={catIndex * 5 + i}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
