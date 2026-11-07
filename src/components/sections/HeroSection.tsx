import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  FileDown, 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Brain, 
  ExternalLink, 
  Camera, 
  Award,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { 
    profile, 
    isAdminLoggedIn, 
    setIsAdminDashboardOpen 
  } = usePortfolio();

  const taglines = [
    "Artificial Intelligence Engineer",
    "Machine Learning & Data Science Explorer",
    "Creator of Waste2Watt AI & MediBand AI",
    "B.Tech AI & Data Science Specialist"
  ];

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden cyber-grid">
      {/* Cosmic background radial glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Status & Degree Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-space-900/90 border border-purple-500/30 backdrop-blur-xl shadow-neon-purple">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-cyan-300">
                {profile.education}
              </span>
            </div>

            {/* Name and Metallic Glow */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-display tracking-tight text-white leading-none">
              Hello, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-cyan-400 animate-shimmer bg-[length:200%_auto]">
                {profile.name}
              </span>
            </h1>

            {/* Dynamic Tagline Cycler */}
            <div className="h-8 flex items-center justify-center lg:justify-start">
              <p className="text-lg sm:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 transition-all duration-500 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400 inline" />
                <span>{taglines[currentTaglineIndex]}</span>
              </p>
            </div>

            {/* Subtitle / Bio Preview */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {profile.subTitle} Specializing in building production-ready predictive systems, deep learning models, and real-world applied IoT & AI hardware.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:shadow-neon-combo transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Explore Flagship Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName || "Mylesh_S_Resume.pdf"}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-space-900/80 hover:bg-space-850 text-slate-200 hover:text-white border border-white/10 hover:border-cyan-500/40 font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-cyan-900/20"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black font-display text-white text-gradient-purple">
                  2+
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Flagship AI Systems</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black font-display text-white text-gradient-cyan">
                  10+
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Tech Masteries</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black font-display text-emerald-400">
                  100%
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Production Focus</div>
              </div>
            </div>

          </div>

          {/* Right Column: Holographic Avatar Portrait */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Ambient circular cyber rings */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              
              {/* Outer decorative spinning ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30 animate-[spin_30s_linear_infinite]" />
              
              {/* Inner glowing cyan accent ring */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-purple-600 via-transparent to-cyan-500 opacity-60 blur-md animate-pulse-glow" />

              {/* Main Photo Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-space-900 border-2 border-white/10 shadow-2xl shadow-purple-950/80 group">
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder if profile photo fails to load
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop';
                  }}
                />

                {/* Cyber Gradient Overlay on photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Floating Badge in corner */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-space-950/80 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-semibold text-white">Active Innovator</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 font-medium">B.Tech AI & DS</span>
                </div>

                {/* Admin quick change photo trigger */}
                {isAdminLoggedIn && (
                  <button
                    onClick={() => setIsAdminDashboardOpen(true)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-space-950/80 hover:bg-purple-900/80 text-white border border-purple-500/50 backdrop-blur-md transition-all shadow-lg flex items-center gap-1.5 text-xs"
                    title="Change Profile Photo in Admin"
                  >
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Edit Photo</span>
                  </button>
                )}
              </div>

              {/* Decorative floating badges */}
              <div className="absolute -top-4 -left-4 p-3 rounded-2xl bg-space-900/90 border border-purple-500/30 backdrop-blur-md shadow-lg shadow-purple-950/50 flex items-center gap-2.5 animate-float hidden sm:flex">
                <Brain className="w-5 h-5 text-purple-400" />
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Specialization</p>
                  <p className="text-xs font-bold text-white">AI & Deep Learning</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 p-3 rounded-2xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/50 flex items-center gap-2.5 animate-float hidden sm:flex" style={{ animationDelay: '3s' }}>
                <Cpu className="w-5 h-5 text-cyan-400" />
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Real-World Tech</p>
                  <p className="text-xs font-bold text-white">Waste2Watt & MediBand</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

