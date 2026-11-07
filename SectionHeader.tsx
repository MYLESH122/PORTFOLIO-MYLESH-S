import React from 'react';

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  centered = true
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center mx-auto max-w-3xl' : ''}`}>
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm backdrop-blur-md ${centered ? 'justify-center' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse"></span>
        {badge}
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
      <div className={`mt-5 flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-cyber-violet rounded-full"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-neon-cyan"></div>
        <div className="h-0.5 w-12 bg-gradient-to-r from-cyber-cyan to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

