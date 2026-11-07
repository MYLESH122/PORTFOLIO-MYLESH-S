const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generateResume() {
  const outputPath = path.join(__dirname, '../public/resume.pdf');
  
  // Document setup: A4, 0.5 in / 36pt margins for clean modern executive layout
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 36, bottom: 36, left: 40, right: 40 },
    info: {
      Title: 'Mylesh S - Resume',
      Author: 'Mylesh S',
      Subject: 'B.Tech Artificial Intelligence & Data Science Resume',
      Keywords: 'Mylesh S, AI, Data Science, Python, Machine Learning, Resume',
    }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Color Palette: Luxury Navy Blue, White, and Subtle Gold Accents
  const COLOR_NAVY_DARK = '#0a192f';   // Deep luxury navy
  const COLOR_NAVY_ACCENT = '#1e3a8a'; // Medium royal navy
  const COLOR_GOLD = '#d97706';        // Subtle refined gold / amber
  const COLOR_TEXT_DARK = '#1e293b';   // Slate 800
  const COLOR_TEXT_MUTED = '#475569';  // Slate 600
  const COLOR_LINE = '#cbd5e1';        // Slate 300
  const COLOR_BG_LIGHT = '#f8fafc';    // Slate 50
  const COLOR_TAG_BG = '#eff6ff';      // Soft blue tint

  // Header Banner Background
  doc.rect(0, 0, doc.page.width, 105).fill(COLOR_NAVY_DARK);

  // Top Accent Gold Bar
  doc.rect(0, 0, doc.page.width, 4).fill(COLOR_GOLD);

  // Name & Degree in Header
  doc.fillColor('#ffffff')
     .font('Helvetica-Bold')
     .fontSize(22)
     .text('MYLESH S', 40, 24, { characterSpacing: 1.5 });

  doc.fillColor(COLOR_GOLD)
     .font('Helvetica-Bold')
     .fontSize(10.5)
     .text('B.TECH ARTIFICIAL INTELLIGENCE & DATA SCIENCE (FIRST YEAR)', 40, 52, { characterSpacing: 0.8 });

  doc.fillColor('#cbd5e1')
     .font('Helvetica')
     .fontSize(9)
     .text('Sri Venkateshwara Hi-Tech Engineering College, Gobi | Tamil Nadu, India', 40, 68);

  // Contact Info Pill / Row in Header
  const contactText = 'Phone: +91 8667051285   |   Email: senthilkumarmylesh285@gmail.com   |   LinkedIn: /in/mylesh-s-714378440   |   Unstop: @myless15148';
  doc.fillColor('#94a3b8')
     .font('Helvetica')
     .fontSize(8)
     .text(contactText, 40, 84);

  let y = 120;

  // Helper function for Section Headers with Gold Accents
  function drawSectionHeader(title) {
    if (y > 740) {
      doc.addPage();
      y = 40;
    }

    doc.fillColor(COLOR_NAVY_DARK)
       .font('Helvetica-Bold')
       .fontSize(11)
       .text(title.toUpperCase(), 40, y, { characterSpacing: 1 });

    // Gold decorative dash & dividing rule
    doc.rect(40, y + 14, 28, 2.5).fill(COLOR_GOLD);
    doc.rect(72, y + 15, doc.page.width - 112, 0.75).fill(COLOR_LINE);

    y += 24;
  }

  // 1. CAREER OBJECTIVE
  drawSectionHeader('Career Objective');
  doc.fillColor(COLOR_TEXT_DARK)
     .font('Helvetica')
     .fontSize(9.2)
     .lineGap(3)
     .text(
       'Motivated first-year B.Tech Artificial Intelligence and Data Science student interested in Artificial Intelligence, Machine Learning, Python programming and innovative technology. Eager to develop technical skills, work on real-world projects and participate in hackathons.',
       40,
       y,
       { width: doc.page.width - 80, align: 'justify' }
     );
  y = doc.y + 12;

  // 2. EDUCATION
  drawSectionHeader('Education');
  
  doc.fillColor(COLOR_NAVY_ACCENT)
     .font('Helvetica-Bold')
     .fontSize(10)
     .text('B.Tech in Artificial Intelligence & Data Science', 40, y);
  
  doc.fillColor(COLOR_TEXT_MUTED)
     .font('Helvetica-Bold')
     .fontSize(9)
     .text('First Year (2024 - Present)', doc.page.width - 170, y, { width: 130, align: 'right' });

  y += 14;
  doc.fillColor(COLOR_TEXT_MUTED)
     .font('Helvetica')
     .fontSize(9)
     .text('Sri Venkateshwara Hi-Tech Engineering College, Gobi', 40, y);
  y += 18;

  // 3. TECHNICAL SKILLS & AREAS OF INTEREST (2-Column Grid)
  drawSectionHeader('Technical Skills & Areas of Interest');
  
  const colWidth = (doc.page.width - 95) / 2;
  const leftX = 40;
  const rightX = 40 + colWidth + 15;
  const startSkillsY = y;

  // Left column: Technical Skills
  doc.fillColor(COLOR_NAVY_DARK)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text('Technical Capabilities:', leftX, y);
  y += 14;

  const techSkills = [
    'Python Programming (Beginner)',
    'C Programming (Beginner)',
    'Artificial Intelligence',
    'Machine Learning Fundamentals',
    'Data Science Fundamentals',
    'Generative AI & Prompt Engineering',
    'Front-End Development Fundamentals'
  ];

  techSkills.forEach(skill => {
    doc.circle(leftX + 4, y + 4.5, 2).fill(COLOR_GOLD);
    doc.fillColor(COLOR_TEXT_DARK)
       .font('Helvetica')
       .fontSize(8.8)
       .text(skill, leftX + 12, y);
    y += 13.5;
  });

  const skillsEndY = y;

  // Right column: Areas of Interest
  let rightY = startSkillsY;
  doc.fillColor(COLOR_NAVY_DARK)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text('Core Areas of Interest:', rightX, rightY);
  rightY += 14;

  const areasOfInterest = [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Generative AI',
    'Software Development',
    'Technical Innovation'
  ];

  areasOfInterest.forEach(area => {
    doc.circle(rightX + 4, rightY + 4.5, 2).fill(COLOR_NAVY_ACCENT);
    doc.fillColor(COLOR_TEXT_DARK)
       .font('Helvetica')
       .fontSize(8.8)
       .text(area, rightX + 12, rightY);
    rightY += 13.5;
  });

  y = Math.max(skillsEndY, rightY) + 10;

  // 4. PROJECTS (Clearly identified as Concepts / In Development)
  drawSectionHeader('Projects (Concepts & Under Development)');

  // Project 1: Waste2Watt AI
  doc.fillColor(COLOR_NAVY_ACCENT)
     .font('Helvetica-Bold')
     .fontSize(9.8)
     .text('1. Waste2Watt AI', 40, y);

  doc.fillColor(COLOR_GOLD)
     .font('Helvetica-Bold')
     .fontSize(8.2)
     .text('[Concept / Project Under Development]', 150, y + 1);

  y += 14;
  const p1Bullets = [
    'AI-assisted waste identification and segregation concept.',
    'Waste-to-energy conversion concept.',
    'Air filtration concept.',
    'Monitoring dashboard for real-time ecological metrics.'
  ];

  p1Bullets.forEach(b => {
    doc.circle(44, y + 4.5, 1.8).fill(COLOR_TEXT_MUTED);
    doc.fillColor(COLOR_TEXT_DARK)
       .font('Helvetica')
       .fontSize(8.5)
       .text(b, 52, y, { width: doc.page.width - 92 });
    y += 12;
  });

  y += 4;

  // Project 2: MediBand AI
  doc.fillColor(COLOR_NAVY_ACCENT)
     .font('Helvetica-Bold')
     .fontSize(9.8)
     .text('2. MediBand AI', 40, y);

  doc.fillColor(COLOR_GOLD)
     .font('Helvetica-Bold')
     .fontSize(8.2)
     .text('[Concept / Project Under Development]', 140, y + 1);

  y += 14;
  const p2Bullets = [
    'ESP32-based wearable health-monitoring concept.',
    'ECG monitoring.',
    'Heart rate monitoring.',
    'SpO2 monitoring.',
    'Temperature monitoring.'
  ];

  p2Bullets.forEach(b => {
    doc.circle(44, y + 4.5, 1.8).fill(COLOR_TEXT_MUTED);
    doc.fillColor(COLOR_TEXT_DARK)
       .font('Helvetica')
       .fontSize(8.5)
       .text(b, 52, y, { width: doc.page.width - 92 });
    y += 12;
  });

  y += 8;

  // 5. CERTIFICATIONS
  drawSectionHeader('Certifications');

  // AI & Machine Learning Category
  doc.fillColor(COLOR_NAVY_DARK)
     .font('Helvetica-Bold')
     .fontSize(9)
     .text('AI & MACHINE LEARNING:', 40, y);
  y += 12;

  const aiCerts = [
    'AI for Business Professionals – HP',
    'Strategic Planning in the Age of AI and Data – HP',
    'Data Science and Analytics – HP',
    'AI for Beginners – HP',
    'Autonomous AI Agent & LLM Tool Orchestration – NeuroLearn AI',
    'Generative AI & Prompt Engineering Masterclass – NeuroLearn AI',
    'AI Shiksha – AI Literacy for Everyone',
    'Fundamentals of Machine Learning and Artificial Intelligence – AWS',
    'Unlocking AI for Everyone – Microsoft'
  ];

  // Render 2 columns for compact, clean view
  const halfLen = Math.ceil(aiCerts.length / 2);
  const aiCol1 = aiCerts.slice(0, halfLen);
  const aiCol2 = aiCerts.slice(halfLen);
  const aiStartY = y;

  aiCol1.forEach(c => {
    doc.circle(leftX + 4, y + 4, 1.8).fill(COLOR_GOLD);
    doc.fillColor(COLOR_TEXT_DARK)
       .font('Helvetica')
       .fontSize(8)
       .text(c, leftX + 11, y, { width: colWidth - 5 });
    y += 11.5;
  });

  let aiCol2Y = aiStartY;
  aiCol2.forEach(c => {
    doc.circle(rightX + 4, aiCol2Y + 4, 1.8).fill(COLOR_GOLD);
    doc.fillColor(COLOR_TEXT_DARK)
       .font('Helvetica')
       .fontSize(8)
       .text(c, rightX + 11, aiCol2Y, { width: colWidth - 5 });
    aiCol2Y += 11.5;
  });

  y = Math.max(y, aiCol2Y) + 6;

  // Digital & Cybersecurity + Programming & Development in 2 columns
  const midSecY = y;
  
  // Left: Digital & Cybersecurity
  doc.fillColor(COLOR_NAVY_DARK)
     .font('Helvetica-Bold')
     .fontSize(9)
     .text('DIGITAL & CYBERSECURITY:', leftX, y);
  y += 12;

  const cyberCerts = [
    'Introduction to Cyber Security Awareness – HP',
    'Introduction to Digital Business Skills – HP',
    'Business Email – HP'
  ];

  cyberCerts.forEach(c => {
    doc.circle(leftX + 4, y + 4, 1.8).fill(COLOR_GOLD);
    doc.fillColor(COLOR_TEXT_DARK)
       .font('Helvetica')
       .fontSize(8)
       .text(c, leftX + 11, y, { width: colWidth - 5 });
    y += 11.5;
  });

  const cyberEndY = y;

  // Right: Programming & Development
  y = midSecY;
  doc.fillColor(COLOR_NAVY_DARK)
     .font('Helvetica-Bold')
     .fontSize(9)
     .text('PROGRAMMING & DEVELOPMENT:', rightX, y);
  y += 12;

  const devCerts = [
    'Python Basics – Unstop',
    'Prompt Engineering with ChatGPT – Simplilearn',
    'Introduction to Front-End Development – Simplilearn'
  ];

  devCerts.forEach(c => {
    doc.circle(rightX + 4, y + 4, 1.8).fill(COLOR_GOLD);
    doc.fillColor(COLOR_TEXT_DARK)
       .font('Helvetica')
       .fontSize(8)
       .text(c, rightX + 11, y, { width: colWidth - 5 });
    y += 11.5;
  });

  y = Math.max(cyberEndY, y) + 8;

  // 6. ACHIEVEMENTS & PARTICIPATIONS
  drawSectionHeader('Achievements & Participations');

  const achievements = [
    'Aivora 2026 – Unstop Certificate of Participation',
    'Prompt Battle – Excel College',
    'Paper Presentation – Excel College'
  ];

  achievements.forEach(ach => {
    doc.circle(44, y + 4, 2).fill(COLOR_GOLD);
    doc.fillColor(COLOR_TEXT_DARK)
       .font('Helvetica-Bold')
       .fontSize(8.5)
       .text(ach, 52, y);
    y += 12.5;
  });

  // Footer Accent Bar
  const footerY = doc.page.height - 24;
  doc.rect(40, footerY - 8, doc.page.width - 80, 0.5).fill(COLOR_LINE);
  doc.fillColor(COLOR_TEXT_MUTED)
     .font('Helvetica')
     .fontSize(7.5)
     .text('Mylesh S  •  B.Tech Artificial Intelligence & Data Science  •  Sri Venkateshwara Hi-Tech Engineering College, Gobi', 40, footerY, {
       align: 'center',
       width: doc.page.width - 80
     });

  doc.end();
  
  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      console.log('Successfully generated public/resume.pdf');
      resolve(outputPath);
    });
    stream.on('error', reject);
  });
}

generateResume().catch(err => {
  console.error('Error generating resume:', err);
  process.exit(1);
});

