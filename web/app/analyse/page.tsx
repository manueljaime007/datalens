import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gauge, History, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { UploadWorkspace } from "@/components/upload/upload-workspace";

export const metadata: Metadata = {
  title: "Nova análise | DataLens",
  description: "Carrega um ficheiro CSV de vendas e analisa-o no teu navegador, sem enviar dados para servidores.",
};

const highlights: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Zero Transferência",
    text: "Os teus dados comerciais nunca saem da memória do teu browser.",
    icon: ShieldCheck,
  },
  {
    title: "Deteção Inteligente",
    text: "Identificação automática de datas, moedas e categorias de produtos.",
    icon: Sparkles,
  },
  {
    title: "Cálculo em Milissegundos",
    text: "Capacidade de processar mais de 100.000 linhas sem latência.",
    icon: Gauge,
  },
];

export default function AnalisarPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <UploadWorkspace />

      {/* Destaques */}
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {highlights.map(({ title, text, icon: Icon }) => (
          <li key={title} className="flex gap-3 rounded-2xl border border-border bg-card p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-chart-2/60">
              <Icon className="size-5" />
            </span>
            <div>
              <h3 className="font-semibold tracking-tight">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Histórico */}
      <section className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-chart-2/40 p-5">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-chart-2">
            <History className="size-5" />
          </span>
          <div>
            <h2 className="font-semibold tracking-tight">Já analisaste ficheiros anteriormente?</h2>
            <p className="text-xs text-muted-foreground">Retoma relatórios armazenados localmente:</p>
            <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-background px-2.5 py-0.5 text-[11px] font-medium">
              <span className="size-1.5 rounded-full bg-primary" />
              Última: Vendas_Setembro.csv (há 2 dias)
            </p>
          </div>
        </div>

        <Link
          href="/historico"
          className="inline-flex items-center gap-3 rounded-full bg-background py-1.5 pr-1.5 pl-5 text-sm font-semibold shadow-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Ver histórico de análises
          <span className="flex size-8 items-center justify-center rounded-full bg-chart-2">
            <ArrowRight className="size-4" />
          </span>
        </Link>
      </section>
    </div>
  );
}