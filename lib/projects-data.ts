// ============================================================
// lib/projects-data.ts
// Template data untuk halaman detail proyek.
// Edit bagian yang ditandai [EDIT: ...] sesuai konten asli kamu.
// ============================================================

export type TechBadge = {
  name: string;
  icon?: string; // URL icon (opsional)
};

export type PipelineStep = {
  step: number;
  title: string;
  description: string;
  tool?: string; // Nama tool yang digunakan di step ini
};

export type Feature = {
  title: string;
  description: string;
  icon?: string; // Lucide icon name (opsional), e.g. "Database", "Zap"
};

export type Result = {
  metric: string;   // e.g. "98%"
  label: string;    // e.g. "Pipeline Accuracy"
  description?: string;
};

export type Screenshot = {
  src: string;      // Path ke gambar, e.g. "/images/projects/campussly-1.png"
  alt: string;
  caption?: string;
};

export type ProjectDetail = {
  id: string;
  title: string;
  tagline: string;           // Satu kalimat ringkas
  badge: string;             // e.g. "Data Engineering" atau "AI Automation"
  color: string;             // Tailwind text color class, e.g. "text-cyan-400"
  gradient: string;          // Tailwind gradient class untuk hero
  status: "Completed" | "In Progress" | "Archived";
  year: string;

  overview: string;          // Paragraf penjelasan umum proyek

  role: {
    title: string;           // e.g. "Data Engineer & Lead Developer"
    responsibilities: string[]; // List tanggung jawab kamu
  };

  problemStatement: string;  // Paragraf problem yang diselesaikan

  architecture: {
    description: string;     // Penjelasan arsitektur
    imageSrc?: string;       // Path ke diagram arsitektur (opsional)
    imageAlt?: string;
    layers?: {               // Jika pakai Medallion atau layer lain
      name: string;
      description: string;
      color: string;         // Tailwind bg color class
    }[];
  };

  techStack: TechBadge[];

  pipeline: {
    description: string;     // Intro singkat workflow pipeline
    steps: PipelineStep[];
  };

  features: Feature[];

  results: {
    summary: string;         // Paragraf ringkasan hasil
    metrics: Result[];
  };

  screenshots: Screenshot[];

  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
};

// ============================================================
// DATA PROYEK — Edit konten di bawah ini
// ============================================================

export const projectsDetail: ProjectDetail[] = [
  // ----------------------------------------------------------
  // PROJECT 1: CAMPUSSLY
  // ----------------------------------------------------------
  {
    id: "futuraMap", // [EDIT: ID unik untuk proyek ini, gunakan slug format]
    title: "FuturaMap",
    tagline: "Data as a Product",
    badge: "Data Lakehouse · Decision Support System · Smart Solution",
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    status: "In Progress", // [EDIT: "Completed" | "In Progress" | "Archived"]
    year: "2026", // [EDIT: Tahun proyek]

    overview:
      "FuturaMap merupakan platform decision-support berbasis data yang dirancang untuk membantu siswa SMA dalam menentukan jenjang karier sehingga bisa menentukan pilihan program studi yang tepat di perguruan tinggi negeri (PTN) Indonesia melalui jalur SNBP. Dengan mengintegrasikan berbagai sumber data akademik, sosial, dan ekonomi, FuturaMap memberikan rekomendasi Pekerjaan, Jurusan, dan Kampus yang paling sesuai dengan profil dari setiap siswa.",

    role: {
      title: "Data Engineer & Product Developer",
      responsibilities: [
        "[EDIT: Tanggung jawab 1, e.g. 'Merancang arsitektur Data Lakehouse dengan pendekatan Medallion (Bronze, Silver, Gold)']",
        "[EDIT: Tanggung jawab 2, e.g. 'Membangun pipeline ETL menggunakan DuckDB dan SQLMesh']",
        "[EDIT: Tanggung jawab 3]",
        "[EDIT: Tanggung jawab 4]",
        // Tambah atau kurangi sesuai kebutuhan
      ],
    },

    problemStatement:
      "[EDIT: Jelaskan masalah utama yang ingin diselesaikan oleh Campussly. Contoh: Banyak siswa SMA tidak memiliki akses ke informasi yang akurat dan terstruktur mengenai peluang diterima di PTN tertentu melalui jalur SNBP. Data yang tersedia seringkali tersebar, tidak konsisten, dan sulit diinterpretasikan oleh siswa maupun orang tua...]",

    architecture: {
      description:
        "[EDIT: Jelaskan arsitektur sistem secara keseluruhan. Contoh: Campussly menggunakan arsitektur Data Lakehouse modern berbasis Medallion yang terdiri dari tiga layer: Bronze (raw data), Silver (cleaned & validated), dan Gold (aggregated & business-ready). Data disimpan di MinIO sebagai object storage, dengan DuckLake sebagai lakehouse catalog...]",
      imageSrc: "/images/projects/campussly-architecture.png", // [EDIT: Ganti path atau hapus jika tidak ada]
      imageAlt: "Campussly Architecture Diagram",
      layers: [
        {
          name: "Bronze Layer",
          description: "[EDIT: Deskripsi Bronze Layer — raw ingestion dari sumber data asli]",
          color: "bg-amber-700/30",
        },
        {
          name: "Silver Layer",
          description: "[EDIT: Deskripsi Silver Layer — data cleaning, validation, normalization]",
          color: "bg-slate-400/20",
        },
        {
          name: "Gold Layer",
          description: "[EDIT: Deskripsi Gold Layer — aggregated, analytics-ready, business metrics]",
          color: "bg-yellow-400/20",
        },
      ],
    },

    techStack: [
      { name: "DuckDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/duckdb/duckdb-original.svg" },
      { name: "SQLMesh", icon: "https://cdn.prod.website-files.com/67f7cdf0feddc96ca194ff1a/67f7cdf0feddc96ca1950030_symbol-sqlmesh.svg" },
      { name: "MinIO", icon: "/images/minio.svg" },
      { name: "DuckLake", icon: "https://ducklake.select/images/logo/DuckLake-dark-icon.png" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      // [EDIT: Tambah tech stack lain jika ada]
    ],

    pipeline: {
      description:
        "[EDIT: Jelaskan secara singkat alur data pipeline Campussly dari sumber hingga output akhir.]",
      steps: [
        {
          step: 1,
          title: "[EDIT: Nama step 1, e.g. 'Data Ingestion']",
          description: "[EDIT: Deskripsi step 1]",
          tool: "[EDIT: Tool yang digunakan, e.g. 'Python Script / Airbyte']",
        },
        {
          step: 2,
          title: "[EDIT: Nama step 2, e.g. 'Bronze Layer Processing']",
          description: "[EDIT: Deskripsi step 2]",
          tool: "[EDIT: Tool, e.g. 'DuckDB']",
        },
        {
          step: 3,
          title: "[EDIT: Nama step 3, e.g. 'Silver Layer Transformation']",
          description: "[EDIT: Deskripsi step 3]",
          tool: "[EDIT: Tool, e.g. 'SQLMesh']",
        },
        {
          step: 4,
          title: "[EDIT: Nama step 4, e.g. 'Gold Layer Aggregation']",
          description: "[EDIT: Deskripsi step 4]",
          tool: "[EDIT: Tool, e.g. 'DuckDB + SQLMesh']",
        },
        {
          step: 5,
          title: "[EDIT: Nama step 5, e.g. 'Serving / Visualization']",
          description: "[EDIT: Deskripsi step 5]",
          tool: "[EDIT: Tool, e.g. 'Streamlit / Power BI']",
        },
        // [EDIT: Tambah atau kurangi step sesuai pipeline asli]
      ],
    },

    features: [
      {
        title: "[EDIT: Fitur 1, e.g. 'Prediksi Peluang SNBP']",
        description: "[EDIT: Deskripsi fitur 1]",
        icon: "Target", // Lucide icon name
      },
      {
        title: "[EDIT: Fitur 2, e.g. 'Medallion Architecture']",
        description: "[EDIT: Deskripsi fitur 2]",
        icon: "Layers",
      },
      {
        title: "[EDIT: Fitur 3, e.g. 'Real-time Analytics Dashboard']",
        description: "[EDIT: Deskripsi fitur 3]",
        icon: "BarChart2",
      },
      {
        title: "[EDIT: Fitur 4]",
        description: "[EDIT: Deskripsi fitur 4]",
        icon: "Database",
      },
      // [EDIT: Tambah fitur lain jika ada]
    ],

    results: {
      summary:
        "[EDIT: Jelaskan hasil dan dampak proyek Campussly. Contoh: Platform berhasil memproses lebih dari X ribu record data akademik dengan akurasi Y%. Sistem mampu memberikan rekomendasi kelulusan yang relevan untuk Z program studi di seluruh PTN Indonesia...]",
      metrics: [
        {
          metric: "[EDIT: e.g. '10K+']",
          label: "[EDIT: e.g. 'Data Records Processed']",
          description: "[EDIT: Deskripsi singkat metrik ini]",
        },
        {
          metric: "[EDIT: e.g. '3']",
          label: "[EDIT: e.g. 'Medallion Layers']",
          description: "[EDIT: Deskripsi singkat]",
        },
        {
          metric: "[EDIT: e.g. '95%']",
          label: "[EDIT: e.g. 'Data Accuracy']",
          description: "[EDIT: Deskripsi singkat]",
        },
        // [EDIT: Tambah metrik lain]
      ],
    },

    screenshots: [
      {
        src: "/images/projects/campussly-1.png", // [EDIT: Ganti path screenshot]
        alt: "Campussly Dashboard",
        caption: "[EDIT: Caption screenshot 1]",
      },
      {
        src: "/images/projects/campussly-2.png", // [EDIT: Ganti path screenshot]
        alt: "Campussly Data Pipeline",
        caption: "[EDIT: Caption screenshot 2]",
      },
      // [EDIT: Tambah atau hapus screenshot]
    ],

    links: {
      github: "https://github.com/[EDIT: username/repo-campussly]",
      demo: undefined, // [EDIT: Isi URL demo jika ada, atau biarkan undefined]
      docs: undefined, // [EDIT: Isi URL docs jika ada]
    },
  },

  // ----------------------------------------------------------
  // PROJECT 2: AUTOMATED PROSPECTING ENGINE
  // ----------------------------------------------------------
  {
    id: "prospectingEngine",
    title: "Automated Prospecting Engine",
    tagline: "[EDIT: Tagline singkat proyek ini, 1 kalimat]",
    badge: "AI Automation · n8n · CRM",
    color: "text-fuchsia-400",
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
    status: "Completed", // [EDIT: "Completed" | "In Progress" | "Archived"]
    year: "2024", // [EDIT: Tahun proyek]

    overview:
      "[EDIT: Tulis overview proyek Automated Prospecting Engine. Jelaskan konteks bisnis, solusi yang dibangun, dan dampaknya. Contoh: Automated Prospecting Engine adalah sistem otomasi cerdas yang dibangun untuk merevolusi cara tim Sales mengelola dan mengkualifikasi prospek (leads). Sistem ini mengintegrasikan n8n sebagai workflow orchestrator dengan AI Agent berbasis Gemini 2.5 untuk melakukan kualifikasi otomatis...]",

    role: {
      title: "[EDIT: Judul peranmu, e.g. 'Data Engineer & Automation Developer']",
      responsibilities: [
        "[EDIT: Tanggung jawab 1, e.g. 'Merancang dan membangun automation workflow di n8n']",
        "[EDIT: Tanggung jawab 2, e.g. 'Mengintegrasikan Gemini 2.5 sebagai AI Agent untuk kualifikasi leads']",
        "[EDIT: Tanggung jawab 3, e.g. 'Membangun koneksi antara n8n dan TwentyCRM via API']",
        "[EDIT: Tanggung jawab 4]",
        // Tambah atau kurangi
      ],
    },

    problemStatement:
      "[EDIT: Jelaskan masalah utama yang diselesaikan. Contoh: Tim Sales menghadapi inefisiensi besar dalam mengelola data prospek yang masuk dalam jumlah besar setiap harinya. Proses sorting dan kualifikasi dilakukan secara manual, mengakibatkan waktu respons yang lambat, banyaknya leads berkualitas rendah yang diproses, dan hilangnya potensi konversi dari leads berkualitas tinggi yang tidak ditangani tepat waktu...]",

    architecture: {
      description:
        "[EDIT: Jelaskan arsitektur sistem. Contoh: Sistem terdiri dari tiga komponen utama: (1) n8n sebagai workflow orchestrator yang menangani trigger dan routing, (2) AI Agent berbasis Gemini 2.5 yang melakukan analisis dan kualifikasi prospek berdasarkan parameter yang ditentukan, dan (3) TwentyCRM sebagai sistem penyimpanan dan manajemen data prospek terformat...]",
      imageSrc: "/images/projects/prospecting-architecture.png", // [EDIT: Ganti atau hapus]
      imageAlt: "Automated Prospecting Engine Architecture",
      layers: undefined, // Tidak pakai Medallion untuk proyek ini
    },

    techStack: [
      { name: "n8n", icon: "/images/n8n.webp" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      // [EDIT: Tambah Gemini icon atau tool lain]
      // { name: "Gemini 2.5", icon: "/images/gemini.png" },
      // { name: "TwentyCRM", icon: "/images/twentycrm.png" },
    ],

    pipeline: {
      description:
        "[EDIT: Jelaskan alur kerja sistem dari input data mentah hingga output leads terklasifikasi.]",
      steps: [
        {
          step: 1,
          title: "[EDIT: Step 1, e.g. 'Data Input / Trigger']",
          description: "[EDIT: Deskripsi step 1, e.g. 'Data prospek masuk melalui form, spreadsheet, atau API endpoint dan men-trigger workflow n8n secara otomatis']",
          tool: "[EDIT: e.g. 'n8n Webhook / Trigger']",
        },
        {
          step: 2,
          title: "[EDIT: Step 2, e.g. 'Data Preprocessing']",
          description: "[EDIT: Deskripsi step 2]",
          tool: "[EDIT: e.g. 'n8n + Python']",
        },
        {
          step: 3,
          title: "[EDIT: Step 3, e.g. 'AI Qualification']",
          description: "[EDIT: Deskripsi step 3, e.g. 'AI Agent menganalisis setiap prospek berdasarkan parameter seperti industri, ukuran perusahaan, dan kebutuhan, lalu memberikan skor kualifikasi']",
          tool: "[EDIT: e.g. 'Gemini 2.5 AI Agent']",
        },
        {
          step: 4,
          title: "[EDIT: Step 4, e.g. 'Segmentation & Routing']",
          description: "[EDIT: Deskripsi step 4]",
          tool: "[EDIT: e.g. 'n8n Router']",
        },
        {
          step: 5,
          title: "[EDIT: Step 5, e.g. 'CRM Sync']",
          description: "[EDIT: Deskripsi step 5, e.g. 'Prospek yang telah terklasifikasi disinkronkan ke TwentyCRM dengan segmen dan prioritas yang sudah ditentukan']",
          tool: "[EDIT: e.g. 'TwentyCRM API']",
        },
        // [EDIT: Tambah atau kurangi step]
      ],
    },

    features: [
      {
        title: "[EDIT: Fitur 1, e.g. 'AI-Powered Lead Scoring']",
        description: "[EDIT: Deskripsi fitur 1]",
        icon: "Brain",
      },
      {
        title: "[EDIT: Fitur 2, e.g. 'Automatic Segmentation']",
        description: "[EDIT: Deskripsi fitur 2]",
        icon: "Filter",
      },
      {
        title: "[EDIT: Fitur 3, e.g. 'CRM Auto-Sync']",
        description: "[EDIT: Deskripsi fitur 3]",
        icon: "RefreshCw",
      },
      {
        title: "[EDIT: Fitur 4, e.g. 'Real-time Notifications']",
        description: "[EDIT: Deskripsi fitur 4]",
        icon: "Bell",
      },
      // [EDIT: Tambah fitur lain]
    ],

    results: {
      summary:
        "[EDIT: Jelaskan hasil dan dampak proyek ini. Contoh: Sistem berhasil mengurangi waktu kualifikasi prospek dari rata-rata X jam menjadi Y menit per leads. Tim Sales dapat fokus pada leads berkualitas tinggi yang sudah tersegmentasi, meningkatkan conversion rate sebesar Z%...]",
      metrics: [
        {
          metric: "[EDIT: e.g. '90%']",
          label: "[EDIT: e.g. 'Time Saved on Qualification']",
          description: "[EDIT: Deskripsi singkat]",
        },
        {
          metric: "[EDIT: e.g. '100%']",
          label: "[EDIT: e.g. 'Automation Rate']",
          description: "[EDIT: Deskripsi singkat]",
        },
        {
          metric: "[EDIT: e.g. '3x']",
          label: "[EDIT: e.g. 'Faster Lead Response']",
          description: "[EDIT: Deskripsi singkat]",
        },
        // [EDIT: Tambah metrik lain]
      ],
    },

    screenshots: [
      {
        src: "/images/projects/prospecting-1.png", // [EDIT: Ganti path]
        alt: "n8n Workflow Overview",
        caption: "[EDIT: Caption screenshot 1]",
      },
      {
        src: "/images/projects/prospecting-2.png", // [EDIT: Ganti path]
        alt: "CRM Dashboard",
        caption: "[EDIT: Caption screenshot 2]",
      },
      // [EDIT: Tambah atau hapus]
    ],

    links: {
      github: "https://github.com/[EDIT: username/repo-prospecting-engine]",
      demo: undefined, // [EDIT: Isi atau biarkan undefined]
      docs: undefined,
    },
  },
];

// Helper function — jangan diedit
export function getProjectById(id: string): ProjectDetail | undefined {
  return projectsDetail.find((p) => p.id === id);
}