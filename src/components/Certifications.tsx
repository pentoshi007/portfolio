import { Award, Shield, ExternalLink } from 'lucide-react';
import { certifications } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Certifications() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const { elementRef: highlightRef, isVisible: highlightVisible } = useScrollAnimation();

  return (
    <section id="certifications" className="py-24 px-4 md:px-8 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-16 ${titleVisible ? 'slide-in-left' : 'opacity-0'}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">certs</h2>
          <p className="text-gray-500 font-mono text-sm mt-4">/* verified skills */</p>
        </div>

        <div ref={gridRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 gap-4 mb-8">
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

        <div ref={highlightRef as React.RefObject<HTMLDivElement>} className={`hacker-card p-6 corner-bracket ${highlightVisible ? 'slide-up glow-pulse' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-24 h-24 flex items-center justify-center bg-[#0fa]/10">
                  <Shield className="w-12 h-12 text-[#0fa]" />
                </div>
                <div className="absolute -top-1 -right-1 px-2 py-0.5 bg-[#0fa] text-[#0a0a0f] font-mono text-[10px] font-bold">
                  TOP 2%
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">TryHackMe Elite</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ranked in the <span className="text-[#0fa]">top 2%</span> globally.
                Completed <span className="text-[#0fa]">150+ challenges</span> spanning web exploitation,
                privilege escalation, network security, and red team operations.
                Not just learning - actively hunting vulnerabilities and pwning boxes.
              </p>
              <div className="flex gap-4 mt-4 font-mono text-xs text-gray-500">
                <span><span className="text-[#0fa]">90%</span> pentest labs</span>
                <span><span className="text-[#0fa]">150+</span> rooms</span>
                <span><span className="text-[#0fa]">CTF</span> player</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
