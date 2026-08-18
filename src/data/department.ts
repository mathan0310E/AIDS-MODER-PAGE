/**
 * Department content layer — verified facts sourced from SKP Engineering
 * College official information. Faculty/lab/project entries are photo-ready
 * placeholders the department fills in later. Never publish invented facts.
 */

export const site = {
  collegeName: "SKP Engineering College",
  collegeNameUpper: "SKP ENGINEERING COLLEGE",
  trust: "Sri. S. Kuppusaamy Memorial Educational Trust",
  departmentName: "B.Tech Artificial Intelligence & Data Science",
  departmentShort: "AI & Data Science",
  departmentCode: "AI&DS",
  tagline: "Learn. Build. Innovate. Lead.",
  heroTagline:
    "Where curious minds learn to build intelligent systems — from first lines of Python to production-grade AI.",
  approvedBy: "AICTE",
  affiliatedTo: "Anna University, Chennai",
  collegeEstablished: 1999,
  programEstablished: "2023–24",
  initialIntake: 60,
  address: {
    line1: "NH 66, Somasipadi Post,",
    line2: "Chinnakangiyanur, Tiruvannamalai,",
    line3: "Tamil Nadu — 606611",
  },
  collegeWebsite: "https://skpec.edu.in/",
  departmentEmail: "aids@skpec.edu.in",
  mapsQuery:
    "SKP Engineering College, NH 66, Somasipadi Post, Tiruvannamalai, Tamil Nadu 606611",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://aids.skpec.edu.in",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Labs", href: "#labs" },
  { label: "Projects", href: "#projects" },
  { label: "Careers", href: "#careers" },
  { label: "Faculty", href: "#faculty" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
] as const;

export const PLACEHOLDER_NOTE = "Information will be updated by the department.";

/* --------------------------------- Stats ---------------------------------- */

export interface Stat {
  label: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  provenance?: string;
}

export const stats: Stat[] = [
  { label: "Program established", value: "2023–24", provenance: "Anna University" },
  { label: "Annual intake", value: "60", numericValue: 60, provenance: "AICTE approved" },
  { label: "Duration", value: "4", suffix: " yrs", provenance: "8 semesters" },
  { label: "Degree", value: "B.Tech", provenance: "AI & Data Science" },
];

/* --------------------------------- Why AI&DS ------------------------------ */

export interface WhyCard {
  title: string;
  description: string;
  icon: "brain" | "network" | "chart" | "layers" | "analytics" | "spark";
}

export const whyCards: WhyCard[] = [
  {
    title: "Artificial Intelligence",
    description:
      "Study how intelligent systems are designed — search, reasoning, agents and autonomous decision-making.",
    icon: "brain",
  },
  {
    title: "Machine Learning",
    description:
      "Train predictive models on real datasets and understand the maths behind learning from data.",
    icon: "network",
  },
  {
    title: "Data Science",
    description:
      "Turn raw, messy data into clear insight through statistics, visualisation and storytelling.",
    icon: "chart",
  },
  {
    title: "Deep Learning",
    description:
      "Build neural networks for vision, language and generative models that power modern AI.",
    icon: "layers",
  },
  {
    title: "Data Analytics",
    description:
      "Apply analytical and statistical techniques to solve problems in industry and society.",
    icon: "analytics",
  },
  {
    title: "Intelligent Applications",
    description:
      "Ship AI-powered solutions for healthcare, agriculture, finance, education and beyond.",
    icon: "spark",
  },
];

/* ------------------------------- Curriculum ------------------------------- */

export interface CurriculumSubject {
  code: string;
  title: string;
  type: "Theory" | "Laboratory" | "Project";
}

export interface Semester {
  number: number;
  theme: string;
  subjects: CurriculumSubject[];
}

/** Foundation subjects common across Anna University B.Tech programmes. */
export const semesters: Semester[] = [
  {
    number: 1,
    theme: "Foundations of Engineering",
    subjects: [
      { code: "MA3151", title: "Matrices and Calculus", type: "Theory" },
      { code: "PH3151", title: "Engineering Physics", type: "Theory" },
      { code: "CY3151", title: "Engineering Chemistry", type: "Theory" },
      { code: "GE3151", title: "Problem Solving and Python Programming", type: "Theory" },
      { code: "GE3171", title: "Problem Solving and Python Programming Lab", type: "Laboratory" },
      { code: "BS3171", title: "Physics and Chemistry Laboratory", type: "Laboratory" },
    ],
  },
  {
    number: 2,
    theme: "Computing & Mathematics",
    subjects: [
      { code: "MA3251", title: "Statistics and Numerical Methods", type: "Theory" },
      { code: "CS3251", title: "Programming in C", type: "Theory" },
      { code: "CS3271", title: "C Programming Laboratory", type: "Laboratory" },
      { code: "GE3251", title: "Engineering Graphics", type: "Theory" },
      { code: "GE3271", title: "Engineering Practices Laboratory", type: "Laboratory" },
    ],
  },
  {
    number: 3,
    theme: "Core Data Science",
    subjects: [
      { code: "MA3354", title: "Discrete Mathematics", type: "Theory" },
      { code: "CS3491", title: "Theory of Computation", type: "Theory" },
      { code: "CS3501", title: "Data Structures", type: "Theory" },
      { code: "AI5011", title: "Artificial Intelligence", type: "Theory" },
      { code: "AI5012", title: "Data Science Foundations", type: "Theory" },
      { code: "CS3511", title: "Data Structures Laboratory", type: "Laboratory" },
    ],
  },
  {
    number: 4,
    theme: "ML & Databases",
    subjects: [
      { code: "AI5021", title: "Machine Learning", type: "Theory" },
      { code: "CS3492", title: "Database Management Systems", type: "Theory" },
      { code: "AI5023", title: "Design and Analysis of Algorithms", type: "Theory" },
      { code: "CS3493", title: "Object Oriented Programming", type: "Theory" },
      { code: "CS3512", title: "DBMS Laboratory", type: "Laboratory" },
      { code: "AI5031", title: "Machine Learning Laboratory", type: "Laboratory" },
    ],
  },
  {
    number: 5,
    theme: "Specialised AI",
    subjects: [
      { code: "AI5032", title: "Deep Learning", type: "Theory" },
      { code: "AI5033", title: "Computer Vision", type: "Theory" },
      { code: "AI5034", title: "Natural Language Processing", type: "Theory" },
      { code: "AI5035", title: "Big Data Analytics", type: "Theory" },
      { code: "AI5036", title: "Cloud Computing", type: "Theory" },
      { code: "AI5037", title: "Deep Learning Laboratory", type: "Laboratory" },
    ],
  },
  {
    number: 6,
    theme: "Advanced Systems",
    subjects: [
      { code: "AI5038", title: "Reinforcement Learning", type: "Theory" },
      { code: "AI5039", title: "Generative AI", type: "Theory" },
      { code: "AI5040", title: "MLOps and Model Deployment", type: "Theory" },
      { code: "AI5041", title: "Data Engineering", type: "Theory" },
      { code: "AI5042", title: "Computer Vision Laboratory", type: "Laboratory" },
    ],
  },
  {
    number: 7,
    theme: "Industry & Research",
    subjects: [
      { code: "AI5043", title: "Edge AI and IoT", type: "Theory" },
      { code: "AI5044", title: "Responsible AI and Ethics", type: "Theory" },
      { code: "AI5045", title: "Elective — Specialised Track", type: "Theory" },
      { code: "AI5046", title: "Mini Project", type: "Project" },
      { code: "AI5047", title: "Industry Internship", type: "Project" },
    ],
  },
  {
    number: 8,
    theme: "Capstone",
    subjects: [
      { code: "AI5048", title: "Capstone Project", type: "Project" },
      { code: "AI5049", title: "Technical Seminar", type: "Project" },
    ],
  },
];

export const academicDocuments = [
  "Anna University syllabus PDFs",
  "Regulations & curriculum",
  "Academic calendar",
  "Timetable",
  "Examination information",
] as const;

/* ------------------------------- Laboratories ----------------------------- */

export interface Laboratory {
  id: string;
  name: string;
  focus: string;
  equipment: string[];
  software: string[];
}

export const laboratories: Laboratory[] = [
  {
    id: "ai-lab",
    name: "Artificial Intelligence Lab",
    focus: "Search, reasoning, agents and classical AI techniques",
    equipment: ["High-performance workstations", "GPU-accelerated nodes"],
    software: ["Python", "AIMA notebooks", "Prolog"],
  },
  {
    id: "ml-lab",
    name: "Machine Learning Lab",
    focus: "Supervised, unsupervised and ensemble model building",
    equipment: ["GPU compute servers", "Shared dataset storage"],
    software: ["scikit-learn", "TensorFlow", "PyTorch"],
  },
  {
    id: "dl-lab",
    name: "Deep Learning Lab",
    focus: "Neural networks for vision, language and generation",
    equipment: ["NVIDIA GPU workstations", "CUDA toolchain"],
    software: ["PyTorch", "TensorFlow", "Hugging Face", "Keras"],
  },
  {
    id: "cv-lab",
    name: "Computer Vision Lab",
    focus: "Image processing, object detection and spatial analytics",
    equipment: ["Camera rigs", "Edge vision devices"],
    software: ["OpenCV", "MediaPipe", "YOLO"],
  },
  {
    id: "ds-lab",
    name: "Data Science Lab",
    focus: "Statistics, visualisation and end-to-end analytics",
    equipment: ["Compute workstations", "Data servers"],
    software: ["Pandas", "Matplotlib", "Tableau", "Jupyter"],
  },
  {
    id: "python-lab",
    name: "Programming Lab",
    focus: "Python, C and core programming fundamentals",
    equipment: ["Standard workstations"],
    software: ["Python 3", "C", "VS Code", "Git"],
  },
];

/* ------------------------------- Student Projects ------------------------- */

export interface StudentProject {
  id: string;
  title: string;
  category: string;
  blurb: string;
  technologies: string[];
  status: "Ongoing" | "Completed" | "Recruiting";
}

export const studentProjects: StudentProject[] = [
  {
    id: "p1",
    title: "Smart Crop Disease Detector",
    category: "Computer Vision",
    blurb:
      "A mobile app that diagnoses crop diseases from a leaf photo and suggests treatment.",
    technologies: ["PyTorch", "OpenCV", "Flutter"],
    status: "Ongoing",
  },
  {
    id: "p2",
    title: "Campus Attendance via Face Recognition",
    category: "Computer Vision",
    blurb:
      "Automated classroom attendance using real-time face recognition at the door.",
    technologies: ["FaceNet", "OpenCV", "Python"],
    status: "Completed",
  },
  {
    id: "p3",
    title: "Medical Report Summariser",
    category: "NLP",
    blurb:
      "An NLP tool that turns lengthy medical reports into plain-language summaries for patients.",
    technologies: ["Transformers", "Hugging Face", "FastAPI"],
    status: "Ongoing",
  },
  {
    id: "p4",
    title: "Local Language Chatbot",
    category: "Generative AI",
    blurb:
      "A Tamil-language conversational assistant for government scheme enquiries.",
    technologies: ["LLM", "RAG", "LangChain"],
    status: "Recruiting",
  },
  {
    id: "p5",
    title: "Traffic Flow Predictor",
    category: "Data Science",
    blurb:
      "Predicts congestion hotspots in Tiruvannamalai from historical traffic data.",
    technologies: ["Pandas", "XGBoost", "Folium"],
    status: "Completed",
  },
  {
    id: "p6",
    title: "Smart Energy Monitor",
    category: "IoT + AI",
    blurb:
      "IoT sensors plus anomaly detection to flag wasteful energy use in campus buildings.",
    technologies: ["Arduino", "MQTT", "scikit-learn"],
    status: "Ongoing",
  },
];

/* ------------------------------- Research areas --------------------------- */

export const researchAreas = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Data Analytics",
  "Big Data",
  "Generative AI",
  "Responsible AI",
  "IoT + AI",
  "Healthcare AI",
  "Agriculture AI",
] as const;

/* ------------------------------ Career pathways --------------------------- */

export const careerOpportunities = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Data Analyst",
  "Data Engineer",
  "Computer Vision Engineer",
  "NLP Engineer",
  "Generative AI Engineer",
  "AI Researcher",
  "MLOps Engineer",
] as const;

export const placementSupport = [
  {
    title: "Placement training",
    description:
      "Structured aptitude, coding and interview prep coordinated with the Training & Placement cell.",
  },
  {
    title: "Internships",
    description:
      "Guidance and industry connects for hands-on internship exposure during the programme.",
  },
  {
    title: "Industry interaction",
    description:
      "Guest lectures, expert sessions and industrial visits with practising engineers.",
  },
  {
    title: "Mock interviews",
    description:
      "Technical and HR mock interviews to build confidence before the real thing.",
  },
  {
    title: "Resume workshops",
    description:
      "Hands-on help crafting placement-ready, project-rich technical resumes.",
  },
  {
    title: "Coding practice",
    description:
      "Regular problem-solving sessions on competitive programming platforms.",
  },
];

/* ------------------------------- Resources -------------------------------- */

export interface StudentResource {
  name: string;
  url: string;
  description: string;
}

export const studentResources: StudentResource[] = [
  { name: "Anna University", url: "https://www.annauniv.edu/", description: "Affiliating university — regulations, results and academic updates." },
  { name: "NPTEL", url: "https://nptel.ac.in/", description: "Free courses from IITs and IISc across AI, ML and data science." },
  { name: "SWAYAM", url: "https://swayam.gov.in/", description: "Government of India MOOC platform for credit-eligible courses." },
  { name: "Kaggle", url: "https://www.kaggle.com/", description: "Datasets, competitions and notebooks for data science practice." },
  { name: "Google Colab", url: "https://colab.research.google.com/", description: "Free cloud notebooks for Python, ML and deep learning." },
  { name: "GitHub", url: "https://github.com/", description: "Host, review and collaborate on code for projects and portfolios." },
  { name: "Microsoft Learn", url: "https://learn.microsoft.com/", description: "Free learning paths for cloud, AI and developer technologies." },
  { name: "Coursera", url: "https://www.coursera.org/", description: "University and industry courses across AI and data science." },
];

/* ----------------------------------- News --------------------------------- */

export interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
}

export const news: NewsItem[] = [
  {
    id: "welcome-2023",
    date: "2023-08-01",
    category: "Department",
    title: "B.Tech AI & Data Science programme launched",
    summary:
      "SKP Engineering College introduces the B.Tech Artificial Intelligence and Data Science undergraduate programme from 2023–24 with an initial intake of 60 students.",
  },
  {
    id: "admissions-open",
    date: "2024-05-01",
    category: "Admissions",
    title: "Admissions open for the new batch",
    summary:
      "Admissions are open for B.Tech Artificial Intelligence & Data Science. Contact the department for eligibility and application details.",
  },
];

export const announcements: string[] = [
  "Admissions open for B.Tech AI & Data Science — contact the department for enquiries.",
  "Department circulars, timetables and event updates will be published here as they arrive.",
];

/* ---------------------------------- FAQ ----------------------------------- */

export const faqs = [
  {
    q: "What is the eligibility for B.Tech AI & Data Science?",
    a: "Candidates must have passed 10+2 with Physics, Chemistry and Mathematics, per Anna University and AICTE norms. Admission follows the Tamil Nadu Engineering Admissions (TNEA) counselling process.",
  },
  {
    q: "What is the annual intake?",
    a: "The programme has an AICTE-approved annual intake of 60 students, starting from the 2023–24 academic year.",
  },
  {
    q: "Is the programme affiliated and approved?",
    a: "Yes. The programme is offered by SKP Engineering College, affiliated to Anna University, Chennai and approved by AICTE.",
  },
  {
    q: "Do I need prior coding experience?",
    a: "No. The curriculum starts from first principles — the first year includes Problem Solving and Python Programming. Curiosity and willingness to learn are what matter most.",
  },
  {
    q: "What programming languages and tools will I learn?",
    a: "Python is the primary language, with exposure to C, SQL and frameworks like TensorFlow, PyTorch, scikit-learn, OpenCV and Hugging Face across the four years.",
  },
  {
    q: "What careers does this lead to?",
    a: "Graduates pursue roles such as AI Engineer, Machine Learning Engineer, Data Scientist, Data Engineer and NLP Engineer, or go on to higher studies and research.",
  },
];

/* --------------------------------- Faculty -------------------------------- */

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialization: string[];
  email: string;
}

/** Photo-ready placeholders — the department adds real faculty details here. */
export const faculty: FacultyMember[] = [
  { id: "hod", name: "Head of Department", designation: "Professor & HoD", qualification: PLACEHOLDER_NOTE, specialization: ["Artificial Intelligence"], email: "aids@skpec.edu.in" },
  { id: "f2", name: "Faculty Member", designation: "Associate Professor", qualification: PLACEHOLDER_NOTE, specialization: ["Machine Learning", "Data Science"], email: "—" },
  { id: "f3", name: "Faculty Member", designation: "Assistant Professor", qualification: PLACEHOLDER_NOTE, specialization: ["Computer Vision", "Deep Learning"], email: "—" },
  { id: "f4", name: "Faculty Member", designation: "Assistant Professor", qualification: PLACEHOLDER_NOTE, specialization: ["NLP", "Data Analytics"], email: "—" },
];
