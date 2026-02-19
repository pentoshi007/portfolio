'use client';

import { MapPin, Calendar } from 'lucide-react';
import { education } from '@/data/portfolioData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function About() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { elementRef: eduRef, isVisible: eduVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-16 anim-hidden anim-slide-left ${titleVisible ? 'anim-visible' : ''}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">whoami</h2>
          <p className="text-gray-400 font-mono text-sm mt-4">/* quick overview */</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div ref={contentRef as React.RefObject<HTMLDivElement>} className={`lg:col-span-3 space-y-6 anim-hidden anim-slide-up ${contentVisible ? 'anim-visible' : ''}`}>
            <p className="text-gray-300 text-lg leading-relaxed">
              Full-stack developer with a passion for cybersecurity. I enjoy building efficient, 
              scalable applications while ensuring they remain secure against modern threats.
            </p>

            <p className="text-gray-400 leading-relaxed">
              My journey started with web development and evolved through CTFs, teaching me 
              to think like an attacker to build better defenses. I strive to create software 
              that is not just functional, but fundamentally secure.
            </p>

            <div className="pt-6 border-t border-[#0fa]/10">
              <p className="font-mono text-sm text-gray-400 mb-4">$ cat /proc/stats</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { num: '8+', label: 'apps shipped' },
                  { num: '200+', label: 'CTF solves' },
                  { num: 'Top 1%', label: 'TryHackMe' },
                  { num: '75%', label: 'time saved' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 border border-[#0fa]/10 hover:border-[#0fa]/30 transition-colors">
                    <div className="text-2xl font-bold neon-text">{stat.num}</div>
                    <div className="text-xs text-gray-400 font-mono mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={eduRef as React.RefObject<HTMLDivElement>} className={`lg:col-span-2 anim-hidden anim-slide-right ${eduVisible ? 'anim-visible' : ''}`}>
            <p className="font-mono text-sm text-gray-400 mb-4">$ cat education.log</p>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`hacker-card p-4 transition-all duration-300 anim-hidden anim-scale stagger-${index + 1} ${eduVisible ? 'anim-visible' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-[#0fa]/10 text-[#0fa] font-mono text-xs flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">{edu.degree}</h4>
                      <p className="text-[#0fa] text-xs mt-0.5">{edu.institution}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-gray-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {edu.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {edu.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
