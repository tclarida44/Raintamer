import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PROJECTS, type Project } from "@/lib/projects";

// Hand-picked 6-tile lineup for the homepage. First 3 slots show
// current K-style hero shots; last 3 slots showcase profile + service
// variety: drain trench, half-round, and box gutter — one strong
// example of each so the section reads as breadth-of-work, not just
// K-style variations.
const HOMEPAGE_FEATURED_IDS = [
  "aug-k5-01",
  "aug-k5-02",
  "aug-k5-03",
  "aug-dr-04",
  "hr-04",
  "aug-box-01",
] as const;

const HOMEPAGE_FEATURED = HOMEPAGE_FEATURED_IDS
  .map((id) => PROJECTS.find((p) => p.id === id))
  .filter((p): p is (typeof PROJECTS)[number] => Boolean(p));

function ProjectStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="num text-3xl text-bone-50 sm:text-4xl">{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">{label}</span>
    </div>
  );
}

export function ProjectsGrid() {
  return (
    <section className="brand-ambient border-b border-bone-50/10 py-16 lg:py-24">
      <Container size="full">
        <SectionLabel number="06" label="Selected Work" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>A look at the line</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
                Recent work.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <Reveal>
              <p className="max-w-2xl text-[17px] leading-[1.6] text-bone-300">
                Real Rain Tamer installs across the OKC metro. Copper half-round, seamless K-style, modern box profiles, French drains, and gutter guards — six recent shots below, the full library waits in the gallery.
              </p>
              <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-6 border-t border-bone-50/10 pt-6">
                <ProjectStat value="42,000+" label="Projects since 2010" />
                <ProjectStat value="11" label="Metro cities" />
                <ProjectStat value="67" label="In the gallery" />
                <Link
                  href="/gallery"
                  className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
                >
                  See full gallery
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-4 lg:gap-6">
          {HOMEPAGE_FEATURED.map((p, i) => (
            <Reveal
              key={p.id}
              delayMs={i * 80}
              className={
                i === 0
                  ? "col-span-12 lg:col-span-8"
                  : i === 1
                  ? "col-span-12 lg:col-span-4"
                  : i === 2
                  ? "col-span-12 sm:col-span-6 lg:col-span-5"
                  : i === 3
                  ? "col-span-12 sm:col-span-6 lg:col-span-7"
                  : "col-span-12 sm:col-span-6"
              }
            >
              <ProjectCard project={p} large={i === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <article className="group relative">
      <div
        className={`relative overflow-hidden border border-bone-50/10 ${
          large ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={project.image}
          alt={`${project.title}, ${project.location}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          quality={75}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-bone-50 sm:text-2xl">
          {project.title}
        </h3>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
          {project.location}
        </span>
      </div>
      <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
        {project.service}
      </p>
    </article>
  );
}
