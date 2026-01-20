import { useState, useEffect, ReactNode } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  typing?: boolean;
}

export default function TerminalWindow({ title = 'terminal', children, typing = false }: TerminalWindowProps) {
  return (
    <div className="terminal-box rounded-lg overflow-hidden border border-[#0fa]/30 bg-[#0a0a0f]/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#111]/80 border-b border-[#0fa]/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="ml-2 text-xs text-[#0fa]/60 font-mono">{title}</span>
        <div className="ml-auto flex gap-2 text-[#0fa]/40 text-xs font-mono">
          <span>bash</span>
        </div>
      </div>
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  );
}

interface TypewriterProps {
  lines: { prefix?: string; text: string; delay?: number }[];
  onComplete?: () => void;
}

export function Typewriter({ lines, onComplete }: TypewriterProps) {
  const [displayedLines, setDisplayedLines] = useState<{ prefix: string; text: string }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLine >= lines.length) {
      onComplete?.();
      return;
    }

    const line = lines[currentLine];
    const fullText = line.text;

    if (currentChar < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, 20 + Math.random() * 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, { prefix: line.prefix || '', text: fullText }]);
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, line.delay || 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, lines, onComplete]);

  return (
    <div className="space-y-1">
      {displayedLines.map((line, i) => (
        <div key={i} className="flex">
          {line.prefix && <span className="text-[#0fa] mr-2">{line.prefix}</span>}
          <span className="text-gray-300">{line.text}</span>
        </div>
      ))}
      {currentLine < lines.length && (
        <div className="flex">
          {lines[currentLine].prefix && (
            <span className="text-[#0fa] mr-2">{lines[currentLine].prefix}</span>
          )}
          <span className="text-gray-300">
            {lines[currentLine].text.slice(0, currentChar)}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-[#0fa]`}>_</span>
          </span>
        </div>
      )}
    </div>
  );
}
