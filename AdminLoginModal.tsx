import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Modal } from '../common/Modal';
import { 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    loginAdmin 
  } = usePortfolio();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
    } else {
      setPassword('');
      setError(false);
    }
  };

  return (
    <Modal
      isOpen={isAdminModalOpen}
      onClose={() => setIsAdminModalOpen(false)}
      title="Admin Portal Authentication"
      maxWidth="md"
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-500/40 mx-auto mb-4 flex items-center justify-center text-purple-400 shadow-neon-purple">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            Owner Access Terminal
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Enter your admin password to manage your projects, upload certificates, resume, and modify profile details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Admin Password
            </label>
            <div className="relative flex items-center">
              <KeyRound className="absolute left-3 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password..."
                className={`w-full pl-9 pr-10 py-3 rounded-xl bg-space-950 border text-white text-sm focus:outline-none transition-colors ${
                  error ? 'border-red-500/70 focus:border-red-500' : 'border-white/10 focus:border-purple-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect credentials. Default demo password is: <strong>admin123</strong></span>
              </p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span>Initial demo passkey: </span>
              <code className="px-1.5 py-0.5 rounded bg-space-900 border border-purple-500/30 text-cyan-300 font-mono font-bold">
                admin123
              </code>
              <span className="block text-[10px] text-slate-400 mt-0.5">
                (You can update this password anytime in the dashboard settings)
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Authenticate Session</span>
          </button>
        </form>
      </div>
    </Modal>
  );
};

