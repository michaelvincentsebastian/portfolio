// ============================================================
// lib/projects-data.ts
// ============================================================

export type TechBadge = {
  name: string;
  icon?: string;
};

export type PipelineStep = {
  step: number;
  title: string;
  description: string;
  tool?: string;
};

export type Feature = {
  title: string;
  description: string;
  icon?: string;
};

export type Result = {
  metric: string;
  label: string;
  description?: string;
};

export type Screenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type ComponentCard = {
  id: string;
  icon?: string;
  title: string;
  summary: string;
  detail: string;
};

export type PipelineLayer = {
  name: string;
  items: string[];
  color: string;
  borderColor: string;
};

export type TargetUser = {
  role: string;
  motivation: string;
};

export type Problem = {
  title: string;
  description: string;
};

export type Solution = {
  title: string;
  description: string;
};

export type HomeTab = {
  tagline: string;
  vision: string;
  mission: string;
  targetUsers: TargetUser[];
  problems: Problem[];
  solutions: Solution[];
};

export type TechnicalTab = {
  overview: string;
  components: ComponentCard[];
  pipelineLayers: PipelineLayer[];
  techStack: TechBadge[];
  features: Feature[];
};

export type ResultTab = {
  note: string;
  screenshots: Screenshot[];
};

export type TabbedContent = {
  tabs: Array<"home" | "technical" | "result">;
  home: { en: HomeTab; id: HomeTab };
  technical: { en: TechnicalTab; id: TechnicalTab };
  result: { en: ResultTab; id: ResultTab };
};

export type ProjectDetail = {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  color: string;
  gradient: string;
  status: "Completed" | "In Progress" | "Archived";
  year: string;

  overview: string;

  role: {
    title: string;
    responsibilities: string[];
  };

  problemStatement: string;

  architecture: {
    description: string;
    imageSrc?: string;
    imageAlt?: string;
    layers?: {
      name: string;
      description: string;
      color: string;
    }[];
  };

  techStack: TechBadge[];

  pipeline: {
    description: string;
    steps: PipelineStep[];
  };

  features: Feature[];

  results: {
    summary: string;
    metrics: Result[];
  };

  screenshots: Screenshot[];

  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };

  tabbed?: TabbedContent;
};

// ============================================================
// DATA PROYEK
// ============================================================

export const projectsDetail: ProjectDetail[] = [
  // ----------------------------------------------------------
  // PROJECT 1: FUTURAMAP
  // ----------------------------------------------------------
  {
    id: "futuramap",
    title: "FuturaMap",
    tagline: "Platform Analitik Siswa Berbasis Data dan AI untuk Kesiapan Kuliah",
    badge: "Data Lakehouse · AI Analytics · EduTech",
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    status: "Completed", // Saya ubah jadi completed karena kamu bilang ini produk Andalan School yang sudah ada hasilnya
    year: "2026",

    overview:
      "FuturaMap merupakan 'Data as a Product' canggih yang dibangun di atas arsitektur Data Lakehouse, memisahkan layer penyimpanan dan komputasi. Platform ini mengkonsumsi data dari OLTP LMS 'Andalan School' dan katalog kursus online (Udemy), memprosesnya melalui pipeline Medallion menggunakan SQLMesh dan DuckDB. Lebih dari sekadar dashboard, sistem ini menyajikan analitik kesiapan kuliah via Flask REST API, memanfaatkan AI lokal (Ollama) untuk rekomendasi semantik, dan diorkestrasi sepenuhnya oleh Openclaw Agent untuk otomatisasi operasional harian.",

    role: {
      title: "Data Engineer & Product Developer",
      responsibilities: [
        "Merancang arsitektur Data Lakehouse terpisah (MINIO, Postgres, DuckLake) dengan pipeline Medallion (Bronze, Silver, Gold).",
        "Membangun transformasi data kompleks dengan SQLMesh, termasuk HTML parsing menggunakan BeautifulSoup4 di layer Silver.",
        "Menerapkan Linear Regression (REGR_SLOPE di Postgres) pada Gold layer untuk menghitung tren performa tryout siswa secara dinamis.",
        "Mengembangkan Flask REST API sebagai layer Data Serving yang menjembatani Lakehouse dengan Web App.",
        "Mendeploy Openclaw Agent via Docker untuk penjadwalan pipeline, sistem email alert, dan notifikasi kegagalan real-time ke Telegram Bot.",
        "Mengintegrasikan SLM lokal (Ollama smollm2 1.7b) dan OpenRouter (Nemotron) untuk sistem rekomendasi kursus berbasis profiling."
      ],
    },

    problemStatement:
      "Siswa seringkali tidak mengetahui seberapa besar 'gap' skor mereka dibandingkan dengan standar SNBT untuk jurusan impian mereka, dan hasil tes minat karir mereka sering berubah-ubah. Di sisi lain, Guru BK (Bimbingan Konseling) kesulitan memantau siswa yang mengalami penurunan performa tryout secara real-time karena data nilai tersebar di berbagai guru pengampu mata pelajaran, menyebabkan keterlambatan intervensi.",

    architecture: {
      description:
        "Arsitektur FuturaMap mengadopsi pola modern Data Lakehouse. MINIO digunakan untuk physical storage (Parquet), Postgres menyimpan metadata, dan DuckLake bertindak sebagai pengelola lakehouse. Transformasi data ditangani oleh SQLMesh (termasuk Python models untuk BeautifulSoup) dan di-query menggunakan DuckDB. Data disajikan melalui Flask REST API ke frontend. Seluruh operasional diorkestrasi oleh Openclaw Agent di dalam Docker.",
      layers: [
        {
          name: "Storage & Catalog",
          description: "Penyimpanan object di MinIO, metadata di PostgreSQL, dihubungkan secara mulus oleh DuckLake.",
          color: "bg-amber-700/30",
        },
        {
          name: "Compute & Transform",
          description: "DuckDB sebagai query engine ringan dengan SQLMesh untuk orkestrasi transformasi data berjenjang.",
          color: "bg-slate-400/20",
        },
        {
          name: "Serving & Ops",
          description: "Flask API untuk serving ke Web App, SLM untuk AI reasoning, dan Openclaw Agent untuk penjadwalan & Telegram alerts.",
          color: "bg-cyan-500/20",
        },
      ],
    },

    techStack: [
      { name: "DuckDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/duckdb/duckdb-original.svg" },
      { name: "SQLMesh", icon: "https://cdn.prod.website-files.com/67f7cdf0feddc96ca194ff1a/67f7cdf0feddc96ca1950030_symbol-sqlmesh.svg" },
      { name: "MinIO", icon: "/images/minio.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Openclaw", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openclaw.svg" },
      { name: "Ollama", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVZ9JJ3PrF8m-lYW-rPzJpZJVMzq3CwpdsQ&s" },
      { name: "smollm2", icon: "https://huggingfacetb-smollm-360m-instruct-webgpu.static.hf.space/logo.png" },
    ],

    pipeline: {
      description: "Pipeline ELT FuturaMap memproses data mentah menjadi metrik analitik dan rekomendasi pintar melalui tahapan yang terstruktur dan terotomatisasi.",
      steps: [
        { step: 1, title: "Bronze (Ingestion)", description: "Ekstraksi data mentah secara aman dari Database LMS rahasia (Andalan School) dan dataset kursus online.", tool: "Python" },
        { step: 2, title: "Silver (Processing)", description: "Filtrasi, standarisasi, NULL handling, serta parsing format HTML menggunakan BeautifulSoup via SQLMesh Python model.", tool: "SQLMesh + DuckDB" },
        { step: 3, title: "Gold (Analytics)", description: "Penggabungan data bersih dan penerapan fungsi REGR_SLOPE (Postgres) untuk menghitung tren kenaikan/penurunan nilai tryout.", tool: "SQLMesh + Postgres" },
        { step: 4, title: "Data Serving", description: "Backend Flask menyajikan data yang siap konsumsi (profil, gap analysis, tren) dari Lakehouse ke Front-end Web App.", tool: "Flask REST API" },
        { step: 5, title: "Ops & Automation", description: "Openclaw Agent menjadwalkan pipeline mingguan, mengirim alert performa ke email Guru BK, dan notifikasi status ke Telegram.", tool: "Openclaw Agent" },
      ],
    },

    features: [
      { title: "Tryout Alert System (Backend)", description: "Sistem monitoring Openclaw yang menganalisis tren nilai (regression). Jika nilai turun, email peringatan otomatis dikirim ke Guru BK.", icon: "Bell" },
      { title: "Secure Lakehouse Auth", description: "Sistem login frontend yang dikonfirmasi langsung oleh backend Flask melalui query DuckDB ke Gold Layer Lakehouse.", icon: "Lock" },
      { title: "Student Profiling Hub", description: "Dasbor terpadu berisi identitas, target kampus/jurusan, minimal skor UTBK, kompetisi pendaftar, hingga hasil tes minat karir.", icon: "User" },
      { title: "SNBT Gap Analysis & Review", description: "Visualisasi grafik garis tren tryout, progress bar gap nilai terhadap target jurusan, estimasi sisa tryout, dan fitur review soal salah.", icon: "Target" },
      { title: "AI Course Recommendation", description: "Memanfaatkan SLM lokal (Ollama smollm2 1.7b) untuk mencocokkan profil tes karir siswa dengan katalog kursus secara semantik.", icon: "Sparkles" },
    ],

    results: {
      summary: "FuturaMap berhasil mengubah data operasional (OLTP) Andalan School menjadi aset analitik yang bernilai tinggi (Data as a Product). Sistem peringatan dini membantu Guru BK melakukan intervensi tepat waktu, sementara siswa mendapatkan arah persiapan kuliah yang jelas dan terukur berbasis data.",
      metrics: [
        { metric: "100%", label: "Otomatisasi Pipeline", description: "Diorkestrasi andal oleh Openclaw Agent" },
        { metric: "Zero", label: "Cloud AI Cost", description: "Inferensi semantik berjalan secara lokal" },
        { metric: "3-Tier", label: "Medallion Layers", description: "Bronze, Silver, dan Gold Analytics" },
      ],
    },

    screenshots: [
      { src: "/images/projects/futuramap-login.jpg", alt: "FuturaMap Login Page", caption: "Halaman Login terintegrasi langsung dengan Lakehouse" },
      { src: "/images/projects/futuramap-profil-1.jpg", alt: "FuturaMap Profil Siswa 1", caption: "Student Profiling — Data terpadu dari Andalan School LMS" },
      { src: "/images/projects/futuramap-tryout-1.jpg", alt: "FuturaMap Tryout 1", caption: "Dashboard Analitik Tren dan Gap Nilai Tryout SNBT" },
      { src: "/images/projects/futuramap-kursus-1.jpg", alt: "FuturaMap Rekomendasi Kursus 1", caption: "Rekomendasi Kursus yang di-generate oleh AI lokal" },
      { src: "/images/projects/futuramap-email.jpg", alt: "FuturaMap Email Alert", caption: "Contoh Email Peringatan Otomatis ke Guru BK" },
    ],

    links: {
      github: undefined,
      demo: undefined,
      docs: undefined,
    },

    tabbed: {
      tabs: ["home", "technical", "result"],
      home: {
        en: {
          tagline: "A Data and AI-driven student analytics platform designed to measure college readiness and guide career choices.",
          vision: "To be the ultimate companion system that empowers students in navigating their academic journey.",
          mission: "To help students improve their SNBT tryout scores and direct their career/major paths by providing highly relevant, AI-curated course recommendations.",
          targetUsers: [
            { role: "Students (Andalan School)", motivation: "Needs personalized guidance, gap analysis for target universities, and course recommendations." },
            { role: "Guidance Counselors (Guru BK)", motivation: "Requires automated monitoring of declining student scores to provide timely interventions." },
            { role: "Parents / Guardians", motivation: "Wants to track their child's academic development and college readiness progress." },
          ],
          problems: [
            { title: "Blind Spots in SNBT Readiness", description: "Students are unaware of the exact score gap between their current capabilities and the SNBT standards for their target majors." },
            { title: "Inconsistent Career Mapping", description: "Students take career aptitude tests on the 'Andalan School' platform, but the results often fluctuate, making it hard to commit to a path." },
            { title: "Fragmented Monitoring", description: "Guidance counselors struggle to monitor students whose tryout scores are dropping because the raw data is held individually by different subject teachers." },
          ],
          solutions: [
            { title: "Personalized Analytics Dashboard", description: "Provides a UTBK score gap analysis, tryout trend charts, and a question review feature to correct mistakes immediately." },
            { title: "AI-Curated Course Suggestions", description: "Generates a stable student profile from the latest tests and recommends relevant Udemy courses tailored to their ideal university major and career." },
            { title: "Automated Early Warning System", description: "Calculates score regressions and sends automated email notifications to Counselors so they can intervene the moment a student's performance drops." },
          ],
        },
        id: {
          tagline: "Platform analitik siswa berbasis Data dan AI yang dirancang untuk mengukur kesiapan kuliah dan memetakan pilihan karir.",
          vision: "Menjadi sistem pembantu utama yang memberdayakan siswa dalam mengarahkan perjalanan akademik mereka.",
          mission: "Membantu siswa meningkatkan nilai tryout SNBT dan mengarahkan pilihan karir serta jurusan dengan memberikan rekomendasi kursus yang tepat.",
          targetUsers: [
            { role: "Siswa (Andalan School)", motivation: "Membutuhkan bimbingan personal, gap analysis target kampus, dan rekomendasi pembelajaran." },
            { role: "Guru BK", motivation: "Perlu memantau nilai tryout siswa secara otomatis untuk melakukan intervensi dini jika ada penurunan performa." },
            { role: "Orang Tua / Wali", motivation: "Ingin memantau perkembangan akademik dan tingkat kesiapan kuliah anak mereka." },
          ],
          problems: [
            { title: "Ketidaktahuan Gap SNBT", description: "Siswa tidak tahu seberapa besar gap antara nilai mereka saat ini dengan standar SNBT untuk jurusan perguruan tinggi yang dituju." },
            { title: "Hasil Tes Karir Inonsisten", description: "Siswa melakukan tes bakat di platform 'Andalan School', namun hasil tes sering berubah-ubah sehingga membingungkan arah karir." },
            { title: "Monitoring Terhambat", description: "Guru BK kesulitan memantau siswa yang nilai tryout-nya turun, karena data nilai dipegang secara terpisah oleh guru pengampu pelajaran." },
          ],
          solutions: [
            { title: "Dashboard Analitik Personal", description: "Menyediakan gap analysis skor UTBK, grafik tren nilai, dan fitur review soal untuk membahas serta mengoreksi jawaban siswa yang salah." },
            { title: "Rekomendasi Kursus Cerdas", description: "Membentuk profil siswa dari tes terakhir dan merekomendasikan kursus Udemy yang sesuai dengan target jurusan maupun rekomendasi profesi." },
            { title: "Sistem Peringatan Otomatis", description: "Menghitung regresi nilai dan mengirim notifikasi otomatis via email kepada Guru BK agar dapat mengintervensi saat performa siswa turun." },
          ],
        },
      },
      technical: {
        en: {
          overview: "FuturaMap is engineered as a robust 'Data as a Product' atop a modernized Data Lakehouse architecture that strictly decouples storage from compute. Raw data from LMS systems and online course catalogs are ingested through a Medallion pipeline (Bronze → Silver → Gold). Data is transformed and enriched using SQLMesh as the orchestrator and DuckDB as the lightweight analytical engine. The clean, aggregated data in the Gold layer is served via a Flask REST API to the web application. For intelligent reasoning without cloud dependencies, it leverages local AI (Ollama smollm2). The entire operational cadence, including pipeline execution and scheduled alert systems, is driven by an Openclaw Agent running inside Docker, which also handles real-time failure reporting via a Telegram bot.",
          components: [
            { id: "c1", icon: "Database", title: "Lakehouse Storage (MinIO & Postgres)", summary: "Decoupled physical and metadata storage", detail: "MinIO handles the physical object storage of Parquet files, while PostgreSQL maintains the metadata. DuckLake acts as the catalog manager seamlessly bridging the two to enable Lakehouse capabilities." },
            { id: "c2", icon: "Settings", title: "SQLMesh & DuckDB", summary: "Data transformation and analytical engine", detail: "SQLMesh orchestrates the Medallion pipeline transformations, utilizing DuckDB as a blazingly fast in-process query engine. It even leverages Python models within SQLMesh to parse HTML using BeautifulSoup4." },
            { id: "c3", icon: "Server", title: "Flask REST API", summary: "Data serving layer", detail: "A Python Flask backend acts as the bridge, securely querying the DuckDB Gold layer and serving the formatted analytical data directly to the frontend Web App." },
            { id: "c4", icon: "Brain", title: "Local AI (Ollama & Openrouter)", summary: "Semantic reasoning & course matching", detail: "Utilizes small language models (smollm2 1.7b via Ollama) and Openrouter (nemotron-3-nano) to semantically match student profiles (major and career) with relevant course catalogs without relying on heavy cloud AI costs." },
            { id: "c5", icon: "GitBranch", title: "Openclaw Agent", summary: "Operational orchestration & alerting", detail: "Deployed in Docker, the Openclaw Agent schedules Python scripts and SQLMesh plans. It runs the tryout regression checks and triggers Telegram bot notifications if any pipeline or alert process fails." },
          ],
          pipelineLayers: [
            { name: "Bronze Layer (Ingestion)", items: ["Ingest raw data from 'Andalan School' LMS", "Ingest online course data (Kaggle/Udemy)", "Store raw format in MinIO via DuckLake"], color: "bg-amber-500/10", borderColor: "border-amber-500/30" },
            { name: "Silver Layer (Processing)", items: ["Filter, enrich, and standardize formats", "Parse HTML fields using BeautifulSoup4", "Handle NULL imputations", "Join dimensional data"], color: "bg-slate-500/10", borderColor: "border-slate-500/30" },
            { name: "Gold Layer & Serving", items: ["Calculate score trends using REGR_SLOPE", "Aggregate final clean tables", "Serve via Flask API to Web App", "Trigger Openclaw email alerts"], color: "bg-yellow-500/10", borderColor: "border-yellow-500/30" },
          ],
          techStack: [
            { name: "DuckDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/duckdb/duckdb-original.svg" },
            { name: "SQLMesh", icon: "https://cdn.prod.website-files.com/67f7cdf0feddc96ca194ff1a/67f7cdf0feddc96ca1950030_symbol-sqlmesh.svg" },
            { name: "MinIO", icon: "/images/minio.svg" },
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "Ollama", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVZ9JJ3PrF8m-lYW-rPzJpZJVMzq3CwpdsQ&s" },
            { name: "smollm2", icon: "https://huggingfacetb-smollm-360m-instruct-webgpu.static.hf.space/logo.png" },
          ],
          features: [
            { title: "Linear Regression Analysis", description: "Uses Postgres REGR_SLOPE to calculate the trajectory of student scores. Negative slopes trigger immediate alerts.", icon: "TrendingUp" },
            { title: "Automated Ops with Openclaw", description: "Agent-based scheduling that not only runs the ETL but reports system health directly to a Telegram bot.", icon: "Zap" },
            { title: "Local AI Inferencing", description: "Zero-cloud dependency for semantic course matching using Ollama and smollm2 1.7b.", icon: "Brain" },
            { title: "Complex HTML Parsing", description: "Utilizes Python's BeautifulSoup within SQLMesh's Silver layer to clean messy web-scraped course data.", icon: "Filter" },
          ],
        },
        id: {
          overview: "FuturaMap dibangun sebagai 'Data as a Product' di atas arsitektur Data Lakehouse modern yang memisahkan layer penyimpanan dan komputasi. Data mentah dari sistem LMS dan katalog kursus online dikonsumsi melalui pipeline Medallion (Bronze → Silver → Gold). Data ditransformasi dan diperkaya di setiap layer menggunakan SQLMesh sebagai orchestrator dan DuckDB sebagai analytical query engine yang ringan. Data Gold layer yang bersih kemudian disajikan melalui Flask REST API ke aplikasi web. Untuk reasoning cerdas tanpa ketergantungan cloud, sistem menggunakan AI lokal (Ollama smollm2). Seluruh operasional, seperti penjadwalan pipeline dan sistem peringatan, dijalankan oleh Openclaw Agent di dalam Docker, yang juga memberikan notifikasi kegagalan ke bot Telegram.",
          components: [
            { id: "c1", icon: "Database", title: "Penyimpanan Lakehouse (MinIO & Postgres)", summary: "Pemisahan physical storage dan metadata", detail: "MinIO menangani penyimpanan objek fisik berupa file Parquet, sementara PostgreSQL menyimpan metadata. DuckLake bertindak sebagai pengelola katalog yang menghubungkan keduanya menjadi satu ekosistem Lakehouse." },
            { id: "c2", icon: "Settings", title: "SQLMesh & DuckDB", summary: "Engine transformasi data dan analitik", detail: "SQLMesh mengorkestrasi transformasi pipeline Medallion, memanfaatkan DuckDB sebagai query engine in-process yang sangat cepat. Model Python di dalam SQLMesh juga digunakan untuk mem-parsing HTML menggunakan BeautifulSoup4." },
            { id: "c3", icon: "Server", title: "Flask REST API", summary: "Layer Data Serving", detail: "Backend Flask berbasis Python berfungsi sebagai jembatan, melakukan query secara aman ke DuckDB Gold layer dan menyajikan data analitik yang telah diformat langsung ke Web App frontend." },
            { id: "c4", icon: "Brain", title: "AI Lokal (Ollama & Openrouter)", summary: "Reasoning semantik & pencocokan kursus", detail: "Memanfaatkan Small Language Models (smollm2 1.7b via Ollama) dan Openrouter (nemotron-3-nano) untuk mencocokkan profil siswa secara semantik dengan katalog kursus tanpa membengkakkan biaya API Cloud." },
            { id: "c5", icon: "GitBranch", title: "Openclaw Agent", summary: "Orkestrasi operasional & alerting", detail: "Di-deploy dalam Docker, Openclaw Agent menjadwalkan eksekusi script Python dan SQLMesh. Agent ini menjalankan pengecekan regresi tryout dan memicu notifikasi bot Telegram jika terjadi kegagalan sistem." },
          ],
          pipelineLayers: [
            { name: "Bronze Layer (Ingestion)", items: ["Ekstraksi data mentah LMS 'Andalan School'", "Mengambil data kursus online (Kaggle/Udemy)", "Simpan format asli di MinIO via DuckLake"], color: "bg-amber-500/10", borderColor: "border-amber-500/30" },
            { name: "Silver Layer (Processing)", items: ["Filtrasi, pengayaan, dan standarisasi", "Parsing format HTML dengan BeautifulSoup4", "Penanganan (Imputasi) data NULL", "Proses Join data dimensional"], color: "bg-slate-500/10", borderColor: "border-slate-500/30" },
            { name: "Gold Layer & Serving", items: ["Hitung tren skor dengan REGR_SLOPE", "Agregasi akhir tabel yang sudah bersih", "Serving via Flask API ke Web App", "Trigger email alert oleh Openclaw"], color: "bg-yellow-500/10", borderColor: "border-yellow-500/30" },
          ],
          techStack: [
            { name: "DuckDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/duckdb/duckdb-original.svg" },
            { name: "SQLMesh", icon: "https://cdn.prod.website-files.com/67f7cdf0feddc96ca194ff1a/67f7cdf0feddc96ca1950030_symbol-sqlmesh.svg" },
            { name: "MinIO", icon: "/images/minio.svg" },
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "Ollama", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVZ9JJ3PrF8m-lYW-rPzJpZJVMzq3CwpdsQ&s" },
            { name: "smollm2", icon: "https://huggingfacetb-smollm-360m-instruct-webgpu.static.hf.space/logo.png" },
          ],
          features: [
            { title: "Analisis Regresi Linear", description: "Menggunakan fungsi REGR_SLOPE di Postgres untuk menghitung lintasan skor siswa. Kemiringan negatif memicu peringatan seketika.", icon: "TrendingUp" },
            { title: "Ops Otomatis dengan Openclaw", description: "Penjadwalan berbasis Agent yang tidak hanya mengeksekusi ETL, tetapi juga melaporkan kesehatan sistem ke bot Telegram.", icon: "Zap" },
            { title: "Inferensi AI Lokal", description: "Pencocokan kursus secara semantik berbiaya nol cloud menggunakan model ringan Ollama dan smollm2 1.7b.", icon: "Brain" },
            { title: "Parsing HTML Kompleks", description: "Menggunakan Python BeautifulSoup di dalam pipeline Silver SQLMesh untuk membersihkan teks data scraping kursus web yang kotor.", icon: "Filter" },
          ],
        },
      },
      result: {
        en: {
          note: "Because this is an active corporate project extending the 'Andalan School' digital ecosystem, results are limited to UI interfaces (Web App and Email Warnings) to maintain data confidentiality. Raw data and source code are strictly internal.",
          screenshots: [
            { src: "/images/projects/futuramap-login.jpg", alt: "FuturaMap Login Page", caption: "Login Page — Lakehouse backend authentication" },
            { src: "/images/projects/futuramap-profil-1.jpg", alt: "FuturaMap Student Profile 1", caption: "Student Profiling — Aggregated data from Andalan School LMS" },
            { src: "/images/projects/futuramap-tryout-1.jpg", alt: "FuturaMap Tryout 1", caption: "Tryout Trend Dashboard and SNBT Gap Analysis" },
            { src: "/images/projects/futuramap-kursus-1.jpg", alt: "FuturaMap Course Recommendation 1", caption: "AI Generated Course Recommendations" },
            { src: "/images/projects/futuramap-email.jpg", alt: "FuturaMap Email Alert", caption: "Automated Drop-in-Performance Email Alert to Counselors" },
          ],
        },
        id: {
          note: "Karena proyek ini merupakan sistem operasional aktif yang memperluas ekosistem digital 'Andalan School', hasil yang ditampilkan terbatas pada antarmuka (Web App dan Email Warning) demi menjaga kerahasiaan data internal perusahaan.",
          screenshots: [
            { src: "/images/projects/futuramap-login.jpg", alt: "FuturaMap Halaman Login", caption: "Halaman Login — Autentikasi langsung ke backend Lakehouse" },
            { src: "/images/projects/futuramap-profil-1.jpg", alt: "FuturaMap Profil Siswa 1", caption: "Profil Siswa — Data teragregasi dari LMS Andalan School" },
            { src: "/images/projects/futuramap-tryout-1.jpg", alt: "FuturaMap Tryout 1", caption: "Dashboard Tren Tryout dan Analisis Gap SNBT" },
            { src: "/images/projects/futuramap-kursus-1.jpg", alt: "FuturaMap Rekomendasi Kursus 1", caption: "Rekomendasi Kursus Hasil Generasi AI Lokal" },
            { src: "/images/projects/futuramap-email.jpg", alt: "FuturaMap Email Alert", caption: "Alert Email Otomatis ke Guru BK saat Performa Siswa Turun" },
          ],
        },
      },
    },
  },

  // ----------------------------------------------------------
  // PROJECT 2: AUTOMATED PROSPECTING ENGINE
  // ----------------------------------------------------------
  {
    id: "prospectingEngine",
    title: "Automated Prospecting Engine",
    tagline: "Intelligent lead qualification automation powered by AI",
    badge: "AI Automation · n8n · CRM",
    color: "text-fuchsia-400",
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
    status: "Completed",
    year: "2024",

    overview:
      "Automated Prospecting Engine adalah sistem otomasi cerdas yang dibangun menggunakan n8n untuk merevolusi proses manajemen prospek (leads) tim Sales secara efisien. Sistem ini mengintegrasikan AI Agent berbasis Gemini 2.5 untuk melakukan kualifikasi dan segmentasi otomatis, menggantikan proses manual yang memakan waktu dengan pipeline yang sepenuhnya terotomasi dari input hingga CRM sync.",

    role: {
      title: "Data Engineer & Automation Developer",
      responsibilities: [
        "Merancang dan membangun automation workflow di n8n dari awal hingga production",
        "Mengintegrasikan Gemini 2.5 sebagai AI Agent untuk kualifikasi dan scoring leads",
        "Membangun koneksi antara n8n dan TwentyCRM via REST API",
        "Mendefinisikan parameter segmentasi dan aturan routing leads",
      ],
    },

    problemStatement:
      "Tim Sales menghadapi inefisiensi besar dalam mengelola data prospek yang masuk setiap harinya. Proses sorting dan kualifikasi dilakukan secara manual, mengakibatkan waktu respons yang lambat, banyaknya leads berkualitas rendah yang diproses bersamaan dengan leads prioritas tinggi, dan hilangnya potensi konversi akibat keterlambatan penanganan.",

    architecture: {
      description:
        "Sistem terdiri dari tiga komponen utama: (1) n8n sebagai workflow orchestrator yang menangani trigger, routing, dan integrasi antar sistem, (2) AI Agent berbasis Gemini 2.5 yang melakukan analisis dan kualifikasi prospek berdasarkan parameter bisnis yang telah ditentukan, dan (3) TwentyCRM sebagai sistem penyimpanan dan manajemen data prospek terformat.",
      imageSrc: "/images/projects/prospecting-architecture.png",
      imageAlt: "Automated Prospecting Engine Architecture",
      layers: undefined,
    },

    techStack: [
      { name: "n8n", icon: "/images/n8n.webp" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],

    pipeline: {
      description: "Alur kerja sistem dari input data mentah hingga output leads terklasifikasi dan tersinkronisasi di CRM.",
      steps: [
        { step: 1, title: "Data Input / Trigger", description: "Data prospek masuk melalui form, spreadsheet, atau API endpoint dan men-trigger workflow n8n secara otomatis", tool: "n8n Webhook" },
        { step: 2, title: "Data Preprocessing", description: "Data mentah dinormalisasi, duplikat dihapus, dan field yang hilang diisi dengan nilai default", tool: "n8n + Python" },
        { step: 3, title: "AI Qualification", description: "AI Agent menganalisis setiap prospek berdasarkan parameter industri, ukuran perusahaan, dan kebutuhan, lalu memberikan skor kualifikasi", tool: "Gemini 2.5 AI Agent" },
        { step: 4, title: "Segmentation & Routing", description: "Prospek disegmentasi berdasarkan skor dan di-route ke antrian yang sesuai (Hot, Warm, Cold)", tool: "n8n Router" },
        { step: 5, title: "CRM Sync", description: "Prospek yang telah terklasifikasi disinkronkan ke TwentyCRM dengan segmen, prioritas, dan catatan AI yang sudah ditentukan", tool: "TwentyCRM API" },
      ],
    },

    features: [
      { title: "AI-Powered Lead Scoring", description: "Gemini 2.5 menganalisis setiap prospek secara mendalam dan memberikan skor kualifikasi berdasarkan parameter bisnis yang presisi", icon: "Brain" },
      { title: "Automatic Segmentation", description: "Prospek secara otomatis disegmentasi menjadi Hot, Warm, dan Cold leads berdasarkan skor AI, tanpa intervensi manual", icon: "Filter" },
      { title: "CRM Auto-Sync", description: "Semua data prospek terklasifikasi langsung tersinkronisasi ke TwentyCRM dengan metadata lengkap dan catatan AI", icon: "RefreshCw" },
      { title: "Real-time Notifications", description: "Tim Sales menerima notifikasi real-time ketika Hot leads baru masuk sehingga respons dapat dilakukan dalam hitungan menit", icon: "Bell" },
    ],

    results: {
      summary: "Sistem berhasil mengotomasi seluruh proses kualifikasi prospek yang sebelumnya dilakukan secara manual. Tim Sales dapat fokus pada leads berkualitas tinggi yang sudah tersegmentasi dan diprioritaskan oleh AI.",
      metrics: [
        { metric: "90%", label: "Time Saved", description: "Waktu kualifikasi per leads berkurang drastis" },
        { metric: "100%", label: "Automation Rate", description: "Seluruh pipeline berjalan otomatis penuh" },
        { metric: "3x", label: "Faster Response", description: "Kecepatan respons ke Hot leads meningkat 3x" },
      ],
    },

    screenshots: [
      { src: "/images/projects/prospecting-1.png", alt: "n8n Workflow Overview", caption: "Tampilan workflow otomasi di n8n" },
      { src: "/images/projects/prospecting-2.png", alt: "CRM Dashboard", caption: "Tampilan leads terklasifikasi di TwentyCRM" },
    ],

    links: {
      github: undefined,
      demo: undefined,
      docs: undefined,
    },

    tabbed: {
      tabs: ["home", "technical", "result"],
      home: {
        en: {
          tagline: "An intelligent automation system built with n8n to revolutionize lead management — replacing hours of manual sorting with a fully automated AI-powered qualification pipeline.",
          vision: "To eliminate manual inefficiency in the sales prospecting process by making AI-driven qualification the standard, enabling sales teams to focus entirely on high-value conversations.",
          mission: "Building a seamless automation pipeline that ingests raw prospect data, qualifies it using AI, segments it with precision, and syncs it to the CRM — all without human intervention.",
          targetUsers: [
            { role: "Sales Team", motivation: "Want to spend time on high-quality leads instead of manually sorting through raw prospect data" },
            { role: "Sales Manager", motivation: "Need visibility into lead quality and pipeline health with minimal operational overhead" },
            { role: "Business Development", motivation: "Want a scalable system that can handle growing lead volumes without proportionally growing the team" },
          ],
          problems: [
            { title: "Manual Qualification Bottleneck", description: "The sales team spent hours each day manually reviewing and sorting raw prospect data, creating a bottleneck that delayed outreach to high-value leads." },
            { title: "Inconsistent Scoring", description: "Without a standardized system, different team members evaluated leads with different criteria, leading to inconsistent prioritization and missed opportunities." },
            { title: "Slow CRM Updates", description: "Manually entering qualified leads into the CRM was error-prone and time-consuming, often resulting in outdated or incomplete records." },
          ],
          solutions: [
            { title: "AI-Powered Qualification Engine", description: "Gemini 2.5 evaluates each prospect against predefined business parameters and assigns a qualification score, replacing inconsistent manual judgment with objective AI analysis." },
            { title: "Automated Segmentation", description: "Leads are automatically classified into Hot, Warm, and Cold segments based on their AI scores, ensuring the right leads reach the right people at the right time." },
            { title: "Seamless CRM Integration", description: "Qualified and segmented leads are automatically pushed to TwentyCRM with full metadata, eliminating manual data entry and ensuring records are always up to date." },
          ],
        },
        id: {
          tagline: "Sistem otomasi cerdas yang dibangun dengan n8n untuk merevolusi manajemen leads — menggantikan jam-jam penyortiran manual dengan pipeline kualifikasi berbasis AI yang sepenuhnya otomatis.",
          vision: "Menghilangkan inefisiensi manual dalam proses prospekting sales dengan menjadikan kualifikasi berbasis AI sebagai standar, sehingga tim sales dapat fokus sepenuhnya pada percakapan bernilai tinggi.",
          mission: "Membangun pipeline otomasi yang mulus untuk mengambil data prospek mentah, mengkualifikasinya menggunakan AI, mensegmentasinya dengan presisi, dan menyinkronkannya ke CRM — semuanya tanpa intervensi manusia.",
          targetUsers: [
            { role: "Tim Sales", motivation: "Ingin menghabiskan waktu untuk leads berkualitas tinggi daripada menyortir data prospek mentah secara manual" },
            { role: "Manajer Sales", motivation: "Membutuhkan visibilitas kualitas leads dan kesehatan pipeline dengan overhead operasional minimal" },
            { role: "Business Development", motivation: "Menginginkan sistem yang dapat diskalakan untuk menangani volume leads yang berkembang tanpa harus menambah tim secara proporsional" },
          ],
          problems: [
            { title: "Bottleneck Kualifikasi Manual", description: "Tim sales menghabiskan berjam-jam setiap hari untuk meninjau dan menyortir data prospek mentah secara manual, menciptakan bottleneck yang menunda outreach ke leads bernilai tinggi." },
            { title: "Penilaian yang Tidak Konsisten", description: "Tanpa sistem terstandarisasi, anggota tim yang berbeda mengevaluasi leads dengan kriteria yang berbeda, mengakibatkan prioritisasi yang tidak konsisten dan peluang yang terlewat." },
            { title: "Pembaruan CRM yang Lambat", description: "Memasukkan leads yang telah dikualifikasi ke CRM secara manual rentan terhadap kesalahan dan memakan waktu, seringkali menghasilkan catatan yang kedaluwarsa atau tidak lengkap." },
          ],
          solutions: [
            { title: "Engine Kualifikasi Berbasis AI", description: "Gemini 2.5 mengevaluasi setiap prospek berdasarkan parameter bisnis yang telah ditentukan dan memberikan skor kualifikasi, menggantikan penilaian manual yang tidak konsisten dengan analisis AI yang objektif." },
            { title: "Segmentasi Otomatis", description: "Leads secara otomatis diklasifikasikan ke segmen Hot, Warm, dan Cold berdasarkan skor AI mereka, memastikan leads yang tepat menjangkau orang yang tepat pada waktu yang tepat." },
            { title: "Integrasi CRM yang Mulus", description: "Leads yang telah dikualifikasi dan disegmentasi secara otomatis didorong ke TwentyCRM dengan metadata lengkap, menghilangkan entri data manual dan memastikan catatan selalu terkini." },
          ],
        },
      },
      technical: {
        en: {
          overview: "The Automated Prospecting Engine is orchestrated entirely by n8n, an open-source workflow automation platform deployed via Docker. It integrates Gemini 2.5 as the AI qualification brain, PostgreSQL for intermediate data storage, and TwentyCRM as the final destination for qualified leads.",
          components: [
            { id: "c1", icon: "GitBranch", title: "n8n Workflow Engine", summary: "Core orchestration platform", detail: "n8n serves as the backbone of the entire system. All workflow logic — from webhook triggers and data preprocessing to AI calls and CRM sync — is defined and executed within n8n. Deployed via Docker for consistent environments." },
            { id: "c2", icon: "Brain", title: "Gemini 2.5 AI Agent", summary: "AI-powered lead qualification", detail: "Gemini 2.5 is called via API within the n8n workflow to analyze each prospect. It evaluates industry fit, company size, budget signals, and intent, then returns a structured qualification score and segment classification." },
            { id: "c3", icon: "Database", title: "PostgreSQL", summary: "Intermediate data storage", detail: "PostgreSQL stores intermediate workflow state, prospect history, and qualification logs. This enables audit trails, reprocessing of failed leads, and analytics on qualification patterns over time." },
            { id: "c4", icon: "Monitor", title: "TwentyCRM", summary: "Final CRM destination", detail: "TwentyCRM receives all qualified and segmented leads via its REST API. Each lead is enriched with AI-generated notes, qualification scores, and segment tags before being pushed to the appropriate pipeline stage." },
          ],
          pipelineLayers: [
            { name: "Input Layer", items: ["Webhook-based data ingestion", "Spreadsheet / CSV import", "API endpoint trigger", "Data normalization & deduplication"], color: "bg-fuchsia-500/10", borderColor: "border-fuchsia-500/30" },
            { name: "Processing Layer", items: ["Gemini 2.5 qualification scoring", "Parameter-based evaluation", "Hot/Warm/Cold segmentation", "PostgreSQL state management"], color: "bg-pink-500/10", borderColor: "border-pink-500/30" },
            { name: "Output Layer", items: ["TwentyCRM API sync", "Segment-based routing", "Real-time Sales notifications", "Audit log storage"], color: "bg-rose-500/10", borderColor: "border-rose-500/30" },
          ],
          techStack: [
            { name: "n8n", icon: "/images/n8n.webp" },
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
          ],
          features: [
            { title: "AI-Powered Lead Scoring", description: "Gemini 2.5 performs deep analysis of each prospect and assigns a qualification score based on precise business parameters.", icon: "Brain" },
            { title: "Automatic Segmentation", description: "Prospects are automatically segmented into Hot, Warm, and Cold leads based on AI scores, with no manual intervention required.", icon: "Filter" },
            { title: "CRM Auto-Sync", description: "All classified leads are instantly synced to TwentyCRM with complete metadata and AI-generated notes.", icon: "RefreshCw" },
            { title: "Real-time Notifications", description: "Sales team receives instant notifications when new Hot leads enter the pipeline, enabling sub-minute response times.", icon: "Bell" },
          ],
        },
        id: {
          overview: "Automated Prospecting Engine diorkestrasi sepenuhnya oleh n8n, platform otomasi workflow open-source yang di-deploy via Docker. Sistem ini mengintegrasikan Gemini 2.5 sebagai otak kualifikasi AI, PostgreSQL untuk penyimpanan data sementara, dan TwentyCRM sebagai tujuan akhir untuk leads yang telah dikualifikasi.",
          components: [
            { id: "c1", icon: "GitBranch", title: "n8n Workflow Engine", summary: "Platform orkestrasi inti", detail: "n8n berfungsi sebagai tulang punggung seluruh sistem. Semua logika workflow — dari webhook trigger dan preprocessing data hingga panggilan AI dan sinkronisasi CRM — didefinisikan dan dieksekusi dalam n8n. Di-deploy via Docker untuk konsistensi environment." },
            { id: "c2", icon: "Brain", title: "Gemini 2.5 AI Agent", summary: "Kualifikasi leads berbasis AI", detail: "Gemini 2.5 dipanggil melalui API dalam workflow n8n untuk menganalisis setiap prospek. Ia mengevaluasi kesesuaian industri, ukuran perusahaan, sinyal anggaran, dan intent, lalu mengembalikan skor kualifikasi terstruktur dan klasifikasi segmen." },
            { id: "c3", icon: "Database", title: "PostgreSQL", summary: "Penyimpanan data sementara", detail: "PostgreSQL menyimpan state workflow sementara, riwayat prospek, dan log kualifikasi. Ini memungkinkan audit trail, pemrosesan ulang leads yang gagal, dan analitik pada pola kualifikasi dari waktu ke waktu." },
            { id: "c4", icon: "Monitor", title: "TwentyCRM", summary: "Tujuan CRM akhir", detail: "TwentyCRM menerima semua leads yang telah dikualifikasi dan disegmentasi melalui REST API-nya. Setiap leads diperkaya dengan catatan yang dihasilkan AI, skor kualifikasi, dan tag segmen sebelum didorong ke stage pipeline yang sesuai." },
          ],
          pipelineLayers: [
            { name: "Layer Input", items: ["Ingestion data berbasis webhook", "Import spreadsheet / CSV", "Trigger API endpoint", "Normalisasi & deduplication data"], color: "bg-fuchsia-500/10", borderColor: "border-fuchsia-500/30" },
            { name: "Layer Pemrosesan", items: ["Scoring kualifikasi Gemini 2.5", "Evaluasi berbasis parameter", "Segmentasi Hot/Warm/Cold", "Manajemen state PostgreSQL"], color: "bg-pink-500/10", borderColor: "border-pink-500/30" },
            { name: "Layer Output", items: ["Sinkronisasi API TwentyCRM", "Routing berbasis segmen", "Notifikasi Sales real-time", "Penyimpanan audit log"], color: "bg-rose-500/10", borderColor: "border-rose-500/30" },
          ],
          techStack: [
            { name: "n8n", icon: "/images/n8n.webp" },
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
          ],
          features: [
            { title: "AI-Powered Lead Scoring", description: "Gemini 2.5 melakukan analisis mendalam pada setiap prospek dan memberikan skor kualifikasi berdasarkan parameter bisnis yang presisi.", icon: "Brain" },
            { title: "Segmentasi Otomatis", description: "Prospek secara otomatis disegmentasi menjadi Hot, Warm, dan Cold leads berdasarkan skor AI, tanpa intervensi manual.", icon: "Filter" },
            { title: "CRM Auto-Sync", description: "Semua leads terklasifikasi langsung tersinkronisasi ke TwentyCRM dengan metadata lengkap dan catatan yang dihasilkan AI.", icon: "RefreshCw" },
            { title: "Notifikasi Real-time", description: "Tim Sales menerima notifikasi instan ketika Hot leads baru masuk ke pipeline, memungkinkan waktu respons di bawah satu menit.", icon: "Bell" },
          ],
        },
      },
      result: {
        en: {
          note: "Some screenshots may contain internal business data. All sensitive company and client information has been blurred or anonymized. Certain workflow details are intentionally omitted for confidentiality reasons.",
          screenshots: [
            { src: "/images/projects/prospecting-1.png", alt: "n8n Workflow Overview", caption: "Automation workflow overview in n8n" },
            { src: "/images/projects/prospecting-2.png", alt: "CRM Dashboard", caption: "Classified leads in TwentyCRM dashboard" },
          ],
        },
        id: {
          note: "Beberapa screenshot mungkin mengandung data bisnis internal. Semua informasi perusahaan dan klien yang sensitif telah diburamkan atau dianonimkan. Detail workflow tertentu sengaja dihilangkan untuk alasan kerahasiaan.",
          screenshots: [
            { src: "/images/projects/prospecting-1.png", alt: "Tampilan Workflow n8n", caption: "Tampilan workflow otomasi di n8n" },
            { src: "/images/projects/prospecting-2.png", alt: "Dashboard CRM", caption: "Tampilan leads terklasifikasi di dashboard TwentyCRM" },
          ],
        },
      },
    },
  },
];

// Helper function
export function getProjectById(id: string): ProjectDetail | undefined {
  return projectsDetail.find((p) => p.id === id);
}