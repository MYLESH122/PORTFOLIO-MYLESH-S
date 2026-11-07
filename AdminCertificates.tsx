import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { CertificateItem } from '../../../types/portfolio';
import { processFileUpload } from '../../../lib/storage';
import { 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  Eye, 
  CheckCircle2, 
  XCircle,
  FileUp,
  X
} from 'lucide-react';

export const AdminCertificates: React.FC = () => {
  const { 
    certificates, 
    addCertificate, 
    updateCertificate, 
    deleteCertificate, 
    showToast, 
    setSelectedCertificate 
  } = usePortfolio();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('AI & Machine Learning');
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const categories = [
    'AI & Machine Learning',
    'Cybersecurity & Digital Skills',
    'Programming & Development',
    'Achievements & Participation'
  ];

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
          : `PDF saved locally for "${certTitle}"!`, 
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('PDF upload failed.', 'error');
    } finally {
      setUploadingId(null);
      if (fileInputRefs.current[certId]) {
        fileInputRefs.current[certId]!.value = '';
      }
    }
  };

  const handleAddNewCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Certificate name is required.', 'error');
      return;
    }

    addCertificate({
      title: newTitle.trim(),
      issuer: '',
      issueDate: '',
      fileUrl: '',
      fileType: 'pdf',
      category: newCategory,
      skillsCovered: []
    });

    setNewTitle('');
    setIsAddingNew(false);
    showToast(`Certificate "${newTitle}" created! You can now upload its PDF.`);
  };

  const handleClearPdf = (cert: CertificateItem) => {
    if (window.confirm(`Clear uploaded PDF for "${cert.title}"?`)) {
      updateCertificate(cert.id, { fileUrl: '' });
      showToast(`PDF cleared for "${cert.title}".`, 'info');
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove certificate "${title}"?`)) {
      deleteCertificate(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold font-display text-white">
            Certificate PDF Manager
          </h3>
          <p className="text-xs text-slate-400">
            Upload and link official PDF files directly to each certificate name.
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md transition-all self-start sm:self-center"
        >
          {isAddingNew ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAddingNew ? 'Cancel' : 'Add Another Certificate'}</span>
        </button>
      </div>

      {/* Add New Certificate Form */}
      {isAddingNew && (
        <form onSubmit={handleAddNewCert} className="p-5 rounded-2xl bg-space-850/90 border border-purple-500/40 space-y-4 animate-in slide-in-from-top duration-200">
          <h4 className="text-sm font-bold text-white font-display">
            Add New Certificate Entry
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                Certificate Name *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Advanced Deep Learning Masterclass"
                className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md"
            >
              Create Certificate Entry
            </button>
          </div>
        </form>
      )}

      {/* Grouped Certificates List */}
      <div className="space-y-6">
        {categories.map((category) => {
          const groupCerts = certificates.filter(c => c.category === category);
          if (groupCerts.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-300">
                  {category} ({groupCerts.length})
                </h4>
              </div>

              <div className="space-y-2">
                {groupCerts.map((cert) => {
                  const hasPdf = Boolean(cert.fileUrl && cert.fileUrl.trim().length > 0);
                  const isUploading = uploadingId === cert.id;

                  return (
                    <div
                      key={cert.id}
                      className="p-3.5 sm:p-4 rounded-xl bg-space-850/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-500/30 transition-colors"
                    >
                      {/* Name & Status */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <FileText className={`w-4 h-4 shrink-0 ${hasPdf ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <div className="min-w-0">
                          <h5 className="text-xs sm:text-sm font-semibold text-white truncate">
                            {cert.title}
                          </h5>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {hasPdf ? (
                              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>PDF Uploaded</span>
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-amber-400/80 flex items-center gap-1">
                                <XCircle className="w-3 h-3" />
                                <span>No PDF Uploaded</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* PDF Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          accept="application/pdf"
                          ref={(el) => (fileInputRefs.current[cert.id] = el)}
                          onChange={(e) => handlePdfUpload(cert.id, cert.title, e)}
                          disabled={isUploading}
                          className="hidden"
                        />

                        {/* View PDF Button */}
                        {hasPdf && (
                          <button
                            onClick={() => setSelectedCertificate(cert)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-xs font-medium transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View PDF</span>
                          </button>
                        )}

                        {/* Upload / Replace PDF Button */}
                        <button
                          onClick={() => fileInputRefs.current[cert.id]?.click()}
                          disabled={isUploading}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/70 hover:bg-purple-900 border border-purple-500/30 text-purple-300 text-xs font-medium transition-colors"
                        >
                          <Upload className="w-3 h-3" />
                          <span>{hasPdf ? 'Replace PDF' : 'Upload PDF'}</span>
                        </button>

                        {/* Clear PDF Button */}
                        {hasPdf && (
                          <button
                            onClick={() => handleClearPdf(cert)}
                            title="Clear PDF"
                            className="p-1.5 rounded-lg bg-space-900 hover:bg-space-800 text-slate-400 hover:text-amber-400 border border-white/5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete Certificate Entry */}
                        <button
                          onClick={() => handleDelete(cert.id, cert.title)}
                          title="Delete Certificate Entry"
                          className="p-1.5 rounded-lg bg-space-900 hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-white/5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
