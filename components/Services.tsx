"use client";

export default function Services() {
  return (
    <section
      id="services"
      className="isolate w-full border-t border-neutral-200 bg-[#fdfcf8] text-neutral-900 overflow-hidden px-6 md:px-20 py-32"
    >
      {/* Ambient overlays */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/grain.svg')] opacity-[0.05]" />
      <div className="absolute top-[10%] left-[40%] w-full bg-[radial-gradient(circle,_rgba(255,255,255,0.4)_10%,_transparent_70%)] opacity-20 blur-2xl z-0" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16">
        {/* Service Card */}
        <div className="group relative rounded-2xl border border-neutral-200 bg-white/70 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(0,0,0,0.01)] hover:shadow-xl transition-all duration-300">
          <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-mono">
            [ 001 ]
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:underline underline-offset-4 decoration-neutral-300">
            Custom Websites
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Built from the ground up — expressive, fast, and aligned with your
            creative voice. Never templated. Always yours.
          </p>
        </div>

        {/* Service Card */}
        <div className="group relative rounded-2xl border border-neutral-200 bg-white/70 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(0,0,0,0.01)] hover:shadow-xl transition-all duration-300">
          <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-mono">
            [ 002 ]
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:underline underline-offset-4 decoration-neutral-300">
            Visual Identity & Assets
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Posters, album visuals, identity systems — designed with clarity,
            depth, and distinction.
          </p>
        </div>

        {/* Service Card */}
        <div className="group relative rounded-2xl border border-neutral-200 bg-white/70 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(0,0,0,0.01)] hover:shadow-xl transition-all duration-300">
          <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-mono">
            [ 003 ]
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:underline underline-offset-4 decoration-neutral-300">
            Launch + Rollout Support
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Helping your work land — with precision assets, platform setup, and
            full-stack coordination.
          </p>
        </div>
      </div>
    </section>
  );
}
