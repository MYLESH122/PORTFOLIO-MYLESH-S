import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeader } from '../common/SectionHeader';
import { CertificateViewerModal } from './CertificateViewerModal';
import { processFileUpload } from '../../lib/storage';
import { 
  FileText, 
  ExternalLink, 
  Upload, 
  CheckCircle2, 
  Eye, 
  FileUp, 
  Clock 
} from 'lucide-react';
import { CertificateItem } from '../../types/portfolio';

export const CertificatesSection: React.FC = () => {
  const { 
    certificates, 
    selectedCertificate, 
    setSelectedCertificate,
    updateCertificate,
    showToast 
  } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const categories = [
    'all',
    'AI & Machine Learning',
    'Cybersecurity & Digital Skills',
    'Programming & Development',
    'Achievements & Participation'
  ];

  const filteredCerts = activeCategory === 'all'
    ? certificates
    : certificates.filter(c => c.category === activeCategory);

  // Handle individual PDF upload for a specific certificate
  const handlePdfUpload = async (certId: string, certTitle: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please select a valid PDF file.', 'error');
      return;
    }

    setUploadingId(certId);
    try {
      const { url, isCloud } = await processFileUpload(file, 'certificates');
      updateCertificate(certId, {
        fileUrl: url,
        fileType: 'pdf'
      });
      showToast(
        isCloud
          ? `PDF uploaded to Supabase for "${certTitle}"!`
          : `PDF saved for "${certTitle}"!`,
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('Failed to upload PDF.', 'error');
    } finally {
      setUploadingId(null);
      // reset file input
      if (fileInputRefs.current[certId]) {
        fileInputRefs.current[certId]!.value = '';
      }
    }
  };

  const handleCardClick = (cert: CertificateItem) => {
    if (cert.fileUrl) {
      setSelectedCertificate(cert);
    } else {
      // Trigger upload file picker for this certificate
      fileInputRefs.current[cert.id]?.click();
    }
  };

  return (
    <section id="certificates" className="py-24 relative bg-space-950 cyber-grid-dense">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Certifications"
          title="Certificates & Accreditations"
          subtitle="Official verified certificates and participation records in Artificial Intelligence, Cybersecurity, and Software Engineering."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const count = cat === 'all' 
              ? certificates.length 
              : certificates.filter(c => c.category === cat).length;
            
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-600/20'
                    : 'bg-space-900/80 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <span>{cat === 'all' ? 'All Certificates' : cat}</span>
                <span className="ml-1.5 opacity-70 text-[10px] font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Clean, Minimal Certificate List */}
        <div className="space-y-3">
          {filteredCerts.map((cert) => {
            const hasPdf = Boolean(cert.fileUrl && cert.fileUrl.trim().length > 0);
            const isUploading = uploadingId === cert.id;

            return (
              <div
                key={cert.id}
                className="group p-4 sm:p-5 rounded-2xl bg-space-900/70 border border-white/10 hover:border-purple-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* 1. Certificate Name */}
                <div 
                  onClick={() => handleCardClick(cert)}
                  className="flex items-center gap-3.5 min-w-0 cursor-pointer flex-1"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    hasPdf 
                      ? 'bg-purple-950/70 border border-purple-500/30 text-cyan-400 group-hover:border-cyan-400/50' 
                      : 'bg-space-850 border border-white/10 text-slate-500'
                  }`}>
                    <FileText className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {cert.title}
                    </h3>
                  </div>
                </div>

                {/* 2. Certificate PDF (View / Open) + Individual PDF Upload Option */}
                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                  
                  {/* Hidden File Input for this specific certificate */}
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={(el) => (fileInputRefs.current[cert.id] = el)}
                    onChange={(e) => handlePdfUpload(cert.id, cert.title, e)}
                    disabled={isUploading}
                    className="hidden"
                  />

                  {hasPdf ? (
                    <>
                      {/* View / Open PDF Button */}
                      <button
                        onClick={() => setSelectedCertificate(cert)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all hover:scale-105"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View PDF</span>
                      </button>

                      {/* Replace PDF Option */}
                      <button
                        onClick={() => fileInputRefs.current[cert.id]?.click()}
                        disabled={isUploading}
                        title="Upload a new replacement PDF"
                        className="p-2 rounded-xl bg-space-850 hover:bg-space-800 text-slate-400 hover:text-white border border-white/10 text-xs transition-colors"
                      >
                        <FileUp className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    /* Upload PDF Option */
                    <button
                      onClick={() => fileInputRefs.current[cert.id]?.click()}
                      disabled={isUploading}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-space-850 hover:bg-space-800 text-slate-300 hover:text-white border border-white/10 hover:border-purple-500/40 text-xs font-medium transition-all"
                    >
                      <Upload className={`w-3.5 h-3.5 text-cyan-400 ${isUploading ? 'animate-bounce' : ''}`} />
                      <span>{isUploading ? 'Uploading...' : 'Upload PDF'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Clean PDF Viewer Modal */}
      <CertificateViewerModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
};
