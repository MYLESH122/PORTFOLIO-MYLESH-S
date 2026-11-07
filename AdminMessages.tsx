import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Mail, Trash2, Calendar, User, MessageSquare, Send, Clock, Inbox } from 'lucide-react';

export const AdminMessages: React.FC = () => {
  const { messages, deleteContactMessage, showToast } = usePortfolio();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
            <Inbox className="w-4 h-4 text-cyan-400" />
            <span>Real-time Inbound Inquiries</span>
          </h3>
          <p className="text-xs text-slate-400">
            Messages transmitted directly from visitors, recruiters, and collaborators via the contact form.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
          {messages.length} {messages.length === 1 ? 'Message' : 'Messages'}
        </span>
      </div>

      {/* Messages List */}
      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-5 rounded-2xl bg-space-850/80 border border-white/10 hover:border-cyan-500/30 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-space-950 flex items-center justify-center text-cyan-400 border border-white/5">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{msg.name}</h4>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                      className="text-xs font-mono text-cyan-400 hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{msg.timestamp}</span>
                  </span>

                  <button
                    onClick={() => deleteContactMessage(msg.id)}
                    className="p-1.5 rounded-lg bg-space-900 hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-white/5 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div className="text-xs font-semibold text-purple-300 font-mono">
                  Subject: {msg.subject}
                </div>
              )}

              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap bg-space-950/60 p-3.5 rounded-xl border border-white/5">
                {msg.message}
              </p>

              <div className="pt-1 flex justify-end">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-colors"
                >
                  <Send className="w-3 h-3" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-space-900/40 border border-white/5 max-w-md mx-auto space-y-2">
          <Mail className="w-10 h-10 text-slate-500 mx-auto mb-2" />
          <h4 className="text-white font-medium text-sm">Inbox is Clear</h4>
          <p className="text-xs text-slate-400">
            When recruiters or collaborators submit the contact form, their inquiries will appear here in real time.
          </p>
        </div>
      )}

    </div>
  );
};

