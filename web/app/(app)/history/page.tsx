import { Suspense } from "react";
import type { Metadata } from "next";
import { HistoryView } from "@/components/pages/history-view";
import { analysesService } from "@/services/analyses.service";

export const metadata: Metadata = {
  title: "Histórico | DataLens",
  description: "Consulta as análises de ficheiros CSV que já processaste.",
};

async function HistoryContent() {
  const analyses = await analysesService.list();
  return <HistoryView analyses={analyses} />;
}

export default function HistoryPage() {
  return (
    <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-secondary" />}>
      <HistoryContent />
    </Suspense>
  );
}