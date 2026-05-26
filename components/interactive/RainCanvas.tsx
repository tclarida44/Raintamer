"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Ratio (0..1) of canvas height where rain should appear caught. */
  catchY?: number;
  /** Small horizontal splash burst near the catch line. */
  splash?: boolean;
  /**
   * Density multiplier. 1 = standard ambient rain; lower = lighter shower.
   * Default tuned to read as "weather, not a wall."
   */
  density?: number;
};

/**
 * Canvas-based rain effect for the hero. Two parallax layers (far + near)
 * with varied opacity, length, and speed so the rain reads as depth rather
 * than a flat overlay. Performance budget < 1.5ms/frame on a mid-tier laptop.
 * Disabled entirely on prefers-reduced-motion.
 */
export function RainCanvas({ catchY, splash = true, density = 0.7 }: Props = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let mounted = true;

    type Drop = {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      width: number;
      /** Depth layer: 0 = far (small/faint), 1 = near (big/bright) */
      layer: 0 | 1;
    };

    type Splash = {
      x: number;
      y: number;
      life: number;
      maxLife: number;
    };

    let drops: Drop[] = [];
    let splashes: Splash[] = [];

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const base = Math.floor(area / 11000);
      const count = Math.min(220, Math.floor(base * density));

      drops = new Array(count).fill(0).map((_, i) => {
        // ~80% far (subtle), ~20% near (a few visible streaks)
        const layer: 0 | 1 = i % 5 === 0 ? 1 : 0;
        return makeDrop(width, height, layer);
      });
    };

    const makeDrop = (w: number, h: number, layer: 0 | 1): Drop => {
      if (layer === 1) {
        return {
          x: Math.random() * (w + 60) - 30,
          y: Math.random() * h,
          length: 14 + Math.random() * 14,
          speed: 8 + Math.random() * 6,
          opacity: 0.18 + Math.random() * 0.18,
          width: 1.1,
          layer,
        };
      }
      return {
        x: Math.random() * (w + 60) - 30,
        y: Math.random() * h,
        length: 6 + Math.random() * 10,
        speed: 5 + Math.random() * 6,
        opacity: 0.06 + Math.random() * 0.12,
        width: 0.7,
        layer,
      };
    };

    const tick = () => {
      if (!mounted) return;
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";

      const catchLine = catchY != null ? catchY * height : null;
      const FADE_BAND = 32;

      // Draw far layer first, then near, so near reads on top
      for (let pass = 0; pass < 2; pass++) {
        const targetLayer = pass as 0 | 1;
        for (const drop of drops) {
          if (drop.layer !== targetLayer) continue;
          let alpha = drop.opacity;
          let landed = false;

          if (catchLine != null) {
            if (drop.y + drop.length >= catchLine) {
              if (splash && Math.random() < 0.35) {
                splashes.push({
                  x: drop.x,
                  y: catchLine,
                  life: 0,
                  maxLife: 8 + Math.random() * 6,
                });
              }
              landed = true;
            } else if (drop.y + drop.length > catchLine - FADE_BAND) {
              const t = (catchLine - (drop.y + drop.length)) / FADE_BAND;
              alpha *= Math.max(0, t);
            }
          }

          if (!landed) {
            ctx.lineWidth = drop.width;
            ctx.strokeStyle = `rgba(190, 221, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x - 1.4, drop.y + drop.length);
            ctx.stroke();
          }

          drop.y += drop.speed;
          drop.x -= 0.5;

          const resetTrigger = landed || drop.y > height + 30;
          if (resetTrigger) {
            const fresh = makeDrop(width, height, drop.layer);
            drop.y = -20 - Math.random() * 60;
            drop.x = fresh.x;
            drop.length = fresh.length;
            drop.speed = fresh.speed;
            drop.opacity = fresh.opacity;
          }
        }
      }

      // Splash particles
      if (splash && splashes.length) {
        const next: Splash[] = [];
        for (const s of splashes) {
          s.life += 1;
          if (s.life >= s.maxLife) continue;
          const t = s.life / s.maxLife;
          const r = 1 + t * 7;
          ctx.beginPath();
          ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(190, 221, 255, ${0.35 * (1 - t)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          next.push(s);
        }
        splashes = next;
      }

      raf = window.requestAnimationFrame(tick);
    };

    setSize();
    tick();

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [catchY, splash, density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}
