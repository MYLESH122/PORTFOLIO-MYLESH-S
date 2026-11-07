import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Modal } from './Modal';
import { QrCode, Download, Copy, Check, ExternalLink, Globe } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUrl?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  defaultUrl = ''
}) => {
  const [url, setUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return defaultUrl || 'https://mylesh-portfolio.vercel.app';
  });
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url || 'https://mylesh-portfolio.vercel.app',
        {
          width: 260,
          margin: 2,
          color: {
            dark: '#030014',
            light: '#ffffff'
          }
        },
        (err) => {
          if (err) console.error('Error generating QR code:', err);
        }
      );
    }
  }, [isOpen, url]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `mylesh-portfolio-qr.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Portfolio Public QR Code" maxWidth="md">
      <div className="flex flex-col items-center text-center">
        <p className="text-sm text-slate-300 mb-6">
          Scan with any mobile camera to immediately view Mylesh's portfolio, explore projects, and review credentials.
        </p>

        {/* QR Code Container with luxury border */}
        <div className="p-4 rounded-2xl bg-white shadow-2xl shadow-cyan-500/20 border-2 border-cyber-cyan/40 mb-6">
          <canvas ref={canvasRef} className="rounded-lg" />
        </div>

        {/* Target URL Input */}
        <div className="w-full mb-6">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider text-left mb-2">
            Portfolio URL / Target Link
          </label>
          <div className="relative flex items-center">
            <Globe className="absolute left-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-domain.vercel.app"
              className="w-full pl-9 pr-24 py-2.5 rounded-xl bg-space-800 border border-white/10 text-white text-sm focus:border-cyber-cyan focus:outline-none transition-colors"
            />
            <button
              onClick={handleCopy}
              className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-cyber-purple/20 text-cyber-violet hover:bg-cyber-purple/40 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium text-sm transition-all shadow-lg shadow-purple-600/30"
          >
            <Download className="w-4 h-4" />
            Download PNG
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-medium text-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Visit
          </a>
        </div>
      </div>
    </Modal>
  );
};

