"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  const [hovering, setHovering] = useState(false);
  const [typed, setTyped] = useState(false);

  /* hover listeners */
  useEffect(() => {
    if (!typed) return;
    const word = document.querySelector<HTMLSpanElement>(".ozenstudio-text");
    if (!word) return;
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);
    word.addEventListener("mouseenter", enter);
    word.addEventListener("mouseleave", leave);
    return () => {
      word.removeEventListener("mouseenter", enter);
      word.removeEventListener("mouseleave", leave);
    };
  }, [typed]);

  /* handle injection (once) */
  useEffect(() => {
    if (!typed) return;
    const word = document.querySelector<HTMLSpanElement>(".ozenstudio-text");
    if (!word || word.dataset.handles === "ready") return;

    ["left", "right"].forEach((side) => {
      const span = document.createElement("span");
      span.className =
        `ios-handle absolute ${
          side === "left" ? "-left-2 -top-2" : "-right-2 -bottom-2"
        } ` + "flex flex-col items-center pointer-events-none";
      span.innerHTML =
        side === "left"
          ? `<span class="w-[10px] h-[10px] rounded-full bg-[#007AFF]"></span><span class="w-[2px] flex-1 bg-[#007AFF]"></span>`
          : `<span class="w-[2px] flex-1 bg-[#007AFF]"></span><span class="w-[10px] h-[10px] rounded-full bg-[#007AFF]"></span>`;
      word.appendChild(span);
    });
    word.dataset.handles = "ready";
  }, [typed]);

  return (
    <section
      ref={ref}
      className="relative isolate w-full min-h-screen overflow-hidden bg-white text-neutral-900"
    >
      {/* grain */}
      <div className="absolute inset-0 z-0 opacity-[0.035] bg-[url('/grain.png')] bg-cover pointer-events-none" />

      {/* content column, vertically centered */}
      <div className="relative z-10 flex min-h-screen flex-col items-start justify-center px-6 md:px-30 pb-32 pt-24">
        {/* headline row */}
        <div className="flex flex-col items-center gap-4">
          {/* logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Image
              src="/logo.png"
              alt="Ozenstudio mark"
              width={44}
              height={44}
              className="shrink-0 rounded-md border border-neutral-300 shadow-sm"
            />
          </motion.div>

          {/* headline with typewriter */}
          <div className="relative">
            <h2 className="min-h-[5rem] text-4xl font-light leading-tight tracking-tight md:text-5xl">
              {inView ? (
                <Typewriter
                  options={{ delay: 35, cursor: "_", deleteSpeed: 0 }}
                  onInit={(tw) => {
                    tw.typeString(
                      `<span class="ozenstudio-text inline-flex gap-[0.02em] px-[2px] cursor-pointer border-b-[3px] border-dotted border-neutral-500">` +
                        `ozenstudio`
                          .split("")
                          .map(
                            (c, i) =>
                              `<span class="font-editorial ${
                                i === 0 ? "italic" : ""
                              }">${c}</span>`
                          )
                          .join("") +
                        `</span> is a design and development practice based in Istanbul — working globally with artists, founders, and creative brands who care how things are made. `
                    )
                      .pauseFor(400)
                      .typeString(
                        "<br/> Led by Oğuzhan Özenç, we create identities, build websites, and shape visuals across digital and physical spaces — with precision, clarity, and care."
                      )
                      .callFunction(() => setTyped(true))
                      .start();
                  }}
                />
              ) : (
                <span className="opacity-0">placeholder</span>
              )}
            </h2>

            {/* hover badge */}
            <AnimatePresence>
              {hovering && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute -top-12 left-0 z-50 rounded-md border border-dotted border-neutral-400 bg-white/95 px-3 py-1.5 font-mono text-xs tracking-wide text-neutral-600 shadow-lg backdrop-blur-sm pointer-events-none"
                >
                  📌 “özen” (n.): Turkish for care, precision, and
                  thoughtfulness.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ↓ little call‑to‑action */}
        <AnimatePresence>
          {typed && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            >
              <Link
                href="/about"
                className="group mt-12 flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-700 hover:text-neutral-900"
              >
                <span>read the story</span>
                {/* arrow nudge */}
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  ↗
                </motion.span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        /* EB Garamond util class (because Tailwind can’t autogenerate @font‑face) */
        .font-editorial {
          font-family: "EB Garamond", serif;
          font-weight: 300;
        }

        /* interaction visuals */
        .ozenstudio-text {
          position: relative;
          transition: filter 0.18s ease;
        }
        .ozenstudio-text:hover {
          filter: brightness(1.07);
        }
        /* blue highlight rectangle */
        .ozenstudio-text::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 4px;
          background: rgba(0, 122, 255, 0.25);
          opacity: 0;
          transition: opacity 0.18s ease;
          z-index: -1;
        }
        .ozenstudio-text:hover::before {
          opacity: 1;
        }
        /* handles */
        .ios-handle {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .ozenstudio-text:hover .ios-handle {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </section>
  );
}
