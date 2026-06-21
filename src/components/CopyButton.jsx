"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ textToCopy, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-gray-light)] hover:text-[var(--theme-accent)] transition-colors bg-[rgba(255,255,255,0.05)] hover:bg-[var(--color-accent)]/10 px-2 py-1 rounded-md"
      title="Copy to clipboard"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-[var(--theme-accent)]" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : label}
    </button>
  );
}
