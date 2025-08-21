"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Stories of work - more personal, narrative approach
// Stories of work - real projects
const WORK_STORIES = [
  {
    id: "offbeat-security",
    story:
      "Offbeat Security needed a credible, modern web app presence that felt technical without feeling cold.",
    detail:
      "I led the front-end build of a React single-page app with an editorial, cybersecurity aesthetic. Netlify (Decap) CMS powers the blog, Mailchimp/Substack handles subscriptions, and a responsive slider plus subtle motion keeps it lively without bloat. The result: fast, clean, and trust-building for a security-minded audience.",
    medium: "Web App UI & Front-end",
    year: "2024",
    feeling: "🛡️",
  },
  {
    id: "baran-ulusoy-artist",
    story:
      "Baran Ulusoy's bilingual artist portfolio needed to feel like a gallery — cinematic, editorial, and clear.",
    detail:
      "Built with Next.js and Contentful, the site pairs an ambient 'projection' slideshow with elegant typography and FR/EN content. Works, exhibitions, and long-form texts are structured for curation. The experience is calm and premium, prioritizing the art while keeping navigation effortless.",
    medium: "Editorial Portfolio & CMS",
    year: "2025",
    feeling: "🖼️",
  },
  {
    id: "zero-cool",
    story:
      "ZERO COOL wanted a minimal, high-taste landing that says a lot by saying very little.",
    detail:
      "I crafted an Awwwards-leaning, terminal-tone landing with handcrafted micro-interactions: ambient glow, type rhythm, and a boot-sequence feel that's premium without hype. Typography, spacing, and motion are tuned for that 'quiet confidence' vibe the brand asked for.",
    medium: "Landing & Motion",
    year: "2025",
    feeling: "⚡",
  },
  {
    id: "verde-branding",
    story:
      "Verde needed a small but complete brand system that could flex from slide decks to web with zero friction.",
    detail:
      "I designed a concise identity kit — wordmark, color system, type scale, and usage rules — then carried it into a clean one-pager. The emphasis was on legibility, calm greens with balanced neutrals, and a layout that scales as the brand grows.",
    medium: "Identity & One-Pager",
    year: "2024",
    feeling: "🌿",
  },
];

/* ===========================
   Gentle Reveal Text
   =========================== */
const GentleReveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              y: 12,
              filter: "blur(4px)",
            }
      }
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
};

/* ===========================
   Work Story Card
   =========================== */
const WorkStory = ({
  story,
  index,
}: {
  story: (typeof WORK_STORIES)[0];
  index: number;
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.3,
        ease: "easeOut",
      }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {/* Main story */}
      <motion.div
        className="relative overflow-hidden group/card border-b border-neutral-200/60 pb-16 mb-16 last:border-b-0"
        onClick={() => setIsRevealed(!isRevealed)}
        whileHover={{
          transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
        }}
      >
        {/* Project number */}
        <motion.div
          className="absolute -left-4 top-0 text-[120px] font-light text-neutral-100 select-none pointer-events-none"
          animate={{
            x: isHovering ? 8 : 0,
            opacity: isHovering ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10">
          {/* Left column - Meta */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              className="space-y-2"
              animate={{
                x: isHovering ? 8 : 0,
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                {story.year}
              </div>
              <div className="text-sm font-mono text-neutral-600 leading-relaxed">
                {story.medium}
              </div>
            </motion.div>

            {/* Feeling indicator - minimal */}
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 border border-neutral-200 rounded-full bg-white"
              animate={{
                rotate: isHovering ? 180 : 0,
                scale: isHovering ? 1.1 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="text-lg">{story.feeling}</span>
            </motion.div>

            {/* Status indicator */}
            <motion.div
              className="flex items-center gap-2 text-xs font-mono text-neutral-400"
              animate={{
                opacity: isHovering ? 1 : 0.6,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-1 h-1 rounded-full bg-green-400"></div>
              <span>ACTIVE</span>
            </motion.div>
          </div>

          {/* Right column - Story */}
          <div className="lg:col-span-9 space-y-8">
            {/* Main headline */}
            <motion.h3
              className="text-2xl lg:text-4xl font-light leading-tight text-neutral-900 tracking-tight"
              animate={{
                y: isHovering ? -4 : 0,
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {story.story}
            </motion.h3>

            {/* Interactive elements */}
            <div className="flex items-center justify-between">
              {/* Expand indicator */}
              <motion.div
                className="flex items-center gap-3 text-sm font-mono text-neutral-500 cursor-pointer"
                animate={{
                  opacity: isRevealed ? 0 : 1,
                  y: isRevealed ? -10 : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="w-8 h-[1px] bg-neutral-300"
                  animate={{
                    scaleX: isHovering ? 1.5 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
                <span className="tracking-wide">READ MORE</span>
                <motion.div
                  animate={{
                    x: isHovering ? 8 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  ↗
                </motion.div>
              </motion.div>

              {/* Progress line */}
              <motion.div
                className="hidden lg:block w-24 h-[1px] bg-neutral-200"
                animate={{
                  scaleX: isHovering ? 1.2 : 1,
                  opacity: isHovering ? 1 : 0.4,
                }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{ transformOrigin: "right" }}
              />
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-50/20 to-transparent pointer-events-none"
          animate={{
            opacity: isHovering ? 1 : 0,
            x: isHovering ? 0 : -100,
          }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        />
      </motion.div>

      {/* Detailed story - expands below */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            className="mt-12 lg:ml-[25%] max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {/* Detail content */}
            <div className="space-y-8">
              {/* Expanded text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="prose prose-lg prose-neutral max-w-none"
              >
                <p className="text-xl leading-relaxed text-neutral-700 font-light">
                  {story.detail}
                </p>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center justify-between pt-8 border-t border-neutral-200/60"
              >
                {/* Close button */}
                <motion.button
                  className="flex items-center gap-3 text-sm font-mono text-neutral-500 hover:text-neutral-700 transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsRevealed(false);
                  }}
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-6 h-[1px] bg-neutral-400"
                    whileHover={{ scaleX: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="tracking-wide">CLOSE</span>
                </motion.button>

                {/* View project link */}
                <motion.div
                  className="flex items-center gap-2 text-sm font-mono text-neutral-400"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="tracking-wide">VIEW PROJECT</span>
                  <span>↗</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ===========================
   Animated Introduction
   =========================== */
interface ProofIntroProps {
  onComplete: () => void;
}

const ProofIntro = ({ onComplete }: ProofIntroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  // Auto-trigger onComplete after animations
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000); // Trigger after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [inView, onComplete]);

  const words = [
    "We",
    "work",
    "with",
    "independent",
    "artists,",
    "early-stage",
    "founders,",
    "and",
    "creative",
    "brands",
    "who",
    "care",
    "how",
    "things",
    "are",
    "made.",
    "From",
    "screen",
    "to",
    "print,",
    "concept",
    "to",
    "code",
    "—",
    "everything",
    "handled",
    "in-house,",
    "with",
    "özen.",
    "Here",
    "are",
    "stories",
    "about",
    "intention",
    "over",
    "shortcuts.",
  ];

  return (
    <div ref={ref} className="text-center mb-20">
      <motion.h2
        className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 mb-8 font-editorial"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Proof of{" "}
        <span className="italic relative">
          özen
          <motion.div
            className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-neutral-400 to-transparent"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </span>
      </motion.h2>

      {inView && (
        <div>
          <div className="text-lg leading-relaxed text-neutral-600 max-w-3xl mx-auto"></div>
          <motion.div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {words.map((word: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    delay: i * 0.1,
                    duration: 0.8,
                    ease: [0.42, 0, 0.58, 1],
                  },
                }}
                className={word === "özen." ? "font-editorial italic" : ""}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

/* ===========================
   Main Proof Section
   =========================== */
export default function ProofSection() {
  const [showStories, setShowStories] = useState(false);

  return (
    <section className="w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 xl:px-32">
      <div className="w-full max-w-none mx-auto">
        {/* Animated Introduction */}
        <ProofIntro onComplete={() => setShowStories(true)} />

        {/* Work Stories */}
        <AnimatePresence>
          {showStories && (
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {WORK_STORIES.map((story, index) => (
                <WorkStory key={story.id} story={story} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gentle closing thought */}
        {showStories && (
          <GentleReveal
            delay={2}
            className="text-center mt-20 pt-16 border-t border-neutral-200/50"
          >
            <p className="text-neutral-500 mb-8 font-editorial italic text-lg">
              In a culture built on shortcuts, we choose intention.
            </p>

            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 text-neutral-600 font-mono text-sm cursor-pointer group"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Ready to build with intention?</span>
              <motion.span
                className="text-base opacity-70 group-hover:opacity-100"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </motion.div>
          </GentleReveal>
        )}
      </div>
    </section>
  );
}
