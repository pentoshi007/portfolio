'use client';

import { useState, useEffect } from 'react';
import { List, X, ChevronRight } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractHeadings(markdown: string): TOCItem[] {
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2]
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();
    
    headings.push({
      id: generateSlug(text),
      text,
      level,
    });
  }

  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-[#0a0a0f] border border-[#0fa]/30 rounded-full shadow-lg hover:border-[#0fa] transition-all group"
        aria-label="Toggle table of contents"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-[#0fa]" />
        ) : (
          <List className="w-5 h-5 text-gray-400 group-hover:text-[#0fa] transition-colors" />
        )}
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0a0a0f]/98 border-l border-[#0fa]/20 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col pt-20 pb-6 px-4">
          <div className="flex items-center gap-2 mb-6 text-[#0fa] font-mono text-sm">
            <span className="text-gray-500">$</span> table_of_contents
          </div>

          <nav className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
            <ul className="space-y-1">
              {headings.map((heading, index) => (
                <li key={`${heading.id}-${index}`}>
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`w-full text-left py-2 px-3 rounded transition-all font-mono text-sm flex items-center gap-2 ${
                      activeId === heading.id
                        ? 'bg-[#0fa]/10 text-[#0fa]'
                        : 'text-gray-400 hover:text-white hover:bg-[#0fa]/5'
                    }`}
                    style={{ paddingLeft: `${(heading.level - 1) * 12 + 12}px` }}
                  >
                    <ChevronRight className={`w-3 h-3 flex-shrink-0 transition-transform ${
                      activeId === heading.id ? 'text-[#0fa]' : 'text-gray-600'
                    }`} />
                    <span className="line-clamp-2">{heading.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
