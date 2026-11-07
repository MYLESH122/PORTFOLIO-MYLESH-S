import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { GlowingCard } from '../common/GlowingCard';
import { 
  Brain, 
  Database, 
  Code2, 
  Layout, 
  Plus, 
  CheckCircle2, 
  Sparkles,
  Terminal
} from 'lucide-react';
import { SkillItem } from '../../types/portfolio';

export const SkillsSection: React.FC = () => {
  const { skills, isAdminLoggedIn, setIsAdminDashboardOpen } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'ai_ml', label: 'AI & Machine Learning', icon: Brain },
    { id: 'data_science', label: 'Data Science & Analytics', icon: Database },
    { id: 'languages', label: 'Programming & Languages', icon: Terminal },
    { id: 'web', label: 'Web & UI Frameworks', icon: Layout },
  ];

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'ai_ml': return { label: 'AI & ML', color: 'purple' };
      case 'data_science': return { label: 'Data Science', color: 'cyan' };
      case 'languages': return { label: 'Languages', color: 'pink' };
      case 'web': return { label: 'Web / UI', color: 'emerald' };
      default: return { label: 'Tech', color: 'purple' };
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-space-950 cyber-grid-dense">
      {/* Decorative ambient light */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Core Competencies"
          title="Skills & Technical Arsenal"
          subtitle="A comprehensive toolkit engineered across artificial intelligence, computational science, and frontend elegance."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-600/25 scale-105'
                  : 'bg-space-900/80 text-slate-400 hover:text-white hover:bg-space-850 border border-white/5'
              }`}
            >
              {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => {
            const badge = getCategoryBadge(skill.category);
            return (
              <GlowingCard
                key={skill.id}
                glowColor={badge.color as 'purple' | 'cyan'}
                className="p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-space-800 text-cyan-300 border border-white/5">
                      {badge.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {skill.proficiency}%
                    </span>
                  </div>

                  <h4 className="text-white font-bold text-base mb-3 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    <span>{skill.name}</span>
                    {skill.isFeatured && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-neon-purple" title="Primary core strength"></span>
                    )}
                  </h4>
                </div>

                {/* Animated proficiency bar */}
                <div className="w-full">
                  <div className="w-full h-2 rounded-full bg-space-800 overflow-hidden border border-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-1000"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5 font-mono">
                    <span>Competency</span>
                    <span>
                      {skill.proficiency >= 90 ? 'Mastery' : skill.proficiency >= 80 ? 'Advanced' : 'Proficient'}
                    </span>
                  </div>
                </div>
              </GlowingCard>
            );
          })}
        </div>

        {/* Admin Quick Action */}
        {isAdminLoggedIn && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setIsAdminDashboardOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-900/60 text-xs font-medium transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add / Manage Skills in Admin</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

