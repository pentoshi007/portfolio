'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Components } from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-[#0fa] mt-8 mb-4 border-b border-[#0fa]/20 pb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-200 mt-4 mb-2">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="text-gray-300 leading-relaxed my-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-[#0fa] hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="text-white font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-gray-300 italic">{children}</em>
    ),
    code: ({ className, children }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="text-[#0fa] bg-[#0fa]/10 px-1.5 py-0.5 rounded font-mono text-sm">
            {children}
          </code>
        );
      }
      return (
        <code className={className}>{children}</code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-[#111118] border border-[#0fa]/20 rounded-lg p-4 overflow-x-auto my-4 font-mono text-sm">
        {children}
      </pre>
    ),
    ul: ({ children }) => (
      <ul className="text-gray-300 my-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="text-gray-300 my-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-300">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#0fa] pl-4 my-4 text-gray-400 italic">
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr className="border-[#0fa]/20 my-8" />
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border border-[#0fa]/20">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-[#0fa]/10 text-[#0fa] px-4 py-2 text-left font-mono text-sm border border-[#0fa]/20">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-gray-300 border border-[#0fa]/20">{children}</td>
    ),
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
