import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { 
  FolderGit2, 
  Award, 
  Cpu, 
  Quote, 
  Trophy, 
  Cloud, 
  HardDrive, 
  FileText, 
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Inbox
} from 'lucide-react';

interface AdminOverviewProps {
  setActiveTab: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ setActiveTab }) => {
  const { 
    projects, 
    certificates, 
    skills, 
    quotes, 
    achievements, 
    messages,
    supabaseConfig, 
    profile 
  } = usePortfolio();

  const stats = [
    { label: 'Active Projects', count: projects.length, icon: FolderGit2, tab: 'projects', color: 'purple' },
    { label: 'Certificates Uploaded', count: certificates.length, icon: Award, tab: 'certificates', color: 'cyan' },
    { label: 'Technical Skills', count: skills.length, icon: Cpu, tab: 'skills', color: 'purple' },
    { label: 'Honors & Competitions', count: achievements.length, icon: Trophy, tab: 'achievements', color: 'amber' },
    { label: 'Inquiries Received', count: messages.length, icon: Inbox, tab: 'messages', color: 'cyan' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Storage Mode Notice Banner */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        supabaseConfig.isConnected
          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
          : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
      }`}>
        <div className="flex items-start sm:items-center gap-3">
          {supabaseConfig.isConnected ? (
            <Cloud className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
          ) : (
            <HardDrive className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          )}
          <div>
            <div className="font-bold text-sm">
              {supabaseConfig.isConnected 
                ? 'Supabase Cloud Database & Storage: Connected' 
                : 'Current Storage Mode: Browser Local Storage (Active)'}
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {supabaseConfig.isConnected
                ? 'Your changes, certificates, images, and resume are permanently stored in Supabase cloud.'
                : 'All changes and uploaded files are saved locally on this browser. Connect Supabase in the Cloud Sync tab to enable permanent cloud persistence across all devices.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('supabase')}
          className="px-3.5 py-1.5 rounded-xl bg-space-900 border border-white/10 hover:border-white/30 text-xs font-semibold text-white whitespace-nowrap transition-colors"
        >
          {supabaseConfig.isConnected ? 'Configure Database' : 'Connect Supabase'}
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(s.tab)}
              className="p-4 rounded-xl bg-space-850/80 border border-white/5 hover:border-purple-500/40 cursor-pointer transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                <span className="text-xl font-bold font-display text-white">{s.count}</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Launch Shortcuts */}
      <div className="p-6 rounded-2xl bg-space-850/60 border border-white/5 space-y-4">
        <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Quick Admin Operations</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveTab('profile')}
            className="p-3.5 rounded-xl bg-space-900 border border-white/10 hover:border-purple-500/40 text-left transition-colors"
          >
            <div className="font-semibold text-white text-xs">Update Profile Photo & Bio</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Upload a new portrait, resume PDF, and contact details</p>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className="p-3.5 rounded-xl bg-space-900 border border-white/10 hover:border-cyan-500/40 text-left transition-colors"
          >
            <div className="font-semibold text-white text-xs">Manage AI Projects</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Edit Waste2Watt AI, MediBand AI, or create a new showcase</p>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className="p-3.5 rounded-xl bg-space-900 border border-white/10 hover:border-purple-500/40 text-left transition-colors"
          >
            <div className="font-semibold text-white text-xs">Upload Certificate (PDF/Image)</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Add verified badges, credentials, and course completions</p>
          </button>
        </div>
      </div>

    </div>
  );
};

