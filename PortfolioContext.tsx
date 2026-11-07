import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  getStoredProfile, 
  getStoredSkills, 
  getStoredProjects, 
  getStoredCertificates, 
  getStoredAchievements, 
  getStoredQuotes, 
  getStoredMessages,
  saveStoredMessages,
  getStoredSupabaseConfig,
  saveToStorage, 
  resetToFactoryDefaults 
} from '../lib/storage';
import { 
  getSupabaseClient, 
  testSupabaseConnection, 
  resetSupabaseClient,
  fetchCloudProfile,
  fetchCloudProjects,
  fetchCloudCertificates,
  fetchCloudSkills,
  fetchCloudAchievements,
  fetchCloudQuotes,
  syncProfileToCloud,
  syncProjectToCloud,
  deleteProjectFromCloud,
  syncCertificateToCloud,
  deleteCertificateFromCloud,
  syncSkillToCloud,
  deleteSkillFromCloud,
  syncAchievementToCloud,
  deleteAchievementFromCloud,
  syncQuoteToCloud,
  deleteQuoteFromCloud
} from '../lib/supabase';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface PortfolioContextType {
  // Data
  profile: ProfileInfo;
  skills: SkillItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  achievements: AchievementItem[];
  quotes: QuoteItem[];
  messages: ContactMessage[];
  supabaseConfig: SupabaseConfigState;
  
  // Admin & Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAdminDashboardOpen: boolean;
  setIsAdminDashboardOpen: (open: boolean) => void;

  // Modals
  selectedProject: ProjectItem | null;
  setSelectedProject: (proj: ProjectItem | null) => void;
  selectedCertificate: CertificateItem | null;
  setSelectedCertificate: (cert: CertificateItem | null) => void;
  isQRCodeModalOpen: boolean;
  setIsQRCodeModalOpen: (open: boolean) => void;

  // Mutations
  updateProfile: (updated: Partial<ProfileInfo>) => void;
  
  // Skills
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, updated: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;

  // Projects
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, updated: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  // Certificates
  addCertificate: (cert: Omit<CertificateItem, 'id'>) => void;
  updateCertificate: (id: string, updated: Partial<CertificateItem>) => void;
  deleteCertificate: (id: string) => void;

  // Achievements
  addAchievement: (ach: Omit<AchievementItem, 'id'>) => void;
  updateAchievement: (id: string, updated: Partial<AchievementItem>) => void;
  deleteAchievement: (id: string) => void;

  // Quotes
  addQuote: (quote: Omit<QuoteItem, 'id'>) => void;
  updateQuote: (id: string, updated: Partial<QuoteItem>) => void;
  deleteQuote: (id: string) => void;

  // Contact
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>) => Promise<boolean>;
  deleteContactMessage: (id: string) => void;

  // Supabase & System
  saveSupabaseConfig: (url: string, anonKey: string) => Promise<{ success: boolean; message: string }>;
  resetAllData: () => void;
  refreshFromCloud: () => Promise<void>;
  
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization
  const [profile, setProfile] = useState<ProfileInfo>(getStoredProfile);
  const [skills, setSkills] = useState<SkillItem[]>(getStoredSkills);
  const [projects, setProjects] = useState<ProjectItem[]>(getStoredProjects);
  const [certificates, setCertificates] = useState<CertificateItem[]>(getStoredCertificates);
  const [achievements, setAchievements] = useState<AchievementItem[]>(getStoredAchievements);
  const [quotes, setQuotes] = useState<QuoteItem[]>(getStoredQuotes);
  const [messages, setMessages] = useState<ContactMessage[]>(getStoredMessages);
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfigState>(getStoredSupabaseConfig);

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('mylesh_admin_session') === 'active';
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync state to localStorage on every change
  useEffect(() => {
    saveToStorage('mylesh_portfolio_profile', profile);
  }, [profile]);

  useEffect(() => {
    saveToStorage('mylesh_portfolio_skills', skills);
  }, [skills]);

  useEffect(() => {
    saveToStorage('mylesh_portfolio_projects', projects);
  }, [projects]);

  useEffect(() => {
    saveToStorage('mylesh_portfolio_certificates', certificates);
  }, [certificates]);

  useEffect(() => {
    saveToStorage('mylesh_portfolio_achievements', achievements);
  }, [achievements]);

  useEffect(() => {
    saveToStorage('mylesh_portfolio_quotes', quotes);
  }, [quotes]);

  useEffect(() => {
    saveStoredMessages(messages);
  }, [messages]);

  // Real-time Multi-Tab Synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key) return;
      if (e.key === 'mylesh_portfolio_profile') setProfile(getStoredProfile());
      if (e.key === 'mylesh_portfolio_skills') setSkills(getStoredSkills());
      if (e.key === 'mylesh_portfolio_projects') setProjects(getStoredProjects());
      if (e.key === 'mylesh_portfolio_certificates') setCertificates(getStoredCertificates());
      if (e.key === 'mylesh_portfolio_achievements') setAchievements(getStoredAchievements());
      if (e.key === 'mylesh_portfolio_quotes') setQuotes(getStoredQuotes());
      if (e.key === 'mylesh_portfolio_messages') setMessages(getStoredMessages());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Fetch from Supabase Cloud on mount if connected
  const refreshFromCloud = useCallback(async () => {
    const client = getSupabaseClient();
    if (!client) return;

    try {
      const [cloudProf, cloudProj, cloudCerts, cloudSkills, cloudAchs, cloudQuotes] = await Promise.all([
        fetchCloudProfile(),
        fetchCloudProjects(),
        fetchCloudCertificates(),
        fetchCloudSkills(),
        fetchCloudAchievements(),
        fetchCloudQuotes()
      ]);

      if (cloudProf) setProfile(cloudProf);
      if (cloudProj && cloudProj.length > 0) setProjects(cloudProj);
      if (cloudCerts && cloudCerts.length > 0) setCertificates(cloudCerts);
      if (cloudSkills && cloudSkills.length > 0) setSkills(cloudSkills);
      if (cloudAchs && cloudAchs.length > 0) setAchievements(cloudAchs);
      if (cloudQuotes && cloudQuotes.length > 0) setQuotes(cloudQuotes);
    } catch (err) {
      console.warn('Real-time cloud sync fetch error:', err);
    }
  }, []);

  useEffect(() => {
    if (supabaseConfig.isConnected) {
      refreshFromCloud();
    }
  }, [supabaseConfig.isConnected, refreshFromCloud]);

  // Admin Auth Logic
  const loginAdmin = (password: string): boolean => {
    const customPassword = localStorage.getItem('mylesh_admin_custom_pwd');
    const validPassword = customPassword || 'admin123';
    
    if (password === validPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('mylesh_admin_session', 'active');
      showToast('Admin access granted! Welcome, Mylesh.', 'success');
      setIsAdminModalOpen(false);
      setIsAdminDashboardOpen(true);
      return true;
    } else {
      showToast('Invalid admin password. Try: admin123', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('mylesh_admin_session');
    setIsAdminDashboardOpen(false);
    showToast('Logged out of admin dashboard.', 'info');
  };

  // Profile Mutation
  const updateProfile = (updated: Partial<ProfileInfo>) => {
    setProfile(prev => {
      const next = { ...prev, ...updated };
      syncProfileToCloud(next);
      return next;
    });
    showToast('Profile information updated in real-time!');
  };

  // Skills Mutations
  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: `sk-${Date.now()}`
    };
    setSkills(prev => [...prev, newSkill]);
    syncSkillToCloud(newSkill);
    showToast(`Skill "${newSkill.name}" added!`);
  };

  const updateSkill = (id: string, updated: Partial<SkillItem>) => {
    setSkills(prev => prev.map(s => {
      if (s.id === id) {
        const next = { ...s, ...updated };
        syncSkillToCloud(next);
        return next;
      }
      return s;
    }));
    showToast('Skill updated!');
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    deleteSkillFromCloud(id);
    showToast('Skill removed.', 'info');
  };

  // Projects Mutations
  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [newProj, ...prev]);
    syncProjectToCloud(newProj);
    showToast(`Project "${newProj.title}" created in real-time!`);
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const next = { ...p, ...updated };
        syncProjectToCloud(next);
        return next;
      }
      return p;
    }));
    showToast('Project updated in real-time!');
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    deleteProjectFromCloud(id);
    showToast('Project removed.', 'info');
  };

  // Certificates Mutations
  const addCertificate = (cert: Omit<CertificateItem, 'id'>) => {
    const newCert: CertificateItem = {
      ...cert,
      id: `cert-${Date.now()}`
    };
    setCertificates(prev => [newCert, ...prev]);
    syncCertificateToCloud(newCert);
    showToast(`Certificate "${newCert.title}" saved in real-time!`);
  };

  const updateCertificate = (id: string, updated: Partial<CertificateItem>) => {
    setCertificates(prev => prev.map(c => {
      if (c.id === id) {
        const next = { ...c, ...updated };
        syncCertificateToCloud(next);
        return next;
      }
      return c;
    }));
    showToast('Certificate updated in real-time!');
  };

  const deleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
    deleteCertificateFromCloud(id);
    showToast('Certificate removed.', 'info');
  };

  // Achievements Mutations
  const addAchievement = (ach: Omit<AchievementItem, 'id'>) => {
    const newAch: AchievementItem = {
      ...ach,
      id: `ach-${Date.now()}`
    };
    setAchievements(prev => [newAch, ...prev]);
    syncAchievementToCloud(newAch);
    showToast(`Achievement "${newAch.title}" recorded!`);
  };

  const updateAchievement = (id: string, updated: Partial<AchievementItem>) => {
    setAchievements(prev => prev.map(a => {
      if (a.id === id) {
        const next = { ...a, ...updated };
        syncAchievementToCloud(next);
        return next;
      }
      return a;
    }));
    showToast('Achievement updated!');
  };

  const deleteAchievement = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
    deleteAchievementFromCloud(id);
    showToast('Achievement removed.', 'info');
  };

  // Quotes Mutations
  const addQuote = (quote: Omit<QuoteItem, 'id'>) => {
    const newQuote: QuoteItem = {
      ...quote,
      id: `q-${Date.now()}`
    };
    setQuotes(prev => [...prev, newQuote]);
    syncQuoteToCloud(newQuote);
    showToast('New quote added!');
  };

  const updateQuote = (id: string, updated: Partial<QuoteItem>) => {
    setQuotes(prev => prev.map(q => {
      if (q.id === id) {
        const next = { ...q, ...updated };
        syncQuoteToCloud(next);
        return next;
      }
      return q;
    }));
    showToast('Quote updated in real-time!');
  };

  const deleteQuote = (id: string) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
    deleteQuoteFromCloud(id);
    showToast('Quote deleted.', 'info');
  };

  // Contact Message submission
  const submitContactMessage = async (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>): Promise<boolean> => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      read: false
    };

    // Store in local inbox
    setMessages(prev => [newMsg, ...prev]);

    // Send to Supabase if connected
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        await supabase.from('contact_messages').insert({
          name: msg.name,
          email: msg.email,
          subject: msg.subject,
          message: msg.message,
        });
      }
      showToast('Thank you! Your message has been dispatched successfully.', 'success');
      return true;
    } catch (e) {
      console.error(e);
      showToast('Message sent and recorded in inbox!', 'success');
      return true;
    }
  };

  const deleteContactMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    showToast('Message removed.', 'info');
  };

  // Supabase Configuration Save
  const saveSupabaseConfig = async (url: string, anonKey: string): Promise<{ success: boolean; message: string }> => {
    const testResult = await testSupabaseConnection(url, anonKey);
    if (testResult.success) {
      localStorage.setItem('mylesh_portfolio_supabase_config', JSON.stringify({ url, anonKey }));
      resetSupabaseClient();
      setSupabaseConfig({
        supabaseUrl: url,
        supabaseAnonKey: anonKey,
        isConnected: true,
        lastChecked: new Date().toLocaleTimeString()
      });
      showToast('Supabase connected! Syncing real-time database...', 'success');
      refreshFromCloud();
      return testResult;
    } else {
      showToast(`Supabase Connection Failed: ${testResult.message}`, 'error');
      return testResult;
    }
  };

  const resetAllData = () => {
    resetToFactoryDefaults();
    setProfile(getStoredProfile());
    setSkills(getStoredSkills());
    setProjects(getStoredProjects());
    setCertificates(getStoredCertificates());
    setAchievements(getStoredAchievements());
    setQuotes(getStoredQuotes());
    setMessages([]);
    showToast('All data reset to default demo portfolio state.', 'info');
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        skills,
        projects,
        certificates,
        achievements,
        quotes,
        messages,
        supabaseConfig,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdminDashboardOpen,
        setIsAdminDashboardOpen,
        selectedProject,
        setSelectedProject,
        selectedCertificate,
        setSelectedCertificate,
        isQRCodeModalOpen,
        setIsQRCodeModalOpen,
        updateProfile,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        addQuote,
        updateQuote,
        deleteQuote,
        submitContactMessage,
        deleteContactMessage,
        saveSupabaseConfig,
        resetAllData,
        refreshFromCloud,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
