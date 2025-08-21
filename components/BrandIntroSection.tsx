"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useState, useRef, useEffect, useMemo } from "react";

/* ===========================
   Constants
   =========================== */
const TOOLTIP_TEXT =
  '📌 "özen" (n.): Turkish for care, precision, and thoughtfulness.';
const TOOLTIP_SHOW_DELAY = 800;
const TOOLTIP_HIDE_DELAY = 2200;

const logoAnimation = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.2, duration: 0.5 },
};

/* ===========================
   Helpers
   =========================== */
const spanify = (text: string, italicFirst = false) =>
  text
    .split("")
    .map(
      (char, i) =>
        `<span class="font-editorial font-light ${
          italicFirst && i === 0 ? "italic" : ""
        }">${char}</span>`
    )
    .join("");

/* ===========================
   Tooltip
   =========================== */
const Tooltip = ({
  isVisible,
  isAuto = false,
}: {
  isVisible: boolean;
  isAuto?: boolean;
}) => {
  if (!isVisible) return null;

  const animations = isAuto
    ? {
        initial: { opacity: 0, scale: 0.3, y: 10, filter: "blur(4px)" },
        animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.8, y: -8, filter: "blur(2px)" },
        transition: {
          type: "spring" as const,
          stiffness: 500,
          damping: 20,
          mass: 0.6,
        },
      }
    : {
        initial: { opacity: 0, y: 8, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 8, scale: 0.96 },
        transition: { duration: 0.25, ease: "easeOut" as const },
      };

  return (
    <motion.div
      role="tooltip"
      id="ozen-tooltip"
      initial={animations.initial}
      animate={animations.animate}
      exit={animations.exit}
      transition={animations.transition}
      className="absolute -top-12 left-0 z-50 rounded-md border border-dotted border-neutral-400 bg-white/95 px-3 py-1.5 font-mono text-xs tracking-wide text-neutral-600 shadow-lg backdrop-blur-sm pointer-events-none"
    >
      {TOOLTIP_TEXT}
    </motion.div>
  );
};

/* ===========================
   Typewriter
   =========================== */
const TypewriterText = ({
  onStudioTyped,
  onAutoEnd,
  onFullyTyped,
}: {
  onStudioTyped: () => void;
  onAutoEnd: () => void;
  onFullyTyped: () => void;
}) => {
  const ozen = useMemo(() => spanify("ozen", true), []);
  const studio = useMemo(() => spanify("studio", false), []);

  const interactiveSpan = useMemo(
    () =>
      `<span class="ozenstudio-text relative inline-flex gap-[0.02em] px-[2px] cursor-pointer border-b-[3px] border-dotted border-neutral-500" aria-describedby="ozen-tooltip">${ozen}</span>${studio}`,
    [ozen, studio]
  );

  const fullText =
    ` is a design and development practice in Istanbul for artists, founders, and creative brands who care how things are made — ` +
    `crafting identities, websites, and visuals that connect deeply with audiences and stand the test of time.`;

  return (
    <Typewriter
      options={{ delay: 45, cursor: "_", deleteSpeed: 0 }}
      onInit={(typewriter) => {
        typewriter
          .typeString(interactiveSpan)
          .callFunction(onStudioTyped)
          .pauseFor(TOOLTIP_HIDE_DELAY)
          .callFunction(onAutoEnd)
          .typeString(fullText)
          .callFunction(onFullyTyped)
          .start();
      }}
    />
  );
};

/* ===========================
   Interactive Headline
   =========================== */
const InteractiveHeadline = ({
  onFullyTyped,
}: {
  onFullyTyped: () => void;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [hasShownOnce, setHasShownOnce] = useState(false);

  const hostRef = useRef<HTMLDivElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const autoTimerRef = useRef<number | null>(null);

  const showTooltip = isHovering || isAuto;

  useEffect(() => {
    const el =
      hostRef.current?.querySelector<HTMLSpanElement>(".ozenstudio-text");
    if (!el) return;
    el.classList.toggle("ozen-active", isAuto);
    return () => el.classList.remove("ozen-active");
  }, [isAuto]);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) cleanupRef.current();
      if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current);
    };
  }, []);

  const handleStudioTyped = () => {
    const el =
      hostRef.current?.querySelector<HTMLSpanElement>(".ozenstudio-text");
    if (!el) return;

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const addHandle = (side: "left" | "right") => {
      const handle = document.createElement("span");
      handle.className = `ios-handle absolute ${
        side === "left" ? "-left-2 -top-2" : "-right-2 -bottom-2"
      } flex flex-col items-center pointer-events-none`;
      handle.innerHTML =
        side === "left"
          ? `<span class="w-[10px] h-[10px] rounded-full bg-[#007AFF]"></span><span class="w-[2px] flex-1 bg-[#007AFF]"></span>`
          : `<span class="w-[2px] flex-1 bg-[#007AFF]"></span><span class="w-[10px] h-[10px] rounded-full bg-[#007AFF]"></span>`;
      el.appendChild(handle);
    };
    const addLine = (side: "left" | "right") => {
      const line = document.createElement("span");
      line.className = `ios-selection-line absolute ${
        side === "left" ? "-left-[2px]" : "-right-[2px]"
      } top-0 w-[2px] h-full bg-[#007AFF] pointer-events-none`;
      el.appendChild(line);
    };
    addHandle("left");
    addHandle("right");
    addLine("left");
    addLine("right");

    if (!hasShownOnce) {
      autoTimerRef.current = window.setTimeout(
        () => setIsAuto(true),
        TOOLTIP_SHOW_DELAY
      );
      setHasShownOnce(true);
    }

    cleanupRef.current = () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.querySelectorAll(".ios-handle,.ios-selection-line").forEach((n) =>
        n.remove()
      );
    };
  };

  return (
    <div className="relative" ref={hostRef}>
      <TypewriterText
        onStudioTyped={handleStudioTyped}
        onAutoEnd={() => setIsAuto(false)}
        onFullyTyped={onFullyTyped}
      />

      <AnimatePresence>
        {showTooltip && <Tooltip isVisible isAuto={isAuto} />}
      </AnimatePresence>
    </div>
  );
};

/* ===========================
   Logo + Section
   =========================== */
const LogoSection = ({ inView }: { inView: boolean }) => (
  <motion.div
    initial={logoAnimation.initial}
    animate={inView ? logoAnimation.animate : logoAnimation.initial}
    transition={logoAnimation.transition}
  >
    <Image
      src="/logo.png"
      alt="Ozenstudio mark"
      width={64}
      height={64}
      className="rounded-2xl border-2 border-white/50 shadow-2xl backdrop-blur-md"
    />
  </motion.div>
);

export default function BrandIntroSection() {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative isolate w-full min-h-screen overflow-hidden  text-neutral-900"
    >
      {/* Grain */}
      <div
        className="absolute inset-0 z-0 w-full bg-cover pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-start justify-center px-6 md:px-[7.5rem] pb-32 pt-24">
        <div className="flex flex-col items-center gap-6">
          <LogoSection inView={inView} />
          <h2 className="text-4xl font-light leading-tight tracking-tight md:text-5xl">
            {inView ? (
              <InteractiveHeadline onFullyTyped={() => {}} />
            ) : (
              <span className="opacity-0">placeholder</span>
            )}
          </h2>
        </div>
      </div>
      <style jsx global>{`
        .ozenstudio-text {
          transition: filter 0.18s ease;
        }
        .ozenstudio-text:hover,
        .ozenstudio-text.ozen-active {
          filter: brightness(1.07);
        }
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
        .ozenstudio-text:hover::before,
        .ozenstudio-text.ozen-active::before {
          opacity: 1;
        }
        .ios-handle {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .ozenstudio-text:hover .ios-handle,
        .ozenstudio-text.ozen-active .ios-handle {
          opacity: 1;
          transform: scale(1);
        }
        .ios-selection-line {
          opacity: 0;
          transform: scaleY(0.8);
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .ozenstudio-text:hover .ios-selection-line,
        .ozenstudio-text.ozen-active .ios-selection-line {
          opacity: 1;
          transform: scaleY(1);
        }
      `}</style>
    </section>
  );
}
