"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Visualizer", href: "/visualizer" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "Company", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-ink-1000/90 backdrop-blur border-b border-bone-50/8"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1640px] items-center justify-between px-6 md:px-10 lg:px-16">
        <Link href="/" className="flex items-center" aria-label="Rain Tamer home">
          <Logo variant="compact" />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] text-bone-300 transition-colors hover:text-bone-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-300 hover:text-bone-50 transition-colors"
          >
            {SITE.phone}
          </a>
          <Button href="/contact" size="md">Get an Estimate</Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex items-center justify-center size-10 rounded-[3px] border border-bone-50/12 text-bone-50"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute inset-x-0 top-16 bg-ink-1000/97 backdrop-blur border-b border-bone-50/8">
          <nav className="flex flex-col px-6 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-bone-50/8 py-4 font-display text-2xl text-bone-50"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${SITE.phoneTel}`}
              className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-300"
            >
              {SITE.phone}
            </a>
            <Button href="/contact" className="mt-4 w-full">Get an Estimate</Button>
          </nav>
        </div>
      )}
    </header>
  );
}

