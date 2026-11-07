import { 
  ProfileInfo, 
  ProjectItem, 
  CertificateItem, 
  SkillItem, 
  AchievementItem, 
  QuoteItem 
} from '../types/portfolio';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables or dynamically configured in Admin
const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const envAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const getSupabaseCredentials = () => {
  const localSaved = localStorage.getItem('mylesh_portfolio_supabase_config');
  if (localSaved) {
    try {
      const parsed = JSON.parse(localSaved);
      if (parsed.url && parsed.anonKey) {
        return { url: parsed.url, anonKey: parsed.anonKey };
      }
    } catch (e) {
      console.error('Failed to parse saved Supabase config', e);
    }
  }

  return {
    url: envUrl,
    anonKey: envAnonKey,
  };
};

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  const { url, anonKey } = getSupabaseCredentials();
  if (!url || !anonKey || url === 'YOUR_SUPABASE_URL' || anonKey === 'YOUR_SUPABASE_ANON_KEY') {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        }
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseInstance;
};

export const resetSupabaseClient = () => {
  supabaseInstance = null;
};

export const testSupabaseConnection = async (url: string, anonKey: string): Promise<{ success: boolean; message: string }> => {
  try {
    const testClient = createClient(url, anonKey);
    const { error } = await testClient.from('profiles').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      if (error.message.includes('relation "public.profiles" does not exist')) {
        return {
          success: true,
          message: 'Connected to Supabase! (Note: Run supabase/schema.sql in Supabase SQL Editor).'
        };
      }
      return { success: false, message: `Connection error: ${error.message}` };
    }
    return { success: true, message: 'Successfully connected to Supabase database!' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Failed to reach Supabase endpoint.' };
  }
};

// -------------------------------------------------------------
// Real-time Cloud Fetch Functions
// -------------------------------------------------------------

export const fetchCloudProfile = async (): Promise<ProfileInfo | null> => {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('profiles').select('*').limit(1).single();
    if (error || !data) return null;
    return {
      name: data.name,
      tagline: data.tagline || '',
      subTitle: data.sub_title || '',
      bio: data.bio || '',
      education: data.education || '',
      institution: data.institution || '',
      degreeYear: data.degree_year || '',
      email: data.email || '',
      location: data.location || '',
      photoUrl: data.photo_url || '/profile.jpg',
      resumeUrl: data.resume_url || '/resume.pdf',
      resumeFileName: data.resume_file_name || 'Mylesh_S_Resume.pdf',
      availableForRoles: data.available_for_roles ?? true,
      socials: data.socials || { linkedin: '', instagram: '', unstop: '', github: '' }
    };
  } catch {
    return null;
  }
};

export const fetchCloudProjects = async (): Promise<ProjectItem[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('projects').select('*').order('date_created', { ascending: false });
    if (error || !data || data.length === 0) return null;
    return data.map((d: any) => ({
      id: d.id,
      title: d.title,
      slug: d.slug,
      summary: d.summary || '',
      description: d.description || '',
      category: d.category || 'AI & Data Science',
      technologies: d.technologies || [],
      bannerUrl: d.banner_url || '',
      githubUrl: d.github_url || '',
      demoUrl: d.demo_url || '',
      metrics: d.metrics || [],
      featured: d.featured ?? true,
      dateCreated: d.date_created || ''
    }));
  } catch {
    return null;
  }
};

export const fetchCloudCertificates = async (): Promise<CertificateItem[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('certificates').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return null;
    return data.map((d: any) => ({
      id: d.id,
      title: d.title,
      issuer: d.issuer,
      issueDate: d.issue_date || '',
      expiryDate: d.expiry_date || '',
      credentialId: d.credential_id || '',
      credentialUrl: d.credential_url || '',
      fileUrl: d.file_url,
      fileType: d.file_type || 'image',
      category: d.category || 'General',
      skillsCovered: d.skills_covered || []
    }));
  } catch {
    return null;
  }
};

export const fetchCloudSkills = async (): Promise<SkillItem[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('skills').select('*').order('proficiency', { ascending: false });
    if (error || !data || data.length === 0) return null;
    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      category: d.category,
      proficiency: d.proficiency,
      isFeatured: d.is_featured ?? true
    }));
  } catch {
    return null;
  }
};

export const fetchCloudAchievements = async (): Promise<AchievementItem[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('achievements').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return null;
    return data.map((d: any) => ({
      id: d.id,
      title: d.title,
      category: d.category,
      organizer: d.organizer,
      date: d.date,
      rankOrAward: d.rank_or_award,
      description: d.description || '',
      proofUrl: d.proof_url || '',
      badgeColor: d.badge_color || 'purple'
    }));
  } catch {
    return null;
  }
};

export const fetchCloudQuotes = async (): Promise<QuoteItem[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('quotes').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return null;
    return data.map((d: any) => ({
      id: d.id,
      quote: d.quote,
      author: d.author,
      context: d.context || '',
      active: d.active ?? true
    }));
  } catch {
    return null;
  }
};

// -------------------------------------------------------------
// Real-time Cloud Mutation Sync Functions
// -------------------------------------------------------------

export const syncProfileToCloud = async (profile: ProfileInfo) => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    const payload = {
      name: profile.name,
      tagline: profile.tagline,
      sub_title: profile.subTitle,
      bio: profile.bio,
      education: profile.education,
      institution: profile.institution,
      degree_year: profile.degreeYear,
      email: profile.email,
      location: profile.location,
      photo_url: profile.photoUrl,
      resume_url: profile.resumeUrl,
      resume_file_name: profile.resumeFileName,
      available_for_roles: profile.availableForRoles,
      socials: profile.socials,
      updated_at: new Date().toISOString()
    };
    await client.from('profiles').upsert([payload]);
  } catch (err) {
    console.warn('Sync profile to cloud skipped:', err);
  }
};

export const syncProjectToCloud = async (project: ProjectItem) => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('projects').upsert([{
      id: project.id,
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      description: project.description,
      category: project.category,
      technologies: project.technologies,
      banner_url: project.bannerUrl,
      github_url: project.githubUrl,
      demo_url: project.demoUrl,
      metrics: project.metrics,
      featured: project.featured,
      date_created: project.dateCreated
    }]);
  } catch (err) {
    console.warn('Sync project to cloud skipped:', err);
  }
};

export const deleteProjectFromCloud = async (id: string) => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('projects').delete().eq('id', id);
  } catch (err) {
    console.warn('Delete project from cloud skipped:', err);
  }
};

export const syncCertificateToCloud = async (cert: CertificateItem) => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('certificates').upsert([{
      id: cert.id,
      title: cert.title,
      issuer: cert.issuer,
      issue_date: cert.issueDate,
      expiry_date: cert.expiryDate,
      credential_id: cert.credentialId,
      credential_url: cert.credentialUrl,
      file_url: cert.fileUrl,
      file_type: cert.fileType,
      category: cert.category,
      skills_covered: cert.skillsCovered
    }]);
  } catch (err) {
    console.warn('Sync certificate to cloud skipped:', err);
  }
};

export const deleteCertificateFromCloud = async (id: string) => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('certificates').delete().eq('id', id);
  } catch (err) {
    console.warn('Delete cert from cloud skipped:', err);
  }
};

export const syncSkillToCloud = async (skill: SkillItem) => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('skills').upsert([{
      id: skill.id,
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      is_featured: skill.isFeatured
    }]);
  } catch (err) {
    console.warn('Sync skill to cloud skipped:', err);
  }
};

export const deleteSkillFromCloud = async (id: string) => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('skills').delete().eq('id', id);
  } catch (err) {
    console.warn('Delete skill from cloud skipped:', err);
  }
};

export const syncAchievementToCloud = async (ach: AchievementItem) => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('achievements').upsert([{
      id: ach.id,
      title: ach.title,
      category: ach.category,
      organizer: ach.organizer,
      date: ach.date,
      rank_or_award: ach.rankOrAward,
      description: ach.description,
      proof_url: ach.proofUrl,
      badge_color: ach.badgeColor
    }]);
  } catch (err) {
    console.warn('Sync achievement to cloud skipped:', err);
  }
};

export const deleteAchievementFromCloud = async (id: string) => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('achievements').delete().eq('id', id);
  } catch (err) {
    console.warn('Delete achievement from cloud skipped:', err);
  }
};

export const syncQuoteToCloud = async (quote: QuoteItem) => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('quotes').upsert([{
      id: quote.id,
      quote: quote.quote,
      author: quote.author,
      context: quote.context,
      active: quote.active
    }]);
  } catch (err) {
    console.warn('Sync quote to cloud skipped:', err);
  }
};

export const deleteQuoteFromCloud = async (id: string) => {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    await client.from('quotes').delete().eq('id', id);
  } catch (err) {
    console.warn('Delete quote from cloud skipped:', err);
  }
};
