import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { QRCodeModal } from './components/common/QRCodeModal';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ResumeSection } from './components/sections/ResumeSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { CertificatesSection } from './components/sections/CertificatesSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { MotivationSection } from './components/sections/MotivationSection';
import { SocialSection } from './components/sections/SocialSection';
import { ContactSection } from './components/sections/ContactSection';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePortfolio();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-start gap-3 transition-all animate-in slide-in-from-bottom duration-300 ${
            t.type === 'success'
              ? 'bg-space-900/90 border-emerald-500/40 text-emerald-200'
              : t.type === 'error'
              ? 'bg-space-900/90 border-red-500/40 text-red-200'
              : 'bg-space-900/90 border-purple-500/40 text-purple-200'
          }`}
        >
          {t.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : t.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-xs font-medium leading-relaxed">
            {t.message}
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="p-1 text-slate-400 hover:text-white shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

const PortfolioMain: React.FC = () => {
  const { isQRCodeModalOpen, setIsQRCodeModalOpen } = usePortfolio();

  return (
    <div className="relative min-h-screen bg-space-950 text-slate-100 flex flex-col font-sans selection:bg-purple-600/30 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ResumeSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <AchievementsSection />
        <MotivationSection />
        <SocialSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Global Modals */}
      <AdminLoginModal />
      <AdminDashboard />
      <QRCodeModal
        isOpen={isQRCodeModalOpen}
        onClose={() => setIsQRCodeModalOpen(false)}
      />

      {/* Toast Alert System */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}

