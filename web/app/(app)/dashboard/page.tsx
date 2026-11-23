import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardView } from "@/components/pages/dashboard-view";
import { analysesService } from "@/services/analyses.service";

export const metadata: Metadata = {
  title: "Dashboard | DataLens",
  description:
    "Indicadores, receita por categoria e top de produtos da análise mais recente.",
};

async function DashboardContent() {
  const analyses = await analysesService.list();
  const latest = analyses[0];

  if (!latest) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm font-semibold">Ainda não tens análises.</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Carrega o teu primeiro ficheiro CSV para começares.
        </p>
      </div>
    );
  }

  return <DashboardView analysis={latest} />;
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="h-10 w-64 animate-pulse rounded bg-secondary" />
          <div className="h-48 animate-pulse rounded-2xl bg-secondary" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}