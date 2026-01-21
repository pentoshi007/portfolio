'use client';

import { Github, Shield, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Stats() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: githubRef, isVisible: githubVisible } = useScrollAnimation();
  const { elementRef: thmRef, isVisible: thmVisible } = useScrollAnimation();

  return (
    <section id="stats" className="py-16 px-4 md:px-8 bg-[#0a0a0f]/95">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-10 ${titleVisible ? 'slide-in-left' : 'opacity-0'}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">stats</h2>
          <p className="text-gray-500 font-mono text-sm mt-4">/* activity & achievements */</p>
        </div>

        <div className="space-y-6">
          <a 
            ref={githubRef as React.RefObject<HTMLAnchorElement>}
            href="https://github.com/pentoshi007" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`block hacker-card p-6 group hover:border-[#0fa]/40 transition-all ${githubVisible ? 'slide-in-left' : 'opacity-0'}`}
          >
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#0fa]/10">
              <Github className="w-5 h-5 text-[#0fa]" />
              <span className="font-mono text-sm text-[#0fa]">github_contributions</span>
              <ExternalLink className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
            </div>
            <div className="overflow-x-auto scrollbar-thin pb-2">
              <picture>
                <source
                  srcSet="https://github.pumbas.net/api/contributions/pentoshi007?colour=00FF99&bgColour=0a0a0f&dotColour=1a1a2e&days=90&borderRadius=0"
                  media="(prefers-color-scheme: dark)"
                />
                <img 
                  src="https://github.pumbas.net/api/contributions/pentoshi007?colour=00FF99&bgColour=0a0a0f&dotColour=1a1a2e&days=90&borderRadius=0"
                  alt="GitHub Contributions"
                  className="w-full min-w-[600px] h-auto"
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="mt-4 pt-3 border-t border-[#0fa]/10 flex items-center justify-between">
              <span className="font-mono text-xs text-gray-500">
                <span className="text-[#0fa]">→</span> view full profile
              </span>
              <span className="font-mono text-[10px] text-gray-600">last 90 days</span>
            </div>
          </a>

          <a 
            ref={thmRef as React.RefObject<HTMLAnchorElement>}
            href="https://tryhackme.com/p/aniket00736" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`block group ${thmVisible ? 'slide-in-right' : 'opacity-0'}`}
          >
            <div className="relative overflow-hidden border border-[#0fa]/30 bg-gradient-to-r from-[#0fa]/5 via-[#0fa]/10 to-[#0fa]/5 hover:border-[#0fa]/60 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0fa]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#0fa]/20">
                  <Shield className="w-5 h-5 text-[#0fa]" />
                  <span className="font-mono text-sm text-[#0fa]">tryhackme_stats</span>
                  <ExternalLink className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </div>

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
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#0fa] transition-colors mb-2">
                      TryHackMe Guru
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                      Completed <span className="text-[#0fa] font-semibold">180+ challenges</span> spanning web exploitation,
                      privilege escalation, network security, and red team operations.
                    </p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
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

                  <div className="hidden lg:block flex-shrink-0">
                    <iframe 
                      src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3110287" 
                      width="320"
                      height="86"
                      frameBorder="0"
                      loading="lazy"
                      className="rounded opacity-90 group-hover:opacity-100 transition-opacity"
                      style={{ border: 'none' }}
                      title="TryHackMe Badge"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0fa]/10 lg:hidden flex justify-center">
                  <iframe 
                    src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3110287" 
                    width="320"
                    height="86"
                    frameBorder="0"
                    loading="lazy"
                    className="rounded"
                    style={{ border: 'none' }}
                    title="TryHackMe Badge"
                  />
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
