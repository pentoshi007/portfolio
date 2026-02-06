'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Github, Shield, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Stats() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: githubRef, isVisible: githubVisible } = useScrollAnimation();
  const { elementRef: thmRef, isVisible: thmVisible } = useScrollAnimation();

  // Defer iframe loading until the THM section is near viewport
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const [loadIframe, setLoadIframe] = useState(false);

  useEffect(() => {
    const el = iframeContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="py-16 px-4 md:px-8 bg-[#080810]/95">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-10 anim-hidden anim-slide-left ${titleVisible ? 'anim-visible' : ''}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">stats</h2>
          <p className="text-gray-400 font-mono text-sm mt-4">/* activity & achievements */</p>
        </div>

        <div className="space-y-6">
          {/* GitHub Contributions */}
          <a 
            ref={githubRef as React.RefObject<HTMLAnchorElement>}
            href="https://github.com/pentoshi007" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`block hacker-card p-5 md:p-6 group hover:border-[#0fa]/40 anim-hidden anim-slide-left ${githubVisible ? 'anim-visible' : ''}`}
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#0fa]/10">
              <Github className="w-5 h-5 text-[#0fa]" />
              <span className="font-mono text-sm text-[#0fa]">github_contributions</span>
              <span className="ml-auto flex items-center gap-2">
                <ExternalLink className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <Image 
                src="https://ghchart.rshah.org/00ff99/pentoshi007"
                alt="GitHub Contributions"
                width={722}
                height={112}
                className="w-full min-w-[650px]"
                loading="lazy"
                unoptimized
              />
            </div>
          </a>

          {/* TryHackMe Stats */}
          <div 
            ref={thmRef as React.RefObject<HTMLDivElement>}
            className={`hacker-card p-5 md:p-6 anim-hidden anim-slide-right ${thmVisible ? 'anim-visible' : ''}`}
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#0fa]/10">
              <Shield className="w-5 h-5 text-[#0fa]" />
              <span className="font-mono text-sm text-[#0fa]">tryhackme_stats</span>
              <div className="ml-auto status-dot" />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div ref={iframeContainerRef} className="flex-shrink-0 w-full sm:w-auto overflow-hidden" style={{ minHeight: 100 }}>
                {loadIframe ? (
                  <iframe 
                    src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3110287" 
                    width="320"
                    height="100"
                    frameBorder="0"
                    scrolling="no"
                    className="rounded max-w-full"
                    style={{ border: 'none', overflow: 'hidden' }}
                    title="TryHackMe Badge"
                  />
                ) : (
                  <div className="w-[320px] h-[100px] max-w-full rounded bg-[#12121a] border border-[#0fa]/10 flex items-center justify-center">
                    <span className="font-mono text-xs text-gray-600">loading badge...</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                  Actively learning offensive security through hands-on labs and CTF challenges.
                </p>
                <a 
                  href="https://tryhackme.com/p/aniket00736" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-gray-400 hover:text-[#0fa] transition-colors flex items-center gap-2"
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
