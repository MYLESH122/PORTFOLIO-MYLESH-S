# Mylesh S — Premium Futuristic AI Portfolio & Admin Dashboard

A futuristic, luxury portfolio website engineered for **Mylesh S**, B.Tech Artificial Intelligence & Data Science Specialist. Features an obsidian black aesthetic with neon purple and cyan highlights, glassmorphism, responsive navigation, and an interactive **Owner Admin Dashboard**.

---

## 🌟 Key Highlights & Sections

1. **Home / Hero**: Dynamic rotating AI specialization tagline, holographic suit portrait, resume download, quick impact metrics, and role status indicator.
2. **About Me**: Academic background in Artificial Intelligence & Data Science, core engineering pillars, and evolutionary learning timeline.
3. **Core Skills**: Filterable competencies across AI & ML, Data Science, Programming Languages (Python, C, JavaScript, SQL), and Modern Web Frameworks (React, Tailwind CSS).
4. **Flagship Projects**:
   - **Waste2Watt AI**: Predictive biomass-to-energy optimization and gasification matrix.
   - **MediBand AI**: Real-time arrhythmia detection, edge ML processing, and automated emergency telemetry.
5. **Certificates & Accreditations**: Preview certificates with dedicated modal support for high-res images and embedded PDF documents, plus direct download and verification links.
6. **Achievements**: Milestones across Hackathons (Smart India Hackathon Finalist), Competitions (Unstop Top 5%), and collegiate Innovation Expos.
7. **Motivation**: Curated tech and philosophy quotes carousel with next/previous controls and admin management.
8. **Digital Presence**: Interactive social cards for LinkedIn, Instagram (`@mylesh_billa`), and Unstop (`@myless15148`).
9. **Contact & Message Dispatch**: Instant message form with real-time feedback, confetti celebration, direct email copy (`senthilkumarmylesh285@gmail.com`), and location details.
10. **Interactive QR Code Generator**: Generate and download a high-res QR code PNG linking directly to your live portfolio URL.

---

## 🔐 Admin Dashboard

The portfolio comes equipped with a protected Owner Admin Dashboard:
- **Access**: Click the lock icon in the top navbar or footer.
- **Initial Demo Password**: `admin123` *(Can be updated anytime in the Cloud Sync & Settings tab)*.
- **Features**:
  - 📷 **Profile Photo Upload**: Change or update your portrait.
  - 📄 **Resume Replacement**: Upload and replace your resume PDF file.
  - 🚀 **Projects Manager**: Add, edit, or delete projects with banner images, tech tags, and performance metrics.
  - 📜 **Certificates Manager**: Upload images or PDF certificates, specify issuer, date, and verified credential links.
  - ⚡ **Skills Matrix**: Add skills and adjust proficiency percentages with interactive sliders.
  - 🏆 **Achievements Manager**: Add hackathon rankings, honors, and competition records.
  - 💬 **Motivational Quotes**: Add, edit, toggle visibility, and delete quotes.
  - ☁️ **Cloud Sync & Supabase Setup**: Test connection, input Supabase credentials, and review SQL policies.

---

## ☁️ Supabase Setup (Optional for Cross-Device Persistence)

The application works 100% out-of-the-box in local mode using reactive browser storage. To enable permanent cross-device cloud persistence:

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in Supabase and run the script located at `supabase/schema.sql`.
3. In **Storage**, create a public bucket named `portfolio-assets`.
4. Copy your **Project URL** and **Anon Public Key** from *Project Settings > API*.
5. Paste them into the **Admin Dashboard > Cloud Sync** tab or add them to your `.env` / Vercel Environment Variables:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deploying to Vercel

### Method 1: Deploy with Git & Vercel Dashboard (Recommended)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Premium Portfolio for Mylesh S"
   ```
2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/your-username/mylesh-portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com) and import the repository.
4. Add environment variables if using Supabase (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).
5. Click **Deploy**. Vercel will build and assign you a live `.vercel.app` URL.

### Method 2: Deploy using Vercel CLI
```bash
npm install -g vercel
vercel
```

