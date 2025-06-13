import { projectsData } from "@/data/projectsData";
import { ProjectGrid } from "@/components/ProjectGrid";

export default function ProjectsPage() {
  return (
    <main className="px-6 md:px-12 xl:px-24 py-12 space-y-12">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Selected Work</h1>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          A selection of expressive, custom-built websites and visuals for
          artists, early-stage brands, and unconventional teams — built with
          clear creative direction and technical care.
        </p>
      </section>

      <ProjectGrid projects={projectsData} />
    </main>
  );
}
