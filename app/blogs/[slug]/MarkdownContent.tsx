'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert prose-green max-w-none
      prose-headings:text-white prose-headings:font-bold
      prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
      prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3 prose-h2:text-[#0fa]
      prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-2
      prose-p:text-gray-300 prose-p:leading-relaxed prose-p:my-4
      prose-a:text-[#0fa] prose-a:no-underline hover:prose-a:underline
      prose-strong:text-white prose-strong:font-semibold
      prose-code:text-[#0fa] prose-code:bg-[#0fa]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
      prose-pre:bg-[#111118] prose-pre:border prose-pre:border-[#0fa]/20 prose-pre:rounded-lg prose-pre:overflow-x-auto
      prose-ul:text-gray-300 prose-ul:my-4
      prose-ol:text-gray-300 prose-ol:my-4
      prose-li:my-1
      prose-blockquote:border-l-[#0fa] prose-blockquote:text-gray-400 prose-blockquote:italic
      prose-hr:border-[#0fa]/20
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
