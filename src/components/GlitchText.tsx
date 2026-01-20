import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

    const triggerGlitch = () => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        let iterations = 0;
        const maxIterations = 10;

        const interval = setInterval(() => {
          setDisplayText(
            text
              .split('')
              .map((char, index) => {
                if (char === ' ') return ' ';
                if (index < iterations) return text[index];
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              })
              .join('')
          );

          iterations++;
          if (iterations > maxIterations) {
            clearInterval(interval);
            setDisplayText(text);
            setIsGlitching(false);
          }
        }, 30);
      }
    };

    const interval = setInterval(triggerGlitch, 3000);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`relative ${className}`}>
      <span className={isGlitching ? 'animate-pulse' : ''}>{displayText}</span>
      {isGlitching && (
        <>
          <span className="absolute inset-0 text-red-500 opacity-70" style={{ transform: 'translateX(-2px)' }}>
            {displayText}
          </span>
          <span className="absolute inset-0 text-cyan-400 opacity-70" style={{ transform: 'translateX(2px)' }}>
            {displayText}
          </span>
        </>
      )}
    </span>
  );
}
