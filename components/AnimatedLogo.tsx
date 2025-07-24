"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Phase = "initial" | "pc" | "human" | "approach" | "magic";

const PHASE_TIMINGS = [
  { phase: "pc" as const, at: 800 },
  { phase: "human" as const, at: 2100 },
  { phase: "approach" as const, at: 3600 },
  { phase: "magic" as const, at: 5200 },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

function usePhases(enabled: boolean) {
  const [phase, setPhase] = useState<Phase>("initial");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!enabled) return;
    PHASE_TIMINGS.forEach(({ phase, at }) => {
      timers.current.push(window.setTimeout(() => setPhase(phase), at));
    });
    return () => timers.current.forEach(clearTimeout);
  }, [enabled]);

  return phase;
}

type LogoProps = {
  src: string;
  side: "left" | "right";
  phase: Phase;
};

const Logo = ({ src, side, phase }: LogoProps) => {
  const isActive = ["pc", "human", "approach", "magic"].includes(phase);
  if (!isActive) return null;

  const size = 160; // baseline for transform calculations
  const targetX = ["approach", "magic"].includes(phase)
    ? 0
    : side === "left"
    ? -size - 140
    : size + 140;

  const initialX = side === "left" ? -size - 240 : size + 240;
  const initialRotateY = side === "left" ? -45 : 45;
  const initialRotateX = side === "left" ? 15 : -15;
  const approachRotateY = side === "left" ? 10 : -10;
  const approachRotateX = side === "left" ? -5 : 5;

  return (
    <motion.div
      className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{
        x: initialX,
        opacity: 0,
        scale: 0.9,
        rotateY: initialRotateY,
        rotateX: initialRotateX,
      }}
      animate={{
        x: targetX,
        opacity: 1,
        scale: phase === "approach" ? 1.1 : 1,
        rotateY: phase === "approach" ? approachRotateY : 0,
        rotateX: phase === "approach" ? approachRotateX : 0,
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
        alt={side === "left" ? "PC" : "Human"}
        width={size}
        height={size}
        className="w-[clamp(96px,24vw,160px)] h-auto"
        priority
      />
    </motion.div>
  );
};

export default function AnimatedLogo() {
  const prefersReducedMotion = useReducedMotion();
  const phase = usePhases(!prefersReducedMotion);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden text-black select-none">
      {/* BACKDROP EFFECT */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          backdropFilter:
            phase === "magic" ? "blur(14px) saturate(1.3)" : "blur(2px)",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ backdropFilter: "blur(2px)" }}
      />

      {/* LOGO PAIR */}
      <Logo src="/logo-pc.png" side="left" phase={phase} />
      <Logo src="/logo-human.png" side="right" phase={phase} />

      {/* CTA SECTION */}
      <AnimatePresence>
        {phase === "magic" && (
          <motion.div
            key="cta"
            className="absolute z-20 left-1/2 top-[65%] -translate-x-1/2"
            initial={{ opacity: 0, y: 80, scale: 0.5, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              duration: 1.8,
              ease: EASE,
              delay: 1.4,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* LOGO TEXT */}
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
                      fontFamily:
                        i === 0
                          ? '"EB Garamond", serif'
                          : '"EB Garamond", serif',
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
              transition={{ duration: 1.2, ease: "easeOut", delay: 2.8 }}
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
