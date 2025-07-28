/* components/AnimatedLogo.tsx  (safe for SSR)
   ─────────────────────────────────────────── */
"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Phase = "initial" | "pc" | "human" | "approach" | "magic";

const PHASE_TIMINGS = [
  { phase: "pc", at: 400 },
  { phase: "human", at: 1000 },
  { phase: "approach", at: 1800 },
  { phase: "magic", at: 2600 },
] as const;

const EASE = [0.25, 0.1, 0.25, 1] as const;

/* phase helper */
function usePhases(enabled: boolean) {
  const [phase, setPhase] = useState<Phase>("initial");
  const timers = useRef<number[]>([]);
  useEffect(() => {
    if (!enabled) return;
    PHASE_TIMINGS.forEach(({ phase, at }) =>
      timers.current.push(window.setTimeout(() => setPhase(phase), at))
    );
    return () => timers.current.forEach(clearTimeout);
  }, [enabled]);
  return phase;
}

/* -------------------------------------------------- */
/* main component                                     */
/* -------------------------------------------------- */
export default function AnimatedLogo() {
  const prefersReducedMotion = useReducedMotion();
  const phase = usePhases(!prefersReducedMotion);
  const [showCTA, setShowCTA] = useState(false);

  /* ----------- GAP: only read window on client ---------- */
  const [gapPx, setGapPx] = useState(280); // fallback for SSR
  useLayoutEffect(() => {
    const update = () =>
      setGapPx(Math.min(360, Math.max(220, window.innerHeight * 0.28)));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* reveal CTA after merge */
  useEffect(() => {
    if (phase === "magic") {
      const t = setTimeout(() => setShowCTA(true), 300);
      return () => clearTimeout(t);
    }
    setShowCTA(false);
  }, [phase]);

  /* mobile / heavy‑motion flag (also client‑safe) */
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const disableHeavyMotion = prefersReducedMotion || isMobile;

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden text-black select-none">
      {/* BACKDROP (unchanged) */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          backdropFilter:
            phase === "magic" ? "blur(6px) saturate(1.1)" : "blur(1.5px)",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ backdropFilter: "blur(1.5px)" }}
      />

      {/* LOGO HALVES */}
      <LogoHalf
        src="/logo-pc.png"
        side="top"
        phase={phase}
        gap={gapPx}
        disableHeavyMotion={disableHeavyMotion}
      />
      <LogoHalf
        src="/logo-human.png"
        side="bottom"
        phase={phase}
        gap={gapPx}
        disableHeavyMotion={disableHeavyMotion}
      />

      {/* ✨ sparkles after merge (unchanged) */}
      <AnimatePresence>
        {phase === "magic" && (
          <motion.span
            key="sparkles"
            className="absolute left-1/2 top-[45%] z-20 -translate-x-1/2 text-3xl select-none"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✨
          </motion.span>
        )}
      </AnimatePresence>

      {/* CTA block (unchanged) */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            key="cta"
            className="absolute z-20 left-1/2 top-[65%] -translate-x-1/2"
            initial={{ opacity: 0, y: 80, scale: 0.5, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              duration: 1.8,
              ease: EASE,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* TITLE */}
            <motion.div
              className="text-[clamp(2rem,7vw,3rem)] font-light tracking-tight text-gray-900 text-center"
              animate={{ opacity: [1, 0.85, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
                className="inline-flex gap-1"
              >
                {"ozenstudio".split("").map((l, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    style={{
                      fontFamily: '"EB Garamond", serif',
                      fontStyle: i === 0 ? "italic" : "normal",
                    }}
                    initial={{ opacity: 0, y: 30, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.8,
                      ease: EASE,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    {l}
                  </motion.span>
                ))}
              </motion.span>
            </motion.div>

            {/* SUBTITLE */}
            <motion.div
              className="mt-8 text-center text-[15px] leading-snug text-zinc-700 dark:text-zinc-300 font-editorial italic"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
            >
              We design and build with&nbsp;
              <span className="not-italic text-black dark:text-white">
                özen
              </span>{" "}
              — care, precision, intent.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------- */
/* Logo half (no window reference)                    */
/* -------------------------------------------------- */
type LogoHalfProps = {
  src: string;
  side: "top" | "bottom";
  phase: Phase;
  gap: number;
  disableHeavyMotion: boolean;
};

function LogoHalf({
  src,
  side,
  phase,
  gap,
  disableHeavyMotion,
}: LogoHalfProps) {
  if (phase === "initial") return null;

  const SIZE = 160;

  /* start completely off‑screen using pure CSS units (SSR‑safe) */
  const initialY =
    side === "top" ? `calc(-60vh - ${SIZE}px)` : `calc( 60vh + ${SIZE}px)`;

  const targetY = ["approach", "magic"].includes(phase)
    ? 0
    : side === "top"
    ? -gap
    : gap;

  /* rotations */
  const initialRotateX = disableHeavyMotion ? 0 : side === "top" ? -45 : 45;
  const initialRotateZ = disableHeavyMotion ? 0 : side === "top" ? 5 : -5;
  const approachRotateX = disableHeavyMotion ? 0 : side === "top" ? 10 : -10;
  const approachRotateZ = disableHeavyMotion ? 0 : side === "top" ? -2 : 2;

  /* bulb only on bottom half during “human” phase */
  const showBulb = side === "bottom" && phase === "human";

  return (
    <motion.div
      className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: "transform, opacity" }}
      initial={{
        y: initialY,
        opacity: 0,
        scale: 0.9,
        rotateX: initialRotateX,
        rotateZ: initialRotateZ,
      }}
      animate={{
        y: targetY,
        opacity: 1,
        scale: phase === "approach" ? 1.1 : 1,
        rotateX: phase === "approach" ? approachRotateX : 0,
        rotateZ: phase === "approach" ? approachRotateZ : 0,
      }}
      transition={{
        duration: 1.2,
        ease: EASE,
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
    >
      <Image
        src={src}
        alt={side === "top" ? "PC logo half" : "Human logo half"}
        width={SIZE}
        height={SIZE}
        className="w-[clamp(96px,24vw,160px)] h-auto"
        priority
      />

      {/* 💡 bulb */}
      <AnimatePresence>
        {showBulb && (
          <motion.span
            key="bulb"
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl select-none"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            💡
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
