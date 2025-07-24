"use client";

import Image from "next/image";
import Typewriter from "typewriter-effect";
import { useInView } from "react-intersection-observer";

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative isolate w-full text-neutral-900 overflow-hidden"
    >
      {/* Background textures */}
      <div className="absolute inset-0 z-0  opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0  opacity-90 z-0" />

      <div className="relative z-10 px-6 md:px-20 py-32 max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}

        {/* Badge */}
        <div className="mt-2 md:mt-3 ml-[2px] font-mono text-xs tracking-wide text-neutral-600 border border-dotted border-neutral-300 px-3.5 py-1  shadow-sm rounded-md ring-1 ring-neutral-100 ring-offset-1 transition duration-200 ease-in-out will-change-transform hover:-translate-y-[2px] hover:rotate-[-0.5deg] w-fit hover:border-red-500">
          📌 “özen” (n.): Turkish for care, precision, and thoughtfulness.
        </div>

        <div className="flex items-start gap-4 md:gap-6">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Ozenstudio mark"
            width={44}
            height={44}
            className="opacity-90 rounded-sm border border-neutral-200 shadow-sm mt-1"
          />

          {/* Heading with typewriter */}
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-tight min-h-[6rem]">
              {inView ? (
                <Typewriter
                  options={{
                    delay: 35,
                    cursor: "|",
                    deleteSpeed: 0,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("ozenstudio")
                      .pauseFor(300)
                      .typeString(" is a creative studio")
                      .pauseFor(400)
                      .typeString(
                        "<br/>for artists, creators and unconventional brands."
                      )
                      .start();
                  }}
                />
              ) : (
                <span className="opacity-0">placeholder</span>
              )}
            </h2>
          </div>
        </div>
        {/* Body Text */}
        <div className="flex flex-col gap-8 text-[17px] leading-[1.85] tracking-tight text-neutral-700 font-sans max-w-4xl">
          <p className="text-neutral-800">
            We help tell their story through custom visuals, digital
            experiences, and creative systems that don’t fit inside templates.
          </p>
          <p className="text-neutral-800">
            Each project is a collaboration shaped by care, clarity, and a point
            of view — with a strong storytelling focus. From launch pages to
            visual identities, everything is made from scratch: no boilerplate,
            no rinse-and-repeat.
          </p>
          <p>
            The studio is run by{" "}
            <span className="font-mono text-neutral-900">Oğuzhan Özenç</span> —
            a developer with a design eye, based in Istanbul and working
            globally. Every detail is handled in-house: design, development, and
            the in-between. One voice, one build, no handoffs.
          </p>
          <p>
            The name comes from the Turkish word{" "}
            <span className="font-mono text-neutral-900">“özen”</span> — care,
            precision, and thoughtfulness — and reflects both the studio’s
            philosophy and the founder’s surname. It’s a reminder: how something
            is made matters as much as what it becomes.
          </p>
          <p>
            In an age of automation and scale, we believe{" "}
            <span className="font-mono text-neutral-900">“özen”</span> is a
            differentiator.
          </p>
          <p>
            If your work challenges the usual formats —{" "}
            <span className="inline-block underline underline-offset-4 decoration-neutral-400 hover:decoration-black transition duration-200 cursor-pointer font-mono text-sm tracking-tight">
              let’s create something that tells your story ↗
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
