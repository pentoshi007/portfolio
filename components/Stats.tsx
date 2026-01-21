'use client';

import { Github, Shield, ExternalLink, Trophy, Target, Crosshair } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Stats() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: githubRef, isVisible: githubVisible } = useScrollAnimation();
  const { elementRef: thmRef, isVisible: thmVisible } = useScrollAnimation();

  return (
    <section id="stats" className="py-16 px-4 md:px-8">
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
            className={`block hacker-card p-5 md:p-6 group hover:border-[#0fa]/40 transition-all ${githubVisible ? 'slide-in-left' : 'opacity-0'}`}
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#0fa]/10">
              <Github className="w-5 h-5 text-[#0fa]" />
              <span className="font-mono text-sm text-[#0fa]">github_contributions</span>
              <span className="ml-auto flex items-center gap-2">
                <span className="font-mono text-[10px] text-gray-600">last 90 days</span>
                <ExternalLink className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <img 
                src="https://ghchart.rshah.org/00ff99/pentoshi007"
                alt="GitHub Contributions"
                className="w-full min-w-[650px]"
                loading="lazy"
              />
            </div>
          </a>

          <div 
            ref={thmRef as React.RefObject<HTMLDivElement>}
            className={`${thmVisible ? 'slide-in-right' : 'opacity-0'}`}
          >
            <div className="hacker-card overflow-hidden">
              <div className="flex items-center gap-3 px-5 md:px-6 py-4 border-b border-[#0fa]/10 bg-[#0fa]/5">
                <Shield className="w-5 h-5 text-[#0fa]" />
                <span className="font-mono text-sm text-[#0fa]">tryhackme_stats</span>
                <div className="ml-auto px-2 py-0.5 bg-[#0fa] text-[#0a0a0f] font-mono text-[10px] font-bold">
                  TOP 2%
                </div>
              </div>
              
              <div className="p-5 md:p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <a 
                      href="https://tryhackme.com/p/aniket00736" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <h3 className="text-xl font-bold text-white group-hover:text-[#0fa] transition-colors mb-3 flex items-center gap-2">
                        TryHackMe Guru
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                    </a>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                      Completed <span className="text-[#0fa] font-semibold">180+ challenges</span> spanning web exploitation,
                      privilege escalation, network security, and red team operations.
                    </p>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 border border-[#0fa]/20 bg-[#0fa]/5">
                        <Trophy className="w-4 h-4 text-[#0fa] mx-auto mb-1" />
                        <span className="block text-[#0fa] font-mono text-lg font-bold">180+</span>
                        <span className="text-gray-500 font-mono text-[10px]">ROOMS</span>
                      </div>
                      <div className="text-center p-3 border border-[#0fa]/20 bg-[#0fa]/5">
                        <Target className="w-4 h-4 text-[#0fa] mx-auto mb-1" />
                        <span className="block text-[#0fa] font-mono text-lg font-bold">CTF</span>
                        <span className="text-gray-500 font-mono text-[10px]">PLAYER</span>
                      </div>
                      <div className="text-center p-3 border border-[#0fa]/20 bg-[#0fa]/5">
                        <Crosshair className="w-4 h-4 text-[#0fa] mx-auto mb-1" />
                        <span className="block text-[#0fa] font-mono text-lg font-bold">Red</span>
                        <span className="text-gray-500 font-mono text-[10px]">TEAM OPS</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:border-l lg:border-[#0fa]/10 lg:pl-6 flex items-center justify-center">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
