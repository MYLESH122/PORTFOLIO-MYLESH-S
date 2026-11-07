import { ProfileInfo, ProjectItem, SkillItem, CertificateItem, AchievementItem, QuoteItem } from '../types/portfolio';

export const DEFAULT_PROFILE: ProfileInfo = {
  name: "Mylesh S",
  tagline: "Artificial Intelligence & Data Science Specialist",
  subTitle: "Motivated first-year B.Tech Artificial Intelligence and Data Science student interested in AI, ML, Python programming and innovative technology.",
  bio: "Motivated first-year B.Tech Artificial Intelligence and Data Science student interested in Artificial Intelligence, Machine Learning, Python programming and innovative technology. Eager to develop technical skills, work on real-world projects and participate in hackathons.",
  education: "B.Tech Artificial Intelligence & Data Science",
  institution: "Sri Venkateshwara Hi-Tech Engineering College, Gobi",
  degreeYear: "First Year",
  email: "senthilkumarmylesh285@gmail.com",
  phone: "8667051285",
  location: "Tamil Nadu, India",
  photoUrl: "/profile.jpg",
  resumeUrl: "/resume.pdf",
  resumeFileName: "Mylesh_S_Resume.pdf",
  availableForRoles: true,
  socials: {
    linkedin: "https://www.linkedin.com/in/mylesh-s-714378440",
    instagram: "https://www.instagram.com/mylesh_billa/",
    unstop: "https://unstop.com/u/myless15148",
    github: "https://github.com"
  }
};

export const DEFAULT_SKILLS: SkillItem[] = [
  // AI & ML
  { id: 'sk-1', name: 'Artificial Intelligence', category: 'ai_ml', proficiency: 92, isFeatured: true },
  { id: 'sk-2', name: 'Machine Learning', category: 'ai_ml', proficiency: 90, isFeatured: true },
  { id: 'sk-3', name: 'Deep Learning & Neural Nets', category: 'ai_ml', proficiency: 85, isFeatured: true },
  { id: 'sk-4', name: 'Model Evaluation & Optimization', category: 'ai_ml', proficiency: 88, isFeatured: false },
  
  // Data Science
  { id: 'sk-5', name: 'Data Science & Analytics', category: 'data_science', proficiency: 94, isFeatured: true },
  { id: 'sk-6', name: 'Pandas & NumPy', category: 'data_science', proficiency: 92, isFeatured: false },
  { id: 'sk-7', name: 'Exploratory Data Analysis (EDA)', category: 'data_science', proficiency: 90, isFeatured: false },
  { id: 'sk-8', name: 'Data Visualization & Reporting', category: 'data_science', proficiency: 87, isFeatured: false },

  // Programming Languages
  { id: 'sk-9', name: 'Python', category: 'languages', proficiency: 95, isFeatured: true },
  { id: 'sk-10', name: 'C Programming', category: 'languages', proficiency: 86, isFeatured: true },
  { id: 'sk-11', name: 'JavaScript (ES6+)', category: 'languages', proficiency: 84, isFeatured: true },
  { id: 'sk-12', name: 'SQL & Database Architecture', category: 'languages', proficiency: 82, isFeatured: false },

  // Web & UI
  { id: 'sk-13', name: 'React', category: 'web', proficiency: 88, isFeatured: true },
  { id: 'sk-14', name: 'HTML5 & Semantic Web', category: 'web', proficiency: 95, isFeatured: true },
  { id: 'sk-15', name: 'CSS3 & Modern Layouts', category: 'web', proficiency: 92, isFeatured: true },
  { id: 'sk-16', name: 'Tailwind CSS & Glassmorphism', category: 'web', proficiency: 90, isFeatured: false },
];

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Waste2Watt AI',
    slug: 'waste2watt-ai',
    summary: 'Intelligent Biomass-to-Energy Optimization and Predictive Gasification Matrix powered by Machine Learning.',
    description: 'Waste2Watt AI is an innovative green energy solution engineered to optimize bio-waste conversion into electrical energy. The system utilizes real-time sensor streams and machine learning regression models to forecast calorific yields, monitor thermal degradation curves, and automate airflow regulation. This achieves up to 28% higher fuel-to-megawatt conversion efficiency and reduces harmful particulate emissions.',
    category: 'AI & Sustainable Tech',
    technologies: ['Python', 'Machine Learning', 'Scikit-Learn', 'IoT Sensors', 'Predictive Analytics', 'React UI'],
    bannerUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    demoUrl: '#',
    metrics: [
      { label: 'Energy Conversion Lift', value: '+28%' },
      { label: 'Model Accuracy', value: '94.6%' },
      { label: 'Emission Reduction', value: '35%' }
    ],
    featured: true,
    dateCreated: '2024-04-15'
  },
  {
    id: 'proj-2',
    title: 'MediBand AI',
    slug: 'mediband-ai',
    summary: 'Smart Wearable Health Sentinel featuring Edge ML Arrhythmia Detection & Automated SOS Telemetry.',
    description: 'MediBand AI bridges biometric wearable hardware with real-time neural anomaly detection. By continuously sampling photoplethysmography (PPG), galvanic skin response, and body temperature metrics, the system detects cardiac stress spikes and arrhythmia patterns seconds before critical onset, automatically triggering geolocated emergency SMS alerts and relaying telemetry to designated healthcare providers.',
    category: 'Healthcare & Edge AI',
    technologies: ['Embedded C', 'Python', 'Deep Learning', 'Edge Computing', 'Healthcare IoT', 'Cloud Telemetry'],
    bannerUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    demoUrl: '#',
    metrics: [
      { label: 'Anomaly Detection Speed', value: '<450ms' },
      { label: 'Sensitivity / Recall', value: '96.2%' },
      { label: 'Telemetry Battery Life', value: '48h+' }
    ],
    featured: true,
    dateCreated: '2024-09-20'
  }
];

export const DEFAULT_CERTIFICATES: CertificateItem[] = [
  // AI & Machine Learning
  {
    id: 'cert-aiml-1',
    title: 'AI for Business Professionals',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'AI & Machine Learning',
    skillsCovered: []
  },
  {
    id: 'cert-aiml-2',
    title: 'Strategic Planning in the Age of AI and Data',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'AI & Machine Learning',
    skillsCovered: []
  },
  {
    id: 'cert-aiml-3',
    title: 'AI for Beginners',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'AI & Machine Learning',
    skillsCovered: []
  },
  {
    id: 'cert-aiml-4',
    title: 'Autonomous AI Agent & LLM Tool Orchestration',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'AI & Machine Learning',
    skillsCovered: []
  },
  {
    id: 'cert-aiml-5',
    title: 'Generative AI & Prompt Engineering Masterclass',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'AI & Machine Learning',
    skillsCovered: []
  },
  {
    id: 'cert-aiml-6',
    title: 'AI Shiksha – AI Literacy for Everyone',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'AI & Machine Learning',
    skillsCovered: []
  },
  {
    id: 'cert-aiml-7',
    title: 'Fundamentals of Machine Learning and Artificial Intelligence',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'AI & Machine Learning',
    skillsCovered: []
  },
  {
    id: 'cert-aiml-8',
    title: 'Unlocking AI for Everyone',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'AI & Machine Learning',
    skillsCovered: []
  },

  // Cybersecurity & Digital Skills
  {
    id: 'cert-sec-1',
    title: 'Introduction to Cyber Security Awareness',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'Cybersecurity & Digital Skills',
    skillsCovered: []
  },
  {
    id: 'cert-sec-2',
    title: 'Introduction to Digital Business Skills',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'Cybersecurity & Digital Skills',
    skillsCovered: []
  },
  {
    id: 'cert-sec-3',
    title: 'Business Email',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'Cybersecurity & Digital Skills',
    skillsCovered: []
  },

  // Programming & Development
  {
    id: 'cert-dev-1',
    title: 'Python Basics',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'Programming & Development',
    skillsCovered: []
  },
  {
    id: 'cert-dev-2',
    title: 'Prompt Engineering with ChatGPT',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'Programming & Development',
    skillsCovered: []
  },
  {
    id: 'cert-dev-3',
    title: 'Introduction to Front-End Development',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'Programming & Development',
    skillsCovered: []
  },

  // Achievements & Participation
  {
    id: 'cert-ach-1',
    title: 'Aivora 2026 – Certificate of Participation',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'Achievements & Participation',
    skillsCovered: []
  },
  {
    id: 'cert-ach-2',
    title: 'Excel College – Prompt Battle Participation Certificate',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'Achievements & Participation',
    skillsCovered: []
  },
  {
    id: 'cert-ach-3',
    title: 'Excel College – Paper Presentation Participation Certificate',
    issuer: '',
    issueDate: '',
    fileUrl: '',
    fileType: 'pdf',
    category: 'Achievements & Participation',
    skillsCovered: []
  }
];

export const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Smart India Hackathon Finalist',
    category: 'hackathon',
    organizer: 'Ministry of Education & AICTE',
    date: '2024',
    rankOrAward: 'National Finalist',
    description: 'Developed an AI-driven automated decision support model for resource allocation in rural infrastructure, competing against thousands of collegiate teams across India.',
    badgeColor: 'cyan'
  },
  {
    id: 'ach-2',
    title: 'Unstop National Tech Challenge',
    category: 'competition',
    organizer: 'Unstop Platform',
    date: '2024',
    rankOrAward: 'Top 5% Performer',
    description: 'Demonstrated advanced algorithmic proficiency, rapid problem-solving, and data structure acumen across multi-tier coding rounds on Unstop.',
    badgeColor: 'purple'
  },
  {
    id: 'ach-3',
    title: 'College AI & Innovation Project Expo',
    category: 'award',
    organizer: 'Department of AI & Data Science',
    date: '2024',
    rankOrAward: '1st Place & Gold Trophy',
    description: 'Awarded First Prize for the hardware & AI prototype demonstration of Waste2Watt AI, recognized for real-world environmental sustainability potential.',
    badgeColor: 'amber'
  }
];

export const DEFAULT_QUOTES: QuoteItem[] = [
  {
    id: 'q-1',
    quote: "Artificial Intelligence is not about replacing human wisdom; it is about amplifying our curiosity to solve the world's greatest challenges.",
    author: "Mylesh S",
    context: "Engineering Philosophy",
    active: true
  },
  {
    id: 'q-2',
    quote: "Data is the raw pulse of the universe. When decoded with compassion and intelligence, it unlocks limitless human potential.",
    author: "Mylesh S",
    context: "On Data Science",
    active: true
  },
  {
    id: 'q-3',
    quote: "The future belongs to those who build bridges between algorithmic intelligence and physical impact.",
    author: "Mylesh S",
    context: "Applied Innovation",
    active: true
  }
];

