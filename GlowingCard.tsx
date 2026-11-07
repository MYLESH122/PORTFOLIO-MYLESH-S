import React from 'react';

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'combo';
  interactive?: boolean;
  onClick?: () => void;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className = '',
  glowColor = 'combo',
  interactive = true,
  onClick
}) => {
  const glowStyles = {
    purple: 'hover:border-purple-500/50 hover:shadow-neon-purple',
    cyan: 'hover:border-cyan-500/50 hover:shadow-neon-cyan',
    combo: 'hover:border-purple-500/40 hover:shadow-neon-combo',
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl bg-space-900/70 border border-white/10 
        backdrop-blur-xl transition-all duration-300 overflow-hidden
        ${interactive ? `cursor-pointer hover:-translate-y-1 ${glowStyles[glowColor]}` : ''}
        ${className}
      `}
    >
      {/* Subtle top reflection */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};

