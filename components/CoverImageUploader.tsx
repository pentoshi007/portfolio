"use client";

import { ChangeEvent, useRef, useState } from "react";
import {
  Image as ImageIcon,
  Loader2,
  Upload,
  X,
} from "lucide-react";

interface CoverImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
}

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export default function CoverImageUploader({
  value,
  onChange,
}: CoverImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewError, setPreviewError] = useState(false);

  const handleFile = async (file: File) => {
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

      setPreviewError(false);
      onChange(result.url);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Image upload failed",
      );
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;
    await handleFile(file);
  };

  const onUrlChange = (next: string) => {
    setPreviewError(false);
    onChange(next);
  };

  const clearImage = () => {
    setPreviewError(false);
    setUploadError("");
    onChange("");
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        aria-label="Upload cover image"
        title="Upload cover image"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={onFileChange}
        className="hidden"
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <div className="relative flex-1">
          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="url"
            value={value}
            onChange={(e) => onUrlChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-[#0a0a0f] border border-[#0fa]/20 text-white text-sm focus:border-[#0fa] focus:outline-none"
            placeholder="https://example.com/image.jpg or upload a file"
          />
          {value && (
            <button
              type="button"
              onClick={clearImage}
              aria-label="Clear cover image"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#0fa]/30 text-gray-200 font-mono text-xs hover:border-[#0fa] hover:text-[#0fa] transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>{uploading ? "uploading..." : "upload image"}</span>
        </button>
      </div>

      {uploadError && (
        <p className="font-mono text-xs text-red-400">{uploadError}</p>
      )}

      {value && !previewError && (
        <div className="relative overflow-hidden border border-[#0fa]/20 bg-[#0a0a0f]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Cover preview"
            onError={() => setPreviewError(true)}
            className="block w-full max-h-72 object-cover"
          />
        </div>
      )}

      {value && previewError && (
        <p className="font-mono text-xs text-yellow-400">
          Could not load preview from this URL.
        </p>
      )}
    </div>
  );
}
