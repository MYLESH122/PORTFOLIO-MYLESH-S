import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { GlowingCard } from '../common/GlowingCard';
import { 
  GraduationCap, 
  Brain, 
  Cpu, 
  Code2, 
  Database, 
  Compass, 
  Sparkles, 
  Award,
  Layers
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { profile } = usePortfolio();

  const journeyMilestones = [
    {
      year: "Foundations",
      title: "Algorithmic Groundwork & Programming",
      desc: "Began with low-level systems programming in C and Python, mastering foundational data structures, algorithmic problem-solving, and computational logic.",
      icon: Code2,
      badge: "C / Python"
    },
    {
      year: "Core Specialization",
      title: "B.Tech in Artificial Intelligence & Data Science",
      desc: "Immersed in advanced statistical modeling, exploratory data analysis with Pandas/NumPy, machine learning mathematics, and applied neural networks.",
      icon: Brain,
      badge: "AI & ML"
    },
    {
      year: "Applied Systems",
      title: "Architecting Waste2Watt AI",
      desc: "Engineered an intelligent biomass-to-energy regression and load-balancing framework to optimize clean energy generation and suppress harmful emissions.",
      icon: Layers,
      badge: "Energy AI"
    },
    {
      year: "Wearable & Edge AI",
      title: "Pioneering MediBand AI",
      desc: "Fused embedded microcontrollers with real-time biometric anomaly detection algorithms to deliver an ultra-responsive wearable patient telemetry sentinel.",
      icon: Cpu,
      badge: "HealthTech"
    }
  ];

  const pillars = [
    {
      title: "Artificial Intelligence & ML",
      description: "Developing robust supervised, unsupervised, and deep learning architectures tailored for predictive reliability.",
      icon: Brain,
      color: "purple"
    },
    {
      title: "Data Science & Insights",
      description: "Extracting actionable intelligence through rigorous exploratory data analysis, statistical validation, and clean pipelines.",
      icon: Database,
      color: "cyan"
    },
    {
      title: "Edge & Hardware AI",
      description: "Bridging the physical-digital divide by combining low-level C programming, IoT sensors, and edge inference.",
      icon: Cpu,
      color: "purple"
    },
    {
      title: "Full-Stack Web Delivery",
      description: "Crafting modern, responsive user interfaces with React, modern CSS, and RESTful architectures so users interact seamlessly with AI models.",
      icon: Code2,
      color: "cyan"
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-space-950/60 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="About Me"
          title="Education & Engineering Journey"
          subtitle="Transforming complex algorithmic theory into high-impact, real-world solutions."
        />

        {/* Education & Personal Bio Banner */}
        <div className="mb-16">
          <GlowingCard glowColor="combo" className="p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>Academic Qualification</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {profile.education}
                </h3>
                
                <p className="text-cyan-400 font-mono text-sm">
                  {profile.institution} • {profile.degreeYear}
                </p>

                <p className="text-slate-300 leading-relaxed text-base pt-2">
                  {profile.bio}
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-space-800 text-slate-300 border border-white/5">
                    🎓 AI & Data Science Major
                  </span>
                  <span className="px-3 py-1 rounded-full bg-space-800 text-slate-300 border border-white/5">
                    📍 {profile.location}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                    ✨ Open to Internships, Projects & Roles
                  </span>
                </div>
              </div>

              {/* Education Accent Graphic */}
              <div className="lg:col-span-4 bg-space-950/60 p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1px] shadow-neon-combo">
                  <div className="w-full h-full bg-space-900 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-cyan-300" />
                  </div>
                </div>
                <h4 className="font-display font-bold text-white text-lg">Degree Focus</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deep mathematical foundations of Machine Learning, Neural Networks, Predictive Modeling, and Distributed Data Architectures.
                </p>
              </div>

            </div>
          </GlowingCard>
        </div>

        {/* Four Engineering Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <GlowingCard 
                key={idx} 
                glowColor={pillar.color as 'purple' | 'cyan'} 
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center ${
                    pillar.color === 'purple' 
                      ? 'bg-purple-950/80 text-purple-400 border border-purple-500/30' 
                      : 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </GlowingCard>
            );
          })}
        </div>

        {/* Learning Journey Timeline */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-display text-white">
              Evolution of an AI Engineer
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Key milestones shaping my journey from raw code to intelligent systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {journeyMilestones.map((m, index) => {
              const Icon = m.icon;
              return (
                <div key={index} className="relative group">
                  <div className="p-6 rounded-2xl bg-space-900/60 border border-white/10 hover:border-purple-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-semibold text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
                          {m.badge}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-space-800 flex items-center justify-center text-purple-400">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <h4 className="text-white font-bold text-base mb-2">
                        {m.title}
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

