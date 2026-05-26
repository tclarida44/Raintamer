"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function BlogTagFilter({ tags, active }: { tags: string[]; active?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href="/blog"
        className={cn(
          "rounded-[3px] border px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] transition-colors",
          !active
            ? "border-rain-500 bg-rain-500 text-ink-1000"
            : "border-bone-50/10 bg-transparent text-bone-300 hover:border-bone-50/30 hover:text-bone-50",
        )}
      >
        All posts
      </Link>
      {tags.map((t) => {
        const isActive = active === t;
        return (
          <Link
            key={t}
            href={`/blog?tag=${encodeURIComponent(t)}`}
            className={cn(
              "rounded-[3px] border px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] transition-colors",
              isActive
                ? "border-rain-500 bg-rain-500 text-ink-1000"
                : "border-bone-50/10 bg-transparent text-bone-300 hover:border-bone-50/30 hover:text-bone-50",
            )}
          >
            {t}
          </Link>
        );
      })}
    </div>
  );
}
