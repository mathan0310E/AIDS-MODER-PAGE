"use client";

import { useEffect, useRef } from "react";

/**
 * A soft cyan spotlight that follows the cursor — adds depth and a sense of
 * interactivity across the whole page. Hidden on touch devices.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      el.style.display = "none";
      return;
    }
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[5] size-[500px] rounded-full opacity-40"
      style={{
        background:
          "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 60%)",
      }}
      aria-hidden="true"
    />
  );
}
