import { notFound } from "next/navigation";
import { CvResultsScreen } from "@/features/cv/cv-results-screen";
import { getCvRun, getCvRuns } from "@/lib/data/cv-runs";

export function generateStaticParams() {
  return getCvRuns().map((run) => ({ runId: run.id }));
}

export default async function CvResultPage({ params }: PageProps<"/cv/[runId]">) {
  const { runId } = await params;
  if (!getCvRun(runId)) notFound();

  return <CvResultsScreen />;
}
