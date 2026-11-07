import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ResumeViewerModal } from './ResumeViewerModal';
import { LinkedinIcon } from '../common/Icons';
import {
  FileText,
  Download,
  Eye,
  Printer,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  ExternalLink,
  CheckCircle,
  Copy,
  Sparkles,
  Award,
  Layers,
  Cpu,
  Shield,
  Code,
  Compass,
  Check
} from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { profile, showToast } = usePortfolio();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPhoto, setShowPhoto] = useState(true);

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(label);
      showToast(`${label} copied to clipboard!`, 'info');
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Structured technical skills with tags
  const technicalSkills = [
    { name: 'Python Programming', level: 'Beginner' },
    { name: 'C Programming', level: 'Beginner' },
    { name: 'Artificial Intelligence', level: 'Core' },
    { name: 'Machine Learning Fundamentals', level: 'Core' },
    { name: 'Data Science Fundamentals', level: 'Core' },
    { name: 'Generative AI', level: 'Specialization' },
    { name: 'Prompt Engineering', level: 'Specialization' },
    { name: 'Front-End Development Fundamentals', level: 'Foundation' }
  ];

  const areasOfInterest = [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Generative AI',
    'Software Development',
    'Technical Innovation'
  ];

  const projects = [
    {
      title: 'Waste2Watt AI',
      status: 'Concept / Project Under Development',
      badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
      bullets: [
        'AI-assisted waste identification and segregation concept.',
        'Waste-to-energy conversion concept.',
        'Air filtration concept.',
        'Monitoring dashboard.'
      ]
    },
    {
      title: 'MediBand AI',
      status: 'Concept / Project Under Development',
      badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
      bullets: [
        'ESP32-based wearable health-monitoring concept.',
        'ECG monitoring.',
        'Heart rate monitoring.',
        'SpO2 monitoring.',
        'Temperature monitoring.'
      ]
    }
  ];

  const certifications = {
    aiMl: [
      { name: 'AI for Business Professionals', issuer: 'HP' },
      { name: 'Strategic Planning in the Age of AI and Data', issuer: 'HP' },
      { name: 'Data Science and Analytics', issuer: 'HP' },
      { name: 'AI for Beginners', issuer: 'HP' },
      { name: 'Autonomous AI Agent & LLM Tool Orchestration', issuer: 'NeuroLearn AI' },
      { name: 'Generative AI & Prompt Engineering Masterclass', issuer: 'NeuroLearn AI' },
      { name: 'AI Shiksha – AI Literacy for Everyone', issuer: 'Govt. / AI Shiksha' },
      { name: 'Fundamentals of Machine Learning and Artificial Intelligence', issuer: 'AWS' },
      { name: 'Unlocking AI for Everyone', issuer: 'Microsoft' }
    ],
    digitalCyber: [
      { name: 'Introduction to Cyber Security Awareness', issuer: 'HP' },
      { name: 'Introduction to Digital Business Skills', issuer: 'HP' },
      { name: 'Business Email', issuer: 'HP' }
    ],
    progDev: [
      { name: 'Python Basics', issuer: 'Unstop' },
      { name: 'Prompt Engineering with ChatGPT', issuer: 'Simplilearn' },
      { name: 'Introduction to Front-End Development', issuer: 'Simplilearn' }
    ]
  };

  const achievements = [
    { title: 'Aivora 2026', desc: 'Unstop Certificate of Participation', org: 'Unstop' },
    { title: 'Prompt Battle', desc: 'Active Participation in AI Prompting Challenge', org: 'Excel College' },
    { title: 'Paper Presentation', desc: 'Technical Research Paper Presentation', org: 'Excel College' }
  ];

  return (
    <section id="resume" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-space-950">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono tracking-wider uppercase mb-4 shadow-sm">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">Resume</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Executive luxury format designed for recruiters, research institutions, and engineering leaders. Fully ATS-compliant, print-ready, and verified.
          </p>

          {/* Action Button Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 no-print">
            {/* Download PDF Button */}
            <a
              href="/resume.pdf"
              download="Mylesh_S_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Download Resume PDF</span>
            </a>

            {/* View Resume Fullscreen */}
            <button
              onClick={() => setIsViewerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-amber-500/30 hover:border-amber-400/60 font-medium text-sm transition-all shadow-md"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>View Resume</span>
            </button>

            {/* Print / Save */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 font-medium text-sm transition-all"
              title="Print standard A4 / Save as PDF"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print Friendly</span>
            </button>

            {/* Toggle formal photo */}
            <button
              onClick={() => setShowPhoto(!showPhoto)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/10 text-xs font-mono transition-all"
              title="Toggle portrait photo display on resume sheet"
            >
              <span>{showPhoto ? 'Hide Photo' : 'Show Photo'}</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RESUME SHEET CONTAINER (NAVY BLUE / WHITE / GOLD ACCENTS)       */}
        {/* ============================================================== */}
        <div 
          id="resume-document"
          className="relative bg-white text-slate-900 rounded-3xl shadow-2xl border-2 border-amber-500/30 overflow-hidden print:border-none print:shadow-none print:rounded-none print:p-0"
        >
          {/* Top Navy Accent Bar with Gold Trim */}
          <div className="bg-[#0a192f] text-white p-6 sm:p-8 lg:p-10 border-b-4 border-amber-500 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Header Details */}
              <div className="space-y-2 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono tracking-widest uppercase font-semibold">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>First Year Undergrad • AI & Data Science</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white">
                  MYLESH S
                </h1>

                <p className="text-amber-400 font-semibold text-base sm:text-lg tracking-wide">
                  B.Tech Artificial Intelligence & Data Science
                </p>

                <p className="text-slate-300 text-sm flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sri Venkateshwara Hi-Tech Engineering College, Gobi</span>
                </p>
              </div>

              {/* Portrait Photo (Formal Suit Photo) */}
              {showPhoto && (
                <div className="shrink-0 flex items-center justify-start md:justify-end">
                  <div className="relative group">
                    <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-slate-950">
                      <img
                        src="/profile_formal.jpg"
                        alt="Mylesh S Formal Portrait"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          // Fallback to default profile if formal not available
                          (e.target as HTMLImageElement).src = profile.photoUrl || '/profile.jpg';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-mono font-bold uppercase shadow">
                      Verified
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Contact & Social Links Bar */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              
              {/* Phone */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <a 
                  href="tel:8667051285" 
                  className="flex items-center gap-2 text-slate-200 hover:text-amber-300 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono">8667051285</span>
                </a>
                <button
                  onClick={() => copyToClipboard('8667051285', 'Phone')}
                  className="text-slate-400 hover:text-white p-1"
                  title="Copy Phone"
                >
                  {copiedField === 'Phone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <a 
                  href="mailto:senthilkumarmylesh285@gmail.com" 
                  className="flex items-center gap-2 text-slate-200 hover:text-amber-300 transition-colors truncate"
                  title="senthilkumarmylesh285@gmail.com"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono truncate">senthilkumarmylesh285@gmail.com</span>
                </a>
                <button
                  onClick={() => copyToClipboard('senthilkumarmylesh285@gmail.com', 'Email')}
                  className="text-slate-400 hover:text-white p-1 shrink-0"
                  title="Copy Email"
                >
                  {copiedField === 'Email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mylesh-s-714378440"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 text-slate-200 hover:text-amber-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono">linkedin.com/in/mylesh-s</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              {/* Unstop */}
              <a
                href="https://unstop.com/u/myless15148"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 text-slate-200 hover:text-amber-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono">unstop.com/u/myless15148</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BODY CONTENT: CLEAN EXECUTIVE TYPOGRAPHY & SECTIONS           */}
          {/* ============================================================== */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-10 bg-slate-50/50">

            {/* 1. CAREER OBJECTIVE */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-amber-500 rounded-full" />
                <h3 className="text-base sm:text-lg font-display font-bold text-[#0a192f] tracking-wide uppercase">
                  Career Objective
                </h3>
                <div className="flex-1 h-[1px] bg-slate-200" />
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-5 font-normal text-justify">
                Motivated first-year B.Tech Artificial Intelligence and Data Science student interested in Artificial Intelligence, Machine Learning, Python programming and innovative technology. Eager to develop technical skills, work on real-world projects and participate in hackathons.
              </p>
            </div>

            {/* 2. EDUCATION & ACADEMICS */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-amber-500 rounded-full" />
                <h3 className="text-base sm:text-lg font-display font-bold text-[#0a192f] tracking-wide uppercase">
                  Education
                </h3>
                <div className="flex-1 h-[1px] bg-slate-200" />
              </div>
              
              <div className="pl-5 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-[#0a192f]">
                    B.Tech in Artificial Intelligence & Data Science
                  </h4>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300/60 w-fit">
                    First Year (2024 - Present)
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600">
                  Sri Venkateshwara Hi-Tech Engineering College, Gobi
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Gobichettipalayam, Erode District, Tamil Nadu, India</span>
                </p>
              </div>
            </div>

            {/* 3. TECHNICAL SKILLS & AREAS OF INTEREST (2-COLUMNS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Technical Skills */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-amber-500 rounded-full" />
                  <h3 className="text-base sm:text-lg font-display font-bold text-[#0a192f] tracking-wide uppercase">
                    Technical Skills
                  </h3>
                  <div className="flex-1 h-[1px] bg-slate-200" />
                </div>

                <div className="pl-5 flex flex-wrap gap-2">
                  {technicalSkills.map((sk) => (
                    <div
                      key={sk.name}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 shadow-sm flex items-center gap-2 text-xs"
                    >
                      <span className="font-semibold text-slate-800">{sk.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {sk.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas of Interest */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-amber-500 rounded-full" />
                  <h3 className="text-base sm:text-lg font-display font-bold text-[#0a192f] tracking-wide uppercase">
                    Areas of Interest
                  </h3>
                  <div className="flex-1 h-[1px] bg-slate-200" />
                </div>

                <div className="pl-5 flex flex-wrap gap-2">
                  {areasOfInterest.map((area) => (
                    <div
                      key={area}
                      className="px-3 py-1.5 rounded-lg bg-[#0a192f]/5 border border-[#0a192f]/15 text-slate-800 font-medium text-xs flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. PROJECTS (CONCEPTS & UNDER DEVELOPMENT) */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-amber-500 rounded-full" />
                <h3 className="text-base sm:text-lg font-display font-bold text-[#0a192f] tracking-wide uppercase">
                  Projects (Concepts & Under Development)
                </h3>
                <div className="flex-1 h-[1px] bg-slate-200" />
              </div>

              <div className="pl-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj, idx) => (
                  <div
                    key={proj.title}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#0a192f] text-white flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-base text-[#0a192f]">
                          {proj.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-50 text-amber-800 shrink-0">
                        Concept / In Dev
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600">
                      {proj.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. CERTIFICATIONS */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-amber-500 rounded-full" />
                <h3 className="text-base sm:text-lg font-display font-bold text-[#0a192f] tracking-wide uppercase">
                  Certifications
                </h3>
                <div className="flex-1 h-[1px] bg-slate-200" />
              </div>

              <div className="pl-5 space-y-5">
                {/* AI & ML */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0a192f] mb-2.5 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-amber-600" />
                    <span>AI & Machine Learning:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {certifications.aiMl.map((c) => (
                      <div
                        key={c.name}
                        className="p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-2 text-xs"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-slate-900 leading-tight">{c.name}</p>
                          <p className="text-[10px] font-mono text-slate-500 mt-0.5">— {c.issuer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Digital & Cybersecurity + Programming & Development */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Digital & Cybersecurity */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0a192f] mb-2.5 flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-amber-600" />
                      <span>Digital & Cybersecurity:</span>
                    </h4>
                    <div className="space-y-2">
                      {certifications.digitalCyber.map((c) => (
                        <div
                          key={c.name}
                          className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-2 text-xs"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900 leading-tight">{c.name}</p>
                            <p className="text-[10px] font-mono text-slate-500 mt-0.5">— {c.issuer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Programming & Development */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0a192f] mb-2.5 flex items-center gap-2">
                      <Code className="w-3.5 h-3.5 text-amber-600" />
                      <span>Programming & Development:</span>
                    </h4>
                    <div className="space-y-2">
                      {certifications.progDev.map((c) => (
                        <div
                          key={c.name}
                          className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-2 text-xs"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900 leading-tight">{c.name}</p>
                            <p className="text-[10px] font-mono text-slate-500 mt-0.5">— {c.issuer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 6. ACHIEVEMENTS & PARTICIPATIONS */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-amber-500 rounded-full" />
                <h3 className="text-base sm:text-lg font-display font-bold text-[#0a192f] tracking-wide uppercase">
                  Achievements & Participations
                </h3>
                <div className="flex-1 h-[1px] bg-slate-200" />
              </div>

              <div className="pl-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.title}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <h4 className="font-bold text-xs text-[#0a192f]">{ach.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{ach.desc}</p>
                    <p className="text-[10px] font-mono text-slate-400 font-semibold">{ach.org}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Document Bottom Footer */}
          <div className="bg-[#0a192f] text-slate-400 px-6 py-4 border-t border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <p className="font-mono text-slate-300">
              MYLESH S — B.Tech Artificial Intelligence & Data Science
            </p>
            <p className="text-[11px] text-slate-400">
              Sri Venkateshwara Hi-Tech Engineering College, Gobi
            </p>
          </div>

        </div>

      </div>

      {/* Fullscreen Interactive Resume Viewer Modal */}
      <ResumeViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        resumeUrl="/resume.pdf"
        resumeFileName="Mylesh_S_Resume.pdf"
      />
    </section>
  );
};
