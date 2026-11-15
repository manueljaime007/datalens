import type { Metadata } from "next";
import { HistoryView } from "@/components/pages/history-view";

export const metadata: Metadata = {
  title: "Resultado da análise | DataLens",
  description:
    "Indicadores, receita por categoria e top de produtos extraídos do teu ficheiro CSV.",
};

export default function HistoryPage() {
  return <HistoryView />;
}
