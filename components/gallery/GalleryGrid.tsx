"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PROJECTS, SERVICE_FILTERS, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/lib/services";

type FilterKey = ServiceSlug | "all";

export function GalleryGrid() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.serviceSlug === filter)),
    [filter],
  );

  return (
    <>
      {/* Filter bar */}
      <div className="border-b border-bone-50/10 bg-ink-1000/85 backdrop-blur sticky top-16 z-30">
        <div className="mx-auto flex w-full max-w-[1640px] flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4 md:px-10 lg:px-16">
          <Eyebrow>Filter</Eyebrow>
          <div className="flex flex-wrap items-center gap-1.5">
            {SERVICE_FILTERS.map((opt) => {
              const active = filter === opt.slug;
              return (
                <button
                  key={opt.slug}
                  onClick={() => setFilter(opt.slug as FilterKey)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-[3px] border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] transition-colors",
                    active
                      ? "border-rain-500 bg-rain-500 text-ink-1000"
                      : "border-bone-50/10 bg-transparent text-bone-300 hover:border-bone-50/30 hover:text-bone-50",
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto w-full max-w-[1640px] px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        {filtered.length === 0 ? (
          <div className="border border-bone-50/10 bg-ink-950 p-12 text-center">
            <Eyebrow>Nothing here yet</Eyebrow>
            <p className="mt-3 text-bone-300">No projects match that filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            {filtered.map((p, i) => {
              const span = layoutFor(i);
              return (
                <article
                  key={p.id}
                  className={cn("group relative", span)}
                  style={{ animation: "fadeUp 0.45s ease both", animationDelay: `${(i % 6) * 50}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(p)}
                    aria-label={`View ${p.title}`}
                    className={cn(
                      "relative block w-full overflow-hidden border border-bone-50/10",
                      i % 7 === 0 ? "aspect-[16/10]" : i % 5 === 0 ? "aspect-square" : "aspect-[4/3]",
                    )}
                  >
                    <Image
                      src={p.image}
                      alt={`${p.title}, ${p.location}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      quality={75}
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-rain-500/0 transition-colors duration-500 group-hover:bg-rain-500/10" />
                    <div className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-[3px] border border-bone-50/15 bg-ink-1000/65 text-bone-50 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </button>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-lg font-medium tracking-[-0.02em] text-bone-50 sm:text-xl">
                      {p.title}
                    </h2>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
                      {p.location}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
                    {p.service}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {lightbox && <Lightbox project={lightbox} onClose={() => setLightbox(null)} />}

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function layoutFor(i: number): string {
  // Asymmetric layout: occasionally a wider tile to break the rhythm.
  const m = i % 11;
  if (m === 0) return "col-span-12 lg:col-span-7";
  if (m === 1) return "col-span-12 sm:col-span-6 lg:col-span-5";
  if (m === 5) return "col-span-12 sm:col-span-6 lg:col-span-8";
  if (m === 6) return "col-span-12 sm:col-span-6 lg:col-span-4";
  return "col-span-12 sm:col-span-6 lg:col-span-4";
}

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-1000/85 p-6 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden border border-bone-50/15 bg-ink-950"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-[3px] border border-bone-50/15 bg-ink-1000/70 text-bone-50 backdrop-blur hover:bg-ink-1000"
        >
          <span aria-hidden className="block size-3 rotate-45 border-r-2 border-t-2 border-current" />
        </button>
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={project.image}
            alt={`${project.title}, ${project.location}`}
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
        </div>
        <div className="border-t border-bone-50/10 p-6 lg:p-8">
          <Eyebrow>{project.service}</Eyebrow>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-bone-50 sm:text-3xl">
              {project.title}
            </h3>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
              {project.location}
            </span>
          </div>
          {project.description && (
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-bone-300">{project.description}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {project.citySlug && (
              <Link
                href={`/service-areas/${project.citySlug}`}
                className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
              >
                More in {project.location}
                <ArrowUpRight className="size-3.5" />
              </Link>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
            >
              Quote this scope
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
