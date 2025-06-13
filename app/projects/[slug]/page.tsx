import { notFound } from "next/navigation";
import { projectsData } from "@/data/projectsData";
import Image from "next/image";
import Link from "next/link";

type Params = { slug: string };

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  const currentIndex = projectsData.findIndex((p) => p.slug === params.slug);
  const prev = projectsData[currentIndex - 1];
  const next = projectsData[currentIndex + 1];

  return (
    <>
      {/* Sticky CTA Bar */}
      {project.url && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-background border border-muted rounded-full shadow-md px-5 py-2 flex items-center gap-2 text-sm">
          <span className="hidden md:inline">Check it live:</span>
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:no-underline font-medium"
          >
            {new URL(project.url).hostname.replace("www.", "")} ↗
          </Link>
        </div>
      )}

      <article className="px-6 md:px-12 xl:px-24 py-12 space-y-12">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition"
        >
          ← Back to Projects
        </Link>

        {/* Header */}
        <section className="space-y-4 max-w-3xl">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground text-lg">{project.summary}</p>
          <div className="text-sm text-muted-foreground space-x-4">
            {project.year && <span>{project.year}</span>}
            {project.role?.length && <span>{project.role.join(" / ")}</span>}
            {project.stack?.length && <span>{project.stack.join(", ")}</span>}
          </div>
          {project.url && (
            <Link
              href={project.url}
              className="inline-block underline text-primary text-sm mt-2"
              target="_blank"
            >
              Visit site ↗
            </Link>
          )}
        </section>

        {/* Cover Image */}
        {project.coverImage && (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden">
            <Image
              src={project.coverImage}
              alt={`${project.title} cover`}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Description */}
        <section className="max-w-3xl space-y-4 text-base leading-relaxed">
          <p>{project.description}</p>
        </section>

        {/* Media Gallery */}
        {(project.media?.length ?? 0) > 0 && (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {project.media?.map((item, idx) =>
              item.type === "image" ? (
                <div
                  key={idx}
                  className="relative w-full aspect-[4/3] rounded-xl overflow-hidden"
                >
                  <Image
                    src={item.src}
                    alt={item.alt || `Project media ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <video
                  key={idx}
                  src={item.src}
                  controls
                  className="rounded-xl w-full"
                />
              )
            )}
          </section>
        )}

        {/* Project Pagination */}
        <div className="flex justify-between pt-16 border-t mt-16 text-sm text-muted-foreground">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="hover:text-foreground"
            >
              ← {prev.title}
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="hover:text-foreground"
            >
              {next.title} →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>
    </>
  );
}
