import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AchievementItem } from '../../../types/portfolio';
import { Plus, Trash2, Trophy, Medal, Flag } from 'lucide-react';

export const AdminAchievements: React.FC = () => {
  const { achievements, addAchievement, deleteAchievement, showToast } = usePortfolio();

  const [newAch, setNewAch] = useState<Omit<AchievementItem, 'id'>>({
    title: '',
    category: 'hackathon',
    organizer: '',
    date: new Date().getFullYear().toString(),
    rankOrAward: 'Winner / Finalist',
    description: '',
    badgeColor: 'purple'
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAch.title || !newAch.organizer) {
      showToast('Title and Organizer are required.', 'error');
      return;
    }
    addAchievement(newAch);
    setNewAch({
      title: '',
      category: 'hackathon',
      organizer: '',
      date: new Date().getFullYear().toString(),
      rankOrAward: 'Winner',
      description: '',
      badgeColor: 'cyan'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Form */}
      <form onSubmit={handleAdd} className="p-5 rounded-2xl bg-space-850/80 border border-purple-500/30 space-y-4">
        <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Add Hackathon, Competition or Award</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Title / Event Name *
            </label>
            <input
              type="text"
              required
              value={newAch.title}
              onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
              placeholder="e.g. Smart India Hackathon / Unstop Coding Sprint"
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Organizer / Host *
            </label>
            <input
              type="text"
              required
              value={newAch.organizer}
              onChange={(e) => setNewAch({ ...newAch, organizer: e.target.value })}
              placeholder="e.g. AICTE / Unstop / College Tech Fest"
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={newAch.category}
              onChange={(e) => setNewAch({ ...newAch, category: e.target.value as any })}
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            >
              <option value="hackathon">Hackathon</option>
              <option value="competition">Competition</option>
              <option value="award">Award / Honor</option>
              <option value="academic">Academic Distinction</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Rank / Recognition Award
            </label>
            <input
              type="text"
              required
              value={newAch.rankOrAward}
              onChange={(e) => setNewAch({ ...newAch, rankOrAward: e.target.value })}
              placeholder="e.g. 1st Place / National Finalist"
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Year / Date
            </label>
            <input
              type="text"
              value={newAch.date}
              onChange={(e) => setNewAch({ ...newAch, date: e.target.value })}
              placeholder="2024"
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
            Achievement Summary
          </label>
          <textarea
            rows={2}
            value={newAch.description}
            onChange={(e) => setNewAch({ ...newAch, description: e.target.value })}
            placeholder="Briefly describe the competition outcome or project presented..."
            className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none resize-none"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md"
          >
            Record Achievement
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="p-4 rounded-xl bg-space-850/70 border border-white/5 flex items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{ach.title}</span>
                <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20">
                  {ach.rankOrAward}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{ach.organizer} • {ach.date}</p>
            </div>

            <button
              onClick={() => deleteAchievement(ach.id)}
              className="p-1.5 rounded-lg bg-space-900 hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-white/5"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

