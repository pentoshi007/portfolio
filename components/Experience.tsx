'use client';

import { experience } from '@/data/portfolioData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Experience() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: timelineRef, isVisible: timelineVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-16 anim-hidden anim-slide-left ${titleVisible ? 'anim-visible' : ''}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">ops</h2>
          <p className="text-gray-400 font-mono text-sm mt-4">/* missions completed */</p>
        </div>

        <div ref={timelineRef as React.RefObject<HTMLDivElement>} className="relative pl-8 timeline-line">
          {experience.map((exp, index) => (
            <div key={index} className="relative mb-12 last:mb-0">
              <div className="absolute -left-8 top-0 w-4 h-4 border-2 border-[#0fa] bg-[#0a0a0f] transform rotate-45" />

              <div className={`hacker-card p-6 anim-hidden anim-slide-right stagger-${(index % 6) + 1} ${timelineVisible ? 'anim-visible' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-[#0fa]/10 text-[#0fa]">
                        {exp.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                    <p className="text-[#0fa]">@ {exp.company}</p>
                  </div>
                  <div className="font-mono text-xs text-gray-400">
                    {exp.duration}
                  </div>
                </div>

                <div className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="text-[#0fa] font-mono text-xs mt-1">[{i + 1}]</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-4 border border-dashed border-[#0fa]/20 text-center">
          <p className="font-mono text-xs text-gray-400">
            <span className="text-[#0fa]">$</span> more opportunities loading...
          </p>
        </div>
      </div>
    </section>
  );
}
