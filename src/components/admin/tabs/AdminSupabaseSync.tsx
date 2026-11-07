import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import {
  Cloud,
  CheckCircle2,
  AlertTriangle,
  Key,
  Database,
  Copy,
  Check,
  RefreshCw,
  Lock,
  ShieldCheck,
  FileCode,
  HardDrive
} from 'lucide-react';

export const AdminSupabaseSync: React.FC = () => {
  const {
    supabaseConfig,
    saveSupabaseConfig,
    resetAllData,
    showToast
  } = usePortfolio();

  const [url, setUrl] = useState(supabaseConfig.supabaseUrl || '');
  const [anonKey, setAnonKey] = useState(supabaseConfig.supabaseAnonKey || '');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);

  // Admin Password Management State
  const [newAdminPwd, setNewAdminPwd] = useState('');
  const [confirmAdminPwd, setConfirmAdminPwd] = useState('');

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !anonKey) {
      showToast('Please provide both Supabase URL and Anon Key.', 'error');
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    const result = await saveSupabaseConfig(url, anonKey);
    setIsTesting(false);
    setTestResult(result);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdminPwd.length < 6) {
      showToast('Password should be at least 6 characters.', 'error');
      return;
    }
    if (newAdminPwd !== confirmAdminPwd) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    localStorage.setItem('mylesh_admin_custom_pwd', newAdminPwd);
    showToast('Admin password updated successfully!', 'success');
    setNewAdminPwd('');
    setConfirmAdminPwd('');
  };

  return (
    <div className="space-y-8">

      {/* Backend Status Card */}
      <div className={`p-6 rounded-2xl border ${supabaseConfig.isConnected
        ? 'bg-emerald-950/30 border-emerald-500/40'
        : 'bg-space-850/80 border-white/10'
        }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${supabaseConfig.isConnected
              ? 'bg-emerald-900/60 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-950/50'
              : 'bg-space-950 text-slate-400 border border-white/10'
              }`}>
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold font-display text-white">
                  Supabase Cloud Status:
                </h4>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${supabaseConfig.isConnected
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                  }`}>
                  {supabaseConfig.isConnected ? 'CONNECTED' : 'LOCAL MODE ONLY'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {supabaseConfig.isConnected
                  ? 'All changes and uploaded files sync automatically to Supabase storage & database.'
                  : 'Currently storing data and file uploads in browser local memory. Configure below for cross-device cloud persistence.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Supabase Credentials Form */}
      <div className="p-6 rounded-2xl bg-space-850/60 border border-white/5 space-y-5">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-bold font-display text-white">
            Connect Supabase Project
          </h4>
        </div>

        <form onSubmit={handleTestAndSave} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Project URL (VITE_SUPABASE_URL)
            </label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Public Anon API Key (VITE_SUPABASE_ANON_KEY)
            </label>
            <input
              type="text"
              required
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Security Note */}
          <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-300 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero-Secret Security Architecture</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Never enter your Supabase <code className="bg-space-950 px-1 py-0.5 rounded text-amber-300">service_role</code> secret key here. Only provide the public <code className="bg-space-950 px-1 py-0.5 rounded text-cyan-300">anon</code> key. Row Level Security (RLS) protects your data from unauthorized mutation.
            </p>
          </div>

          {testResult && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${testResult.success
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/60 border border-red-500/40 text-red-300'
              }`}>
              {testResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isTesting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md disabled:opacity-50 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Verifying Connection...' : 'Test & Save Supabase Connection'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* SQL Setup Script Helper */}
      <div className="p-6 rounded-2xl bg-space-850/60 border border-white/5 space-y-4">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-purple-400" />
          <h4 className="text-sm font-bold font-display text-white">
            Supabase SQL Setup Instructions
          </h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The full SQL migration script with Row Level Security (RLS) policies and storage configurations is stored at: <br />
          <code className="text-cyan-300 font-mono text-[11px] bg-space-950 px-2 py-1 rounded inline-block mt-1">
            supabase/schema.sql
          </code>
        </p>
        <ol className="list-decimal list-inside text-xs text-slate-400 space-y-1 pl-1">
          <li>Create a free project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">supabase.com</a>.</li>
          <li>Open the <strong>SQL Editor</strong> tab in the Supabase Dashboard.</li>
          <li>Paste the contents of <code className="text-purple-300">supabase/schema.sql</code> and click <strong>Run</strong>.</li>
          <li>Under <strong>Storage</strong>, create a new bucket named <code className="text-cyan-300">portfolio-assets</code> and toggle "Public".</li>
        </ol>
      </div>

      {/* Change Admin Password */}
      <div className="p-6 rounded-2xl bg-space-850/60 border border-white/5 space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-bold font-display text-white">
            Change Admin Password
          </h4>
        </div>

        <form onSubmit={handleUpdatePassword} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              value={newAdminPwd}
              onChange={(e) => setNewAdminPwd(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmAdminPwd}
              onChange={(e) => setConfirmAdminPwd(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-space-900 hover:bg-space-800 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Factory Reset */}
      <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-red-400">Reset All Data to Defaults</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Restores all projects, certificates, quotes, and profile information back to default starter state.
          </p>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Reset all portfolio data back to defaults?')) {
              resetAllData();
            }
          }}
          className="px-4 py-2 rounded-xl bg-red-950 hover:bg-red-900 border border-red-500/40 text-red-300 hover:text-white text-xs font-semibold transition-colors shrink-0"
        >
          Reset to Factory Default
        </button>
      </div>

    </div>
  );
};

