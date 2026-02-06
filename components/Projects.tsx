'use client';

import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '@/data/portfolioData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

export default function Projects() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: listRef, isVisible: listVisible } = useScrollAnimation();
  const [visibleCount, setVisibleCount] = useState(2);

  const displayedProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <section id="projects" className="py-16 px-4 md:px-8 bg-[#080810]/95">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-16 anim-hidden anim-slide-left ${titleVisible ? 'anim-visible' : ''}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">projects</h2>
          <p className="text-gray-400 font-mono text-sm mt-4">/* things i've built */</p>
        </div>

        <div ref={listRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedProjects.map((project, index) => (
            <div
              key={project.title}
              className={`hacker-card group flex flex-col h-full anim-hidden anim-scale ${listVisible ? 'anim-visible' : ''}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-2 px-5 py-3 border-b border-[#0fa]/10 bg-[#0fa]/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[10px] text-[#0fa]/50 ml-2 hidden sm:inline">
                  ~/projects/{project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                </span>
                 <span className="font-mono text-[10px] text-[#0fa]/50 ml-2 sm:hidden">
                  {project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                </span>
                <div className="ml-auto flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-gray-500 hover:text-[#0fa] transition-colors"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-gray-500 hover:text-[#0fa] transition-colors"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#0fa] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{project.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                <div className="space-y-1.5 mb-4 font-mono text-xs">
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-[#0fa] mt-0.5">➜</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 mt-auto border-t border-[#0fa]/10">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tag hover:scale-105 active:scale-95 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          {hasMore ? (
            <button
              onClick={() => setVisibleCount(prev => prev + 2)}
              className="group relative inline-flex items-center gap-2 px-8 py-3 bg-[#0fa]/5 border border-[#0fa]/20 text-[#0fa] font-mono text-sm hover:bg-[#0fa]/10 hover:border-[#0fa]/50 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                load more projects
              </span>
              <div className="absolute inset-0 bg-[#0fa]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(2)}
              className="group relative inline-flex items-center gap-2 px-8 py-3 bg-[#0fa]/5 border border-[#0fa]/20 text-[#0fa] font-mono text-sm hover:bg-[#0fa]/10 hover:border-[#0fa]/50 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                show less
              </span>
              <div className="absolute inset-0 bg-[#0fa]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
