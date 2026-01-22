'use client';

import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '@/data/portfolioData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Certifications() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section id="certifications" className="py-16 px-4 md:px-8 bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-10 ${titleVisible ? 'slide-in-left' : 'opacity-0'}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">certs</h2>
          <p className="text-gray-400 font-mono text-sm mt-4">/* verified skills */</p>
        </div>

        <div ref={gridRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 gap-4">
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
                    <span className="font-mono text-[10px] text-gray-400">{cert.date}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{cert.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
