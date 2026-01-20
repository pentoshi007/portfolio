import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Projects() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: listRef, isVisible: listVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-24 px-4 md:px-8 bg-[#080810]">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-16 ${titleVisible ? 'slide-in-left' : 'opacity-0'}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">projects</h2>
          <p className="text-gray-500 font-mono text-sm mt-4">/* things i've built */</p>
        </div>

        <div ref={listRef as React.RefObject<HTMLDivElement>} className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`hacker-card group transition-all duration-300 ${listVisible ? `slide-up stagger-${(index % 6) + 1}` : 'opacity-0'}`}
            >
              <div className="flex items-center gap-2 px-5 py-3 border-b border-[#0fa]/10 bg-[#0fa]/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[10px] text-[#0fa]/50 ml-2">
                  ~/projects/{project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                </span>
                <div className="ml-auto flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-gray-500 hover:text-[#0fa] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-gray-500 hover:text-[#0fa] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#0fa] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{project.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                <div className="space-y-1.5 mb-4 font-mono text-xs">
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-[#0fa]">+</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#0fa]/10">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://github.com/pentoshi007"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#0fa]/30 text-[#0fa] font-mono text-sm hover:bg-[#0fa]/10 transition-all"
          >
            <Github className="w-4 h-4" />
            view all repos
          </a>
        </div>
      </div>
    </section>
  );
}
