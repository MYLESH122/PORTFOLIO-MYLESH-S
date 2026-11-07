import React from 'react';

interface CyberBadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'cyan' | 'pink' | 'amber' | 'emerald';
  size?: 'sm' | 'md';
  className?: string;
}

export const CyberBadge: React.FC<CyberBadgeProps> = ({
  children,
  variant = 'purple',
  size = 'sm',
  className = ''
}) => {
  const variantStyles = {
    purple: 'bg-purple-950/50 text-purple-300 border-purple-500/30 hover:border-purple-400/60 shadow-purple-950/50',
    cyan: 'bg-cyan-950/50 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/60 shadow-cyan-950/50',
    pink: 'bg-pink-950/50 text-pink-300 border-pink-500/30 hover:border-pink-400/60 shadow-pink-950/50',
    amber: 'bg-amber-950/50 text-amber-300 border-amber-500/30 hover:border-amber-400/60 shadow-amber-950/50',
    emerald: 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30 hover:border-emerald-400/60 shadow-emerald-950/50',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3.5 py-1.5',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-lg border backdrop-blur-md transition-all duration-300 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};

