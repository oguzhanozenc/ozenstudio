"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SignatureHero() {
  const prefersReduced = useReducedMotion();
  const [mount, setMount] = useState(false);
  useEffect(() => setMount(true), []);

  return (
    <section className="relative isolate min-h-[92vh] w-full overflow-hidden bg-white text-neutral-900 rounded-3xl shadow-lg">
      {/* brand gradient (hero) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.96]"
        style={{
          background:
            "linear-gradient(180deg,#ffa264 0%,#ffe6d2 35%,#f7f7f5 55%,#d1f3ff 80%,#03c4d6 115%)",
        }}
      />
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/grain.png')] bg-[length:800px_800px] opacity-[0.04]"
      />

      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 pb-20 pt-24 md:flex-row md:gap-16 md:px-12 lg:px-16">
        {/* LEFT — editorial copy */}
        <div className="md:flex-1">
          {/* logo + atelier stamp row */}
          <div className="mb-8 flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Ozenstudio mark"
              width={56}
              height={56}
              className="rounded-xl border border-white/60 shadow-xl backdrop-blur-md"
              priority
            />
            <AtelierStamp />
          </div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={
              mount && !prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1 }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-balance text-[clamp(2rem,5.2vw,3.6rem)] font-light leading-[1.08]"
          >
            <OzenWord /> is a small{" "}
            <span className="font-normal">design & code atelier</span> in
            Istanbul—building{" "}
            <RotatingWords
              words={["identities", "websites", "systems"]}
              interval={1800}
            />{" "}
            for artists, founders, and creative brands.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={
              mount && !prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1 }
            }
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
            className="mt-6 max-w-[62ch] text-lg leading-relaxed text-neutral-700"
          >
            We work end-to-end—concept to production—so what ships feels
            considered, durable, and quietly premium.
          </motion.p>

          {/* Pledge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={mount && !prefersReduced ? { opacity: 1 } : { opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="mt-5 flex items-center gap-3 text-sm text-neutral-600"
          >
            <span className="inline-flex h-6 items-center rounded-full border border-neutral-300/80 bg-white px-3">
              No outsourcing
            </span>
            <span className="inline-flex h-6 items-center rounded-full border border-neutral-300/80 bg-white px-3">
              Design + code in-house
            </span>
            <span className="hidden h-6 items-center rounded-full border border-neutral-300/80 bg-white px-3 md:inline-flex">
              Fewer, deeper projects
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
              mount && !prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1 }
            }
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.16 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/contact"
              className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              Start a project
            </Link>
            <Link
              href="/work"
              className="rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
            >
              See work
            </Link>
            <Link
              href="/process"
              className="group inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900"
            >
              Process
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — studio card */}
        <motion.aside
          initial={{ opacity: 0, y: 10 }}
          animate={
            mount && !prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1 }
          }
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
          className="md:w-[380px]"
        >
          <div className="sticky top-8 rounded-2xl border border-black/10 bg-white/80 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-neutral-500">
                Availability
              </div>
              <EditionBadge />
            </div>

            <SlotsBar taken={1} total={3} />

            <div className="mt-4 text-sm text-neutral-600">
              1 of 3 project slots is currently active. If timing matters, reach
              out—briefs under 2 weeks get priority.
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <FeaturePill>Identity Systems</FeaturePill>
              <FeaturePill>Marketing Sites</FeaturePill>
              <FeaturePill>Editorial / Portfolio</FeaturePill>
              <FeaturePill>E-commerce</FeaturePill>
            </div>

            <div className="mt-6 border-t border-dashed pt-4 text-xs text-neutral-500">
              Istanbul • GMT+3 • Replies within 24h
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

/* ───────────────── helpers ───────────────── */

function OzenWord() {
  return (
    <span className="relative -mx-[2px] inline-block border-b-2 border-dotted border-neutral-600 px-[2px]">
      <span className="font-editorial italic">o</span>
      <span className="font-editorial">zenstudio</span>
      {/* subtle glow on hover */}
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-[4px] bg-[#007AFF]/10 opacity-0 transition-opacity duration-150 hover:opacity-100" />
    </span>
  );
}

function RotatingWords({
  words,
  interval = 1800,
}: {
  words: string[];
  interval?: number;
}) {
  // purely CSS rotation; ensure each word has its slot
  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-baseline">
      <span
        className="inline-flex flex-col animate-rotateWords will-change-transform"
        style={{ animationDuration: `${interval * words.length}ms` }}
      >
        {words.map((w, i) => (
          <span key={i} className="leading-none">
            {w}
          </span>
        ))}
      </span>
      <style jsx>{`
        @keyframes rotateWords {
          0% {
            transform: translateY(0%);
          }
          ${words
            .map((_, i) => {
              const step = (100 / words.length) * (i + 1);
              return `${step}% { transform: translateY(-${(i + 1) * 100}%); }`;
            })
            .join("\n")}
        }
        .animate-rotateWords {
          animation-name: rotateWords;
          animation-timing-function: steps(${words.length});
          animation-iteration-count: infinite;
        }
      `}</style>
    </span>
  );
}

function AtelierStamp() {
  const year = new Date().getFullYear();
  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border border-neutral-300/80 bg-white/80 px-3 py-1 text-[11px] leading-none text-neutral-600 shadow-sm">
      <span className="font-mono">IST</span>
      <span className="h-3 w-px bg-neutral-300" />
      <span>Edition №001</span>
      <span className="h-3 w-px bg-neutral-300" />
      <span>Since {year}</span>
    </div>
  );
}

function EditionBadge() {
  const year = new Date().getFullYear();
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-300/80 bg-white px-2 py-1 text-[10px] uppercase tracking-widest text-neutral-500">
      Studio · {year}
    </span>
  );
}

function SlotsBar({ taken, total }: { taken: number; total: number }) {
  const percent = Math.min(100, Math.max(0, (taken / total) * 100));
  return (
    <div>
      <div className="h-2 w-full rounded-full bg-neutral-200">
        <div
          className="h-2 rounded-full bg-neutral-900 transition-[width] duration-500"
          style={{ width: `${percent}%` }}
          aria-hidden
        />
      </div>
      <div className="mt-2 text-xs text-neutral-600">
        {total - taken} slots open
      </div>
    </div>
  );
}

function FeaturePill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-700 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      {children}
    </div>
  );
}
