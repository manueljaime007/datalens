"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Archive,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  BadgeCheck,
  Calendar,
  ChevronDown,
  Clock,
  Database,
  Download,
  FileText,
  FileUp,
  LayoutGrid,
  Lightbulb,
  ListFilter,
  MoreVertical,
  Search,
  Shield,
  SlidersHorizontal,
  Table2,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Dados (substituir pelo que vier do IndexedDB)                             */
/* -------------------------------------------------------------------------- */

type Analysis = {
  id: string;
  file: string;
  size: string;
  rows: number;
  date: string;
  ago: string;
  daysAgo: number;
  revenue: number;
  margin: string;
  status: "Concluído";
};

const analyses: Analysis[] = [
  { id: "q3", file: "vendas_angola_2024_q3.csv", size: "2.4 MB", rows: 14820, date: "24 Out 2024, 14:32", ago: "Há 2 dias", daysAgo: 2, revenue: 42850600, margin: "31.4%", status: "Concluído" },
  { id: "set", file: "relatorio_luanda_setembro.csv", size: "1.8 MB", rows: 9450, date: "18 Out 2024, 10:15", ago: "Há 8 dias", daysAgo: 8, revenue: 28120400, margin: "28.2%", status: "Concluído" },
  { id: "ben", file: "transacoes_loja_benguela.csv", size: "850 KB", rows: 4120, date: "05 Out 2024, 16:45", ago: "Há 21 dias", daysAgo: 21, revenue: 14950000, margin: "34.0%", status: "Concluído" },
  { id: "ago", file: "vendas_geral_agosto_2024.csv", size: "3.1 MB", rows: 18200, date: "28 Set 2024, 09:20", ago: "Há 28 dias", daysAgo: 28, revenue: 55300800, margin: "36.8%", status: "Concluído" },
];

const nfDec = new Intl.NumberFormat("pt-PT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
/** 4120 -> "4.120" (o Intl pt-PT não agrupa números de 4 dígitos) */
const kz = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

type ViewState = "data" | "empty" | "loading";

const SHOW_SIMULATOR = process.env.NODE_ENV !== "production";

/* -------------------------------------------------------------------------- */
/*  Vista principal                                                           */
/* -------------------------------------------------------------------------- */

export function HistoryView() {
  const [state, setState] = useState<ViewState>("data");
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("90");
  const [status, setStatus] = useState("all");
  const [layout, setLayout] = useState<"table" | "grid">("table");

  const items = state === "data" ? analyses : [];

  const filtered = useMemo(
    () =>
      items.filter(
        (a) =>
          a.file.toLowerCase().includes(query.trim().toLowerCase()) &&
          a.daysAgo <= Number(period) &&
          (status === "all" || a.status === status),
      ),
    [items, query, period, status],
  );

  const totalRows = analyses.reduce((s, a) => s + a.rows, 0);
  const totalRevenue = analyses.reduce((s, a) => s + a.revenue, 0);
  const avgRevenue = totalRevenue / analyses.length;

  return (
    <div>
      {/* Cabeçalho */}
      <nav aria-label="Localização" className="text-xs text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
        <span className="mx-1">›</span>
        <span className="font-semibold text-foreground">Histórico</span>
      </nav>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-chart-2/60 px-3 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-primary" /> Armazenamento local seguro
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tighter sm:text-5xl">Histórico de análises</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Consulta os ficheiros que já analisaste e os respectivos resultados de vendas processados no teu dispositivo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-3 rounded-full border border-border bg-card py-1.5 pr-1.5 pl-5 text-sm font-semibold shadow-sm transition-colors hover:bg-secondary"
          >
            Exportar índice
            <span className="flex size-8 items-center justify-center rounded-full bg-secondary">
              <Download className="size-4" />
            </span>
          </button>
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

      {/* Simulador de estado */}
      {SHOW_SIMULATOR && (
        <div className="mt-8 inline-flex items-center gap-1 rounded-full bg-chart-2/50 p-1.5 pl-4 text-xs">
          <span className="mr-2 flex items-center gap-2 font-semibold tracking-wide text-muted-foreground uppercase">
            <SlidersHorizontal className="size-3.5 text-primary" /> Estado:
          </span>
          {(
            [
              ["data", `Com dados (${analyses.length})`],
              ["empty", "Vazio"],
              ["loading", "A carregar (skeleton)"],
            ] as [ViewState, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setState(id)}
              aria-pressed={state === id}
              className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
                state === id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Métricas */}
      <section aria-label="Resumo" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {state === "loading" ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-2xl" />)
        ) : (
          <>
            <Stat
              label="Ficheiros processados"
              icon={Archive}
              value={state === "data" ? String(analyses.length) : "0"}
              badge={state === "data" ? "+1 este mês" : undefined}
              note={state === "data" ? `Total de ${kz(totalRows)} registos lidos` : "Ainda sem registos lidos"}
            />
            <Stat
              label="Volume consolidado"
              icon={Banknote}
              value={state === "data" ? nfDec.format(totalRevenue / 1_000_000) + "M" : "0"}
              unit="Kz"
              note={state === "data" ? `Média de ${nfDec.format(avgRevenue / 1_000_000)}M Kz por lote` : "Sem volume faturado"}
            />
            <Stat
              label="Precisão média"
              icon={BadgeCheck}
              value={state === "data" ? "99.8%" : "—"}
              badge={state === "data" ? "0 falhas" : undefined}
              neutralBadge
              note="Compatibilidade CSV total"
            />
            <div className="relative overflow-hidden rounded-2xl bg-dark-section p-6 text-dark-section-foreground">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full bg-primary/20 blur-3xl"
              />
              <div className="relative flex items-center justify-between text-sm text-white/70">
                Privacidade local <Shield className="size-5" />
              </div>
              <p className="relative mt-6 text-2xl font-bold tracking-tight">IndexedDB / Cache</p>
              <p className="relative mt-3 text-xs leading-relaxed text-white/60">
                Nenhum dado financeiro sai deste computador.
              </p>
            </div>
          </>
        )}
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

          <Select icon={Calendar} label="Período" value={period} onChange={setPeriod}>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
            <option value="365">Último ano</option>
          </Select>

          <Select icon={ListFilter} label="Status" value={status} onChange={setStatus}>
            <option value="all">Status: Todos</option>
            <option value="Concluído">Status: Concluído</option>
          </Select>

          <p className="text-xs text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "análise salva" : "análises salvas"}
          </p>

          <div className="flex rounded-lg bg-chart-2/40 p-1" role="group" aria-label="Modo de visualização">
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
                  layout === id ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
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
        {state === "loading" ? (
          <div className="space-y-px p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState hasData={state === "data"} />
        ) : layout === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="bg-chart-2/40 text-[11px] tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Ficheiro</th>
                  <th className="px-3 py-4 text-left font-semibold">Data da análise</th>
                  <th className="px-3 py-4 text-right font-semibold">Receita total (Kz)</th>
                  <th className="px-3 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Acção</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-t border-border/60">
                    <td className="px-6 py-4">
                      <FileCell a={a} />
                    </td>
                    <td className="px-3">
                      <p className="flex items-center gap-1.5 font-medium">
                        <Clock className="size-3.5 text-muted-foreground" /> {a.date}
                      </p>
                      <p className="text-xs text-muted-foreground">{a.ago}</p>
                    </td>
                    <td className="px-3 text-right">
                      <Revenue a={a} />
                    </td>
                    <td className="px-3">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-6">
                      <div className="flex items-center justify-end gap-2">
                        <ViewLink id={a.id} />
                        <button type="button" aria-label={`Mais opções para ${a.file}`} className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground">
                          <MoreVertical className="size-4" />
                        </button>
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
              <li key={a.id} className="flex flex-col gap-4 rounded-xl border border-border p-5">
                <div className="flex items-start justify-between gap-2">
                  <FileCell a={a} />
                  <StatusBadge status={a.status} />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" /> {a.date}
                    </p>
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
        {state !== "loading" && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-chart-2/30 px-6 py-3 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <Database className="size-4 text-primary" />
              A mostrar <b className="text-foreground">{filtered.length}</b> de <b className="text-foreground">{items.length}</b> análises realizadas localmente.
            </p>
            <div className="flex items-center gap-2">
              <button type="button" disabled className="rounded-full bg-chart-2/70 px-4 py-1.5 font-medium opacity-60">Anterior</button>
              <span className="flex size-7 items-center justify-center rounded-full bg-background font-semibold text-foreground">1</span>
              <button type="button" disabled className="rounded-full bg-chart-2/70 px-4 py-1.5 font-medium opacity-60">Seguinte</button>
            </div>
          </div>
        )}
      </section>

      {/* Dica */}
      <aside className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-chart-2/60">
            <Lightbulb className="size-5" />
          </span>
          <div>
            <h2 className="font-semibold tracking-tight">Sabias que podes comparar períodos?</h2>
            <p className="text-xs text-muted-foreground">
              Ao manter múltiplos relatórios no histórico, podes identificar sazonalidades de vendas em Luanda e províncias vizinhas.
            </p>
          </div>
        </div>
        <Link href="/documentacao" className="rounded-full bg-chart-2/60 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-chart-2">
          Saber mais
        </Link>
      </aside>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Peças                                                                     */
/* -------------------------------------------------------------------------- */

function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`animate-pulse bg-secondary motion-reduce:animate-none ${className}`} />;
}

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
        <span className="text-4xl font-extrabold tracking-tighter tabular-nums">{value}</span>
        {unit && <span className="text-base font-semibold text-muted-foreground">{unit}</span>}
        {badge && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              neutralBadge ? "bg-chart-2/70 text-muted-foreground" : "bg-accent text-accent-foreground"
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

function Select({
  icon: Icon,
  label,
  value,
  onChange,
  children,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-primary" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 cursor-pointer appearance-none rounded-full bg-chart-2/40 pr-9 pl-10 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
    </label>
  );
}

function FileCell({ a }: { a: Analysis }) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-chart-2/60 text-accent-foreground">
        <FileText className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate font-semibold tracking-tight">{a.file}</p>
        <p className="text-xs text-muted-foreground">
          {a.size} • {kz(a.rows)} linhas de dados
        </p>
      </div>
    </div>
  );
}

function Revenue({ a, align = "right" }: { a: Analysis; align?: "left" | "right" }) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="text-2xl font-bold tracking-tight tabular-nums">
        {kz(a.revenue)} <span className="text-xs font-semibold text-muted-foreground">Kz</span>
      </p>
      <p className="text-[11px] font-medium text-accent-foreground">Margem bruta: {a.margin}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-chart-2/60 px-2.5 py-1 text-[11px] font-medium">
      <span className="size-1.5 rounded-full bg-primary" /> {status}
    </span>
  );
}

function ViewLink({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard?analise=${id}`}
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
        {hasData ? <Search className="size-6" /> : <FileUp className="size-6" />}
      </span>
      <h2 className="mt-5 text-lg font-bold tracking-tight">
        {hasData ? "Nenhuma análise corresponde aos filtros" : "Ainda não tens análises guardadas"}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {hasData
          ? "Altera a pesquisa, o período ou o status para ver mais resultados."
          : "Carrega o teu primeiro ficheiro CSV e o resultado fica guardado aqui, só no teu dispositivo."}
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