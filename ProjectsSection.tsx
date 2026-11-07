import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { GlowingCard } from '../common/GlowingCard';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from '../common/Icons';
import { 
  ExternalLink, 
  Layers, 
  TrendingUp, 
  Plus, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { 
    projects, 
    selectedProject, 
    setSelectedProject, 
    isAdminLoggedIn, 
    setIsAdminDashboardOpen 
  } = usePortfolio();

  return (
    <section id="projects" className="py-24 relative bg-space-950/70 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Featured Innovations"
          title="Flagship AI Projects"
          subtitle="Real-world engineering solutions solving mission-critical problems in sustainable energy and wearable health."
        />

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {projects.map((proj) => (
            <GlowingCard
              key={proj.id}
              glowColor="combo"
              className="flex flex-col h-full group"
            >
              {/* Image Banner */}
              <div className="relative h-60 w-full overflow-hidden bg-space-950">
                <img
                  src={proj.bannerUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/30 to-transparent" />
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-space-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium backdrop-blur-md">
                    {proj.category}
                  </span>
                </div>

                {/* Quick External Links */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-space-900/80 hover:bg-space-800 text-slate-200 hover:text-white border border-white/10 backdrop-blur-md transition-colors"
                      title="GitHub Repository"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {proj.demoUrl && proj.demoUrl !== '#' && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 hover:text-white border border-cyan-500/30 backdrop-blur-md transition-colors"
                      title="Live Demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mt-2.5">
                    {proj.summary}
                  </p>
                </div>

                {/* Metrics Highlight Pills */}
                {proj.metrics && proj.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-space-850/80 border border-white/5">
                    {proj.metrics.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 font-display">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Pills */}
                <div className="space-y-4 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.slice(0, 5).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-space-800 text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 5 && (
                      <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-space-800 text-slate-400 border border-white/5">
                        +{proj.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Detail trigger button */}
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold tracking-wide uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View Architecture & Full Details</span>
                  </button>
                </div>

              </div>
            </GlowingCard>
          ))}
        </div>

        {/* Admin Quick Action */}
        {isAdminLoggedIn && (
          <div className="text-center">
            <button
              onClick={() => setIsAdminDashboardOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-950/90 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-900/60 text-xs font-medium transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add, Edit or Delete Projects in Admin</span>
            </button>
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
