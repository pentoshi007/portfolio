'use client';

import { useState } from 'react';
import { Share2, Link2, Check, Twitter, Linkedin, Facebook, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:text-[#1DA1F2]',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-[#0A66C2]',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-[#1877F2]',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:text-[#25D366]',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-500 hover:text-[#0fa] transition-colors font-mono text-xs group"
        aria-label="Share this post"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">share</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-8 z-50 bg-[#0a0a0f] border border-[#0fa]/20 rounded-lg shadow-xl p-3 min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="text-[#0fa] font-mono text-xs mb-3 flex items-center gap-2">
              <span className="text-gray-500">$</span> share_post
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-[#0fa]/10 rounded transition-all font-mono text-sm"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#0fa]" />
              ) : (
                <Link2 className="w-4 h-4" />
              )}
              <span>{copied ? 'copied!' : 'copy link'}</span>
            </button>

            <div className="border-t border-[#0fa]/10 my-2" />

            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-[#0fa]/10 rounded transition-all font-mono text-sm ${link.color}`}
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
