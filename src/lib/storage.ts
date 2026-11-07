import { 
  ProfileInfo, 
  SkillItem, 
  ProjectItem, 
  CertificateItem, 
  AchievementItem, 
  QuoteItem, 
  ContactMessage,
  SupabaseConfigState 
} from '../types/portfolio';
import { 
  DEFAULT_PROFILE, 
  DEFAULT_SKILLS, 
  DEFAULT_PROJECTS, 
  DEFAULT_CERTIFICATES, 
  DEFAULT_ACHIEVEMENTS, 
  DEFAULT_QUOTES 
} from './defaultData';
import { getSupabaseClient, getSupabaseCredentials } from './supabase';

const STORAGE_KEYS = {
  PROFILE: 'mylesh_portfolio_profile',
  SKILLS: 'mylesh_portfolio_skills',
  PROJECTS: 'mylesh_portfolio_projects',
  CERTIFICATES: 'mylesh_portfolio_certificates',
  ACHIEVEMENTS: 'mylesh_portfolio_achievements',
  QUOTES: 'mylesh_portfolio_quotes',
  MESSAGES: 'mylesh_portfolio_messages',
  ADMIN_AUTH: 'mylesh_portfolio_admin_auth',
  SUPABASE_CONFIG: 'mylesh_portfolio_supabase_config'
};

// Safe LocalStorage helpers with Quota Exceeded guard
export const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Safe recovery: error reading ${key} from storage:`, e);
    return fallback;
  }
};

export const saveToStorage = <T>(key: string, data: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(`Error saving ${key} to storage (potential quota reached):`, e);
    return false;
  }
};

// Data Getters
export const getStoredProfile = (): ProfileInfo => {
  return loadFromStorage<ProfileInfo>(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
};

export const getStoredSkills = (): SkillItem[] => {
  return loadFromStorage<SkillItem[]>(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
};

export const getStoredProjects = (): ProjectItem[] => {
  return loadFromStorage<ProjectItem[]>(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
};

export const getStoredCertificates = (): CertificateItem[] => {
  const stored = loadFromStorage<CertificateItem[]>(STORAGE_KEYS.CERTIFICATES, DEFAULT_CERTIFICATES);
  if (!stored || stored.length === 0 || !stored.some(c => c.title === 'AI for Business Professionals')) {
    saveToStorage(STORAGE_KEYS.CERTIFICATES, DEFAULT_CERTIFICATES);
    return DEFAULT_CERTIFICATES;
  }
  return stored;
};

export const getStoredAchievements = (): AchievementItem[] => {
  return loadFromStorage<AchievementItem[]>(STORAGE_KEYS.ACHIEVEMENTS, DEFAULT_ACHIEVEMENTS);
};

export const getStoredQuotes = (): QuoteItem[] => {
  return loadFromStorage<QuoteItem[]>(STORAGE_KEYS.QUOTES, DEFAULT_QUOTES);
};

export const getStoredMessages = (): ContactMessage[] => {
  return loadFromStorage<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
};

export const saveStoredMessages = (messages: ContactMessage[]) => {
  saveToStorage(STORAGE_KEYS.MESSAGES, messages);
};

export const getStoredSupabaseConfig = (): SupabaseConfigState => {
  const creds = getSupabaseCredentials();
  return {
    supabaseUrl: creds.url,
    supabaseAnonKey: creds.anonKey,
    isConnected: !!(creds.url && creds.anonKey && creds.url.startsWith('https://'))
  };
};

// Client-Side Image Compressor (Ensures images are ultra-sharp, light, and never exceed localStorage limits)
export const compressImageClientSide = async (
  file: File, 
  maxWidth = 1200, 
  maxHeight = 1200, 
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        try {
          const dataUrl = canvas.toDataURL('image/webp', quality);
          resolve(dataUrl);
        } catch {
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(event.target?.result as string);
    };
    reader.onerror = (error) => reject(error);
  });
};

// File Upload helper: uploads to Supabase or compresses locally
export const processFileUpload = async (
  file: File, 
  bucketFolder: string = 'uploads'
): Promise<{ url: string; isCloud: boolean }> => {
  const supabase = getSupabaseClient();
  
  if (supabase) {
    try {
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${bucketFolder}/${Date.now()}-${cleanName}`;
      
      const { data, error } = await supabase.storage
        .from('portfolio-assets')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (!error && data) {
        const { data: publicData } = supabase.storage
          .from('portfolio-assets')
          .getPublicUrl(fileName);
        
        if (publicData?.publicUrl) {
          return { url: publicData.publicUrl, isCloud: true };
        }
      }
      console.warn('Supabase upload fell back to local due to:', error?.message);
    } catch (err) {
      console.warn('Supabase upload error, using local base64 fallback:', err);
    }
  }

  // Local Processing: compress images so storage limit is never breached
  if (file.type.startsWith('image/')) {
    try {
      const compressedUrl = await compressImageClientSide(file);
      return { url: compressedUrl, isCloud: false };
    } catch (e) {
      console.warn('Image compression fallback:', e);
    }
  }

  // Fallback for PDFs or docs
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve({ url: reader.result as string, isCloud: false });
    };
    reader.onerror = (err) => reject(err);
  });
};

// Reset all data to factory defaults
export const resetToFactoryDefaults = () => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(DEFAULT_SKILLS));
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS));
  localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(DEFAULT_CERTIFICATES));
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(DEFAULT_ACHIEVEMENTS));
  localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(DEFAULT_QUOTES));
};
