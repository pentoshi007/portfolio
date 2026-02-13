'use client';

import { useState, useEffect } from 'react';

const typingLines = [
  '> initializing system...',
  '> loading modules: [react, nextjs, node, nmap, burp]',
  '> establishing secure connection...',
  '> access granted.',
  '',
  '> cat /etc/profile',
  'ROLE="Full-Stack Developer + Security Analyst"',
  'LOCATION="New Delhi, India"',
  'STATUS="Available for opportunities"',
  '',
  '> ./achievements --list',
  '[+] 8+ production apps deployed',
  '[+] Top 1% on TryHackMe',
  '[+] 200+ CTF challenges pwned',
  '[+] 20+ secure API endpoints built',
];

const getLineStyle = (line: string) => {
  if (line.startsWith('>')) return 'text-[#0fa]';
  if (line.startsWith('[+]')) return 'text-emerald-400';
  if (line.includes('=')) return 'text-amber-400';
  return 'text-gray-400';
};

export default function TerminalAnimation() {
  const [mounted, setMounted] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (currentLine >= typingLines.length) return;

    const line = typingLines[currentLine];

    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, line.startsWith('>') ? 15 : 8);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, line === '' ? 100 : 150);
      return () => clearTimeout(timeout);
    }
  }, [mounted, currentLine, currentChar]);

  if (!mounted) {
    return (
      <div className="p-4 font-mono text-xs md:text-sm h-[280px] overflow-hidden">
        {typingLines.slice(0, 8).map((line, i) => (
          <div key={i} className={`${getLineStyle(line)} ${line === '' ? 'h-3' : ''}`}>
            {line}
          </div>
        ))}
        <div className="text-[#0fa]">
          {'>'} <span className="inline-block w-2 h-4 bg-[#0fa] ml-0.5 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 font-mono text-xs md:text-sm h-[280px] overflow-hidden">
      {displayedLines.map((line, i) => (
        <div key={i} className={`${getLineStyle(line)} ${line === '' ? 'h-3' : ''}`}>
          {line}
        </div>
      ))}
      {currentLine < typingLines.length && (
        <div className={getLineStyle(typingLines[currentLine])}>
          {typingLines[currentLine].slice(0, currentChar)}
          <span className="inline-block w-2 h-4 bg-[#0fa] ml-0.5 animate-pulse" />
        </div>
      )}
      {currentLine >= typingLines.length && (
        <div className="text-[#0fa] mt-2">
          {'>'} <span className="inline-block w-2 h-4 bg-[#0fa] animate-pulse" />
        </div>
      )}
    </div>
  );
}
