import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnalysisView } from "@/components/pages/analysis-view";
import { analysesService } from "@/services/analyses.service";

export const metadata: Metadata = {
  title: "Análise | DataLens",
  description:
    "Indicadores, receita por categoria e top de produtos extraídos do teu ficheiro CSV.",
};

type Props = { params: Promise<{ id: string }> };

async function AnalysisContent({ params }: Props) {
  const { id } = await params;
  const analysis = await analysesService.get(id);
  if (!analysis) notFound();
  return <AnalysisView analysis={analysis} />;
}

export default function AnalysisPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="h-10 w-64 animate-pulse rounded bg-secondary" />
          <div className="h-48 animate-pulse rounded-2xl bg-secondary" />
        </div>
      }
    >
      <AnalysisContent params={params} />
    </Suspense>
  );
}