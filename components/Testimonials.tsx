"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  location: string;
  year: string;
}

const TestimonialsSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Cybersecurity Business Startup CoFounder",
      role: "Ongoing Collaborator",
      company: "Creative Ventures",
      location: "San Francisco",
      year: "2024",
      content:
        "Amazing work. Amazing person. Oğuzhan never ceases to impress me with the quality of his work. He really blew me away with his creative ideas. Worked so hard on this and vastly exceeded my expectations. Will be continuing to work together on an ongoing basis.",
    },
    {
      id: 2,
      name: "Local Restaurant Owner, Verde",
      role: "Founder",
      company: "Independent Café",
      location: "Istanbul",
      year: "2024",
      content:
        "We recently worked with Oguzhan to create the logo and brand identity for our new restaurant, and we're thrilled with the results. He perfectly understood our vision and delivered a stunning visual identity. Throughout the process, he was professional, communicative, and creative.",
    },
    {
      id: 3,
      name: "E-commerce Website",
      role: "Creative Project",
      company: "Freelance Collaboration",
      location: "Remote",
      year: "2024",
      content:
        "Working with Oguzhan was an absolute pleasure! Quick delivery and response on each milestone made. Super polite and willing to make any changes that I presented!! 10/10 will work with again.",
    },
  ];

  const changeSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 200);
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % testimonials.length;
    changeSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + testimonials.length) % testimonials.length;
    changeSlide(prev);
  };

  return (
    <section
      ref={containerRef}
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
            VOICES
          </div>
          <div className="flex-1 h-[1px] bg-neutral-200"></div>
        </div>

        <h2 className="text-4xl lg:text-6xl font-light tracking-tight text-neutral-900 max-w-4xl leading-tight">
          What they say about{" "}
          <span className="font-editorial italic">working together</span>
        </h2>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Column - Testimonial Content */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="space-y-12"
            >
              {/* Quote */}
              <blockquote className="text-2xl lg:text-3xl xl:text-4xl leading-relaxed text-neutral-800 font-light">
                <span className="text-neutral-400 text-5xl leading-none">
                  &quot;
                </span>
                {testimonials[currentSlide].content}
                <span className="text-neutral-400 text-5xl leading-none">
                  &quot;
                </span>
              </blockquote>

              {/* Attribution */}
              <div className="flex items-start justify-between border-t border-neutral-200/60 pt-8">
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-neutral-900">
                    {testimonials[currentSlide].name}
                  </h4>
                  <div className="text-sm text-neutral-500 space-y-1">
                    <p>{testimonials[currentSlide].role}</p>
                    <p className="font-mono text-xs uppercase tracking-wide">
                      {testimonials[currentSlide].company} ·{" "}
                      {testimonials[currentSlide].location}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-neutral-400">
                  {testimonials[currentSlide].year}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center justify-between mt-16 pt-8 border-t border-neutral-200/60"
          >
            {/* Prev/Next */}
            <div className="flex items-center gap-1">
              <motion.button
                onClick={prevSlide}
                className="group flex items-center gap-3 px-4 py-2 text-sm font-mono text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-6 h-[1px] bg-neutral-400 group-hover:bg-neutral-600 transition-colors"></div>
                <span className="tracking-wide">PREV</span>
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="group flex items-center gap-3 px-4 py-2 text-sm font-mono text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="tracking-wide">NEXT</span>
                <div className="w-6 h-[1px] bg-neutral-400 group-hover:bg-neutral-600 transition-colors"></div>
              </motion.button>
            </div>

            {/* Counter */}
            <div className="text-sm font-mono text-neutral-400">
              {String(currentSlide + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Slide Indicators */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="lg:col-span-4 space-y-2"
        >
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={testimonial.id}
              onClick={() => changeSlide(index)}
              className={`group w-full text-left p-6 border-l-2 transition-all duration-300 ${
                index === currentSlide
                  ? "border-neutral-900 bg-neutral-50/50"
                  : "border-neutral-200 hover:border-neutral-400"
              }`}
              whileHover={{ x: index === currentSlide ? 0 : 8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3">
                {/* Project number */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono tracking-wide ${
                      index === currentSlide
                        ? "text-neutral-600"
                        : "text-neutral-400"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide
                        ? "bg-neutral-900"
                        : "bg-neutral-300"
                    }`}
                  />
                </div>

                {/* Name and role */}
                <div className="space-y-1">
                  <h4
                    className={`text-sm font-medium transition-colors ${
                      index === currentSlide
                        ? "text-neutral-900"
                        : "text-neutral-600"
                    }`}
                  >
                    {testimonial.name}
                  </h4>
                  <p className="text-xs font-mono text-neutral-400 tracking-wide">
                    {testimonial.company}
                  </p>
                </div>

                {/* Preview line */}
                <motion.div
                  className={`w-full h-[1px] transition-colors ${
                    index === currentSlide ? "bg-neutral-300" : "bg-neutral-200"
                  }`}
                  animate={{
                    scaleX: index === currentSlide ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="mt-32 pt-16 border-t border-neutral-200/60 text-center space-y-8"
      >
        <p className="text-xl lg:text-2xl text-neutral-600 font-light leading-relaxed max-w-3xl mx-auto font-editorial">
          Every project begins with understanding what you&#39;re building and
          why it matters.
        </p>

        <motion.button
          className="group inline-flex items-center gap-4 text-lg font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="border-b border-dotted border-neutral-300 group-hover:border-neutral-500 transition-colors font-editorial">
            Ready to work together?
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
};

export default TestimonialsSlider;
