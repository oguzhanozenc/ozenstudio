"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function AboutPageClient() {
  const manifesto = [
    "ozenstudio is a design and development practice based in Istanbul — working globally with independent artists, early-stage founders, and creative brands who care how things are made.",
    "We design identities, build websites, and shape cohesive visuals across digital and physical spaces. From screen to print, concept to code — everything is handled in-house, with precision and care.",
    "The studio is led by Oğuzhan Özenç — a developer with a design eye. From the first sketch to the final build, nothing is outsourced. Every detail stays close.",
    "The name comes from the Turkish word \"özen\" — and from the founder's own name. It's a reminder: how something is made matters as much as what it becomes.",
    "In a culture built on shortcuts, we choose intention.",
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#2a2a2a] to-[#1a1a1a]"
    >
      {/* Scoped grain overlay - only for this component */}
      <div
        className="absolute inset-0 z-10 opacity-[0.06] bg-[url('/grain.png')] bg-cover pointer-events-none mix-blend-multiply"
        role="presentation"
        aria-hidden="true"
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
               linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
             `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Single Unified Section */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="min-h-screen flex items-center justify-center px-6 py-16"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-5 gap-16 lg:gap-24 items-center">
            {/* Content Section - 3 columns */}
            <div className="lg:col-span-3 space-y-12">
              {/* Header left aligned */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <p className="text-sm font-mono uppercase tracking-[0.3em] text-white/60 font-light">
                  The Story Behind
                </p>
              </motion.div>

              {/* Main Typography with Logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-6">
                  {/* Animated logo */}
                  <motion.div
                    initial={{ opacity: 0, y: -30, rotateX: 90 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex justify-center flex-shrink-0"
                  >
                    <div className="relative">
                      <Image
                        src="/logo.png"
                        alt="Ozenstudio mark"
                        width={64}
                        height={64}
                        className="rounded-2xl border-2 border-white/50 shadow-2xl backdrop-blur-md"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent" />
                    </div>
                  </motion.div>

                  {/* Title text */}
                  <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight text-white font-editorial font-light">
                    <span className="inline-block">
                      {"ozenstudio".split("").map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 50, rotateX: 90 }}
                          animate={
                            isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}
                          }
                          transition={{
                            duration: 0.6,
                            delay: 0.8 + index * 0.05,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`inline-block font-editorial font-light ${
                            index === 0 ? "italic" : ""
                          } hover:scale-105 transition-transform duration-300 cursor-default`}
                          style={{
                            textShadow: "0 0 40px rgba(255,255,255,0.1)",
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  </h1>
                </div>

                <div className="mt-4">
                  <h2 className="text-white/70 text-[clamp(1.5rem,3.5vw,3rem)] leading-[0.9] font-editorial font-light">
                    {"Built with ".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: 1.4 + index * 0.03,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                    {"intention".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: 1.7 + index * 0.03,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`inline-block ${
                          index === 0 ? "italic" : ""
                        }`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </h2>
                </div>
              </motion.div>

              {/* Manifesto content - condensed */}
              <div className="space-y-6 max-w-2xl">
                {manifesto.slice(0, 4).map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 2.2 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-base leading-[1.6] text-white/75 font-editorial"
                  >
                    {text.includes('"özen"')
                      ? text.split('"özen"').map((part, k, arr) => (
                          <span key={k}>
                            {part}
                            {k < arr.length - 1 && (
                              <span className="text-white/90 italic font-medium">
                                &quot;özen&quot;
                              </span>
                            )}
                          </span>
                        ))
                      : text}
                  </motion.p>
                ))}

                {/* Final manifesto line as emphasis */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 2.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-lg leading-[1.6] text-white/90 font-editorial font-medium pt-4"
                >
                  {manifesto[4]}
                </motion.p>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 3.2 }}
                className="pt-8 max-w-2xl"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors font-editorial text-lg"
                >
                  <span className="border-b border-dotted border-white/40 group-hover:border-white/70 transition-colors">
                    If you&#39;re building something that deserves more than
                    default — we should talk.
                  </span>
                  <motion.span
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-xl"
                  >
                    ↗
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Portrait - 2 columns */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 1,
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full max-w-[380px] relative"
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-md relative group">
                  <Image
                    src="/founder.jpg"
                    alt="Oğuzhan Özenç portrait"
                    fill
                    sizes="380px"
                    className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL="/founder-blur.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent" />

                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-transparent to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-700" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mt-8 text-center space-y-3"
                >
                  <p className="text-sm text-white/60 font-mono tracking-wide">
                    Oğuzhan Özenç, Founder
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-60" />
                    Available for new projects
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Minimal decorative elements */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-1/4 right-8 w-px h-24 bg-gradient-to-t from-transparent via-white/8 to-transparent" />
    </div>
  );
}
