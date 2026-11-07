-- =========================================================================
-- MYLESH S - PREMIUM PORTFOLIO DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- =========================================================================
-- Run this script inside the Supabase SQL Editor (https://app.supabase.com)
-- It creates all required tables, secure RLS policies, and storage settings.

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Stores Mylesh's personal info, bio, contact, resume)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL DEFAULT 'Mylesh S',
    tagline TEXT,
    sub_title TEXT,
    bio TEXT,
    education TEXT,
    institution TEXT,
    degree_year TEXT,
    email TEXT,
    location TEXT,
    photo_url TEXT,
    resume_url TEXT,
    resume_file_name TEXT,
    available_for_roles BOOLEAN DEFAULT true,
    socials JSONB DEFAULT '{"linkedin": "", "instagram": "", "unstop": "", "github": ""}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('ai_ml', 'languages', 'data_science', 'web')),
    proficiency INTEGER NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
    is_featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT,
    description TEXT,
    category TEXT,
    technologies TEXT[] DEFAULT '{}',
    banner_url TEXT,
    github_url TEXT,
    demo_url TEXT,
    metrics JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT true,
    date_created DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    credential_id TEXT,
    credential_url TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('image', 'pdf')),
    category TEXT,
    skills_covered TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('hackathon', 'award', 'competition', 'academic')),
    organizer TEXT NOT NULL,
    date TEXT NOT NULL,
    rank_or_award TEXT NOT NULL,
    description TEXT,
    proof_url TEXT,
    badge_color TEXT DEFAULT 'purple',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. MOTIVATIONAL QUOTES TABLE
CREATE TABLE IF NOT EXISTS public.quotes (
    id TEXT PRIMARY KEY,
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    context TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_read BOOLEAN DEFAULT false
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS: Anyone can view portfolio content
CREATE POLICY "Public profiles can be viewed by anyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public skills can be viewed by anyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public projects can be viewed by anyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public certificates can be viewed by anyone" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public achievements can be viewed by anyone" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public quotes can be viewed by anyone" ON public.quotes FOR SELECT USING (true);

-- CONTACT FORM INSERT: Anyone can submit a contact message
CREATE POLICY "Anyone can submit a contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS: Only authenticated users can mutate portfolio records
CREATE POLICY "Authenticated users can modify profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify certificates" ON public.certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify achievements" ON public.achievements FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can modify quotes" ON public.quotes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read messages" ON public.contact_messages FOR SELECT USING (auth.role() = 'authenticated');

-- =========================================================================
-- STORAGE BUCKET FOR UPLOADS (CERTIFICATES, RESUME, PROFILE PHOTOS)
-- =========================================================================
-- To set up storage:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create a new public bucket named: portfolio-assets
-- 3. In Policies, allow public SELECT, and authenticated INSERT/UPDATE/DELETE.

