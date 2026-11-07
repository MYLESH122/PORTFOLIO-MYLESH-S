import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { GlowingCard } from '../common/GlowingCard';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  Sparkles, 
  MessageSquare,
  ShieldAlert
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile, submitContactMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    const success = await submitContactMessage(formData);
    setIsSubmitting(false);

    if (success) {
      // Fire confetti celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#a855f7', '#06b6d4', '#ec4899', '#ffffff']
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-space-950 cyber-grid-dense">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Initiate Dialogue"
          title="Connect & Collaborate"
          subtitle="Whether you have an innovative AI research project, an engineering inquiry, or career opportunity, let's build the future together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Perks */}
          <div className="lg:col-span-5 space-y-6">
            
            <GlowingCard glowColor="purple" className="p-8">
              <h3 className="text-xl font-bold font-display text-white mb-2">
                Direct Communication
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Prefer direct correspondence? Feel free to send an email anytime.
              </p>

              {/* Email Box */}
              <div className="p-4 rounded-xl bg-space-950 border border-purple-500/30 mb-6">
                <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-1">
                  Primary Email Address
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm sm:text-base text-white font-medium break-all">
                    {profile.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-space-850 hover:bg-space-800 text-slate-300 hover:text-white border border-white/10 shrink-0 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all text-center"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email</span>
                </a>
              </div>

              {/* Status details */}
              <div className="pt-6 border-t border-white/5 mt-6 space-y-3 text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Response time: Under 24 hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span className="text-emerald-300 font-medium">Currently Available for AI & Data Science Roles</span>
                </div>
              </div>
            </GlowingCard>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <GlowingCard glowColor="cyan" className="p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Send an Instant Message
                  </h3>
                  <p className="text-xs text-slate-400">
                    Transmits directly to Mylesh S
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="AI Collaboration / Project Query / Opportunities"
                    className="w-full px-4 py-3 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Mylesh, I reviewed your work on Waste2Watt AI and MediBand AI and would love to connect..."
                    className="w-full px-4 py-3 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:shadow-neon-combo transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Transmit Message'}</span>
                </button>
              </form>
            </GlowingCard>
          </div>

        </div>

      </div>
    </section>
  );
};

