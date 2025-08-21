"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string[];
  scope: string;
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const services: Service[] = [
    {
      id: "websites",
      number: "01",
      title: "Custom Websites",
      description:
        "Built from the ground up — expressive, fast, and aligned with your creative voice. Never templated. Always yours.",
      details: [
        "Custom design & development",
        "Performance optimization",
        "Content management systems",
        "E-commerce integration",
      ],
      scope: "Digital Experience",
    },
    {
      id: "identity",
      number: "02",
      title: "Visual Identity & Assets",
      description:
        "Posters, album visuals, identity systems — designed with clarity, depth, and distinction.",
      details: [
        "Brand identity systems",
        "Print & digital assets",
        "Typography & color systems",
        "Art direction",
      ],
      scope: "Brand & Design",
    },
    {
      id: "launch",
      number: "03",
      title: "Launch + Rollout Support",
      description:
        "Helping your work land — with precision assets, platform setup, and full-stack coordination.",
      details: [
        "Platform setup & deployment",
        "Asset preparation",
        "Technical coordination",
        "Launch strategy",
      ],
      scope: "Implementation",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="services"
      className="w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 xl:px-32"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="mb-20"
      >
        <div className="flex items-center gap-8 mb-8">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
            SERVICES
          </div>
          <div className="flex-1 h-[1px] bg-neutral-200"></div>
        </div>

        <h2 className="text-4xl lg:text-6xl font-light tracking-tight text-neutral-900 max-w-4xl leading-tight">
          What we <span className="font-editorial italic">offer</span>
        </h2>
      </motion.div>

      {/* Services Grid */}
      <div className="space-y-0">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2 + index * 0.1,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="group relative border-b border-neutral-200/60 py-16 last:border-b-0"
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
          >
            {/* Background number */}
            <motion.div
              className="absolute right-8 top-8 text-[120px] lg:text-[180px] font-light text-neutral-100 select-none pointer-events-none leading-none"
              animate={{
                x: hoveredService === service.id ? -8 : 0,
                opacity: hoveredService === service.id ? 0.6 : 0.3,
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {service.number}
            </motion.div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10">
              {/* Left column - Meta */}
              <div className="lg:col-span-3 space-y-6">
                <motion.div
                  className="space-y-2"
                  animate={{
                    x: hoveredService === service.id ? 8 : 0,
                  }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                    {service.number}
                  </div>
                  <div className="text-sm font-mono text-neutral-600">
                    {service.scope}
                  </div>
                </motion.div>

                {/* Status indicator */}
                <motion.div
                  className="flex items-center gap-2 text-xs font-mono text-neutral-400"
                  animate={{
                    opacity: hoveredService === service.id ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-1 h-1 rounded-full bg-green-400"></div>
                  <span>AVAILABLE</span>
                </motion.div>
              </div>

              {/* Right column - Content */}
              <div className="lg:col-span-9 space-y-8">
                {/* Service title */}
                <motion.h3
                  className="text-2xl lg:text-4xl font-light leading-tight text-neutral-900 tracking-tight"
                  animate={{
                    y: hoveredService === service.id ? -4 : 0,
                  }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  {service.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-lg lg:text-xl text-neutral-600 font-light leading-relaxed max-w-3xl"
                  animate={{
                    y: hoveredService === service.id ? -2 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1],
                    delay: 0.1,
                  }}
                >
                  {service.description}
                </motion.p>

                {/* Service details - revealed on hover */}
                <motion.div
                  className="overflow-hidden"
                  animate={{
                    height: hoveredService === service.id ? "auto" : 0,
                    opacity: hoveredService === service.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="pt-6 border-t border-neutral-200/60">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={
                            hoveredService === service.id
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -10 }
                          }
                          transition={{
                            duration: 0.4,
                            delay: detailIndex * 0.1,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className="flex items-center gap-3 text-sm text-neutral-600"
                        >
                          <div className="w-1 h-1 rounded-full bg-neutral-400"></div>
                          <span>{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Interactive elements */}
                <div className="flex items-center justify-between pt-4">
                  {/* Explore indicator */}
                  <motion.div
                    className="flex items-center gap-3 text-sm font-mono text-neutral-500"
                    animate={{
                      opacity: hoveredService === service.id ? 1 : 0.6,
                      x: hoveredService === service.id ? 4 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="w-8 h-[1px] bg-neutral-300"
                      animate={{
                        scaleX: hoveredService === service.id ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <span className="tracking-wide">EXPLORE</span>
                    <motion.div
                      animate={{
                        x: hoveredService === service.id ? 8 : 0,
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
                      scaleX: hoveredService === service.id ? 1.2 : 1,
                      opacity: hoveredService === service.id ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformOrigin: "right" }}
                  />
                </div>
              </div>
            </div>

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-50/10 to-transparent pointer-events-none"
              animate={{
                opacity: hoveredService === service.id ? 1 : 0,
                x: hoveredService === service.id ? 0 : -100,
              }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="mt-32 pt-16 border-t border-neutral-200/60 text-center space-y-8"
      >
        <p className="text-xl lg:text-2xl text-neutral-600 font-light leading-relaxed max-w-3xl mx-auto font-editorial">
          Each service is tailored to your specific needs and creative vision.
        </p>

        <motion.button
          className="group inline-flex items-center gap-4 text-lg font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="border-b border-dotted border-neutral-300 group-hover:border-neutral-500 transition-colors font-editorial">
            Let&#39;s discuss your project
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
    </section>
  );
}
