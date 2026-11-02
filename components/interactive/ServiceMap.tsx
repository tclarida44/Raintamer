"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CITIES, type City } from "@/lib/cities";
import "leaflet/dist/leaflet.css";

/**
 * Real OKC metro map using Leaflet + CartoDB Dark Matter tiles.
 * Free, no API key required. Markers are custom HTML divIcons in brand blue
 * so they match the rest of the site.
 *
 * Leaflet itself is dynamically imported inside useEffect so it never runs
 * during SSR (Leaflet touches window/document at import time).
 */
export function ServiceMap() {
  const [active, setActive] = useState<City | null>(CITIES[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<Map<string, import("leaflet").Marker>>(new Map());
  const LRef = useRef<typeof import("leaflet") | null>(null);

  // Init the map once on mount
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const Lmod = await import("leaflet");
      const L = Lmod.default ?? Lmod;
      if (cancelled || !containerRef.current || mapRef.current) return;
      LRef.current = L;

      const map = L.map(containerRef.current, {
        center: [35.45, -97.6],
        zoom: 10,
        scrollWheelZoom: false,
        zoomControl: false,
        // Keep Leaflet's attribution control enabled (required by Esri's
        // tile terms) but let the tileLayer provide the credit string
        // rather than Leaflet's default "Leaflet | ..." prefix.
        attributionControl: true,
      });
      map.attributionControl.setPrefix("");

      // Esri World Dark Gray Canvas — free, no API key, matches the
      // site's dark theme. Previously used CARTO's dark_all basemap but
      // CARTO started requiring an API key in late 2026 and the tiles
      // began rendering as "API KEY REQUIRED" placeholders.
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 16,
          attribution: "Tiles © Esri",
        },
      ).addTo(map);

      // Reference overlay with labels (city/road names) on top of the
      // basemap, so the Esri tiles aren't blank gray without context.
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 16,
          attribution: "",
        },
      ).addTo(map);

      CITIES.forEach((c) => {
        const marker = L.marker([c.lat, c.lng], {
          icon: makeIcon(L, c.slug === active?.slug),
          title: c.name,
        }).addTo(map);
        marker.on("click", () => setActive(c));
        markersRef.current.set(c.slug, marker);
      });

      // Fit the bounds to all served cities with padding
      const bounds = L.latLngBounds(CITIES.map((c) => [c.lat, c.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [40, 40] });

      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
      }
    };
    // Run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update marker icons + recenter when active changes
  useEffect(() => {
    const L = LRef.current;
    const map = mapRef.current;
    if (!L || !map) return;
    markersRef.current.forEach((marker, slug) => {
      marker.setIcon(makeIcon(L, slug === active?.slug));
    });
    if (active) {
      map.panTo([active.lat, active.lng], { animate: true, duration: 0.6 });
    }
  }, [active]);

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-8">
        <div
          ref={containerRef}
          className="aspect-[4/3] w-full overflow-hidden border border-bone-50/10 bg-ink-950 lg:aspect-[16/11]"
          role="application"
          aria-label="Map of Oklahoma City metro service areas"
        />
      </div>

      <div className="lg:col-span-4">
        {active && (
          <div className="border border-bone-50/10 bg-ink-950 p-8">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400">
              Now showing
            </p>
            <h3 className="mt-3 font-display text-4xl font-medium tracking-[-0.025em] text-bone-50">
              {active.name}
            </h3>
            <p className="mt-4 text-[14.5px] leading-[1.6] text-bone-300">{active.intro}</p>
            <Link
              href={`/service-areas/${active.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-[3px] bg-rain-500 px-5 py-2.5 text-sm font-medium text-ink-1000 transition-colors hover:bg-rain-400"
            >
              Schedule in {active.name}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        )}

        <div className="mt-3 border border-bone-50/10 bg-ink-950 p-8">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
            All service areas
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14px]">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => setActive(c)}
                  className={`text-left transition-colors ${
                    active?.slug === c.slug ? "text-rain-400" : "text-bone-300 hover:text-bone-50"
                  }`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Map style overrides + custom marker styling */}
      <style jsx global>{`
        .leaflet-container {
          background: #0e0e10;
          font-family: var(--font-body);
          outline: none;
        }
        .leaflet-tile-pane {
          filter: saturate(0.85) contrast(1.05);
        }
        .leaflet-control-attribution {
          display: none;
        }
        .rt-marker {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(31, 102, 255, 0.85);
          border: 2px solid rgba(245, 245, 240, 0.55);
          box-shadow: 0 0 10px rgba(31, 102, 255, 0.45);
          transition: transform 0.2s ease;
          cursor: pointer;
        }
        .rt-marker:hover {
          transform: scale(1.15);
        }
        .rt-marker-active {
          width: 20px;
          height: 20px;
          background: #1f66ff;
          border: 2px solid #f5f5f0;
          box-shadow:
            0 0 0 6px rgba(31, 102, 255, 0.18),
            0 0 22px rgba(31, 102, 255, 0.75);
        }
      `}</style>
    </div>
  );
}

function makeIcon(L: typeof import("leaflet"), isActive: boolean) {
  const size = isActive ? 20 : 14;
  return L.divIcon({
    className: "",
    html: `<div class="${isActive ? "rt-marker rt-marker-active" : "rt-marker"}"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}
