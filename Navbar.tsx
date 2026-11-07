import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  FileDown, 
  Lock, 
  Menu, 
  X, 
  QrCode, 
  Sparkles, 
  ShieldCheck, 
  Cpu
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    profile, 
    isAdminLoggedIn, 
    setIsAdminModalOpen, 
    setIsAdminDashboardOpen,
    setIsQRCodeModalOpen 
  } = usePortfolio();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Resume', href: '#resume' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Motivation', href: '#motivation' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminModalOpen(true);
    }
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-space-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1px] shadow-neon-combo group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-space-950 rounded-xl flex items-center justify-center">
                <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-lg">
                  M
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-white tracking-wide text-lg sm:text-xl">
                  {profile.name}
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-neon-cyan animate-pulse"></span>
              </div>
              <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase hidden sm:block">
                AI & Data Science
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            {/* QR Code generator button */}
            <button
              onClick={() => setIsQRCodeModalOpen(true)}
              title="Generate Portfolio QR Code"
              className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 transition-all"
            >
              <QrCode className="w-5 h-5" />
            </button>

            {/* Admin Access lock */}
            <button
              onClick={handleAdminClick}
              title={isAdminLoggedIn ? "Admin Dashboard (Active)" : "Admin Portal Login"}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                isAdminLoggedIn
                  ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 shadow-neon-purple'
                  : 'text-slate-400 hover:text-purple-300 hover:bg-purple-950/30 border-transparent hover:border-purple-500/30'
              }`}
            >
              {isAdminLoggedIn ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="hidden md:inline">Admin</span>
                </>
              ) : (
                <Lock className="w-4 h-4" />
              )}
            </button>

            {/* Resume Download */}
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName || "Mylesh_S_Resume.pdf"}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-purple-600/30 hover:shadow-neon-combo transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileDown className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => setIsQRCodeModalOpen(true)}
              className="p-2 rounded-lg text-slate-300 hover:bg-white/10"
              aria-label="QR Code"
            >
              <QrCode className="w-5 h-5" />
            </button>
            <button
              onClick={handleAdminClick}
              className="p-2 rounded-lg text-slate-300 hover:bg-white/10"
              aria-label="Admin"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-space-950/95 border-b border-white/10 backdrop-blur-2xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-purple-950/40"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName || "Mylesh_S_Resume.pdf"}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-sm shadow-md"
              >
                <FileDown className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

