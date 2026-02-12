export type Locale = "en" | "id";

export const translations = {
  en: {
    nav: {
      home: "Home",
      techStack: "Tech Stack",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    home: {
      greeting: "Hi,",
      name: "I'm Vincent",
      position: "Data Engineer Intern @PT. Data Andalan Utama",
      description:
        "Passionate Data Engineer dedicated to turning raw, messy data into high-performance pipelines and actionable insights. I bridge the gap between complex data infrastructure and strategic decision-making, ensuring data is not just stored, but empowered to drive business growth.",
      hireMeBtn: "Contact Me",
      seeWorkBtn: "See My Work",
      whatILikeTitle: "Tagline",
      tags: [
        "Data Architecture",
        "Data Pipeline",
        "Data Transformation",
        "Intelligent Systems",
        "ETL/ELT",
        "Analytics Dashboard",
        "On-Premises",
      ],
      terminalLines: [
        { prompt: "michael@de:~$ ", command: "what i do" },
        { output: "- building pipelines" },
        { output: "- get business insights" },
        { prompt: "michael@de:~$ ", command: "expertise.core" },
        { output: "[Python] [SQL]" },
        { output: "[Data Engineering]" },
      ],
      visitors: "Visitors",
    },
    techStack: {
      title: "Tech Stack",
      titleAccent: "& Tools",
      description:
        "The choice of technology and tools that I use to build robust data pipelines and elegant systems",
      categories: {
        programmingLanguages: "PROGRAMMING LANGUAGES",
        dataStorage: "DATA STORAGE",
        dataOrchestration: "DATA ORCHESTRATION",
        dataTransformation: "DATA TRANSFORMATION",
        dataIngestion: "DATA INGESTION",
        cloudPlatforms: "CLOUD PLATFORMS",
        dataVisualization: "DATA VISUALIZATION",
        professionalTools: "PROFESSIONAL TOOLS",
      },
    },
    projects: {
      title: "My",
      titleAccent: "Projects",
      description:
        "A handpicked selection of my work, from data pipelines to intelligent systems",
      campussly: {
        name: "Campussly",
        description:
          "An innovative data product designed as an intelligent decision-support system to help high school students map their chances of admission to State Universities (PTN) through the SNBP selection pathway. Integrates a modern Data Lakehouse ecosystem with DuckDB and SQLMesh to manage academic data pipelines through a Medallion architecture (Bronze, Silver, Gold).",
      },
      prospectingEngine: {
        name: "Automated Prospecting Engine",
        description:
          "An intelligent automation solution built with n8n to revolutionize prospect (leads) management efficiently. Addresses Sales team inefficiencies in sorting raw data by implementing AI-based automatic qualification and segmentation systems with precise data parameters.",
      },
    },
    experience: {
      title: "My",
      titleAccent: "Journey",
      description: "A timeline of my educational and professional milestones",
      items: [
        {
          date: "Jul 2023",
          title: "Enrolled at SMK Nusaputera 1 Semarang",
          description: "Started my vocational high school journey in Computer Network and Telecommunication Engineering",
        },
        {
          date: "Oct 2024",
          title: "Student Council President",
          description: "Elected as President of the Student Council at SMK Nusaputera 1 Semarang (Oct 2024 - Sept 2025)",
        },
        {
          date: "Oct 2024",
          title: "3rd Place - GESIT Binus University",
          description: "Won 3rd place in the Ideation category at GESIT event held by Binus University @Semarang",
        },
        {
          date: "Dec 2024",
          title: "Gold Medal - KSAN Informatics",
          description: "Achieved a Gold Medal in the National Science Competition (KSAN) for Informatics",
        },
        {
          date: "Oct 2025",
          title: "Samsung Solve for Tomorrow - Semifinalist",
          description: "Reached the semifinal round in the Samsung Solve for Tomorrow competition",
        },
        {
          date: "Nov 2025 - Present",
          title: "Data Engineer Intern",
          description: "Currently interning as a Data Engineer at PT. Data Andalan Utama",
        },
      ],
    },
    contact: {
      title: "Keep in Touch",
      titleAccent: "Touch",
      description:
        "Open for new opportunities and collaborations. Drop me a message and I'll get back to you as soon as possible.",
      sendMessage: "Send Message",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Project Inquiry",
      messageLabel: "Your Message",
      messagePlaceholder: "Write your message here...",
      sendBtn: "Send Message",
      contactInfo: "Contact Information",
      phone: "+62 878 9663 0757",
      phoneLabel: "Phone Number",
      location: "Semarang, Central Java, Indonesia",
      locationLabel: "Location",
      socialMedia: "Social Media",
      connectMessage:
        "Feel free to reach out to me through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      techStack: "Tech Stack",
      projects: "Proyek",
      experience: "Pengalaman",
      contact: "Kontak",
    },
    home: {
      greeting: "Hai,",
      name: "Saya Vincent",
      position: "Data Engineer Intern @ PT. Data Andalan Utama",
      description:
        "Data Engineer yang berdedikasi mengubah data mentah dan berantakan menjadi pipeline berkinerja tinggi dan wawasan yang dapat ditindaklanjuti. Saya menjembatani kesenjangan antara infrastruktur data yang kompleks dan pengambilan keputusan strategis, memastikan data tidak hanya disimpan, tetapi diberdayakan untuk mendorong pertumbuhan bisnis.",
      hireMeBtn: "Hubungi Saya",
      seeWorkBtn: "Lihat Karya",
      whatILikeTitle: "Tagline",
      tags: [
        "Arsitektur Data",
        "Pipeline Data",
        "Transformasi Data",
        "Sistem Cerdas",
        "ETL/ELT",
        "Dashboard Analitik",
        "On-Premises",
      ],
      terminalLines: [
        { prompt: "michael@de:~$ ", command: "whatilike" },
        { output: "- data engineering" },
        { output: "- membangun pipeline" },
        { prompt: "michael@de:~$ ", command: "expertise.core" },
        { output: "[Python] [SQL]" },
        { output: "[Data Engineering]" },
      ],
      visitors: "Pengunjung",
    },
    techStack: {
      title: "Tech Stack",
      titleAccent: "& Tools",
      description:
        "Pilihan teknologi dan alat yang saya gunakan untuk membangun pipeline data yang tangguh dan sistem yang elegan",
      categories: {
        programmingLanguages: "BAHASA PEMROGRAMAN",
        dataStorage: "PENYIMPANAN DATA",
        dataOrchestration: "ORKESTRASI DATA",
        dataTransformation: "TRANSFORMASI DATA",
        dataIngestion: "INGESTI DATA",
        cloudPlatforms: "PLATFORM CLOUD",
        dataVisualization: "VISUALISASI DATA",
        professionalTools: "ALAT PROFESIONAL",
      },
    },
    projects: {
      title: "Proyek",
      titleAccent: "Saya",
      description:
        "Pilihan karya terbaik saya, dari pipeline data hingga sistem cerdas",
      campussly: {
        name: "Campussly",
        description:
          "Produk data inovatif yang dirancang sebagai sistem pendukung keputusan cerdas untuk membantu siswa SMA memetakan peluang kelulusan di PTN melalui jalur SNBP. Mengintegrasikan ekosistem Data Lakehouse modern dengan DuckDB dan SQLMesh untuk mengelola pipeline data akademik melalui arsitektur Medallion (Bronze, Silver, Gold).",
      },
      prospectingEngine: {
        name: "Automated Prospecting Engine",
        description:
          "Solusi otomasi cerdas yang dibangun menggunakan n8n untuk merevolusi proses manajemen prospek secara efisien. Mengatasi inefisiensi tim Sales dalam memilah data mentah dengan menerapkan sistem kualifikasi dan segmentasi otomatis berbasis AI.",
      },
    },
    experience: {
      title: "Perjalanan",
      titleAccent: "Saya",
      description: "Timeline pencapaian pendidikan dan profesional saya",
      items: [
        {
          date: "Jul 2023",
          title: "Masuk SMK Nusaputera 1 Semarang",
          description: "Memulai perjalanan SMK di bidang Teknik Komputer dan Jaringan Telekomunikasi",
        },
        {
          date: "Okt 2024",
          title: "Ketua OSIS",
          description: "Terpilih sebagai Ketua OSIS SMK Nusaputera 1 Semarang (Okt 2024 - Sept 2025)",
        },
        {
          date: "Okt 2024",
          title: "Juara 3 - GESIT Binus University",
          description: "Meraih Juara 3 kategori Ideation di acara GESIT Binus University @Semarang",
        },
        {
          date: "Des 2024",
          title: "Medali Emas - KSAN Informatika",
          description: "Meraih Medali Emas di Kompetisi Sains Nasional (KSAN) bidang Informatika",
        },
        {
          date: "Okt 2025",
          title: "Samsung Solve for Tomorrow - Semifinalis",
          description: "Mencapai babak semifinal kompetisi Samsung Solve for Tomorrow",
        },
        {
          date: "Nov 2025 - Sekarang",
          title: "Data Engineer Intern",
          description: "Saat ini magang sebagai Data Engineer di PT. Data Andalan Utama",
        },
      ],
    },
    contact: {
      title: "Tetap",
      titleAccent: "Terhubung",
      description:
        "Terbuka untuk peluang dan kolaborasi baru. Kirimkan pesan dan saya akan membalas sesegera mungkin.",
      sendMessage: "Kirim Pesan",
      emailLabel: "Alamat Email",
      emailPlaceholder: "anda@contoh.com",
      subjectLabel: "Subjek",
      subjectPlaceholder: "Pertanyaan Proyek",
      messageLabel: "Pesan Anda",
      messagePlaceholder: "Tulis pesan Anda di sini...",
      sendBtn: "Kirim Pesan",
      contactInfo: "Informasi Kontak",
      phone: "+62 878 9663 0757",
      phoneLabel: "Nomor Telepon",
      location: "Semarang, Jawa Tengah, Indonesia",
      locationLabel: "Lokasi",
      socialMedia: "Media Sosial",
      connectMessage:
        "Jangan ragu untuk menghubungi saya melalui platform ini. Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau peluang untuk menjadi bagian dari visi Anda.",
    },
  },
} as const;

export type Translations = typeof translations;
