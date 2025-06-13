"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative isolate w-full min-h-screen bg-[#fefefe] text-neutral-900 overflow-hidden border-b border-neutral-200 px-6 md:px-20 py-32"
      id="home"
    >
      {/* Grain + Ambient Glow overlays */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/grain.svg')] opacity-[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#f9f9f9] to-[#ebebeb] opacity-[0.9] z-0" />

      <div className="relative z-10 max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Terminal-inspired Meta */}
        <div className="md:col-span-2 flex flex-col gap-4 border-r border-neutral-200 pr-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500">
            ozenstudio.log // 001
          </span>
          <div className="w-[1px] h-24 bg-neutral-300 my-2" />

          <p className="text-sm text-neutral-600 leading-relaxed font-mono max-w-xs">
            Archive engaged.
            <br />
            No clones detected.
            <br />
            Custom systems live.
          </p>

          <p className="mt-6 font-mono text-xs text-neutral-500">
            $ status --studio
            <br />
            <span className="text-green-700">
              › online
              {showCursor && <span className="animate-pulse">▍</span>}
            </span>
          </p>
        </div>

        {/* Narrative & CTA */}
        <div className="md:col-span-3 space-y-10 max-w-prose">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight text-neutral-900">
            A Creative Studio
            <br />
            for Artists, Creators, and Unconventional Brands
          </h1>

          <p className="text-lg text-neutral-700 leading-relaxed">
            ozenstudio helps artists and early brands tell their story, through
            custom visuals, digital experiences, and creative systems. From
            expressive websites to campaign assets and visual identities, every
            project is shaped by a thoughtful process and a distinct point of
            view.
          </p>

          <p className="text-md text-neutral-600 italic mt-2">
            If your work doesn’t belong in a template — neither should your
            site, logo, or story.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="mailto:hello@ozenstudio.com"
              className="group relative inline-flex items-center justify-center overflow-hidden px-6 py-3 font-mono text-sm tracking-tight bg-black text-white border border-black rounded-full hover:bg-neutral-900 transition"
            >
              <span className="relative z-10">Start a Project</span>
              <span className="absolute inset-0 z-0 bg-white opacity-0 group-hover:opacity-[0.06] transition duration-300 rounded-full" />
            </a>

            <a
              href="#work"
              className="group relative inline-flex items-center justify-center overflow-hidden px-6 py-3 font-mono text-sm tracking-tight text-neutral-900 border border-neutral-300 rounded-full hover:border-neutral-800 hover:bg-neutral-100 transition"
            >
              <span className="relative z-10">See Past Work</span>
              <span className="absolute inset-0 z-0 bg-white opacity-0 group-hover:opacity-100 transition duration-300 rounded-full" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
