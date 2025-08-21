"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactMethods = [
    {
      label: "EMAIL",
      value: "hello@ozenstudio.com",
      description: "For project inquiries & collaboration",
      action: "Copy to clipboard",
      type: "email" as const,
    },
    {
      label: "INSTAGRAM",
      value: "/",
      description: "For quick questions & creative inspiration",
      action: "Open Instagram",
      type: "social" as const,
    },
    {
      label: "AVAILABILITY",
      value: "Currently available",
      description: "Booking 1-2 projects per month",
      action: "View calendar",
      type: "availability" as const,
    },
  ];

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText("hello@ozenstudio.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleInstagramOpen = () => {
    window.open(
      "https://instagram.com/ozenstudio",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 xl:px-32"
    >
      <div className="w-full max-w-none mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-8 mb-8">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
              CONTACT
            </div>
            <div className="flex-1 h-[1px] bg-neutral-200"></div>
            <div className="text-xs font-mono text-neutral-400">004</div>
          </div>

          <h2 className="text-4xl lg:text-6xl font-light tracking-tight text-neutral-900 max-w-4xl leading-tight mb-6">
            Let&#39;s create{" "}
            <span className="font-editorial italic">something together</span>
          </h2>

          <p className="text-xl text-neutral-600 font-light leading-relaxed max-w-2xl">
            Ready to build something meaningful? Send your brief and let&#39;s
            start the conversation.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column - Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="group border-b border-neutral-200/60 pb-8"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="space-y-1">
                      <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
                        {method.label}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-light text-neutral-900">
                        {method.value}
                      </h3>
                    </div>

                    <p className="text-neutral-600 max-w-md leading-relaxed">
                      {method.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    onClick={
                      method.type === "email"
                        ? handleEmailCopy
                        : method.type === "social"
                        ? handleInstagramOpen
                        : method.type === "availability"
                        ? () => {} // Could link to calendar
                        : undefined
                    }
                    disabled={method.type === "availability"}
                    className={`group/btn flex items-center gap-3 px-6 py-3 text-sm font-mono transition-colors duration-300 ${
                      method.type === "availability"
                        ? "text-neutral-400 cursor-default"
                        : "text-neutral-600 hover:text-neutral-900 cursor-pointer"
                    }`}
                    whileHover={method.type !== "availability" ? { x: 4 } : {}}
                    whileTap={
                      method.type !== "availability" ? { scale: 0.98 } : {}
                    }
                  >
                    <span className="tracking-wide">
                      {method.type === "email" && copiedEmail
                        ? "COPIED!"
                        : method.action}
                    </span>
                    {method.type !== "availability" && (
                      <motion.div
                        className="w-4 h-[1px] bg-neutral-400 group-hover/btn:bg-neutral-600 transition-colors"
                        animate={{
                          scaleX:
                            method.type === "email" && copiedEmail ? 0 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    {method.type === "email" && (
                      <span className="text-base">
                        {copiedEmail ? "✓" : "📋"}
                      </span>
                    )}
                    {method.type === "social" && (
                      <span className="text-base">↗</span>
                    )}
                    {method.type === "availability" && (
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-400"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Additional Info & Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 space-y-12"
          >
            {/* Status Indicator */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-xs font-mono uppercase tracking-wide text-neutral-600">
                  CURRENTLY AVAILABLE
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-neutral-900">
                  Response Time
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Usually within 24 hours. For urgent projects, I&#39;ll
                  prioritize your message.
                </p>
              </div>
            </div>

            {/* Project Timeline */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-neutral-900">
                Project Timeline
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">
                    Small projects
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    1-2 weeks
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">
                    Medium projects
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    3-4 weeks
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">
                    Large projects
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    6-8 weeks
                  </span>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900">
                Working Hours
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">GMT+3 (Istanbul)</span>
                  <span className="text-xs font-mono text-neutral-500">
                    09:00 - 18:00
                  </span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Available for calls and meetings within business hours.
                  Flexible for international clients.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mt-32 pt-16 border-t border-neutral-200/60 text-center"
        >
          <div className="space-y-8">
            <p className="text-xl lg:text-2xl text-neutral-600 font-light leading-relaxed max-w-3xl mx-auto font-editorial">
              Have a specific launch window or deadline in mind?{" "}
              <span className="italic">Let me know early</span> — I usually book
              1-2 projects per month.
            </p>

            <motion.button
              onClick={handleEmailCopy}
              className="group inline-flex items-center gap-4 text-lg font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="border-b border-dotted border-neutral-300 group-hover:border-neutral-500 transition-colors font-editorial">
                {copiedEmail ? "Email copied!" : "Start the conversation"}
              </span>
              <motion.span
                className="text-xl"
                animate={{
                  x: copiedEmail ? [0, 4, 0] : [0, 4, 0],
                  opacity: copiedEmail ? [1, 0.5, 1] : 1,
                }}
                transition={{
                  duration: copiedEmail ? 0.5 : 2,
                  repeat: copiedEmail ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              >
                {copiedEmail ? "✓" : "↗"}
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
