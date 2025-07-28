"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

export default function AboutPageClient() {
  const manifesto = [
    "ozenstudio is a design and development practice based in Istanbul — working globally with independent artists, early-stage founders, and creative brands who care how things are made.",
    "We design identities, build websites, and shape cohesive visuals across digital and physical spaces. From screen to print, concept to code — everything is handled in-house, with precision and care.",
    "The studio is led by Oğuzhan Özenç — a developer with a design eye. From the first sketch to the final build, nothing is outsourced. Every detail stays close.",
    "The name comes from the Turkish word “özen” — and from the founder’s own name. It’s a reminder: how something is made matters as much as what it becomes.",
    "In a culture built on shortcuts, we choose intention.",
  ];

  const picRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: picRef,
    offset: ["start 0.2", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <main className="relative text-neutral-900 font-sans">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-white via-[#f9f7f5] to-[#f3f0ec]" />
      <div className="fixed inset-0 -z-10 bg-[url('/grain.png')] bg-cover opacity-[0.05] mix-blend-overlay" />

      {/* Grid layout */}
      <section className="relative mx-auto max-w-7xl grid md:grid-cols-12 min-h-[100dvh]">
        {/* Left column: Manifesto */}
        <div className="col-span-12 md:col-span-7 pt-40 pb-32 px-6 md:px-8 lg:px-12 space-y-24">
          {/* Heading */}
          <div className="text-left">
            <p className="text-base md:text-lg font-light text-neutral-500 tracking-tight uppercase mb-1">
              The Story Behind
            </p>

            <h1 className="text-[clamp(2.5rem,7vw,3.75rem)] font-light tracking-tight leading-tight text-black">
              <span className="inline-flex gap-[0.02em]">
                {"ozenstudio".split("").map((l, i) => (
                  <span
                    key={i}
                    className="inline-block"
                    style={{
                      fontFamily: '"EB Garamond", serif',
                      fontWeight: 300,
                      fontStyle: i === 0 ? "italic" : "normal",
                    }}
                  >
                    {l}
                  </span>
                ))}
              </span>
            </h1>

            <div className="pt-3">
              <div className="inline-flex items-center gap-1 text-xs font-mono border border-dotted border-neutral-300 px-3 py-[6px] rounded-md bg-white/60 backdrop-blur-md shadow-sm">
                📌 “özen” (n.): Turkish for care, precision, and thoughtfulness.
              </div>
            </div>
          </div>

          {/* Copy blocks with vertical line and sparkle */}
          <div className="relative">
            <div className="absolute -left-8 top-0 bottom-0 hidden md:flex flex-col items-center z-10">
              <Sparkles className="w-4 h-4 text-zinc-400 animate-pulse mb-1" />
              <div className="w-px flex-1 bg-gradient-to-b from-zinc-400/30 via-zinc-300/20 to-transparent" />
            </div>

            <div className="flex flex-col gap-20 text-balance">
              {manifesto.map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="text-[18px] leading-[1.85]"
                >
                  {text.includes("“özen”")
                    ? text.split("“özen”").map((t, k, arr) => (
                        <span key={k}>
                          {t}
                          {k < arr.length - 1 && (
                            <span className="font-mono text-neutral-900">
                              “özen”
                            </span>
                          )}
                        </span>
                      ))
                    : text}
                </motion.p>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="border-t pt-14 border-neutral-200">
            <Link
              href="/contact"
              className="underline underline-offset-4 decoration-neutral-400 hover:decoration-black font-mono text-base tracking-tight transition"
            >
              If you’re building something that deserves more than default — we
              should talk. ↗
            </Link>
          </div>
        </div>

        {/* Right column: Portrait */}
        <div className="col-span-12 md:col-span-5 relative">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <motion.div
              ref={picRef}
              style={{ scale }}
              className="relative w-[75vw] md:w-[30vw] aspect-[3/4] rounded-3xl overflow-hidden border border-white/30 bg-white/40 backdrop-blur-xl shadow-xl"
            >
              <Image
                src="/founder.jpg"
                alt="Oğuzhan Özenç portrait"
                fill
                sizes="(max-width: 768px) 70vw, (max-width: 1024px) 40vw, 400px"
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL="/founder-blur.jpg"
              />
              <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none rounded-3xl" />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
