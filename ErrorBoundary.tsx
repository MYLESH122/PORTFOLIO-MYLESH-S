import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ShieldAlert, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Critical UI Error Caught by Guardian ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetCache = () => {
    try {
      localStorage.removeItem('mylesh_portfolio_profile');
      localStorage.removeItem('mylesh_portfolio_skills');
      localStorage.removeItem('mylesh_portfolio_projects');
      localStorage.removeItem('mylesh_portfolio_certificates');
      localStorage.removeItem('mylesh_portfolio_achievements');
      localStorage.removeItem('mylesh_portfolio_quotes');
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-space-950 text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full p-8 rounded-3xl bg-space-900 border border-purple-500/40 shadow-2xl shadow-purple-950/80 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-500/40 mx-auto flex items-center justify-center text-purple-400">
              <ShieldAlert className="w-8 h-8 text-cyan-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display text-white">
                Self-Healing Recovery Activated
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                A non-fatal rendering glitch was intercepted and contained. No data was lost.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-space-950 border border-white/10 text-left">
                <p className="text-[11px] font-mono text-red-400 truncate">
                  {this.state.error.message || 'Unknown runtime condition'}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleResetCache}
                className="py-3 px-4 rounded-xl bg-space-850 hover:bg-space-800 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-colors"
              >
                Reset Cache
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

