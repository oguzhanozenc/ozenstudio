"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration: string;
  deliverable: string;
}

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Discovery",
      description:
        "A short call or written brief — I get to know your work, goals, and tone. We align on what matters before designing anything.",
      duration: "1-2 days",
      deliverable: "Project brief & timeline",
    },
    {
      number: "02",
      title: "Creative Direction",
      description:
        "You'll receive a curated moodboard — colors, layout references, atmosphere. Nothing generic, all open to feedback before I proceed.",
      duration: "3-5 days",
      deliverable: "Visual direction & moodboard",
    },
    {
      number: "03",
      title: "Design & Build",
      description:
        "I handle both design and development from scratch. Fully custom — no templates, no outsourcing. Just precise, personal execution.",
      duration: "2-4 weeks",
      deliverable: "Complete solution",
    },
    {
      number: "04",
      title: "Feedback & Launch",
      description:
        "You can review and tweak as we go. When approved, I prep a smooth handoff or public launch — with support for rollout visuals if needed.",
      duration: "1-2 weeks",
      deliverable: "Live project & assets",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="process"
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
              PROCESS
            </div>
            <div className="flex-1 h-[1px] bg-neutral-200"></div>
          </div>

          <h2 className="text-4xl lg:text-6xl font-light tracking-tight text-neutral-900 max-w-4xl leading-tight mb-6">
            How we <span className="font-editorial italic">work together</span>
          </h2>

          <p className="text-xl text-neutral-600 font-light leading-relaxed max-w-2xl">
            A calm, clear 4-step process. Minimal meetings. Maximum intention.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Step Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-2"
          >
            {steps.map((step, index) => (
              <motion.button
                key={index}
                onClick={() =>
                  setActiveStep(activeStep === index ? null : index)
                }
                className={`group w-full text-left p-6 border-l-2 transition-all duration-500 ${
                  activeStep === index
                    ? "border-neutral-900 bg-neutral-50/50"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
                whileHover={{ x: activeStep === index ? 0 : 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  {/* Step number and title */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div
                        className={`text-xs font-mono tracking-wide transition-colors ${
                          activeStep === index
                            ? "text-neutral-600"
                            : "text-neutral-400"
                        }`}
                      >
                        STEP {step.number}
                      </div>
                      <h3
                        className={`text-xl font-light transition-colors ${
                          activeStep === index
                            ? "text-neutral-900"
                            : "text-neutral-700"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Expand indicator */}
                    <motion.div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        activeStep === index
                          ? "border-neutral-900 bg-neutral-900"
                          : "border-neutral-300 group-hover:border-neutral-500"
                      }`}
                      animate={{
                        rotate: activeStep === index ? 45 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`w-2 h-[1px] transition-colors ${
                          activeStep === index ? "bg-white" : "bg-neutral-400"
                        }`}
                      />
                      <div
                        className={`absolute w-[1px] h-2 transition-colors ${
                          activeStep === index ? "bg-white" : "bg-neutral-400"
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Duration indicator */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1 h-1 rounded-full transition-colors ${
                        activeStep === index
                          ? "bg-neutral-600"
                          : "bg-neutral-300"
                      }`}
                    />
                    <span className="text-xs font-mono text-neutral-500 tracking-wide">
                      {step.duration}
                    </span>
                  </div>

                  {/* Progress line */}
                  <motion.div
                    className={`w-full h-[1px] transition-colors ${
                      activeStep === index ? "bg-neutral-300" : "bg-neutral-200"
                    }`}
                    animate={{
                      scaleX: activeStep === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Right Column - Step Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="lg:pl-8"
          >
            {activeStep !== null ? (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-8"
              >
                {/* Step header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
                      STEP {steps[activeStep].number}
                    </span>
                    <div className="flex-1 h-[1px] bg-neutral-200"></div>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-light text-neutral-900 leading-tight">
                    {steps[activeStep].title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-lg lg:text-xl text-neutral-600 font-light leading-relaxed">
                  {steps[activeStep].description}
                </p>

                {/* Deliverable info */}
                <div className="pt-8 border-t border-neutral-200/60">
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-wide text-neutral-500">
                      DELIVERABLE
                    </div>
                    <div className="text-base font-medium text-neutral-900">
                      {steps[activeStep].deliverable}
                    </div>
                  </div>
                </div>

                {/* Timeline visualization */}
                <div className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-mono text-neutral-400 tracking-wide">
                      TIMELINE
                    </div>
                    <div className="flex items-center gap-1">
                      {steps.map((_, index) => (
                        <motion.div
                          key={index}
                          className={`h-1 rounded-full transition-colors ${
                            index <= activeStep
                              ? "bg-neutral-900"
                              : "bg-neutral-200"
                          }`}
                          style={{ width: index === activeStep ? 24 : 8 }}
                          animate={{
                            width: index === activeStep ? 24 : 8,
                          }}
                          transition={{ duration: 0.4 }}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-neutral-500 ml-2">
                      {steps[activeStep].duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center"
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full border border-neutral-200 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
                  </div>
                  <p className="text-neutral-500 font-light">
                    Select a step to learn more
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mt-32 pt-16 border-t border-neutral-200/60 text-center"
        >
          <p className="text-xl lg:text-2xl text-neutral-600 font-light leading-relaxed max-w-3xl mx-auto mb-8 font-editorial">
            Each project is different, but the approach stays the same:{" "}
            <span className="italic">listen, understand, create.</span>
          </p>

          <motion.button
            className="group inline-flex items-center gap-4 text-lg font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="border-b border-dotted border-neutral-300 group-hover:border-neutral-500 transition-colors font-editorial">
              Ready to start?
            </span>
            <motion.span
              className="text-xl"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ↗
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
