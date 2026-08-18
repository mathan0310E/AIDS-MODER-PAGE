"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { galleryCategories, galleryImages } from "@/data/department";
import { CloseIcon } from "@/components/icons";

export function Gallery() {
  const [category, setCategory] = useState<string>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      category === "All"
        ? galleryImages
        : galleryImages.filter((img) => img.category === category),
    [category],
  );

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight")
        setLightbox((v) => (v === null ? v : (v + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setLightbox((v) =>
          v === null ? v : (v - 1 + filtered.length) % filtered.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length, close]);

  return (
    <section id="gallery" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-violet-bright uppercase">
            › Gallery
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Moments from the{" "}
            <span className="text-gradient-magenta">department</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base text-mist-soft">
            Campus, department, laboratories, events, workshops, student
            projects, industrial visits and achievements — in pictures.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mt-8 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter gallery by category"
          >
            {["All", ...galleryCategories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCategory(c);
                  setLightbox(null);
                }}
                aria-pressed={category === c}
                className={`rounded-full border px-3.5 py-1.5 font-display text-xs transition-all ${
                  category === c
                    ? "border-cyan bg-cyan/15 text-cyan"
                    : "border-mist-faint/20 text-mist-soft hover:border-cyan/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {filtered.length > 0 ? (
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((img, i) => (
              <li key={img.id}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="card-accent group block w-full overflow-hidden rounded-lg"
                  aria-label={`Open image: ${img.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="card-accent grid aspect-[4/3] place-items-center rounded-lg p-3 text-center"
              >
                <span className="font-mono text-[10px] leading-relaxed text-mist-faint">
                  Photo placeholder
                  <br />
                  (replaceable via admin)
                </span>
              </div>
            ))}
          </div>
        )}

        {lightbox !== null && filtered[lightbox] && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={filtered[lightbox].alt}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-void/90 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-cyan/20 text-mist hover:border-cyan/40 hover:text-cyan"
            >
              <CloseIcon className="size-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}
