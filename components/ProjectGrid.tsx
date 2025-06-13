import { projectsData } from "@/data/projectsData";
import { ProjectCard } from "@/components/ProjectCard";

type ProjectGridProps = {
  projects?: typeof projectsData;
};

export function ProjectGrid({ projects = projectsData }: ProjectGridProps) {
  return (
    <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
