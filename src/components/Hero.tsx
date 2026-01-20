import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import GlitchText from './GlitchText';

const typingLines = [
  '> initializing system...',
  '> loading modules: [react, node, python, nmap, burp]',
  '> establishing secure connection...',
  '> access granted.',
  '',
  '> cat /etc/profile',
  'ROLE="Full-Stack Developer + Security Analyst"',
  'LOCATION="New Delhi, India"',
  'STATUS="Available for opportunities"',
  '',
  '> ./achievements --list',
  '[+] 4+ production apps deployed',
  '[+] Top 2% on TryHackMe',
  '[+] 150+ CTF challenges pwned',
  '[+] 20+ secure API endpoints built',
];

export default function Hero() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= typingLines.length) return;

    const line = typingLines[currentLine];

    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, line.startsWith('>') ? 15 : 8);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, line === '' ? 100 : 150);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  const getLineStyle = (line: string) => {
    if (line.startsWith('>')) return 'text-[#0fa]';
    if (line.startsWith('[+]')) return 'text-emerald-400';
    if (line.includes('=')) return 'text-amber-400';
    return 'text-gray-400';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0fa 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#0fa]/30 bg-[#0fa]/5 mb-6">
            <div className="status-dot" />
            <span className="font-mono text-xs text-[#0fa]">SYSTEM ONLINE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-white">I'm </span>
            <GlitchText text="Aniket" className="neon-text" />
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 font-light">
            I break things to make them <span className="text-[#0fa]">secure</span>.
            <br />
            Then I build them <span className="text-[#0fa]">better</span>.
          </p>
        </div>

        <div className="terminal-box rounded-none mb-8 max-w-2xl">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#0fa]/20 bg-[#0fa]/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 font-mono text-[10px] text-[#0fa]/50">aniket@kali:~/portfolio</span>
          </div>

          <div className="p-4 font-mono text-xs md:text-sm h-[280px] overflow-hidden">
            {displayedLines.map((line, i) => (
              <div key={i} className={`${getLineStyle(line)} ${line === '' ? 'h-3' : ''}`}>
                {line}
              </div>
            ))}
            {currentLine < typingLines.length && (
              <div className={getLineStyle(typingLines[currentLine])}>
                {typingLines[currentLine].slice(0, currentChar)}
                <span className="inline-block w-2 h-4 bg-[#0fa] ml-0.5 animate-pulse" />
              </div>
            )}
            {currentLine >= typingLines.length && (
              <div className="text-[#0fa] mt-2">
                {'>'} <span className="inline-block w-2 h-4 bg-[#0fa] animate-pulse" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <a
            href="#contact"
            className="group px-5 py-2.5 bg-[#0fa] text-[#0a0a0f] font-mono text-sm font-medium hover:bg-[#0fa]/90 transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            ./contact_me
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-[#0fa]/30 text-[#0fa] font-mono text-sm hover:bg-[#0fa]/10 transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            github
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-[#0fa]/30 text-[#0fa] font-mono text-sm hover:bg-[#0fa]/10 transition-all flex items-center gap-2"
          >
            <Linkedin className="w-4 h-4" />
            linkedin
          </a>
        </div>

        <div className="flex justify-center">
          <a
            href="#about"
            className="inline-flex flex-col items-center text-gray-500 hover:text-[#0fa] transition-colors"
          >
            <span className="font-mono text-xs mb-1">scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
