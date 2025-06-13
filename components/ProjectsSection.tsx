"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/data/projectsData";
import Link from "next/link";

type Props = {
  projects: Project[];
  title?: string;
  description?: string;
};

export function ProjectsSection({ projects, title, description }: Props) {
  return (
    <section className="relative isolate w-full border-t border-neutral-200 bg-[#fdfcf8] text-neutral-900 overflow-hidden px-6 md:px-20 py-32">
      {/* Ambient Grain + Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/grain.svg')] opacity-[0.05]" />
      <div className="absolute top-[-20%] left-[30%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,_rgba(255,255,255,0.4)_10%,_transparent_70%)] opacity-20 blur-3xl z-0" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16">
        {/* Left Column: Terminal Meta */}
        <div className="md:col-span-2 flex flex-col gap-6 border-r border-neutral-200 pr-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500">
            Work.log // 002
          </span>
          <div className="w-[1px] h-24 bg-neutral-300 my-2" />
          <p className="text-sm text-neutral-600 font-mono leading-relaxed max-w-xs">
            Ongoing builds archive.
            <br />
            Curated & custom.
            <br />
            No clones. No fluff.
          </p>
        </div>

        {/* Right Column: Projects */}
        <div className="md:col-span-3 space-y-10">
          {/* Section Heading */}
          {title && (
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-neutral-600 text-lg leading-relaxed max-w-prose">
              {description}
            </p>
          )}

          <div className="grid gap-10 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-black transition-all"
          >
            View all projects
            <span className="transform transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-neutral-400">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
