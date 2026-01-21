'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function ProgressiveImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className = '',
  priority = false,
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#0fa]/5 to-[#0fa]/10 transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-[#0fa]/5 to-transparent" />
      </div>
      
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        className={`transition-all duration-700 ${
          isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        priority={priority}
        quality={85}
      />
    </div>
  );
}
