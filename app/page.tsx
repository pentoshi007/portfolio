import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Stats from '@/components/Stats';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScanlineEffect from '@/components/ScanlineEffect';
import GridBackground from '@/components/GridBackground';
import VisualEffects from '@/components/VisualEffects';
import LatestBlogPosts from '@/components/LatestBlogPosts';
import { personalInfo, siteUrl, education } from '@/data/portfolioData';

export const revalidate = 300;

// Structured data so search engines can show a rich "person" result.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      description: personalInfo.summary,
      url: siteUrl,
      image: `${siteUrl}/og.png`,
      email: `mailto:${personalInfo.email}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Buxar',
        addressRegion: 'Bihar',
        addressCountry: 'IN',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: education[0].institution,
      },
      knowsAbout: [
        'Full-Stack Development',
        'MERN Stack',
        'Next.js',
        'TypeScript',
        'Cybersecurity',
        'Security Operations (SOC)',
        'Microsoft Sentinel',
        'Threat Intelligence',
        'Penetration Testing',
        'AI Security',
      ],
      sameAs: [
        personalInfo.github,
        personalInfo.linkedin,
        personalInfo.tryhackme,
        personalInfo.npm,
        personalInfo.blog,
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Aniket Pandey',
      inLanguage: 'en-IN',
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profile`,
      url: siteUrl,
      name: 'Aniket Pandey | Full-Stack Developer & Cybersecurity Analyst',
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${siteUrl}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GridBackground />
      <VisualEffects />
      <ScanlineEffect />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <LatestBlogPosts />
          <Certifications />
          <Stats />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
