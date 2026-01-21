'use client';

import { Github, Shield } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Stats() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: githubRef, isVisible: githubVisible } = useScrollAnimation();
  const { elementRef: thmRef, isVisible: thmVisible } = useScrollAnimation();

  return (
    <section id="stats" className="py-16 px-4 md:px-8 bg-[#0a0a0f]/95">
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-10 ${titleVisible ? 'slide-in-left' : 'opacity-0'}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">stats</h2>
          <p className="text-gray-500 font-mono text-sm mt-4">/* activity & achievements */</p>
        </div>

        <div className="space-y-8">
          <div 
            ref={githubRef as React.RefObject<HTMLDivElement>} 
            className={`hacker-card p-6 ${githubVisible ? 'slide-in-left' : 'opacity-0'}`}
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#0fa]/10">
              <Github className="w-5 h-5 text-[#0fa]" />
              <span className="font-mono text-sm text-[#0fa]">github_contributions</span>
              <div className="ml-auto status-dot" />
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <div className="min-w-[700px]">
                <iframe 
                  src="https://pages.codeadam.ca/github-contributions/pentoshi007" 
                  width="100%" 
                  height="180" 
                  frameBorder="0"
                  loading="lazy"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                  style={{ 
                    filter: 'hue-rotate(80deg) saturate(1.2)',
                    background: 'transparent'
                  }}
                  title="GitHub Contributions"
                />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#0fa]/10">
              <a 
                href="https://github.com/pentoshi007" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-xs text-gray-500 hover:text-[#0fa] transition-colors flex items-center gap-2"
              >
                <span className="text-[#0fa]">→</span> view full profile on github
              </a>
            </div>
          </div>

          <div 
            ref={thmRef as React.RefObject<HTMLDivElement>} 
            className={`hacker-card p-6 ${thmVisible ? 'slide-in-right' : 'opacity-0'}`}
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#0fa]/10">
              <Shield className="w-5 h-5 text-[#0fa]" />
              <span className="font-mono text-sm text-[#0fa]">tryhackme_stats</span>
              <div className="ml-auto status-dot" />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0">
                <iframe 
                  src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3110287" 
                  width="320"
                  height="100"
                  frameBorder="0"
                  loading="lazy"
                  className="rounded"
                  style={{ border: 'none' }}
                  title="TryHackMe Badge"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-3">
                  Actively learning offensive security through hands-on labs and CTF challenges.
                </p>
                <a 
                  href="https://tryhackme.com/p/3110287" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-gray-500 hover:text-[#0fa] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#0fa]">→</span> view tryhackme profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
