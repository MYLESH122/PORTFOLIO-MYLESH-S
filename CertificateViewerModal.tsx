import React from 'react';
import { CertificateItem } from '../../types/portfolio';
import { Modal } from '../common/Modal';
import { Download, ExternalLink, FileText } from 'lucide-react';

interface CertificateViewerModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  certificate,
  onClose
}) => {
  if (!certificate) return null;

  const handleDownload = () => {
    if (!certificate.fileUrl) return;
    const link = document.createElement('a');
    link.href = certificate.fileUrl;
    link.download = `${certificate.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
    link.target = '_blank';
    link.click();
  };

  const handleOpenNewTab = () => {
    if (!certificate.fileUrl) return;
    window.open(certificate.fileUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal isOpen={!!certificate} onClose={onClose} title={certificate.title} maxWidth="4xl">
      <div className="space-y-5">
        {/* PDF Viewer Frame */}
        {certificate.fileUrl ? (
          <div className="relative rounded-2xl overflow-hidden bg-space-950 border border-white/10 h-[65vh] w-full flex flex-col">
            <iframe
              src={`${certificate.fileUrl}#toolbar=1`}
              className="w-full h-full rounded-2xl border-0"
              title={certificate.title}
            />
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-space-950 border border-white/10 space-y-3">
            <FileText className="w-12 h-12 text-slate-500 mx-auto" />
            <h4 className="text-white font-medium">No PDF Uploaded Yet</h4>
            <p className="text-xs text-slate-400">
              Please upload the official PDF document for this certificate.
            </p>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="text-xs font-mono text-slate-400">
            {certificate.title}
          </div>

          <div className="flex items-center gap-3">
            {certificate.fileUrl && (
              <>
                <button
                  onClick={handleOpenNewTab}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-space-850 hover:bg-space-800 text-cyan-300 border border-white/10 text-xs font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in New Tab</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
