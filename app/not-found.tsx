import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

const QUICK_LINKS = [
  { label: "Seamless Gutters", href: "/services/seamless-gutters" },
  { label: "French Drains", href: "/services/french-drains" },
  { label: "Gutter Guards", href: "/services/gutter-guards" },
  { label: "Commercial Gutters", href: "/services/commercial-gutters" },
  { label: "Gutter Cleaning", href: "/services/gutter-cleaning" },
  { label: "Gutter Visualizer", href: "/visualizer" },
  { label: "Project Gallery", href: "/gallery" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About Rain Tamer", href: "/about" },
  { label: "Pay Invoice", href: "/payments" },
  { label: "Blog", href: "/blog" },
  { label: "Contact / Free Estimate", href: "/contact" },
];

export default function NotFound() {
  return (
    <Container size="full" className="flex min-h-[80vh] flex-col justify-center py-32">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-6 max-w-3xl font-display font-medium tracking-[-0.045em] text-bone-50 text-[clamp(3rem,8vw,7rem)] leading-[0.9]">
        That page didn&apos;t survive the storm.
      </h1>
      <p className="mt-8 max-w-xl text-[17px] leading-[1.55] text-bone-300">
        The page you&apos;re looking for doesn&apos;t exist, or it lived on the old raintamer.com and the new URL is somewhere in the list below.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Back home</Button>
        <Button href="/contact" variant="outline">Get a Free Estimate</Button>
      </div>

      {/* Quick-link grid so old-site visitors can find what they came for */}
      <div className="mt-16 border-t border-bone-50/10 pt-10">
        <Eyebrow>Where to go from here</Eyebrow>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group inline-flex items-center gap-2 text-[16px] text-bone-100 transition-colors hover:text-rain-400"
              >
                {l.label}
                <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
