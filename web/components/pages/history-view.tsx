"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Archive,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Database,
  FileText,
  FileUp,
  LayoutGrid,
  Search,
  Table2,
  type LucideIcon,
} from "lucide-react";
import type { Analysis } from "@/shared/types/analysis";
import {
  RevenueByAnalysisChart,
  RecordsVsUnitsChart,
} from "@/components/app/history-charts";

const nfDec = new Intl.NumberFormat("pt-PT", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const kz = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export function HistoryView({ analyses }: { analyses: Analysis[] }) {
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState<"table" | "grid">("table");

  const items = analyses;

  const filtered = useMemo(
    () =>
      items.filter((a) =>
        a.filename.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [items, query],
  );

  const totalRecords = items.reduce((s, a) => s + a.total_records, 0);
  const totalRevenue = items.reduce((s, a) => s + Number(a.total_revenue), 0);
  const avgRevenue = items.length ? totalRevenue / items.length : 0;

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="Localização" className="text-xs text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">
          Dashboard
        </Link>
        <span className="mx-1">›</span>
        <span className="font-semibold text-foreground">Histórico</span>
      </nav>

      {/* Cabeçalho */}
      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Histórico de análises
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Consulta os ficheiros que já analisaste e os respetivos resultados
            de vendas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/analyses/new"
            className="inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pr-1.5 pl-5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-transform hover:scale-[1.02]"
          >
            Nova análise
            <span className="flex size-8 items-center justify-center rounded-full bg-white/25">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </div>
      </div>

      {/* Métricas */}
      <section
        aria-label="Resumo"
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Stat
          label="Ficheiros processados"
          icon={Archive}
          value={String(items.length)}
          note={`Total de ${kz(totalRecords)} registos lidos`}
        />
        <Stat
          label="Volume consolidado"
          icon={Banknote}
          value={nfDec.format(totalRevenue / 1_000_000) + "M"}
          unit="Kz"
          note={`Média de ${nfDec.format(avgRevenue / 1_000_000)}M Kz por lote`}
        />
        <Stat
          label="Precisão média"
          icon={BadgeCheck}
          value="99.8%"
          badge="0 falhas"
          neutralBadge
          note="Compatibilidade CSV total"
        />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">
            Receita por análise
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Volume faturado de cada ficheiro processado.
          </p>
          <div className="mt-4">
            <RevenueByAnalysisChart analyses={items} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">
            Registos vs. unidades
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Linhas lidas e unidades vendidas por ficheiro.
          </p>
          <div className="mt-4">
            <RecordsVsUnitsChart analyses={items} />
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="mt-6 rounded-2xl border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative min-w-[14rem] flex-1">
            <span className="sr-only">Pesquisar por nome de ficheiro</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar por nome de ficheiro..."
              className="h-11 w-full rounded-full bg-chart-2/40 pr-4 pl-11 text-sm outline-none placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          <p className="text-xs text-muted-foreground">
            {filtered.length}{" "}
            {filtered.length === 1 ? "análise salva" : "análises salvas"}
          </p>

          <div
            className="flex rounded-lg bg-chart-2/40 p-1"
            role="group"
            aria-label="Modo de visualização"
          >
            {(
              [
                ["table", Table2, "Tabela"],
                ["grid", LayoutGrid, "Grelha"],
              ] as const
            ).map(([id, Icon, label]) => (
              <button
                key={id}
                type="button"
                aria-label={label}
                aria-pressed={layout === id}
                onClick={() => setLayout(id)}
                className={`rounded-md p-1.5 transition-colors ${
                  layout === id
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lista */}
      <section className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
        {filtered.length === 0 ? (
          <EmptyState hasData={items.length > 0} />
        ) : layout === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-chart-2/40 text-[11px] tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Ficheiro
                  </th>
                  <th className="px-3 py-4 text-right font-semibold">
                    Receita total (Kz)
                  </th>
                  <th className="px-6 py-4 text-right font-semibold">Acção</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-t border-border/60">
                    <td className="px-6 py-4">
                      <FileCell a={a} />
                    </td>
                    <td className="px-3 text-right">
                      <Revenue a={a} />
                    </td>
                    <td className="px-6">
                      <div className="flex items-center justify-end gap-2">
                        <ViewLink id={a.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <li
                key={a.id}
                className="flex flex-col gap-4 rounded-xl border border-border p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <FileCell a={a} />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="mt-2">
                      <Revenue a={a} align="left" />
                    </div>
                  </div>
                  <ViewLink id={a.id} />
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Rodapé da lista */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-chart-2/30 px-6 py-3 text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <Database className="size-4 text-primary" />A mostrar{" "}
            <b className="text-foreground">{filtered.length}</b> de{" "}
            <b className="text-foreground">{items.length}</b> análises.
          </p>
        </div>
      </section>
    </div>
  );
}

/* Pieces — iguais ao teu (Stat, FileCell, Revenue, ViewLink, EmptyState) */
/* -------------------------------------------------------------------------- */
/*  Pieces                                                                    */
/* -------------------------------------------------------------------------- */

function Stat({
  label,
  icon: Icon,
  value,
  unit,
  badge,
  neutralBadge,
  note,
}: {
  label: string;
  icon: LucideIcon;
  value: string;
  unit?: string;
  badge?: string;
  neutralBadge?: boolean;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        {label}
        <span className="flex size-8 items-center justify-center rounded-lg bg-chart-2/60 text-accent-foreground">
          <Icon className="size-4" />
        </span>
      </div>
      <div className="mt-5 flex flex-wrap items-baseline gap-2">
        <span className="text-4xl font-extrabold tracking-tighter tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-base font-semibold text-muted-foreground">
            {unit}
          </span>
        )}
        {badge && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              neutralBadge
                ? "bg-chart-2/70 text-muted-foreground"
                : "bg-accent text-accent-foreground"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

function FileCell({ a }: { a: Analysis }) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-chart-2/60 text-accent-foreground">
        <FileText className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate font-semibold tracking-tight">{a.filename}</p>
        <p className="text-xs text-muted-foreground">
          {kz(a.total_records)} registos • {kz(a.total_quantity)} unidades
        </p>
      </div>
    </div>
  );
}

function Revenue({
  a,
  align = "right",
}: {
  a: Analysis;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="text-2xl font-bold tracking-tight tabular-nums">
        {kz(Number(a.total_revenue))}{" "}
        <span className="text-xs font-semibold text-muted-foreground">Kz</span>
      </p>
    </div>
  );
}

function ViewLink({ id }: { id: number }) {
  return (
    <Link
      href={`/analyses/${id}`}
      className="inline-flex items-center gap-2 rounded-full bg-chart-2/60 py-1.5 pr-2.5 pl-4 text-sm font-medium transition-colors hover:bg-chart-2"
    >
      Ver análise <ArrowRight className="size-4" />
    </Link>
  );
}

function EmptyState({ hasData }: { hasData: boolean }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-primary">
        {hasData ? (
          <Search className="size-6" />
        ) : (
          <FileUp className="size-6" />
        )}
      </span>
      <h2 className="mt-5 text-lg font-bold tracking-tight">
        {hasData
          ? "Nenhuma análise corresponde aos filtros"
          : "Ainda não tens análises guardadas"}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {hasData
          ? "Altera a pesquisa para ver mais resultados."
          : "Carrega o teu primeiro ficheiro CSV para começares."}
      </p>
      {!hasData && (
        <Link
          href="/analyses/new"
          className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pr-1.5 pl-5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30"
        >
          Carregar CSV
          <span className="flex size-8 items-center justify-center rounded-full bg-white/25">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      )}
    </div>
  );
}
