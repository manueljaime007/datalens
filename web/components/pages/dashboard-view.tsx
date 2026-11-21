"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Archive,
  Banknote,
  BadgeCheck,
  Clock,
  Database,
  FileText,
  Gauge,
  ListFilter,
  Loader2,
  Calculator,
  RotateCw,
  Shapes,
  TrendingUp,
  Upload,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Dados (substituir pelo resultado real guardado no IndexedDB)              */
/* -------------------------------------------------------------------------- */

const file = {
  name: "vendas_angola_2024_q3.csv",
  encoding: "CSV UTF-8",
  size: "2.4 MB",
  rows: 14820,
  analysedAt: "24 de Outubro de 2024 às 14:32",
};

const categories = [
  { name: "Equipamentos e Tecnologia", revenue: 18420000 },
  { name: "Alimentação e Bebidas", revenue: 12150200 },
  { name: "Material de Escritório", revenue: 7640400 },
  { name: "Mobiliário e Decoração", revenue: 3120000 },
  { name: "Outros", revenue: 1520000 },
];

const products = [
  { name: "Smartphone Galaxy A15 128GB", qty: 1420, revenue: 11360000 },
  { name: "Papel A4 Navigator 80g (Caixa)", qty: 1150, revenue: 3450000 },
  { name: "Café Ginga Torrado 1kg", qty: 980, revenue: 1960000 },
  { name: 'Monitor LED 24" Dell Full HD', qty: 620, revenue: 8680000 },
  { name: "Cadeira Ergonómica Lisboa", qty: 410, revenue: 6150000 },
];

const totalRevenue = categories.reduce((s, c) => s + c.revenue, 0);
const unitsSold = 86450;
const skus = 42;

/** 1420 -> "1.420" (o Intl pt-PT não agrupa números de 4 dígitos) */
const num = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** 2891.4035 -> "2.891,40" */
const money = (n: number) => {
  const [int, dec] = n.toFixed(2).split(".");
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${dec}`;
};
const pct = (n: number) => (n * 100).toFixed(1).replace(".", ",");

type View = "ready" | "processing";
const SHOW_SIMULATOR = process.env.NODE_ENV !== "production";

/* -------------------------------------------------------------------------- */
/*  Vista                                                                     */
/* -------------------------------------------------------------------------- */

export function DashboardView() {
  const [view, setView] = useState<View>("ready");
  const processing = view === "processing";

  const top = categories[0];
  const topShare = top.revenue / totalRevenue;
  const avgPerLine = totalRevenue / file.rows;

  return (
    <div>
      {/* Navegação e simulador */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Localização" className="text-xs text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
          <span className="mx-1">›</span>
          <span className="font-semibold text-foreground">Análise</span>
        </nav>

        {SHOW_SIMULATOR && (
          <div className="flex rounded-full bg-chart-2/50 p-1 text-xs font-medium" role="group" aria-label="Simulador de estado">
            <button
              type="button"
              aria-pressed={!processing}
              onClick={() => setView("ready")}
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 transition-colors ${
                !processing ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="size-1.5 rounded-full bg-primary" /> Ver dados analisados
            </button>
            <button
              type="button"
              aria-pressed={processing}
              onClick={() => setView("processing")}
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 transition-colors ${
                processing ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <RotateCw className="size-3.5" /> Simular estado: a processar
            </button>
          </div>
        )}
      </div>

      {/* Cabeçalho */}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            {processing ? "A processar" : "Telemetria concluída"}
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tighter sm:text-5xl">Resultado da análise</h1>
          <p className="mt-2 text-muted-foreground">
            Consulta os principais indicadores e informações extraídas do teu ficheiro.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/analyses/new"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:bg-secondary"
          >
            <Upload className="size-4" /> Carregar outro ficheiro
          </Link>
          <button
            type="button"
            disabled={processing}
            className="inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pr-1.5 pl-5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-transform enabled:hover:scale-[1.02] disabled:opacity-50"
          >
            Exportar relatório PDF
            <span className="flex size-8 items-center justify-center rounded-full bg-white/25">
              <ArrowUpRight className="size-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Ficheiro */}
      <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-chart-2/60 text-accent-foreground">
            <FileText className="size-5" />
          </span>
          <div>
            <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              {file.name}
              <span className="rounded bg-chart-2/70 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {file.encoding}
              </span>
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {file.size} <span aria-hidden>•</span> {num(file.rows)} linhas processadas <span aria-hidden>•</span>{" "}
              <span className="font-medium text-accent-foreground">100% íntegro</span>
            </p>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" /> Analisado a {file.analysedAt}
        </p>
      </section>

      {/* A processar */}
      {processing ? (
        <ProcessingState />
      ) : (
        <>
          {/* KPIs principais */}
          <section aria-label="Indicadores principais" className="mt-8 grid gap-4 md:grid-cols-3">
            <BigStat
              icon={Database}
              badge="Válido"
              label="Registos processados"
              value={num(file.rows)}
              note={
                <>
                  <b className="text-accent-foreground">+100%</b> validados sem inconsistências
                </>
              }
            />
            <BigStat
              icon={Archive}
              badge={`${skus} SKU's`}
              label="Unidades vendidas"
              value={num(unitsSold)}
              note={`Distribuídas por ${skus} produtos no trimestre`}
            />
            <BigStat
              icon={Banknote}
              badge="Volume total"
              highlight
              label="Receita acumulada"
              value={num(totalRevenue)}
              unit="Kz"
              note="Volume total faturado no período analisado"
            />
          </section>

          {/* KPIs secundários */}
          <section aria-label="Indicadores secundários" className="mt-4 grid gap-4 md:grid-cols-3">
            <MiniStat icon={Calculator} label="Valor médio por linha" value={money(avgPerLine)} unit="Kz" tag="Ticket ponderado" />
            <MiniStat icon={Gauge} label="Tempo de ingestão" value="0,48" unit="seg" tag="Local WASM" />
            <MiniStat icon={Shapes} label="Segmentos registados" value={`${categories.length} Categorias`} tag="100% mapeadas" />
          </section>

          {/* Receita por categoria */}
          <section className="mt-8 rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
                  Receita por categoria
                  <span className="rounded-full bg-chart-2/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {categories.length} segmentos
                  </span>
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Distribuição da receita gerada por cada categoria no ficheiro importado.
                </p>
              </div>
              <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <span className="size-2 rounded-full bg-primary" /> Volume em Kwanza (Kz)
              </p>
            </div>

            <ul className="mt-6 space-y-5">
              {categories.map((c, i) => {
                const share = c.revenue / totalRevenue;
                return (
                  <li key={c.name}>
                    <div className="flex items-baseline justify-between gap-4 text-sm">
                      <p>
                        <span className="font-semibold">{c.name}</span>{" "}
                        <span className="ml-1 text-xs text-muted-foreground">{pct(share)}%</span>
                      </p>
                      <p className="font-semibold tabular-nums">{num(c.revenue)} Kz</p>
                    </div>
                    <div
                      role="meter"
                      aria-label={c.name}
                      aria-valuenow={Number((share * 100).toFixed(1))}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="mt-2 h-2.5 overflow-hidden rounded-full bg-chart-2/60"
                    >
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${share * 100}%`, opacity: i < 3 ? 1 : i === 3 ? 0.7 : 0.5 }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-chart-2/40 px-4 py-3 text-sm">
              <p className="flex items-center gap-2">
                <TrendingUp className="size-4 shrink-0 text-primary" />
                <span>
                  A categoria <b>{top.name}</b> lidera a receita com mais de {Math.floor(topShare * 10) * 10}% da faturação bruta.
                </span>
              </p>
              <button type="button" className="inline-flex items-center gap-1.5 rounded-full bg-background px-3.5 py-1.5 text-xs font-semibold text-accent-foreground shadow-sm hover:bg-accent">
                Ver detalhe analítico <ArrowRight className="size-3.5" />
              </button>
            </div>
          </section>

          {/* Top produtos */}
          <section className="mt-8 rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Top 5 produtos por quantidade</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Artigos com maior quantidade física de unidades vendidas no ficheiro.
                </p>
              </div>
              <button type="button" className="inline-flex items-center gap-2 rounded-full bg-chart-2/60 px-4 py-2 text-xs font-semibold hover:bg-chart-2">
                <ListFilter className="size-3.5" /> Filtrar linhas
              </button>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="bg-chart-2/40 text-[11px] tracking-wide text-muted-foreground uppercase">
                    <th className="rounded-l-lg px-4 py-3 text-left font-semibold">Posição</th>
                    <th className="px-3 py-3 text-left font-semibold">Produto</th>
                    <th className="px-3 py-3 text-right font-semibold">Quantidade</th>
                    <th className="rounded-r-lg px-4 py-3 text-right font-semibold">Receita total</th>
                  </tr>
                </thead>
                <tbody>
                  {[...products]
                    .sort((a, b) => b.qty - a.qty)
                    .map((p, i) => (
                      <tr key={p.name} className={`border-b border-border/60 last:border-0 ${i === 0 ? "bg-chart-2/25" : ""}`}>
                        <td className="px-4 py-3.5">
                          <span
                            className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${
                              i === 0 ? "bg-primary text-primary-foreground" : "bg-chart-2/70 text-muted-foreground"
                            }`}
                          >
                            {i + 1}
                          </span>
                        </td>
                        <td className="px-3 font-medium">
                          {p.name}
                          {i === 0 && (
                            <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                              Top Vendas
                            </span>
                          )}
                        </td>
                        <td className="px-3 text-right font-semibold tabular-nums">{num(p.qty)} un</td>
                        <td className="px-4 text-right font-semibold tabular-nums">{num(p.revenue)} Kz</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <p>A exibir os 5 produtos com maior saída de stock. Total de {skus} artigos avaliados.</p>
              <button type="button" className="inline-flex items-center gap-2 rounded-full bg-chart-2/60 py-1.5 pr-1.5 pl-4 font-semibold text-foreground hover:bg-chart-2">
                Exportar lista completa (CSV)
                <span className="flex size-6 items-center justify-center rounded-full bg-background">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Peças                                                                     */
/* -------------------------------------------------------------------------- */

function BigStat({
  icon: Icon,
  badge,
  label,
  value,
  unit,
  note,
  highlight,
}: {
  icon: LucideIcon;
  badge: string;
  label: string;
  value: string;
  unit?: string;
  note: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
      {highlight && (
        <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/15 blur-3xl" />
      )}
      <div className="relative flex items-start justify-between">
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${
            highlight ? "bg-accent text-primary" : "bg-chart-2/60 text-accent-foreground"
          }`}
        >
          <Icon className="size-5" />
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${
            highlight ? "bg-primary text-primary-foreground" : "bg-chart-2/70 text-muted-foreground"
          }`}
        >
          {badge}
        </span>
      </div>
      <p className="relative mt-8 text-sm text-muted-foreground">{label}</p>
      <p className="relative mt-1 flex items-baseline gap-1.5 text-4xl font-extrabold tracking-tighter tabular-nums">
        {value}
        {unit && <span className="text-lg font-bold text-primary">{unit}</span>}
      </p>
      <p className="relative mt-3 text-xs font-medium text-muted-foreground">{note}</p>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  unit,
  tag,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  tag: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-chart-2/60">
          <Icon className="size-5" />
        </span>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold tracking-tight tabular-nums">
            {value} {unit && <span>{unit}</span>}
          </p>
        </div>
      </div>
      <span className="shrink-0 rounded-full bg-chart-2/70 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
        {tag}
      </span>
    </div>
  );
}

function ProcessingState() {
  return (
    <div className="mt-8" aria-live="polite">
      <div className="flex items-center gap-4 rounded-2xl bg-accent p-5">
        <Loader2 className="size-6 animate-spin text-primary motion-reduce:animate-none" />
        <div className="flex-1">
          <p className="text-sm font-semibold">A analisar {file.name}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-background">
            <div className="h-full w-[64%] rounded-full bg-primary" />
          </div>
        </div>
        <span className="text-sm font-bold text-accent-foreground">64%</span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-48 animate-pulse rounded-2xl bg-secondary motion-reduce:animate-none" />
        ))}
      </div>
      <div className="mt-4 h-72 animate-pulse rounded-2xl bg-secondary motion-reduce:animate-none" aria-hidden />
    </div>
  );
}