import React from 'react';
import { ProjectItem } from '../../types/portfolio';
import { Modal } from '../common/Modal';
import { GithubIcon } from '../common/Icons';
import { 
  ExternalLink, 
  Cpu, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Layers
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <Modal isOpen={!!project} onClose={onClose} title={project.title} maxWidth="4xl">
      <div className="space-y-6">
        
        {/* Banner with Cyber Overlay */}
        <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 w-full bg-space-950 border border-white/10">
          <img
            src={project.bannerUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-space-900/90 border border-purple-500/40 text-purple-300 text-xs font-mono font-medium backdrop-blur-md">
              {project.category}
            </span>
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-space-900/90 hover:bg-space-800 text-white border border-white/10 transition-colors"
                  title="Source Code"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {project.demoUrl && project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-cyan-600/90 hover:bg-cyan-500 text-white border border-cyan-400/30 transition-colors"
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Summary */}
        <div>
          <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-400 mb-1">
            System Overview
          </h4>
          <p className="text-slate-200 text-base leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Deep Dive Description */}
        <div className="p-5 rounded-2xl bg-space-850/60 border border-white/5 space-y-3">
          <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Architecture & Impact Breakdown</span>
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Performance Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Key Benchmarks & Metrics</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-space-800/60 border border-white/10 text-center">
                  <div className="text-2xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Used */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Technologies & Frameworks
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-space-800 text-slate-300 border border-white/10 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Close Action */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-space-800 hover:bg-space-700 text-white text-sm font-medium transition-colors"
          >
            Close Overview
          </button>
        </div>

      </div>
    </Modal>
  );
};
