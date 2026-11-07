import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { QuoteItem } from '../../../types/portfolio';
import { Plus, Trash2, Quote, CheckCircle2, XCircle } from 'lucide-react';

export const AdminQuotes: React.FC = () => {
  const { quotes, addQuote, updateQuote, deleteQuote, showToast } = usePortfolio();

  const [newQuote, setNewQuote] = useState<Omit<QuoteItem, 'id'>>({
    quote: '',
    author: 'Mylesh S',
    context: 'Tech Philosophy',
    active: true
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote.quote.trim()) {
      showToast('Quote text is required.', 'error');
      return;
    }
    addQuote(newQuote);
    setNewQuote({
      quote: '',
      author: 'Mylesh S',
      context: 'AI & Engineering',
      active: true
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Add Form */}
      <form onSubmit={handleAdd} className="p-5 rounded-2xl bg-space-850/80 border border-purple-500/30 space-y-3">
        <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
          <Quote className="w-4 h-4 text-purple-400" />
          <span>Add New Motivational Quote</span>
        </h4>

        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
            Quote Text *
          </label>
          <textarea
            required
            rows={3}
            value={newQuote.quote}
            onChange={(e) => setNewQuote({ ...newQuote, quote: e.target.value })}
            placeholder="Type your inspiring engineering philosophy or thought..."
            className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Author
            </label>
            <input
              type="text"
              value={newQuote.author}
              onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Context / Theme
            </label>
            <input
              type="text"
              value={newQuote.context}
              onChange={(e) => setNewQuote({ ...newQuote, context: e.target.value })}
              placeholder="e.g. Applied Innovation"
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md"
          >
            Add Quote
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        {quotes.map((q) => (
          <div
            key={q.id}
            className="p-4 rounded-xl bg-space-850/70 border border-white/5 flex items-start justify-between gap-4"
          >
            <div className="space-y-1 flex-1">
              <p className="text-sm text-slate-200 italic">"{q.quote}"</p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="font-semibold text-cyan-400">— {q.author}</span>
                {q.context && <span>• {q.context}</span>}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => updateQuote(q.id, { active: !q.active })}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono border transition-colors ${
                  q.active
                    ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300'
                    : 'bg-space-900 border-white/10 text-slate-500'
                }`}
              >
                {q.active ? 'Active' : 'Hidden'}
              </button>

              <button
                onClick={() => deleteQuote(q.id)}
                className="p-1.5 rounded-lg bg-space-900 hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-white/5"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

