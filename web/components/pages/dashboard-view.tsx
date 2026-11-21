"use client";

import Link from "next/link";
import {
  Archive,
  Banknote,
  Calculator,
  Clock,
  Database,
  FileText,
  ListFilter,
  Shapes,
  TrendingUp,
  Upload,
  type LucideIcon,
} from "lucide-react";
import type { Analysis } from "@/shared/types/analysis";

/* -------------------------------------------------------------------------- */
/*  Placeholder data                                                          */
/*                                                                            */
/*  TODO(sync): replace MOCK_ANALYSIS with a fetch to the Flask API.          */
/*  Endpoint: GET /analyses (returns Analysis[]).                             */
/*  total_revenue and average_value arrive as strings — parse before use.     */
/*  top_products only returns product + quantity (no revenue per product).    */
/* -------------------------------------------------------------------------- */

const MOCK_ANALYSIS: Analysis = {
  id: 4,
  filename: "sales.csv",
  total_records: 6,
  total_quantity: 29,
  total_revenue: "811000.00",
  average_value: "135166.67",
  revenue_by_category: [
    { category: "Acessórios", revenue: 171000.0 },
    { category: "Tecnologia", revenue: 640000.0 },
  ],
  top_products: [
    { product: "Auriculares", quantity: 10 },
    { product: "Rato", quantity: 8 },
    { product: "Teclado", quantity: 5 },
    { product: "Telemóvel", quantity: 4 },
    { product: "Monitor", quantity: 2 },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Formatters                                                                */
/* -------------------------------------------------------------------------- */

/** 1420 -> "1.420" (Intl pt-PT does not group 4-digit numbers) */
const num = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** 2891.4035 -> "2.891,40" */
const money = (n: number) => {
  const [int, dec] = n.toFixed(2).split(".");
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${dec}`;
};

const pct = (n: number) => (n * 100).toFixed(1).replace(".", ",");

/* -------------------------------------------------------------------------- */
/*  View                                                                      */
/* -------------------------------------------------------------------------- */

export function DashboardView() {
  const analysis = MOCK_ANALYSIS;

  const totalRevenue = analysis.revenue_by_category.reduce(
    (sum, c) => sum + c.revenue,
    0,
  );
  const top = analysis.revenue_by_category[0];
  const topShare = top && totalRevenue ? top.revenue / totalRevenue : 0;
  const averageValue = Number(analysis.average_value);
  const totalRevenueNum = Number(analysis.total_revenue);

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="Localização" className="text-xs text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">
          Dashboard
        </Link>
        <span className="mx-1">›</span>
        <span className="font-semibold text-foreground">Análise</span>
      </nav>

      {/* Cabeçalho */}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            Análise concluída
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Resultado da análise
          </h1>
          <p className="mt-2 text-muted-foreground">
            Consulta os principais indicadores e informações extraídas do teu
            ficheiro.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/analyses/new"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:bg-secondary"
          >
            <Upload className="size-4" /> Carregar outro ficheiro
          </Link>
        </div>
      </div>

      {/* Ficheiro */}
      <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-chart-2/60 text-accent-foreground">
            <FileText className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">{analysis.filename}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {num(analysis.total_records)} registos processados
            </p>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" /> Análise #{analysis.id}
        </p>
      </section>

      {/* KPIs principais */}
      <section
        aria-label="Indicadores principais"
        className="mt-8 grid gap-4 md:grid-cols-3"
      >
        <BigStat
          icon={Database}
          badge="Válido"
          label="Registos processados"
          value={num(analysis.total_records)}
          note={<>Validados sem inconsistências</>}
        />
        <BigStat
          icon={Archive}
          badge={`${analysis.top_products.length} SKU's`}
          label="Unidades vendidas"
          value={num(analysis.total_quantity)}
          note={`Distribuídas por ${analysis.top_products.length} produtos`}
        />
        <BigStat
          icon={Banknote}
          badge="Volume total"
          highlight
          label="Receita acumulada"
          value={num(totalRevenueNum)}
          unit="Kz"
          note="Volume total faturado no período analisado"
        />
      </section>

      {/* KPIs secundários */}
      <section
        aria-label="Indicadores secundários"
        className="mt-4 grid gap-4 md:grid-cols-2"
      >
        <MiniStat
          icon={Calculator}
          label="Valor médio por linha"
          value={money(averageValue)}
          unit="Kz"
          tag="Ticket ponderado"
        />
        <MiniStat
          icon={Shapes}
          label="Segmentos registados"
          value={`${analysis.revenue_by_category.length} Categorias`}
          tag="100% mapeadas"
        />
      </section>

      {/* Receita por categoria */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
              Receita por categoria
              <span className="rounded-full bg-chart-2/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                {analysis.revenue_by_category.length} segmentos
              </span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Distribuição da receita gerada por cada categoria no ficheiro
              importado.
            </p>
          </div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-primary" /> Volume em Kwanza
            (Kz)
          </p>
        </div>

        <ul className="mt-6 space-y-5">
          {analysis.revenue_by_category.map((c, i) => {
            const share = totalRevenue ? c.revenue / totalRevenue : 0;
            return (
              <li key={c.category}>
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <p>
                    <span className="font-semibold">{c.category}</span>{" "}
                    <span className="ml-1 text-xs text-muted-foreground">
                      {pct(share)}%
                    </span>
                  </p>
                  <p className="font-semibold tabular-nums">
                    {num(c.revenue)} Kz
                  </p>
                </div>
                <div
                  role="meter"
                  aria-label={c.category}
                  aria-valuenow={Number((share * 100).toFixed(1))}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="mt-2 h-2.5 overflow-hidden rounded-full bg-chart-2/60"
                >
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${share * 100}%`,
                      opacity: i < 3 ? 1 : i === 3 ? 0.7 : 0.5,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        {top && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-chart-2/40 px-4 py-3 text-sm">
            <p className="flex items-center gap-2">
              <TrendingUp className="size-4 shrink-0 text-primary" />
              <span>
                A categoria <b>{top.category}</b> lidera a receita com mais de{" "}
                {Math.floor(topShare * 10) * 10}% da faturação bruta.
              </span>
            </p>
          </div>
        )}
      </section>

      {/* Top produtos */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Top {analysis.top_products.length} produtos por quantidade
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Artigos com maior quantidade física de unidades vendidas no
              ficheiro.
            </p>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="bg-chart-2/40 text-[11px] tracking-wide text-muted-foreground uppercase">
                <th className="rounded-l-lg px-4 py-3 text-left font-semibold">
                  Posição
                </th>
                <th className="px-3 py-3 text-left font-semibold">Produto</th>
                <th className="rounded-r-lg px-4 py-3 text-right font-semibold">
                  Quantidade
                </th>
              </tr>
            </thead>
            <tbody>
              {[...analysis.top_products]
                .sort((a, b) => b.quantity - a.quantity)
                .map((p, i) => (
                  <tr
                    key={p.product}
                    className={`border-b border-border/60 last:border-0 ${
                      i === 0 ? "bg-chart-2/25" : ""
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <span
                        className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${
                          i === 0
                            ? "bg-primary text-primary-foreground"
                            : "bg-chart-2/70 text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-3 font-medium">
                      {p.product}
                      {i === 0 && (
                        <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                          Top Vendas
                        </span>
                      )}
                    </td>
                    <td className="px-4 text-right font-semibold tabular-nums">
                      {num(p.quantity)} un
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            A exibir os {analysis.top_products.length} produtos com maior saída
            de stock.
          </p>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pieces                                                                    */
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
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/15 blur-3xl"
        />
      )}
      <div className="relative flex items-start justify-between">
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${
            highlight
              ? "bg-accent text-primary"
              : "bg-chart-2/60 text-accent-foreground"
          }`}
        >
          <Icon className="size-5" />
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${
            highlight
              ? "bg-primary text-primary-foreground"
              : "bg-chart-2/70 text-muted-foreground"
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
      <p className="relative mt-3 text-xs font-medium text-muted-foreground">
        {note}
      </p>
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
