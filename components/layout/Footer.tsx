import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { CITIES } from "@/lib/cities";

export function Footer() {
  return (
    <footer className="border-t border-bone-50/10 bg-ink-1000">
      <Container size="full" className="py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="full" />
            <p className="mt-10 font-display text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-bone-50 sm:text-5xl">
              Built to tame
              <br />
              Oklahoma weather.
            </p>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="mt-10 inline-block font-display text-2xl font-medium text-bone-50 transition-colors hover:text-rain-400"
            >
              {SITE.phone}
            </a>
            <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
              Oklahoma City, OK · Since {SITE.founded}
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-7 lg:gap-16">
            <FooterCol title="Services">
              {SERVICES.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}>{s.shortTitle}</Link>
              ))}
            </FooterCol>
            <FooterCol title="Service Areas">
              {CITIES.slice(0, 6).map((c) => (
                <Link key={c.slug} href={`/service-areas/${c.slug}`}>{c.name}</Link>
              ))}
              <Link href="/service-areas" className="text-rain-400">All cities</Link>
            </FooterCol>
            <FooterCol title="Company">
              <Link href="/about">About</Link>
              <Link href="/visualizer">Visualizer</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/payments">Pay Invoice</Link>
              <Link href="/contact">Get an Estimate</Link>
            </FooterCol>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-bone-50/10 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
            © {new Date().getFullYear()} {SITE.legalName}. Licensed and insured.
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
            Oklahoma City, OK
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Eyebrow>{title}</Eyebrow>
      <div className="mt-6 flex flex-col gap-3 [&_a]:text-[15px] [&_a]:text-bone-300 [&_a]:transition-colors [&_a:hover]:text-bone-50">
        {children}
      </div>
    </div>
  );
}

