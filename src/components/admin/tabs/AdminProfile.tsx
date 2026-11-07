import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { processFileUpload } from '../../../lib/storage';
import { LinkedinIcon, InstagramIcon } from '../../common/Icons';
import { 
  Camera, 
  FileUp, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Globe,
  User,
  GraduationCap
} from 'lucide-react';

export const AdminProfile: React.FC = () => {
  const { profile, updateProfile, showToast } = usePortfolio();

  const [formData, setFormData] = useState({ ...profile });
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  // Handle Photo Upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).', 'error');
      return;
    }

    setIsUploadingPhoto(true);
    try {
      const { url, isCloud } = await processFileUpload(file, 'profiles');
      setFormData(prev => ({ ...prev, photoUrl: url }));
      updateProfile({ photoUrl: url });
      showToast(
        isCloud 
          ? 'Profile photo uploaded to Supabase Storage!' 
          : 'Profile photo updated locally in browser storage!', 
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('Failed to process photo upload.', 'error');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Handle Resume Upload
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingResume(true);
    try {
      const { url, isCloud } = await processFileUpload(file, 'resumes');
      setFormData(prev => ({ 
        ...prev, 
        resumeUrl: url,
        resumeFileName: file.name
      }));
      updateProfile({ 
        resumeUrl: url,
        resumeFileName: file.name 
      });
      showToast(
        isCloud 
          ? `Resume "${file.name}" uploaded to Supabase!` 
          : `Resume "${file.name}" saved locally!`, 
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('Failed to upload resume document.', 'error');
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      
      {/* File Upload Section: Photo & Resume */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Profile Photo Uploader */}
        <div className="p-6 rounded-2xl bg-space-850/70 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Profile Photo</span>
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">PNG, JPG, WebP</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-space-950 border-2 border-purple-500/40 shadow-lg shrink-0">
              <img
                src={formData.photoUrl}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/profile.jpg';
                }}
              />
            </div>
            
            <div className="space-y-2 flex-1">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-semibold transition-colors">
                <Camera className="w-3.5 h-3.5" />
                <span>{isUploadingPhoto ? 'Processing...' : 'Upload New Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={isUploadingPhoto}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-400">
                Current: <span className="text-slate-300 font-mono truncate max-w-[200px] inline-block">{formData.photoUrl.substring(0, 30)}...</span>
              </p>
            </div>
          </div>
        </div>

        {/* Resume Uploader */}
        <div className="p-6 rounded-2xl bg-space-850/70 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
              <FileUp className="w-4 h-4 text-purple-400" />
              <span>Resume Document</span>
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">PDF, DOCX</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-space-950 border border-white/10 flex items-center justify-between">
              <div className="truncate mr-2">
                <div className="text-xs font-medium text-white truncate">
                  {formData.resumeFileName || 'Mylesh_S_Resume.pdf'}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Available for public download</div>
              </div>
              <a
                href={formData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-space-800 hover:bg-space-700 text-cyan-400 shrink-0 text-xs"
                title="Preview Current Resume"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div>
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-semibold transition-colors">
                <FileUp className="w-3.5 h-3.5" />
                <span>{isUploadingResume ? 'Uploading...' : 'Replace Resume File'}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  disabled={isUploadingResume}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

      </div>

      {/* Personal Identity Details */}
      <div className="p-6 rounded-2xl bg-space-850/60 border border-white/5 space-y-4">
        <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Personal Information & Bio</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Contact Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
            Headline / Tagline
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
            Hero Subtitle
          </label>
          <input
            type="text"
            value={formData.subTitle}
            onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
            Biography & Vision Statement
          </label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Education & Academic Details */}
      <div className="p-6 rounded-2xl bg-space-850/60 border border-white/5 space-y-4">
        <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-purple-400" />
          <span>Academic Background</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Degree & Major
            </label>
            <input
              type="text"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              University / College
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Academic Years
            </label>
            <input
              type="text"
              value={formData.degreeYear}
              onChange={(e) => setFormData({ ...formData, degreeYear: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Social Links Matrix */}
      <div className="p-6 rounded-2xl bg-space-850/60 border border-white/5 space-y-4">
        <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>Social & Network Profiles</span>
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              LinkedIn URL
            </label>
            <div className="flex items-center gap-2">
              <LinkedinIcon className="w-4 h-4 text-blue-400 shrink-0" />
              <input
                type="url"
                value={formData.socials.linkedin}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, linkedin: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Instagram URL
            </label>
            <div className="flex items-center gap-2">
              <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0" />
              <input
                type="url"
                value={formData.socials.instagram}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, instagram: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
              Unstop URL
            </label>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
              <input
                type="url"
                value={formData.socials.unstop}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, unstop: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-space-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </div>

    </form>
  );
};
