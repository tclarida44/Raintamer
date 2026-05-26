"use client";

import { useState } from "react";
import { Twitter, Facebook, Link as LinkIcon, Check } from "lucide-react";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const tweet = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  const cls =
    "flex size-9 items-center justify-center rounded-[3px] border border-bone-50/10 text-bone-300 transition-colors hover:border-rain-500 hover:text-rain-400";

  return (
    <div className="flex items-center gap-2">
      <a href={tweet} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className={cls}>
        <Twitter className="size-4" />
      </a>
      <a href={fb} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className={cls}>
        <Facebook className="size-4" />
      </a>
      <button onClick={copy} aria-label="Copy link" className={cls}>
        {copied ? <Check className="size-4 text-rain-400" /> : <LinkIcon className="size-4" />}
      </button>
    </div>
  );
}
