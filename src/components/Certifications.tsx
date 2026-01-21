import { Award, Shield, ExternalLink } from 'lucide-react';
import { certifications } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Certifications() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const { elementRef: highlightRef, isVisible: highlightVisible } = useScrollAnimation();

  return (
    <section id="certifications" className="py-16 px-4 md:px-8 bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-10 ${titleVisible ? 'slide-in-left' : 'opacity-0'}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">certs</h2>
          <p className="text-gray-500 font-mono text-sm mt-4">/* verified skills */</p>
        </div>

        <div ref={gridRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 gap-4 mb-6">
          {certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`hacker-card p-5 group transition-all duration-300 block ${gridVisible ? `scale-in stagger-${(index % 6) + 1}` : 'opacity-0'}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#0fa]/10 group-hover:bg-[#0fa]/20 transition-colors">
                  <Award className="w-5 h-5 text-[#0fa]" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-medium group-hover:text-[#0fa] transition-colors flex items-center gap-2">
                        {cert.name}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-[#0fa] text-sm">{cert.issuer}</p>
                    </div>
                    <span className="font-mono text-[10px] text-gray-500">{cert.date}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{cert.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <a 
          ref={highlightRef as React.RefObject<HTMLAnchorElement>}
          href="https://tryhackme.com/p/aniket00736" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`block group ${highlightVisible ? 'slide-up' : 'opacity-0'}`}
        >
          <div className="relative overflow-hidden border border-[#0fa]/30 bg-gradient-to-r from-[#0fa]/5 via-[#0fa]/10 to-[#0fa]/5 hover:border-[#0fa]/60 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0fa]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-[#0fa]/10 border border-[#0fa]/20 group-hover:border-[#0fa]/40 transition-colors">
                    <Shield className="w-10 h-10 md:w-12 md:h-12 text-[#0fa]" />
                  </div>
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-[#0fa] text-[#0a0a0f] font-mono text-[10px] font-bold shadow-lg shadow-[#0fa]/20">
                    TOP 2%
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#0fa] transition-colors">TryHackMe Guru</h3>
                    <ExternalLink className="w-4 h-4 text-[#0fa] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                    Completed <span className="text-[#0fa] font-semibold">180+ challenges</span> spanning web exploitation,
                    privilege escalation, network security, and red team operations.
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0fa]/10 border border-[#0fa]/20">
                      <span className="text-[#0fa] font-mono text-sm font-bold">180+</span>
                      <span className="text-gray-500 font-mono text-xs">rooms</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0fa]/10 border border-[#0fa]/20">
                      <span className="text-[#0fa] font-mono text-sm font-bold">CTF</span>
                      <span className="text-gray-500 font-mono text-xs">player</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0fa]/10 border border-[#0fa]/20">
                      <span className="text-[#0fa] font-mono text-sm font-bold">Red Team</span>
                      <span className="text-gray-500 font-mono text-xs">ops</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
