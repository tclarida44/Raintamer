"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type ServiceMenuItem = { label: string; href: string; tagline: string };

const SERVICES_MENU: ServiceMenuItem[] = [
  { label: "Seamless Gutters", href: "/services/seamless-gutters", tagline: "K-style, box, and half-round profiles. Cut on site, run continuous." },
  { label: "French Drains", href: "/services/french-drains", tagline: "Stop the foundation water before it costs you." },
  { label: "Gutter Guards", href: "/services/gutter-guards", tagline: "Keep leaves out so water keeps moving." },
  { label: "Commercial", href: "/services/commercial-gutters", tagline: "Heavier gauge, oversized outlets, scheduled around your hours." },
  { label: "Cleaning", href: "/services/gutter-cleaning", tagline: "Twice-yearly maintenance with photos of every visit." },
];

type MenuKey = "services" | null;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<MenuKey>(null);
  const [barHidden, setBarHidden] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  // Body scroll lock while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Auto-hide the nav bar (background + nav items) on scroll down, restore
  // on scroll up. Logo stays visible independently.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      // Always show near the top of the page
      if (y < 120) {
        setBarHidden(false);
      } else if (delta > 6) {
        // Scrolling down past a small threshold
        setBarHidden(true);
        setActiveMenu(null); // close any open dropdown
      } else if (delta < -6) {
        // Scrolling up
        setBarHidden(false);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // CRITICAL: close any open dropdown when the route changes — fixes the
  // "black box lingering on the next page" bug the owner flagged.
  useEffect(() => {
    setActiveMenu(null);
    setOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  const openMenu = useCallback((menu: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(menu);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Frosted glass bar — dark ink base + brand-blue tint so nav elements
          read clearly against any hero photo. Fades AWAY when the user
          scrolls DOWN past the hero, comes back on scroll UP. Backdrop-blur
          lives here (not the outer header) so it disappears with the bar. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 border-b border-rain-500/20 backdrop-blur-md transition-opacity duration-300 ease-out",
          barHidden ? "opacity-0" : "opacity-100",
        )}
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,11,0.72) 0%, rgba(31,102,255,0.14) 55%, rgba(10,10,11,0.20) 100%)",
        }}
      />
      {/* Whole bar shares the same bottom baseline as the logo wordmark. */}
      <div className="relative mx-auto flex h-24 max-w-[1640px] items-end justify-between px-6 pb-3 md:px-10 lg:h-28 lg:px-16 lg:pb-4">
        {/* Logo — always visible, unaffected by the auto-hide. Persistent
            drop-shadow so it stays legible even when the bar is faded out
            and the logo is floating over page content. */}
        <Link
          href="/"
          className="relative z-10 flex items-center drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]"
          aria-label="Rain Tamer home"
        >
          <Logo variant="compact" />
        </Link>

        {/* Nav row — fades + shifts up in lockstep with the bar. */}
        <div
          className={cn(
            "hidden lg:flex flex-1 items-center justify-between pl-12 xl:pl-20 transition-all duration-300 ease-out",
            barHidden ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0",
          )}
          aria-hidden={barHidden}
        >
          <nav className="flex flex-1 items-center justify-around">
            <NavDropdownTrigger
              label="Services"
              href="/services"
              active={activeMenu === "services"}
              onEnter={() => openMenu("services")}
              onLeave={scheduleClose}
            />
            <NavLink href="/gallery" label="Gallery" />
            <NavLink href="/about" label="About" />
            <Link
              href="/payments"
              className="text-[20px] font-medium text-rain-400 hover:text-rain-300 transition-colors"
            >
              Pay
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="text-[20px] font-medium text-bone-100 hover:text-bone-50 transition-colors"
            >
              {SITE.phone}
            </a>
          </nav>
          <Button href="/contact" size="lg" className="ml-8 xl:ml-12">Get an Estimate</Button>
        </div>

        {/* Mobile menu toggle — also fades with the bar; still tappable on
            scroll-up since we drop the pointer-events-none once visible. */}
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "lg:hidden flex items-center justify-center size-11 rounded-[3px] border border-bone-50/20 bg-ink-1000/50 text-bone-50 backdrop-blur transition-all duration-300 ease-out",
            barHidden ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-hidden={barHidden}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Services mega-menu */}
      {activeMenu === "services" && (
        <div
          className="absolute left-1/2 top-full hidden -translate-x-1/2 lg:block"
          onMouseEnter={() => openMenu("services")}
          onMouseLeave={scheduleClose}
        >
          <ServicesMegaPanel onSelect={() => setActiveMenu(null)} />
        </div>
      )}

      {/* Mobile expanded menu */}
      {open && (
        <div className="lg:hidden absolute inset-x-0 top-20 max-h-[calc(100svh-5rem)] overflow-y-auto bg-ink-1000/97 backdrop-blur border-b border-bone-50/8">
          <nav className="flex flex-col px-6 py-6">
            <MobileExpandable
              label="Services"
              expanded={mobileExpanded === "services"}
              onToggle={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
            >
              {SERVICES_MENU.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 pl-5 text-[16px] text-bone-200 border-b border-bone-50/5"
                >
                  {s.label}
                </Link>
              ))}
              <Link
                href="/visualizer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-3 pl-5 font-mono text-[11px] uppercase tracking-[0.22em] text-rain-400 border-b border-bone-50/5"
              >
                <Sparkles className="size-3.5" />
                Open the Visualizer
              </Link>
            </MobileExpandable>

            <Link
              href="/gallery"
              onClick={() => setOpen(false)}
              className="border-b border-bone-50/8 py-4 font-display text-2xl text-bone-50"
            >
              Gallery
            </Link>

            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="border-b border-bone-50/8 py-4 font-display text-2xl text-bone-50"
            >
              About
            </Link>

            <Link
              href="/service-areas"
              onClick={() => setOpen(false)}
              className="border-b border-bone-50/8 py-4 font-display text-2xl text-bone-50"
            >
              Service Areas
            </Link>

            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="border-b border-bone-50/8 py-4 font-display text-2xl text-bone-50"
            >
              Blog
            </Link>

            <Link
              href="/payments"
              onClick={() => setOpen(false)}
              className="border-b border-bone-50/8 py-4 font-display text-2xl text-rain-400"
            >
              Pay Invoice
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="border-b border-bone-50/8 py-4 font-display text-2xl text-bone-50"
            >
              Contact
            </Link>

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

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-[20px] font-medium text-bone-100 transition-colors hover:text-bone-50"
    >
      {label}
    </Link>
  );
}

function NavDropdownTrigger({
  label,
  href,
  active,
  onEnter,
  onLeave,
}: {
  label: string;
  href: string;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link
        href={href}
        aria-haspopup="true"
        aria-expanded={active}
        className={cn(
          "flex items-center gap-1.5 text-[20px] font-medium transition-colors",
          active ? "text-bone-50" : "text-bone-100 hover:text-bone-50",
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-5 transition-transform duration-200",
            active ? "rotate-180 text-rain-400" : "text-bone-500",
          )}
        />
      </Link>
    </div>
  );
}

function ServicesMegaPanel({ onSelect }: { onSelect: () => void }) {
  return (
    <div className="mt-1 w-[min(92vw,820px)] origin-top rounded-[3px] border border-bone-50/12 bg-ink-1000/97 p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-baseline justify-between border-b border-bone-50/10 pb-3">
        <Eyebrow>What we install</Eyebrow>
        <Link
          href="/services"
          onClick={onSelect}
          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-300"
        >
          All services
          <ArrowUpRight className="size-3" />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SERVICES_MENU.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            onClick={onSelect}
            className="group flex flex-col gap-2 rounded-[3px] border border-bone-50/8 bg-ink-950/50 p-4 transition-all hover:border-rain-500/40 hover:bg-rain-500/[0.04]"
          >
            <span className="font-display text-[17px] font-medium text-bone-50 transition-colors group-hover:text-rain-400">
              {s.label}
            </span>
            <span className="text-[12.5px] leading-[1.45] text-bone-400">
              {s.tagline}
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/visualizer"
        onClick={onSelect}
        className="group mt-5 flex items-center justify-between gap-4 rounded-[3px] border border-rain-500/30 bg-rain-500/[0.08] p-4 transition-colors hover:border-rain-500/60 hover:bg-rain-500/[0.12]"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-[3px] bg-rain-500/20 text-rain-400">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="font-display text-[15px] font-medium text-bone-50">
              Open the Visualizer
            </p>
            <p className="text-[12px] text-bone-300">
              Try profile + color combos before you call.
            </p>
          </div>
        </div>
        <ArrowUpRight className="size-4 text-rain-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

function MobileExpandable({
  label,
  expanded,
  onToggle,
  children,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-bone-50/8">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between py-4 font-display text-2xl text-bone-50"
      >
        {label}
        <ChevronDown
          className={cn(
            "size-5 transition-transform duration-200 text-bone-500",
            expanded && "rotate-180 text-rain-400",
          )}
        />
      </button>
      {expanded && <div className="pb-2">{children}</div>}
    </div>
  );
}
