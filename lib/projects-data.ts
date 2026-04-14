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
    tagline: "Data as a Product",
    badge: "Data Lakehouse · Decision Support System · Smart Solution",
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    status: "In Progress",
    year: "2026",

    overview:
      "FuturaMap merupakan platform decision-support berbasis data yang dirancang untuk membantu siswa SMA dalam menentukan jenjang karier sehingga bisa menentukan pilihan program studi yang tepat di perguruan tinggi negeri (PTN) Indonesia melalui jalur SNBP. Dengan mengintegrasikan berbagai sumber data akademik, sosial, dan ekonomi, FuturaMap memberikan rekomendasi Pekerjaan, Jurusan, dan Kampus yang paling sesuai dengan profil dari setiap siswa.",

    role: {
      title: "Data Engineer & Product Developer",
      responsibilities: [
        "Merancang arsitektur Data Lakehouse dengan pendekatan Medallion (Bronze, Silver, Gold)",
        "Membangun pipeline ETL menggunakan DuckDB dan SQLMesh",
        "Mengintegrasikan SmolLM2 sebagai AI engine untuk rekomendasi kursus",
        "Membangun sistem alert otomatis ke Guru BK berbasis email",
      ],
    },

    problemStatement:
      "Banyak siswa SMA tidak memiliki akses ke informasi yang akurat dan terstruktur mengenai peluang karier dan program studi yang sesuai. Data yang tersedia seringkali tersebar, tidak konsisten, dan sulit diinterpretasikan oleh siswa maupun orang tua. Akibatnya, banyak siswa salah memilih jurusan dan berujung pada ketidaksesuaian antara minat, kemampuan, dan pilihan studi.",

    architecture: {
      description:
        "FuturaMap menggunakan arsitektur Data Lakehouse modern berbasis Medallion yang terdiri dari tiga layer: Bronze (raw data), Silver (cleaned & validated), dan Gold (aggregated & business-ready). Data disimpan di MinIO sebagai object storage, dengan DuckLake sebagai lakehouse catalog, DuckDB sebagai query engine, dan SQLMesh untuk transformasi data terstruktur.",
      layers: [
        {
          name: "Bronze Layer",
          description: "Raw ingestion dari sumber data asli — nilai akademik, data SNBT, dan profil siswa",
          color: "bg-amber-700/30",
        },
        {
          name: "Silver Layer",
          description: "Data cleaning, validation, dan normalisasi — memastikan konsistensi dan kualitas data",
          color: "bg-slate-400/20",
        },
        {
          name: "Gold Layer",
          description: "Aggregated & analytics-ready — data siap untuk rekomendasi AI dan dashboard",
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
    ],

    pipeline: {
      description: "Alur data FuturaMap dimulai dari ingestion data mentah hingga rekomendasi berbasis AI yang siap dikonsumsi oleh siswa dan guru BK.",
      steps: [
        { step: 1, title: "Data Ingestion", description: "Data akademik, nilai SNBT, dan profil siswa dikumpulkan dari berbagai sumber ke Bronze Layer", tool: "Python Script" },
        { step: 2, title: "Bronze Layer Processing", description: "Data mentah disimpan di MinIO melalui DuckLake catalog tanpa transformasi", tool: "DuckDB + MinIO" },
        { step: 3, title: "Silver Layer Transformation", description: "Data dibersihkan, divalidasi, dan dinormalisasi untuk konsistensi", tool: "SQLMesh" },
        { step: 4, title: "Gold Layer Aggregation", description: "Data diagregasi menjadi metrik bisnis dan fitur siap pakai untuk AI", tool: "DuckDB + SQLMesh" },
        { step: 5, title: "AI Recommendation & Serving", description: "SmolLM2 menghasilkan rekomendasi kursus; sistem mengirim alert ke Guru BK", tool: "SmolLM2 + Email" },
      ],
    },

    features: [
      { title: "Gap Analysis Nilai SNBT", description: "Menganalisis selisih nilai tryout siswa dengan passing grade program studi target secara real-time", icon: "Target" },
      { title: "Medallion Architecture", description: "Arsitektur Bronze-Silver-Gold memastikan data pipeline yang bersih, terstruktur, dan scalable", icon: "Layers" },
      { title: "AI Course Recommendation", description: "SmolLM2 merekomendasikan kursus yang relevan berdasarkan gap analisis nilai setiap siswa", icon: "Sparkles" },
      { title: "Automated BK Alert", description: "Sistem mengirim notifikasi otomatis ke Guru BK ketika siswa terdeteksi membutuhkan bimbingan", icon: "Bell" },
    ],

    results: {
      summary: "FuturaMap berhasil membangun fondasi platform Data as a Product yang robust dengan arsitektur Medallion. Sistem mampu memproses data akademik ribuan siswa dan menghasilkan rekomendasi yang personal dan akurat.",
      metrics: [
        { metric: "3", label: "Medallion Layers", description: "Bronze, Silver, Gold architecture" },
        { metric: "5+", label: "Data Sources", description: "Nilai akademik, SNBT, profil siswa" },
        { metric: "100%", label: "Automation Rate", description: "Pipeline berjalan otomatis penuh" },
      ],
    },

    screenshots: [
      { src: "/images/projects/futuramap-login.jpg", alt: "FuturaMap Login Page", caption: "Halaman Login — autentikasi siswa sebelum mengakses platform" },
      { src: "/images/projects/futuramap-profil-1.jpg", alt: "FuturaMap Profil Siswa 1", caption: "Profil Siswa — data akademik dan informasi personal siswa" },
      { src: "/images/projects/futuramap-profil-2.jpg", alt: "FuturaMap Profil Siswa 2", caption: "Profil Siswa" },
      { src: "/images/projects/futuramap-tryout-1.jpg", alt: "FuturaMap Tryout 1", caption: "Tryout" },
      { src: "/images/projects/futuramap-tryout-2.jpg", alt: "FuturaMap Tryout 2", caption: "Tryout" },
      { src: "/images/projects/futuramap-tryout-3.jpg", alt: "FuturaMap Tryout 3", caption: "Tryout" },
      { src: "/images/projects/futuramap-tryout-4.jpg", alt: "FuturaMap Tryout 4", caption: "Tryout" },
      { src: "/images/projects/futuramap-tryout-5.jpg", alt: "FuturaMap Tryout 5", caption: "Tryout" },
      { src: "/images/projects/futuramap-kursus-1.jpg", alt: "FuturaMap Rekomendasi Kursus 1", caption: "Rekomendasi Kursus" },
      { src: "/images/projects/futuramap-kursus-2.jpg", alt: "FuturaMap Rekomendasi Kursus 2", caption: "Rekomendasi Kursus" },
      { src: "/images/projects/futuramap-email.jpg", alt: "FuturaMap Email Alert", caption: "Email Alert" },
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
          tagline: "A data-driven decision support platform that helps high school students map their career path and choose the right university major through the SNBP pathway.",
          vision: "To become the most trusted data platform for Indonesian high school students in making informed decisions about their academic and career future.",
          mission: "Integrating academic, social, and economic data to provide personalized career, major, and university recommendations tailored to each student's unique profile.",
          targetUsers: [
            { role: "High School Students", motivation: "Want to know which major and university best matches their academic profile and interests" },
            { role: "Guidance Counselors (BK)", motivation: "Need data-driven insights to provide more effective and timely counseling to students" },
            { role: "Parents", motivation: "Want to support their children's decisions with accurate and structured information" },
          ],
          problems: [
            { title: "Scattered Information", description: "Academic data, SNBT scores, and university admission requirements are spread across multiple unconnected sources, making it hard to get a comprehensive picture." },
            { title: "No Personalized Guidance", description: "Generic counseling doesn't account for each student's unique academic profile, interests, and socioeconomic background." },
            { title: "Late Intervention", description: "Guidance counselors often only identify struggling students too late, when the chance to make a meaningful improvement has already passed." },
          ],
          solutions: [
            { title: "Integrated Data Lakehouse", description: "Centralizing all academic data using Medallion architecture (Bronze-Silver-Gold) to ensure clean, consistent, and analytics-ready data." },
            { title: "AI-Powered Recommendations", description: "SmolLM2 analyzes each student's gap between current scores and target passing grades, then recommends the most relevant courses to close that gap." },
            { title: "Automated BK Alerts", description: "The system automatically sends notifications to guidance counselors when a student's data indicates they need immediate support." },
          ],
        },
        id: {
          tagline: "Platform decision-support berbasis data yang membantu siswa SMA memetakan jalur karier dan memilih program studi yang tepat melalui jalur SNBP.",
          vision: "Menjadi platform data paling terpercaya bagi siswa SMA Indonesia dalam mengambil keputusan yang tepat tentang masa depan akademik dan karier mereka.",
          mission: "Mengintegrasikan data akademik, sosial, dan ekonomi untuk memberikan rekomendasi karier, jurusan, dan kampus yang personal sesuai profil unik setiap siswa.",
          targetUsers: [
            { role: "Siswa SMA", motivation: "Ingin mengetahui jurusan dan kampus yang paling sesuai dengan profil akademik dan minat mereka" },
            { role: "Guru BK", motivation: "Membutuhkan wawasan berbasis data untuk memberikan bimbingan yang lebih efektif dan tepat waktu kepada siswa" },
            { role: "Orang Tua", motivation: "Ingin mendukung keputusan anak dengan informasi yang akurat dan terstruktur" },
          ],
          problems: [
            { title: "Informasi Tersebar", description: "Data akademik, nilai SNBT, dan syarat masuk PTN tersebar di berbagai sumber yang tidak terhubung, sehingga sulit mendapatkan gambaran komprehensif." },
            { title: "Tidak Ada Panduan Personal", description: "Bimbingan yang bersifat umum tidak memperhitungkan profil akademik, minat, dan latar belakang sosial ekonomi unik setiap siswa." },
            { title: "Intervensi Terlambat", description: "Guru BK seringkali baru mengetahui siswa yang kesulitan terlambat, saat peluang untuk perbaikan yang berarti sudah terlewat." },
          ],
          solutions: [
            { title: "Data Lakehouse Terintegrasi", description: "Memusatkan semua data akademik menggunakan arsitektur Medallion (Bronze-Silver-Gold) untuk memastikan data yang bersih, konsisten, dan siap analisis." },
            { title: "Rekomendasi Berbasis AI", description: "SmolLM2 menganalisis gap nilai setiap siswa terhadap passing grade target, lalu merekomendasikan kursus paling relevan untuk menutup gap tersebut." },
            { title: "Alert Otomatis ke Guru BK", description: "Sistem secara otomatis mengirimkan notifikasi ke Guru BK ketika data siswa mengindikasikan mereka membutuhkan dukungan segera." },
          ],
        },
      },
      technical: {
        en: {
          overview: "FuturaMap is built on a modern Data Lakehouse architecture using the Medallion pattern. Data flows from raw ingestion through structured transformation layers, ultimately serving AI-powered recommendations and automated alerts through a clean Gold layer.",
          components: [
            { id: "c1", icon: "Database", title: "DuckDB", summary: "In-process analytical query engine", detail: "DuckDB serves as the primary query engine for all analytical workloads. Its in-process nature eliminates network overhead and enables fast OLAP queries directly on Parquet files stored in MinIO." },
            { id: "c2", icon: "HardDrive", title: "MinIO", summary: "S3-compatible on-premises object storage", detail: "MinIO acts as the object storage layer, storing all Parquet files across Bronze, Silver, and Gold layers. Its S3-compatible API makes it seamlessly interoperable with DuckLake catalog." },
            { id: "c3", icon: "Settings", title: "SQLMesh", summary: "Data transformation & pipeline orchestration", detail: "SQLMesh manages all SQL-based transformations between Medallion layers. It provides lineage tracking, incremental processing, and environment-based deployments for safe data transformations." },
            { id: "c4", icon: "Server", title: "DuckLake", summary: "Lakehouse catalog on top of DuckDB", detail: "DuckLake provides the lakehouse catalog layer, enabling ACID transactions, schema evolution, and time-travel queries on top of DuckDB and MinIO storage." },
            { id: "c5", icon: "Brain", title: "SmolLM2", summary: "On-device AI for course recommendations", detail: "SmolLM2 runs locally to analyze each student's academic gap and generate personalized course recommendations without relying on external API calls, ensuring data privacy." },
            { id: "c6", icon: "Bell", title: "Email Alert System", summary: "Automated notifications for counselors", detail: "A Python-based alert system monitors student data and automatically sends structured email notifications to guidance counselors when predefined thresholds are triggered." },
          ],
          pipelineLayers: [
            { name: "Ingestion Layer", items: ["Raw academic scores ingestion", "SNBT score data collection", "Student profile data loading", "Multi-source data consolidation"], color: "bg-amber-500/10", borderColor: "border-amber-500/30" },
            { name: "Transformation Layer", items: ["Bronze: raw storage in MinIO", "Silver: cleaning & validation via SQLMesh", "Gold: aggregation & feature engineering", "DuckDB as query engine across all layers"], color: "bg-cyan-500/10", borderColor: "border-cyan-500/30" },
            { name: "Serving Layer", items: ["AI recommendation engine (SmolLM2)", "Gap analysis computation", "Automated BK alert dispatch", "Student-facing recommendation API"], color: "bg-emerald-500/10", borderColor: "border-emerald-500/30" },
          ],
          techStack: [
            { name: "DuckDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/duckdb/duckdb-original.svg" },
            { name: "SQLMesh", icon: "https://cdn.prod.website-files.com/67f7cdf0feddc96ca194ff1a/67f7cdf0feddc96ca1950030_symbol-sqlmesh.svg" },
            { name: "MinIO", icon: "/images/minio.svg" },
            { name: "DuckLake", icon: "https://ducklake.select/images/logo/DuckLake-dark-icon.png" },
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
          ],
          features: [
            { title: "SNBT Score Gap Analysis", description: "Real-time computation of the gap between a student's tryout scores and the target passing grade for their chosen program.", icon: "Target" },
            { title: "Medallion Architecture", description: "Three-layer Bronze-Silver-Gold pipeline ensuring clean, consistent, and business-ready data at every stage.", icon: "Layers" },
            { title: "AI Course Recommendation", description: "SmolLM2 generates personalized course recommendations based on each student's unique academic gap profile.", icon: "Sparkles" },
            { title: "Automated BK Alert", description: "Rule-based monitoring system automatically notifies guidance counselors when student data triggers predefined thresholds.", icon: "Bell" },
          ],
        },
        id: {
          overview: "FuturaMap dibangun di atas arsitektur Data Lakehouse modern menggunakan pola Medallion. Data mengalir dari ingestion mentah melalui layer transformasi terstruktur, yang pada akhirnya melayani rekomendasi berbasis AI dan alert otomatis melalui Gold layer yang bersih.",
          components: [
            { id: "c1", icon: "Database", title: "DuckDB", summary: "Query engine analitik in-process", detail: "DuckDB berfungsi sebagai query engine utama untuk semua workload analitik. Sifat in-process-nya menghilangkan overhead jaringan dan memungkinkan query OLAP cepat langsung pada file Parquet yang disimpan di MinIO." },
            { id: "c2", icon: "HardDrive", title: "MinIO", summary: "Object storage on-premises kompatibel S3", detail: "MinIO bertindak sebagai layer object storage, menyimpan semua file Parquet di seluruh layer Bronze, Silver, dan Gold. API-nya yang kompatibel S3 membuatnya dapat beroperasi secara mulus dengan katalog DuckLake." },
            { id: "c3", icon: "Settings", title: "SQLMesh", summary: "Transformasi data & orkestrasi pipeline", detail: "SQLMesh mengelola semua transformasi berbasis SQL antar layer Medallion. Menyediakan pelacakan lineage, pemrosesan inkremental, dan deployment berbasis environment untuk transformasi data yang aman." },
            { id: "c4", icon: "Server", title: "DuckLake", summary: "Katalog lakehouse di atas DuckDB", detail: "DuckLake menyediakan layer katalog lakehouse, memungkinkan transaksi ACID, evolusi skema, dan query time-travel di atas penyimpanan DuckDB dan MinIO." },
            { id: "c5", icon: "Brain", title: "SmolLM2", summary: "AI on-device untuk rekomendasi kursus", detail: "SmolLM2 berjalan secara lokal untuk menganalisis gap akademik setiap siswa dan menghasilkan rekomendasi kursus yang personal tanpa bergantung pada panggilan API eksternal, memastikan privasi data." },
            { id: "c6", icon: "Bell", title: "Sistem Email Alert", summary: "Notifikasi otomatis untuk guru BK", detail: "Sistem alert berbasis Python memantau data siswa dan secara otomatis mengirim notifikasi email terstruktur ke guru BK ketika threshold yang telah ditentukan terpicu." },
          ],
          pipelineLayers: [
            { name: "Layer Ingestion", items: ["Ingestion nilai akademik mentah", "Pengumpulan data nilai SNBT", "Pemuatan data profil siswa", "Konsolidasi data multi-sumber"], color: "bg-amber-500/10", borderColor: "border-amber-500/30" },
            { name: "Layer Transformasi", items: ["Bronze: penyimpanan mentah di MinIO", "Silver: cleaning & validasi via SQLMesh", "Gold: agregasi & feature engineering", "DuckDB sebagai query engine di semua layer"], color: "bg-cyan-500/10", borderColor: "border-cyan-500/30" },
            { name: "Layer Serving", items: ["Engine rekomendasi AI (SmolLM2)", "Komputasi gap analysis", "Pengiriman alert BK otomatis", "API rekomendasi untuk siswa"], color: "bg-emerald-500/10", borderColor: "border-emerald-500/30" },
          ],
          techStack: [
            { name: "DuckDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/duckdb/duckdb-original.svg" },
            { name: "SQLMesh", icon: "https://cdn.prod.website-files.com/67f7cdf0feddc96ca194ff1a/67f7cdf0feddc96ca1950030_symbol-sqlmesh.svg" },
            { name: "MinIO", icon: "/images/minio.svg" },
            { name: "DuckLake", icon: "https://ducklake.select/images/logo/DuckLake-dark-icon.png" },
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
          ],
          features: [
            { title: "Gap Analysis Nilai SNBT", description: "Komputasi real-time selisih antara nilai tryout siswa dan passing grade target program studi yang dipilih.", icon: "Target" },
            { title: "Arsitektur Medallion", description: "Pipeline tiga layer Bronze-Silver-Gold memastikan data yang bersih, konsisten, dan siap bisnis di setiap tahap.", icon: "Layers" },
            { title: "Rekomendasi Kursus AI", description: "SmolLM2 menghasilkan rekomendasi kursus personal berdasarkan profil gap akademik unik setiap siswa.", icon: "Sparkles" },
            { title: "Alert Otomatis ke BK", description: "Sistem monitoring berbasis aturan secara otomatis memberi tahu guru BK ketika data siswa memicu threshold yang telah ditentukan.", icon: "Bell" },
          ],
        },
      },
      result: {
        en: {
          note: "Some screenshots may contain sensitive student academic data. All personal information has been anonymized or blurred to protect student privacy. This project is currently in active development.",
          screenshots: [
            { src: "/images/projects/futuramap-login.jpg", alt: "FuturaMap Login Page", caption: "Login Page — student authentication before accessing the platform" },
            { src: "/images/projects/futuramap-profil-1.jpg", alt: "FuturaMap Student Profile 1", caption: "Student Profile — academic data and personal information" },
            { src: "/images/projects/futuramap-profil-2.jpg", alt: "FuturaMap Student Profile 2", caption: "Student Profile" },
            { src: "/images/projects/futuramap-tryout-1.jpg", alt: "FuturaMap Tryout 1", caption: "Tryout Module" },
            { src: "/images/projects/futuramap-tryout-2.jpg", alt: "FuturaMap Tryout 2", caption: "Tryout Module" },
            { src: "/images/projects/futuramap-tryout-3.jpg", alt: "FuturaMap Tryout 3", caption: "Tryout Module" },
            { src: "/images/projects/futuramap-tryout-4.jpg", alt: "FuturaMap Tryout 4", caption: "Tryout Module" },
            { src: "/images/projects/futuramap-tryout-5.jpg", alt: "FuturaMap Tryout 5", caption: "Tryout Module" },
            { src: "/images/projects/futuramap-kursus-1.jpg", alt: "FuturaMap Course Recommendation 1", caption: "Course Recommendation" },
            { src: "/images/projects/futuramap-kursus-2.jpg", alt: "FuturaMap Course Recommendation 2", caption: "Course Recommendation" },
            { src: "/images/projects/futuramap-email.jpg", alt: "FuturaMap Email Alert", caption: "Automated Email Alert to Guidance Counselor" },
          ],
        },
        id: {
          note: "Beberapa screenshot mungkin mengandung data akademik siswa yang sensitif. Semua informasi pribadi telah dianonimkan atau diburamkan untuk melindungi privasi siswa. Proyek ini saat ini sedang dalam pengembangan aktif.",
          screenshots: [
            { src: "/images/projects/futuramap-login.jpg", alt: "FuturaMap Halaman Login", caption: "Halaman Login — autentikasi siswa sebelum mengakses platform" },
            { src: "/images/projects/futuramap-profil-1.jpg", alt: "FuturaMap Profil Siswa 1", caption: "Profil Siswa — data akademik dan informasi personal siswa" },
            { src: "/images/projects/futuramap-profil-2.jpg", alt: "FuturaMap Profil Siswa 2", caption: "Profil Siswa" },
            { src: "/images/projects/futuramap-tryout-1.jpg", alt: "FuturaMap Tryout 1", caption: "Modul Tryout" },
            { src: "/images/projects/futuramap-tryout-2.jpg", alt: "FuturaMap Tryout 2", caption: "Modul Tryout" },
            { src: "/images/projects/futuramap-tryout-3.jpg", alt: "FuturaMap Tryout 3", caption: "Modul Tryout" },
            { src: "/images/projects/futuramap-tryout-4.jpg", alt: "FuturaMap Tryout 4", caption: "Modul Tryout" },
            { src: "/images/projects/futuramap-tryout-5.jpg", alt: "FuturaMap Tryout 5", caption: "Modul Tryout" },
            { src: "/images/projects/futuramap-kursus-1.jpg", alt: "FuturaMap Rekomendasi Kursus 1", caption: "Rekomendasi Kursus" },
            { src: "/images/projects/futuramap-kursus-2.jpg", alt: "FuturaMap Rekomendasi Kursus 2", caption: "Rekomendasi Kursus" },
            { src: "/images/projects/futuramap-email.jpg", alt: "FuturaMap Email Alert", caption: "Email Alert Otomatis ke Guru BK" },
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