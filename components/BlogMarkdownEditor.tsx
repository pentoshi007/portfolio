"use client";

import {
  ChangeEvent,
  ClipboardEvent,
  DragEvent,
  KeyboardEvent,
  ReactNode,
  useRef,
  useState,
} from "react";
import {
  AlertTriangle,
  Bold,
  CheckSquare,
  Code2,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Table2,
} from "lucide-react";

interface BlogMarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}

interface ToolbarAction {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export default function BlogMarkdownEditor({
  value,
  onChange,
  rows = 20,
  placeholder = "Write your blog content here...",
}: BlogMarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const updateTextarea = (nextValue: string, cursorPosition: number) => {
    onChange(nextValue);
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(cursorPosition, cursorPosition);
    });
  };

  const insertText = (before: string, after = "", fallback = "") => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(`${value}${before}${fallback}${after}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.slice(start, end) || fallback;
    const nextValue = `${value.slice(0, start)}${before}${selectedText}${after}${value.slice(end)}`;
    const cursorPosition =
      start + before.length + selectedText.length + after.length;

    updateTextarea(nextValue, cursorPosition);
  };

  const insertSnippetAt = (snippet: string, position?: number) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(`${value}${snippet}`);
      return;
    }

    const currentValue = textarea.value;
    const start = Math.min(
      position ?? textarea.selectionStart,
      currentValue.length,
    );
    const end = position === undefined ? textarea.selectionEnd : start;
    const nextValue = `${currentValue.slice(0, start)}${snippet}${currentValue.slice(end)}`;

    updateTextarea(nextValue, start + snippet.length);
  };

  const insertSnippet = (snippet: string) => {
    insertSnippetAt(snippet);
  };

  const insertLinePrefix = (prefix: string, fallback: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(`${value}${prefix}${fallback}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const nextLineBreak = value.indexOf("\n", start);
    const blockEnd =
      end > start ? end : nextLineBreak === -1 ? value.length : nextLineBreak;
    const selectedText = value.slice(lineStart, blockEnd) || fallback;
    const nextText = selectedText
      .split("\n")
      .map((line) => `${prefix}${line}`)
      .join("\n");
    const nextValue = `${value.slice(0, lineStart)}${nextText}${value.slice(blockEnd)}`;

    updateTextarea(nextValue, lineStart + nextText.length);
  };

  const insertLink = () => {
    const textarea = textareaRef.current;
    const selectedText = textarea
      ? value.slice(textarea.selectionStart, textarea.selectionEnd)
      : "";
    const text = window.prompt("Link text", selectedText || "read more");
    if (!text) return;

    const url = window.prompt("Link URL", "https://");
    if (!url) return;

    insertSnippet(`[${text}](${url})`);
  };

  const insertImageUrl = () => {
    const url = window.prompt("Image URL", "https://");
    if (!url) return;

    const alt =
      window.prompt("Image alt text", "blog screenshot") || "blog image";
    insertSnippet(`\n![${alt}](${url})\n`);
  };

  const uploadFile = async (file: File, insertAt?: number) => {
    if (!IMAGE_TYPES.has(file.type)) {
      setUploadError("Only JPG, PNG, WebP, and GIF images are allowed");
      return;
    }

    setUploadError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/uploads/images", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Image upload failed");
      }

      const alt =
        file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") ||
        "blog image";
      insertSnippetAt(`\n![${alt}](${result.url})\n`, insertAt);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Image upload failed",
      );
    } finally {
      setUploading(false);
    }
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    await uploadFile(file, textareaRef.current?.selectionStart);
  };

  const handlePaste = async (event: ClipboardEvent<HTMLTextAreaElement>) => {
    const image = Array.from(event.clipboardData.files).find((file) =>
      IMAGE_TYPES.has(file.type),
    );

    if (!image) return;

    const insertAt = event.currentTarget.selectionStart;
    event.preventDefault();
    await uploadFile(image, insertAt);
  };

  const handleDrop = async (event: DragEvent<HTMLTextAreaElement>) => {
    const image = Array.from(event.dataTransfer.files).find((file) =>
      IMAGE_TYPES.has(file.type),
    );

    if (!image) return;

    const insertAt = event.currentTarget.selectionStart;
    event.preventDefault();
    await uploadFile(image, insertAt);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(event.metaKey || event.ctrlKey)) return;

    if (event.key.toLowerCase() === "b") {
      event.preventDefault();
      insertText("**", "**", "bold text");
    }

    if (event.key.toLowerCase() === "i") {
      event.preventDefault();
      insertText("*", "*", "italic text");
    }

    if (event.key.toLowerCase() === "k") {
      event.preventDefault();
      insertLink();
    }
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const actions: ToolbarAction[] = [
    {
      label: "heading",
      icon: <Heading2 className="w-4 h-4" />,
      onClick: () => insertLinePrefix("## ", "New section"),
    },
    {
      label: "bold",
      icon: <Bold className="w-4 h-4" />,
      onClick: () => insertText("**", "**", "bold text"),
    },
    {
      label: "italic",
      icon: <Italic className="w-4 h-4" />,
      onClick: () => insertText("*", "*", "italic text"),
    },
    {
      label: "link",
      icon: <Link className="w-4 h-4" />,
      onClick: insertLink,
    },
    {
      label: "image URL",
      icon: <ImageIcon className="w-4 h-4" />,
      onClick: insertImageUrl,
    },
    {
      label: uploading ? "uploading..." : "upload image",
      icon: uploading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <ImageIcon className="w-4 h-4" />
      ),
      onClick: () => fileInputRef.current?.click(),
      disabled: uploading,
    },
    {
      label: "quote",
      icon: <Quote className="w-4 h-4" />,
      onClick: () => insertLinePrefix("> ", "Important note"),
    },
    {
      label: "list",
      icon: <List className="w-4 h-4" />,
      onClick: () => insertLinePrefix("- ", "List item"),
    },
    {
      label: "numbered",
      icon: <ListOrdered className="w-4 h-4" />,
      onClick: () => insertLinePrefix("1. ", "Step"),
    },
    {
      label: "task",
      icon: <CheckSquare className="w-4 h-4" />,
      onClick: () => insertLinePrefix("- [ ] ", "Task item"),
    },
    {
      label: "important",
      icon: <AlertTriangle className="w-4 h-4" />,
      onClick: () => insertLinePrefix("> **Important:** ", "Key point"),
    },
    {
      label: "divider",
      icon: <Minus className="w-4 h-4" />,
      onClick: () => insertSnippet("\n---\n"),
    },
    {
      label: "table",
      icon: <Table2 className="w-4 h-4" />,
      onClick: () =>
        insertSnippet("\n| Item | Notes |\n| --- | --- |\n|  |  |\n"),
    },
    {
      label: "code block",
      icon: <Code2 className="w-4 h-4" />,
      onClick: () => insertText("\n```bash\n", "\n```\n", "command here"),
    },
  ];

  return (
    <div className="border border-[#0fa]/20 bg-[#0a0a0f] focus-within:border-[#0fa]">
      <input
        ref={fileInputRef}
        type="file"
        aria-label="Upload blog image"
        title="Upload blog image"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={uploadImage}
        className="hidden"
      />

      <div className="flex flex-wrap gap-2 border-b border-[#0fa]/20 bg-[#111118] p-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            disabled={action.disabled}
            className="flex items-center gap-1.5 border border-[#0fa]/20 px-2.5 py-1.5 font-mono text-[11px] text-gray-300 transition-colors hover:border-[#0fa]/50 hover:text-[#0fa] disabled:cursor-not-allowed disabled:opacity-50"
            title={action.label}
          >
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {uploadError && (
        <div className="border-b border-red-500/20 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-300">
          {uploadError}
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onPaste={handlePaste}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        onKeyDown={handleKeyDown}
        required
        rows={rows}
        className="w-full resize-none bg-[#0a0a0f] px-4 py-3 font-mono text-sm text-white focus:outline-none"
        placeholder={placeholder}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#0fa]/20 bg-[#111118] px-3 py-2 font-mono text-[11px] text-gray-500">
        <span>
          {wordCount} words · {readingTime} min read · {value.length} chars
        </span>
        <span>
          Paste or drop screenshots directly · shortcuts: ⌘/Ctrl+B, I, K
        </span>
      </div>
    </div>
  );
}
