"use client";

export default function Process() {
  return (
    <section
      id="process"
      className="relative isolate w-full px-6 md:px-20 py-36 bg-[#fefefe] border-t border-neutral-200 text-neutral-900"
    >
      {/* Grain & Light overlays */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/grain.svg')] opacity-[0.025]" />
      <div className="absolute inset-0 z-0 bg-gradient-radial from-white via-[#f7f7f7] to-[#ececec] opacity-90" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-24">
        {/* Heading */}
        <div className="space-y-5">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            How It Works
          </h2>
          <p className="text-base text-neutral-600 max-w-prose leading-relaxed">
            A calm, clear 4-step process. Minimal meetings. Maximum intention.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 border-l border-neutral-200 space-y-16">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={`0${index + 1}`}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Discovery",
    description:
      "A short call or written brief — I get to know your work, goals, and tone. We align on what matters before designing anything.",
  },
  {
    title: "Creative Direction",
    description:
      "You'll receive a curated moodboard — colors, layout references, atmosphere. Nothing generic, all open to feedback before I proceed.",
  },
  {
    title: "Design & Build",
    description:
      "I handle both design and development from scratch. Fully custom — no templates, no outsourcing. Just precise, personal execution.",
  },
  {
    title: "Feedback & Launch",
    description:
      "You can review and tweak as we go. When approved, I prep a smooth handoff or public launch — with support for rollout visuals if needed.",
  },
];

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative pl-6">
      {/* Timeline marker */}
      <div className="absolute -left-3 top-1 w-3.5 h-3.5 rounded-full bg-neutral-900 shadow-[0_0_0_2px_white] ring-2 ring-neutral-300" />

      <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-mono">
        Step {number}
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed max-w-prose">
        {description}
      </p>
    </div>
  );
}
