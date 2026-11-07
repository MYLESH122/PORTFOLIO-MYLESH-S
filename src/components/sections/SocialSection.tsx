import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { GlowingCard } from '../common/GlowingCard';
import { LinkedinIcon, InstagramIcon, UnstopIcon } from '../common/Icons';
import { 
  Globe, 
  ExternalLink, 
  Users, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const SocialSection: React.FC = () => {
  const { profile } = usePortfolio();

  const socialChannels = [
    {
      name: "LinkedIn",
      handle: "mylesh-s-714378440",
      description: "Professional network, AI engineering updates, project announcements, and industry collaborations.",
      url: profile.socials.linkedin,
      icon: LinkedinIcon,
      color: "purple",
      badge: "Professional Network",
      gradient: "from-blue-600 to-indigo-600",
      stats: "Connect on LinkedIn"
    },
    {
      name: "Instagram",
      handle: "@mylesh_billa",
      description: "Behind-the-scenes building hardware prototypes, student engineer life, tech moments, and events.",
      url: profile.socials.instagram,
      icon: InstagramIcon,
      color: "pink",
      badge: "Engineering Life",
      gradient: "from-pink-600 to-purple-600",
      stats: "Follow on Instagram"
    },
    {
      name: "Unstop",
      handle: "myless15148",
      description: "Competitive hackathons, algorithmic tournaments, national collegiate coding events, and badges.",
      url: profile.socials.unstop,
      icon: UnstopIcon,
      color: "cyan",
      badge: "Competitions & Badges",
      gradient: "from-cyan-600 to-blue-600",
      stats: "View Unstop Profile"
    }
  ];

  return (
    <section id="social" className="py-24 relative bg-space-950/70 overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-900/10 via-cyan-900/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Digital Presence"
          title="Social Channels & Profiles"
          subtitle="Stay synchronized across professional networks, competitive tech platforms, and real-time updates."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialChannels.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <GlowingCard
                  glowColor={item.color as 'purple' | 'cyan'}
                  className="p-8 h-full flex flex-col justify-between group-hover:scale-[1.02] transition-transform duration-300"
                >
                  <div>
                    {/* Top Row: Icon and Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.gradient} p-[1px] shadow-lg shadow-black/40 group-hover:shadow-neon-combo transition-shadow`}>
                        <div className="w-full h-full bg-space-950 rounded-2xl flex items-center justify-center text-white">
                          <Icon className="w-7 h-7" />
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-space-850 text-slate-300 border border-white/5">
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </h3>
                      <p className="text-xs font-mono text-purple-400 font-medium">
                        {item.handle}
                      </p>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mt-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                    <span>{item.stats}</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </GlowingCard>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
