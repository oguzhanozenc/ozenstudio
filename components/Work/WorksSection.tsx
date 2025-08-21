"use client";

import { useMemo, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { WorkCard } from "@/components/Work/WorkCard";
import { Work as BaseWork } from "@/data/worksData";

type Work = BaseWork & {
  metrics?: string[];
  tags?: string[];
  audience?: string;
  featured?: boolean;
};

type Props = {
  works: Work[];
  title?: string;
  description?: string;
  credibilityLogos?: Array<{ src: string; alt: string }>;
  defaultFilter?: "all" | "artists" | "founders" | "brands";
};

const AUDIENCE_LABELS: Record<string, string> = {
  all: "All Work",
  artists: "Artists",
  founders: "Founders",
  brands: "Creative Brands",
};

function normalizeAudience(
  p?: unknown
): "artists" | "founders" | "brands" | null {
  const v = String(p ?? "").toLowerCase();
  if (v === "artist" || v === "artists") return "artists";
  if (v === "founder" || v === "founders") return "founders";
  if (v === "brand" || v === "brands" || v === "creative brands")
    return "brands";
  return null;
}

export function WorksSection({
  works,
  title = "Selected Work",
  description = "A few builds that show our range — from identity systems to bespoke, conversion-minded websites.",
  credibilityLogos,
  defaultFilter = "all",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  const [filter, setFilter] = useState<
    "all" | "artists" | "founders" | "brands"
  >(defaultFilter);
  const [isFilterTransitioning, setIsFilterTransitioning] = useState(false);

  // Derive available audience filters from data
  const availableFilters = useMemo(() => {
    const found = new Set<"artists" | "founders" | "brands">();
    works.forEach((p) => {
      const aud =
        normalizeAudience((p as Work).audience) ||
        (Array.isArray((p as Work).tags)
          ? (p as Work).tags?.map(normalizeAudience).find(Boolean) || null
          : null);
      if (aud) found.add(aud);
    });

    const order: Array<"artists" | "founders" | "brands"> = [
      "artists",
      "founders",
      "brands",
    ];
    const final = order.filter((k) => found.has(k));
    return final.length
      ? (["all", ...final] as const)
      : (["all", "artists", "founders", "brands"] as const);
  }, [works]);

  const filtered = useMemo(() => {
    const list = works.slice();
    // Surface featured first if present
    list.sort(
      (a: Work, b: Work) => (b?.featured ? 1 : 0) - (a?.featured ? 1 : 0)
    );

    if (filter === "all") return list;

    return list.filter((p: Work) => {
      const aud =
        normalizeAudience(p?.audience) ||
        (Array.isArray(p?.tags)
          ? p.tags.map(normalizeAudience).find(Boolean) || null
          : null);
      return aud === filter;
    });
  }, [works, filter]);

  const handleFilterChange = (newFilter: typeof filter) => {
    if (newFilter === filter || isFilterTransitioning) return;

    setIsFilterTransitioning(true);
    setTimeout(() => {
      setFilter(newFilter);
      setTimeout(() => setIsFilterTransitioning(false), 100);
    }, 200);
  };

  return (
    <section
      ref={containerRef}
      // Keep layout width stable when page height changes (prevents “jump” on scrollbar toggle)
      style={{ scrollbarGutter: "stable both-edges" }}
      className="w-full py-6 px-5 md:px-10 lg:px-20 xl:px-28"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="mb-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
              WORK
            </div>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Filter Pills - stable width wrapper to prevent header reflow */}
          <div
            className="
              relative
              w-full sm:w-[320px] md:w-[360px]
            "
          >
            <div className="grid grid-cols-4 gap-1">
              {availableFilters.map((key) => {
                const active = filter === key;
                return (
                  <motion.button
                    key={key}
                    onClick={() =>
                      handleFilterChange(
                        key as "all" | "artists" | "founders" | "brands"
                      )
                    }
                    className={[
                      "relative inline-flex items-center justify-center",
                      "px-2 py-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wide",
                      "transition-[transform,opacity] duration-300",
                      active
                        ? "text-neutral-900"
                        : "text-neutral-500 hover:text-neutral-700",
                    ].join(" ")}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* underline indicator that does NOT change element height */}
                    <span className="relative">
                      {AUDIENCE_LABELS[key]}
                      <span
                        className={[
                          "pointer-events-none absolute left-0 right-0 -bottom-[5px] h-px",
                          active ? "bg-neutral-900" : "bg-transparent",
                        ].join(" ")}
                      />
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl lg:text-2xl font-light tracking-tight text-neutral-900 leading-snug">
            {title}
          </h2>
          <p className="text-[13px] lg:text-sm text-neutral-600 font-light leading-relaxed max-w-lg">
            {description}
          </p>
        </div>
      </motion.div>

      {/* Credibility Strip */}
      {credibilityLogos?.length ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mb-5 pb-2.5 border-b border-neutral-200/60"
        >
          <div className="flex items-center gap-3 opacity-60">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wide text-neutral-400">
              Trusted by
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {credibilityLogos.map((logo, i) => (
                <motion.img
                  key={`${logo.alt}-${i}`}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-3.5 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* Projects List (compact) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {filtered.length > 0 ? (
          <motion.div
            className="grid gap-3 lg:gap-4"
            layout
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {filtered.map((work, index) => {
              const p = work as Work;
              const metrics: string[] = Array.isArray(p?.metrics)
                ? p.metrics.slice(0, 2)
                : [];
              const audience =
                normalizeAudience(p?.audience) ||
                (Array.isArray(p?.tags)
                  ? p.tags.map(normalizeAudience).find(Boolean) || null
                  : null);

              return (
                <motion.article
                  key={work.slug}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="group relative border-b border-neutral-200/60 pb-3 last:border-b-0"
                >
                  {/* Smaller project number */}
                  <div className="absolute -left-1 top-0 text-[28px] font-light text-neutral-100 select-none pointer-events-none leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10">
                    {/* Compact meta row */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        {audience && (
                          <span className="px-1.5 py-[2px] text-[10px] font-mono uppercase tracking-wide text-neutral-600 border border-neutral-200 rounded-full">
                            {AUDIENCE_LABELS[audience]}
                          </span>
                        )}
                        {metrics.map((metric, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-[2px] text-[10px] font-mono text-neutral-600 bg-neutral-100 rounded-full"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>

                      {p?.featured && (
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                          <div className="w-1 h-1 rounded-full bg-amber-400" />
                          <span>FEATURED</span>
                        </div>
                      )}
                    </div>

                    {/* Project card wrapper – slightly reduced visual weight */}
                    <motion.div
                      className="relative"
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    >
                      {/* If your ProjectCard supports size props, you can pass them here.
                          Otherwise this wrapper subtly reduces the perceived size via padding. */}
                      <div className="p-1 sm:p-1.5">
                        <WorkCard work={work} />
                      </div>
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10 border border-dashed border-neutral-300 rounded-2xl"
          >
            <p className="text-neutral-600 mb-3 text-sm">Coming soon...</p>
            <button
              onClick={() => handleFilterChange("all")}
              className="text-neutral-900 hover:text-neutral-600 font-mono text-xs border-b border-dotted border-neutral-300 hover:border-neutral-500 transition-colors"
            >
              View all work
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Actions - compact */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="mt-6 pt-5 border-t border-neutral-200/60"
      >
        <div className="flex items-center justify-between mb-3">
          <Link
            href="/works"
            className="group flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
          >
            <div className="w-4 h-px bg-neutral-400 group-hover:bg-neutral-600 transition-colors" />
            <span className="tracking-wide">VIEW ALL WORKS</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ↗
            </motion.span>
          </Link>

          <Link
            href="/contact"
            className="group flex items-center gap-2 text-sm font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300"
          >
            <span className="border-b border-dotted border-neutral-300 group-hover:border-neutral-500 transition-colors font-editorial">
              Start a project
            </span>
            <motion.span
              whileHover={{ x: 4, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              ↗
            </motion.span>
          </Link>
        </div>

        {/* CTA Section - compact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5 py-5 border-t border-neutral-200/60">
          <div className="lg:col-span-8 space-y-1.5">
            <div className="space-y-0.5">
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                BUILT WITH ÖZEN
              </div>
              <h3 className="text-[15px] lg:text-base font-light text-neutral-900 leading-tight">
                Have something that deserves more than default?
              </h3>
            </div>
            <p className="text-[12px] text-neutral-600 font-light leading-relaxed max-w-md">
              Identity, website, or product launch — handled end-to-end,
              in-house, with the care your vision deserves.
            </p>
          </div>

          <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-3.5 py-2 border border-neutral-300 hover:border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-full"
            >
              <span className="font-mono text-[11px] tracking-wide">
                LET&#39;S BUILD
              </span>
              <motion.span
                whileHover={{ x: 2, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                ↗
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
