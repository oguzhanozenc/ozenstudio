"use client";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative isolate w-full bg-[#fdfcf8] border-t border-neutral-200 text-neutral-900 overflow-hidden px-6 md:px-20 py-32"
    >
      {/* Ambient grain + glow overlays */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/grain.svg')] opacity-[0.05]" />
      <div className="absolute top-[15%] left-[40%] w-[65vw] h-[65vw] bg-[radial-gradient(circle,_rgba(255,255,255,0.35)_15%,_transparent_70%)] opacity-20 blur-3xl z-0" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Left Column — Terminal Meta */}
        <div className="md:col-span-2 flex flex-col gap-6 border-r border-neutral-200 pr-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500">
            Ozenstudio.log // 004
          </span>
          <div className="w-[1px] h-24 bg-neutral-300 my-2" />
          <p className="text-sm text-neutral-600 font-mono leading-relaxed max-w-xs">
            Ready to build.
            <br />
            Send your brief.
            <br />
            Let’s create.
          </p>
          <p className="mt-6 font-mono text-xs text-neutral-500">
            $ contact.initiate
            <br />
            <span className="text-green-700 animate-pulse">› open ▍</span>
          </p>
        </div>

        {/* Right Column — Content */}
        <div className="md:col-span-3 space-y-8 max-w-prose text-neutral-700 text-lg leading-relaxed">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-8">
            Contact
          </h2>

          <p>
            Interested in working together? Send a short brief or idea to{" "}
            <a
              href="mailto:hello@ozenstudio.com"
              className="text-neutral-900 underline underline-offset-4 hover:opacity-80 transition"
            >
              hello@ozenstudio.com
            </a>{" "}
            and I’ll reply within 24 hours.
          </p>

          <p>
            I usually book 1–2 projects per month — so if you’re aiming for a
            specific launch window or release date, let me know early.
          </p>

          <p>
            Want to stay in touch or just say hi? Instagram DMs are open:{" "}
            <a
              href="https://instagram.com/ozenstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline underline-offset-4 hover:opacity-80 transition"
            >
              @ozenstudio
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
