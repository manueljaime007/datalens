import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnalysisView } from "@/components/pages/analysis-view";
import { getAnalysis } from "@/lib/analyses";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const analysis = getAnalysis(id);
  return {
    title: analysis
      ? `${analysis.file} | DataLens`
      : "Análise não encontrada | DataLens",
    description:
      "Indicadores, receita por categoria e top de produtos extraídos do teu ficheiro CSV.",
  };
}

export default async function AnalysisPage({ params }: Props) {
  const { id } = await params;
  const analysis = getAnalysis(id);
  if (!analysis) notFound();

  return <AnalysisView analysis={analysis} />;
}
