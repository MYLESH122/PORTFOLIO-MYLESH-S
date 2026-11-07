import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { LinkedinIcon, InstagramIcon } from './Icons';
import { 
  Heart, 
  Globe, 
  Lock, 
  QrCode, 
  ArrowUp,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    profile, 
    isAdminLoggedIn, 
    setIsAdminModalOpen, 
    setIsAdminDashboardOpen,
    setIsQRCodeModalOpen 
  } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-space-950 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1px] shadow-neon-combo">
                <div className="w-full h-full bg-space-950 rounded-xl flex items-center justify-center font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-base">
                  M
                </div>
              </div>
              <span className="font-display font-bold text-white tracking-wide text-xl">
                {profile.name}
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              {profile.tagline}. Driven by practical AI innovations, neural architectures, and robust engineering for global societal impact.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-space-900 border border-white/10 hover:border-purple-500/50 hover:bg-purple-950/40 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-space-900 border border-white/10 hover:border-pink-500/50 hover:bg-pink-950/40 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.socials.unstop}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-space-900 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-950/40 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Unstop Profile"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About & Education</a></li>
              <li><a href="#resume" className="hover:text-amber-400 transition-colors flex items-center gap-1.5"><span className="text-amber-400 font-bold">•</span> Professional Resume</a></li>
              <li><a href="#skills" className="hover:text-cyan-400 transition-colors">Core Skillset</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Waste2Watt & MediBand</a></li>
              <li><a href="#certificates" className="hover:text-cyan-400 transition-colors">Certifications</a></li>
              <li><a href="#achievements" className="hover:text-cyan-400 transition-colors">Achievements</a></li>
            </ul>
          </div>

          {/* Utilities & Administration */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 font-semibold">
              Tools & Admin
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => setIsQRCodeModalOpen(true)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-space-900 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all"
              >
                <QrCode className="w-4 h-4 text-cyan-400" />
                <span>Generate Portfolio QR</span>
              </button>
              
              <button
                onClick={() => isAdminLoggedIn ? setIsAdminDashboardOpen(true) : setIsAdminModalOpen(true)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-space-900 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-purple-300 text-xs font-medium transition-all"
              >
                {isAdminLoggedIn ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Admin Dashboard (Online)</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-purple-400" />
                    <span>Admin Portal Access</span>
                  </>
                )}
              </button>

              <button
                onClick={scrollToTop}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-space-900 border border-white/5 hover:bg-white/5 text-slate-400 hover:text-slate-200 text-xs transition-colors"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for <span className="text-slate-300 font-medium">B.Tech AI & Data Science</span> with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">
              React & Supabase
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
