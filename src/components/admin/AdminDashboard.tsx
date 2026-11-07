import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminOverview } from './tabs/AdminOverview';
import { AdminProfile } from './tabs/AdminProfile';
import { AdminProjects } from './tabs/AdminProjects';
import { AdminCertificates } from './tabs/AdminCertificates';
import { AdminSkills } from './tabs/AdminSkills';
import { AdminAchievements } from './tabs/AdminAchievements';
import { AdminQuotes } from './tabs/AdminQuotes';
import { AdminMessages } from './tabs/AdminMessages';
import { AdminSupabaseSync } from './tabs/AdminSupabaseSync';
import { 
  X, 
  LogOut, 
  LayoutDashboard, 
  User, 
  FolderGit2, 
  Award, 
  Cpu, 
  Trophy, 
  Quote, 
  Inbox,
  Cloud,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    isAdminDashboardOpen, 
    setIsAdminDashboardOpen, 
    logoutAdmin, 
    profile, 
    messages,
    supabaseConfig 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('overview');

  if (!isAdminDashboardOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Assets', icon: User },
    { id: 'projects', label: 'AI Projects', icon: FolderGit2 },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'skills', label: 'Skills Matrix', icon: Cpu },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'quotes', label: 'Motivation Quotes', icon: Quote },
    { id: 'messages', label: `Inquiries (${messages.length})`, icon: Inbox },
    { id: 'supabase', label: 'Cloud Sync & Setup', icon: Cloud },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Background backdrop blur */}
      <div 
        className="fixed inset-0 bg-space-950/85 backdrop-blur-xl"
        onClick={() => setIsAdminDashboardOpen(false)}
      />

      {/* Main Admin Console Container */}
      <div className="relative w-full max-w-6xl h-[92vh] bg-space-950 border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-950/90 flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-space-900/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1px] shadow-neon-combo">
              <div className="w-full h-full bg-space-950 rounded-xl flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-display text-white">
                  Portfolio Command Center
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30">
                  {profile.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Real-time management for content, uploads, and credentials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={logoutAdmin}
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-500/30 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              onClick={() => setIsAdminDashboardOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close Console"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Console Body: Sidebar + Tab Content */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Sidebar Nav */}
          <div className="w-48 sm:w-60 border-r border-white/10 bg-space-900/40 p-3 flex flex-col justify-between shrink-0 overflow-y-auto">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      active
                        ? 'bg-gradient-to-r from-purple-600/30 to-cyan-500/20 text-white border border-purple-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-white/5 text-[10px] text-slate-500 space-y-1">
              <div className="font-mono">Storage Engine:</div>
              <div className="font-bold text-slate-400 truncate">
                {supabaseConfig.isConnected ? '☁️ Supabase Cloud (Live)' : '💾 Local Storage (Reactive)'}
              </div>
            </div>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            {activeTab === 'overview' && <AdminOverview setActiveTab={setActiveTab} />}
            {activeTab === 'profile' && <AdminProfile />}
            {activeTab === 'projects' && <AdminProjects />}
            {activeTab === 'certificates' && <AdminCertificates />}
            {activeTab === 'skills' && <AdminSkills />}
            {activeTab === 'achievements' && <AdminAchievements />}
            {activeTab === 'quotes' && <AdminQuotes />}
            {activeTab === 'messages' && <AdminMessages />}
            {activeTab === 'supabase' && <AdminSupabaseSync />}
          </div>

        </div>

      </div>
    </div>
  );
};
