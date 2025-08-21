import WorkPage from "@/components/Work/WorkPage";

type Params = { slug: string };

export default function Page({ params }: { params: Promise<Params> }) {
  return <WorkPage params={params} />;
}

import { worksData } from "@/data/worksData";

export function generateStaticParams() {
  return worksData.map((work) => ({ slug: work.slug }));
}
