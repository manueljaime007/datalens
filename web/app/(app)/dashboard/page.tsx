import type { Metadata } from "next";
import { DashboardView } from "@/components/pages/dashboard-view";

export const metadata: Metadata = {
  title: "Resultado da análise | DataLens",
  description: "Indicadores, receita por categoria e top de produtos extraídos do teu ficheiro CSV.",
};

export default function DashboardPage() {
  return <DashboardView />;
}