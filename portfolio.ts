export interface ProfileInfo {
  name: string;
  tagline: string;
  subTitle: string;
  bio: string;
  education: string;
  institution: string;
  degreeYear: string;
  email: string;
  phone?: string;
  location: string;
  photoUrl: string;
  resumeUrl: string;
  resumeFileName?: string;
  availableForRoles: boolean;
  socials: {
    linkedin: string;
    instagram: string;
    unstop: string;
    github?: string;
  };
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'ai_ml' | 'languages' | 'data_science' | 'web';
  proficiency: number; // 0 - 100
  iconName?: string;
  isFeatured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  technologies: string[];
  bannerUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  metrics?: { label: string; value: string }[];
  featured: boolean;
  dateCreated: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  fileUrl: string; // image or PDF data URL or Supabase storage URL
  fileType: 'image' | 'pdf';
  category: string;
  skillsCovered: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'hackathon' | 'award' | 'competition' | 'academic';
  organizer: string;
  date: string;
  rankOrAward: string;
  description: string;
  proofUrl?: string;
  badgeColor?: string;
}

export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  context?: string;
  active: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface SupabaseConfigState {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isConnected: boolean;
  lastChecked?: string;
}

