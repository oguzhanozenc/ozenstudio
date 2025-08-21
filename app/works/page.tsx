import { worksData } from "@/data/worksData";
import { WorksSection } from "@/components/Work/WorksSection";

export default function WorksPage() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[url('/grain.png')] bg-[length:800px_800px] opacity-[0.04]"
      />
      <main className="relative px-6 md:px-12 xl:px-24 py-12 space-y-12 w-full flex flex-col flex-wrap min-h-screen">
        <section>
          <h1 className="text-4xl font-bold tracking-tight">Selected Work</h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            A selection of expressive, custom-built websites and visuals for
            artists, early-stage brands, and unconventional teams — built with
            clear creative direction and technical care.
          </p>
        </section>
        <WorksSection works={worksData} />
      </main>
    </>
  );
}
