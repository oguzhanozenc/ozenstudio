import Link from "next/link";
import Image from "next/image";
import { Work } from "@/data/worksData";

type WorkCardProps = {
  work: Work;
};

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Link href={`/works/${work.slug}`} className="group block">
      <article className="relative">
        {/* Hero Image with Editorial Framing */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-50">
          {/* Subtle border frame */}
          <div className="absolute inset-0 border border-neutral-200/60 z-10 pointer-events-none" />

          <Image
            src={work.coverImage}
            alt={work.title}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:contrast-[1.05]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Elegant overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Year badge - floating editorial element */}
          <div className="absolute top-4 right-4 px-2.5 py-1 bg-white/90 backdrop-blur-sm border border-neutral-200/60 text-[10px] font-mono tracking-[0.15em] text-neutral-600">
            {work.year}
          </div>
        </div>

        {/* Editorial Content Block */}
        <div className="mt-6 space-y-3">
          {/* Overline - editorial styling */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 leading-none">
              {work.role.slice(0, 2).join(" • ")}
            </span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Title - refined typography */}
          <h3 className="text-lg lg:text-xl font-light tracking-tight text-neutral-900 leading-tight group-hover:text-neutral-700 transition-colors duration-300">
            {work.title}
          </h3>

          {/* Summary - editorial body text */}
          <div className="space-y-2">
            <p className="text-sm lg:text-[15px] font-light text-neutral-600 leading-relaxed max-w-prose">
              {work.summary}
            </p>

            {/* Read more indicator */}
            <div className="flex items-center gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <span className="text-xs font-mono text-neutral-400 tracking-wide">
                VIEW PROJECT
              </span>
              <div className="w-4 h-px bg-neutral-300 group-hover:bg-neutral-500 transition-colors duration-300" />
              <span className="text-neutral-400 text-sm">→</span>
            </div>
          </div>
        </div>

        {/* Subtle interaction feedback */}
        <div className="absolute inset-0 ring-0 group-hover:ring-1 ring-neutral-200/60 transition-all duration-300 pointer-events-none" />
      </article>
    </Link>
  );
}
