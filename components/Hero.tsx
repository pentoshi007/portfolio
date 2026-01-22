import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import GlitchText from './GlitchText';
import TerminalAnimation from './TerminalAnimation';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]/70" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0fa 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pt-20 flex flex-col items-center text-center">
        <div className="mb-8 w-full max-w-4xl mt-10">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight">
            <span className="text-white">I&apos;m </span>
            <GlitchText text="Aniket" className="neon-text" />
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 font-light">
            I break things to make them <span className="text-[#0fa]">secure</span>.
            <br />
            Then I build them <span className="text-[#0fa]">better</span>.
          </p>
        </div>

        <div className="terminal-box rounded-none mb-8 w-full max-w-3xl text-left">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#0fa]/20 bg-[#0fa]/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 font-mono text-[10px] text-[#0fa]/50">aniket@kali:~/portfolio</span>
          </div>
          <TerminalAnimation />
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
