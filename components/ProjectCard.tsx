import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projectsData";
// components/ProjectCard.tsx
type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden  border border-zinc-200 dark:border-zinc-700">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {project.summary}
        </p>
        <p className="text-xs font-mono uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          {project.year} • {project.role.join(", ")}
        </p>
      </div>
    </Link>
  );
}
