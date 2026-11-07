import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { GlowingCard } from '../common/GlowingCard';
import { 
  Trophy, 
  Medal, 
  Flag, 
  Calendar, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { achievements, isAdminLoggedIn, setIsAdminDashboardOpen } = usePortfolio();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hackathon': return Trophy;
      case 'award': return Medal;
      case 'competition': return Flag;
      default: return Trophy;
    }
  };

  const getBadgeStyle = (color?: string) => {
    switch (color) {
      case 'cyan': return 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300 shadow-cyan-950/50';
      case 'amber': return 'bg-amber-950/70 border-amber-500/40 text-amber-300 shadow-amber-950/50';
      case 'purple':
      default: return 'bg-purple-950/70 border-purple-500/40 text-purple-300 shadow-purple-950/50';
    }
  };

  return (
    <section id="achievements" className="py-24 relative bg-space-950/60 overflow-hidden">
      {/* Background lights */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Milestones & Honors"
          title="Achievements & Competitions"
          subtitle="Recognition earned across hackathons, national coding tournaments, and technical innovation expos."
        />

        {/* Achievements Timeline & Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {achievements.map((ach) => {
            const Icon = getCategoryIcon(ach.category);
            return (
              <GlowingCard
                key={ach.id}
                glowColor={ach.badgeColor === 'cyan' ? 'cyan' : 'purple'}
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-medium ${getBadgeStyle(ach.badgeColor)}`}>
                      {ach.rankOrAward}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{ach.date}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-space-850 border border-white/10 flex items-center justify-center shrink-0 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg leading-snug">
                        {ach.title}
                      </h4>
                      <p className="text-xs text-purple-300 font-medium flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        <span>{ach.organizer}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mt-2">
                    {ach.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span className="capitalize text-slate-500 font-mono text-[10px]">{ach.category}</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>
              </GlowingCard>
            );
          })}
        </div>

        {/* Add / Manage Achievements Button */}
        <div className="text-center">
          <button
            onClick={() => setIsAdminDashboardOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-900/60 text-xs font-semibold shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add or Manage Achievements in Admin</span>
          </button>
        </div>

      </div>
    </section>
  );
};

