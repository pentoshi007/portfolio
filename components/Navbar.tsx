'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'about', href: '#about' },
  { label: 'arsenal', href: '#skills' },
  { label: 'ops', href: '#experience' },
  { label: 'projects', href: '#projects' },
  { label: 'certs', href: '#certifications' },
  { label: 'stats', href: '#stats' },
  { label: 'ping', href: '#contact' },
  { label: 'blogs', href: '/blogs' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#0fa]/20' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            <div className="flex items-center gap-1 font-mono text-sm">
              <span className="text-[#0fa]">$</span>
              <span className="text-white">aniket</span>
              <span className="text-[#0fa] group-hover:opacity-100 opacity-70 transition-opacity">_</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 font-mono text-xs text-gray-500 hover:text-[#0fa] transition-colors"
              >
                <span className="text-[#0fa]/50">[{i}]</span> {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#0fa] hover:bg-[#0fa]/10 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0a0a0f] border-b border-[#0fa]/20 backdrop-blur-md">
          <div className="px-4 py-4 font-mono text-sm space-y-1">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-3 text-white hover:text-[#0fa] hover:bg-[#0fa]/10 transition-colors rounded"
              >
                <span className="text-[#0fa] mr-2">{'>>'}</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
