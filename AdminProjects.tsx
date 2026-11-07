import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ProjectItem } from '../../../types/portfolio';
import { processFileUpload } from '../../../lib/storage';
import { GithubIcon } from '../../common/Icons';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Layers, 
  Upload, 
  Check, 
  X, 
  ExternalLink,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';

export const AdminProjects: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, showToast } = usePortfolio();
  const [isEditing, setIsEditing] = useState<string | null>(null); // project id or 'new'

  const emptyProject: Omit<ProjectItem, 'id'> = {
    title: '',
    slug: '',
    summary: '',
    description: '',
    category: 'AI & Sustainable Tech',
    technologies: ['Python', 'Machine Learning'],
    bannerUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    demoUrl: '#',
    metrics: [
      { label: 'Efficiency Gain', value: '+25%' },
      { label: 'Accuracy', value: '95%' }
    ],
    featured: true,
    dateCreated: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState<Omit<ProjectItem, 'id'>>(emptyProject);
  const [techInput, setTechInput] = useState('');
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);

  const startCreate = () => {
    setFormData(emptyProject);
    setTechInput(emptyProject.technologies.join(', '));
    setIsEditing('new');
  };

  const startEdit = (proj: ProjectItem) => {
    setFormData({
      title: proj.title,
      slug: proj.slug,
      summary: proj.summary,
      description: proj.description,
      category: proj.category,
      technologies: proj.technologies,
      bannerUrl: proj.bannerUrl,
      githubUrl: proj.githubUrl || '',
      demoUrl: proj.demoUrl || '',
      metrics: proj.metrics || [],
      featured: proj.featured,
      dateCreated: proj.dateCreated
    });
    setTechInput(proj.technologies.join(', '));
    setIsEditing(proj.id);
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingBanner(true);
    try {
      const { url } = await processFileUpload(file, 'projects');
      setFormData(prev => ({ ...prev, bannerUrl: url }));
      showToast('Banner image uploaded successfully!');
    } catch (err) {
      console.error(err);
      showToast('Banner upload failed.', 'error');
    } finally {
      setIsUploadingBanner(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showToast('Project title is required.', 'error');
      return;
    }

    const cleanedTech = techInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const projectPayload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      technologies: cleanedTech.length > 0 ? cleanedTech : ['AI', 'Python']
    };

    if (isEditing === 'new') {
      addProject(projectPayload);
    } else if (isEditing) {
      updateProject(isEditing, projectPayload);
    }

    setIsEditing(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete project "${title}"?`)) {
      deleteProject(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold font-display text-white">
            Flagship & Research Projects
          </h3>
          <p className="text-xs text-slate-400">
            Showcase your applied AI systems, Waste2Watt AI, MediBand AI, and more.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Editor Modal / Panel */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-space-850/90 border border-purple-500/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h4 className="text-sm font-bold font-display text-white">
              {isEditing === 'new' ? 'Create New AI Project' : `Edit "${formData.title}"`}
            </h4>
            <button
              type="button"
              onClick={() => setIsEditing(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Waste2Watt AI"
                className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Healthcare & Edge AI"
                className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Brief Summary (Hero Cards)
            </label>
            <input
              type="text"
              required
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="One-line impact description..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Full Architecture & Deep-Dive Description
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Explain how the AI algorithms, data pipelines, and hardware integration function..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none resize-none"
            />
          </div>

          {/* Banner Image Uploader */}
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Project Banner Image
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={formData.bannerUrl}
                onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                placeholder="Image URL..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-space-900 hover:bg-space-800 border border-white/10 text-xs font-medium text-slate-200 shrink-0">
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isUploadingBanner ? 'Uploading...' : 'Upload File'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  disabled={isUploadingBanner}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Python, C, Machine Learning, Scikit-Learn, IoT, React"
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Live Demo URL
              </label>
              <input
                type="text"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsEditing(null)}
              className="px-4 py-2 rounded-xl bg-space-900 text-slate-300 hover:text-white text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md"
            >
              Save Project
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-4 rounded-xl bg-space-850/80 border border-white/5 flex items-center justify-between gap-4 hover:border-purple-500/30 transition-colors"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <img
                src={proj.bannerUrl}
                alt={proj.title}
                className="w-14 h-14 rounded-lg object-cover shrink-0 border border-white/10"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white truncate">{proj.title}</h4>
                  <span className="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-950/50 border border-purple-500/20">
                    {proj.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate max-w-md mt-0.5">{proj.summary}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => startEdit(proj)}
                className="p-2 rounded-lg bg-space-900 hover:bg-space-800 text-slate-300 hover:text-cyan-400 border border-white/5 transition-colors"
                title="Edit Project"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(proj.id, proj.title)}
                className="p-2 rounded-lg bg-space-900 hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-white/5 transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
