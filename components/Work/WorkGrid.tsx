import { worksData } from "@/data/worksData";
import { WorkCard } from "@/components/Work/WorkCard";

type WorkGridProps = {
  works?: typeof worksData;
};

export function WorkGrid({ works = worksData }: WorkGridProps) {
  return (
    <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {works.map((work) => (
        <WorkCard key={work.slug} work={work} />
      ))}
    </div>
  );
}
