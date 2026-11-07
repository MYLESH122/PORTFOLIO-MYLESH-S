import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SkillItem } from '../../../types/portfolio';
import { Plus, Trash2, Edit3, Cpu, Sparkles } from 'lucide-react';

export const AdminSkills: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill, showToast } = usePortfolio();

  const [newSkill, setNewSkill] = useState<{
    name: string;
    category: 'ai_ml' | 'languages' | 'data_science' | 'web';
    proficiency: number;
    isFeatured: boolean;
  }>({
    name: '',
    category: 'ai_ml',
    proficiency: 90,
    isFeatured: true
  });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) {
      showToast('Skill name is required.', 'error');
      return;
    }
    addSkill(newSkill);
    setNewSkill({
      name: '',
      category: 'ai_ml',
      proficiency: 85,
      isFeatured: false
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Add Skill Form */}
      <form onSubmit={handleAddSkill} className="p-5 rounded-2xl bg-space-850/80 border border-purple-500/30 space-y-4">
        <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-cyan-400" />
          <span>Add New Technical Skill</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Skill Name
            </label>
            <input
              type="text"
              required
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="e.g. PyTorch, OpenCV..."
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            >
              <option value="ai_ml">AI & Machine Learning</option>
              <option value="data_science">Data Science & Analytics</option>
              <option value="languages">Programming Languages</option>
              <option value="web">Web & UI Frameworks</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Proficiency ({newSkill.proficiency}%)
            </label>
            <input
              type="range"
              min="30"
              max="100"
              value={newSkill.proficiency}
              onChange={(e) => setNewSkill({ ...newSkill, proficiency: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={newSkill.isFeatured}
              onChange={(e) => setNewSkill({ ...newSkill, isFeatured: e.target.checked })}
              className="rounded bg-space-950 border-white/10 text-purple-600 focus:ring-0"
            />
            <span>Mark as Featured Skill</span>
          </label>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            Add Skill
          </button>
        </div>
      </form>

      {/* Skills Management List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-3.5 rounded-xl bg-space-850/60 border border-white/5 flex items-center justify-between gap-3"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white truncate">{skill.name}</span>
                {skill.isFeatured && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-neon-cyan shrink-0" title="Featured"></span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={skill.proficiency}
                  onChange={(e) => updateSkill(skill.id, { proficiency: Number(e.target.value) })}
                  className="w-24 accent-purple-400 h-1 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-slate-400">{skill.proficiency}%</span>
              </div>
            </div>

            <button
              onClick={() => deleteSkill(skill.id)}
              className="p-1.5 rounded-lg bg-space-900 hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-white/5 shrink-0"
              title="Delete Skill"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

