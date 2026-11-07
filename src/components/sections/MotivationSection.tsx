import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { GlowingCard } from '../common/GlowingCard';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Plus, 
  Flame, 
  Settings2 
} from 'lucide-react';

export const MotivationSection: React.FC = () => {
  const { quotes, isAdminLoggedIn, setIsAdminDashboardOpen } = usePortfolio();
  const activeQuotes = quotes.filter(q => q.active);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeQuotes.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeQuotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeQuotes.length]);

  const currentQuote = activeQuotes[currentIndex] || {
    quote: "Continuous learning in Artificial Intelligence is the gateway to solving problems previously thought impossible.",
    author: "Mylesh S",
    context: "Engineering Philosophy"
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeQuotes.length) % activeQuotes.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeQuotes.length);
  };

  return (
    <section id="motivation" className="py-24 relative bg-space-950 cyber-grid overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Philosophy & Drive"
          title="Daily Motivation & Vision"
          subtitle="The principles, vision, and mental models powering continuous breakthrough engineering."
        />

        {/* Motivational Card */}
        <div className="relative">
          <GlowingCard glowColor="combo" className="p-8 sm:p-12 relative overflow-hidden text-center">
            
            {/* Big quote icon watermark */}
            <div className="absolute -top-6 -left-6 text-purple-500/10 pointer-events-none">
              <Quote className="w-32 h-32" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Flame className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentQuote.context || "Philosophy"}</span>
              </div>

              {/* Quote text */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-white leading-relaxed italic">
                "{currentQuote.quote}"
              </blockquote>

              {/* Author Attribution */}
              <div className="pt-2">
                <div className="font-display font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  — {currentQuote.author}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  B.Tech AI & Data Science Specialist
                </div>
              </div>

              {/* Controls & Pagination Dots */}
              <div className="pt-6 flex items-center justify-center gap-4">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-space-850 hover:bg-space-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {activeQuotes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        currentIndex === idx 
                          ? 'w-6 bg-gradient-to-r from-purple-500 to-cyan-400' 
                          : 'w-1.5 bg-space-700'
                      }`}
                      aria-label={`Go to quote ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-space-850 hover:bg-space-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
                  aria-label="Next quote"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </GlowingCard>
        </div>

        {/* Admin Manage Quotes Option */}
        {isAdminLoggedIn && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsAdminDashboardOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-900/60 text-xs font-medium transition-all"
            >
              <Settings2 className="w-4 h-4" />
              <span>Manage / Add Motivational Quotes in Admin</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

