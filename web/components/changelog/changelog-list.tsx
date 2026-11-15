"use client";

import { useState } from "react";
import {
  Calendar,
  ChartColumn,
  CircleCheck,
  CircleDollarSign,
  Columns3,
  Database,
  Gauge,
  LayoutDashboard,
  Link2,
  Lock,
  PieChart,
  Pointer,
  Rocket,
  ScanSearch,
  Check,
  Smartphone,
  SlidersHorizontal,
  TrendingUp,
  Trophy,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Dados                                                                     */
/* -------------------------------------------------------------------------- */

type Kind = "novidade" | "melhoria" | "correcao";

type Release = {
  id: string;
  version: string;
  latest?: boolean;
  date: string;
  kinds: Kind[];
  tags: { label: string; icon?: LucideIcon; tone: "orange" | "blue" | "soft" }[];
  title: string;
  text: string;
  highlights:
    | { kind: "features"; items: { icon: LucideIcon; title: string; text: string }[] }
    | { kind: "stats"; items: { icon: LucideIcon; value: string; label: string }[] };
  changesTitle: string;
  changes: { icon: LucideIcon; title: string; text: string }[];
  build: string;
  engine: string;
};

const releases: Release[] = [
  {
    id: "v1-0-1",
    version: "v1.0.1",
    latest: true,
    date: "26 de Outubro de 2024",
    kinds: ["melhoria", "correcao"],
    tags: [
      { label: "Melhorado", icon: SlidersHorizontal, tone: "blue" },
      { label: "Corrigido", icon: Wrench, tone: "orange" },
    ],
    title: "Melhorias na experiência móvel e deteção de codificação CSV",
    text: "Atualização focada na otimização de velocidade de processamento WASM em dispositivos móveis e enriquecimento das mensagens de erro na validação de ficheiros com separadores mistos.",
    highlights: {
      kind: "features",
      items: [
        { icon: Smartphone, title: "Otimização Mobile WASM", text: "Processamento local até 2.4x mais rápido em chips ARM móveis." },
        { icon: CircleDollarSign, title: "Formatação em Kz (Kwanza)", text: "Suporte total a pontuação regional de moeda e casas decimais." },
      ],
    },
    changesTitle: "Mudanças detalhadas",
    changes: [
      { icon: Pointer, title: "Interface de carregamento:", text: "Animações aprimoradas na dropzone e suporte tátil melhorado com resposta hápica contextualizada." },
      { icon: TrendingUp, title: "Apresentação dos indicadores:", text: "Novo cálculo ponderado de ticket médio e aplicação precisa de separadores de milhares na moeda Kz." },
      { icon: Columns3, title: "Experiência em dispositivos móveis:", text: "Tabelas com scroll horizontal suave e sticky columns na classificação de produtos para preservar contexto visual." },
      { icon: CircleCheck, title: "Resolução de bug no motor CSV:", text: "Corrigida a deteção de delimitadores de ponto-e-vírgula (;) em ficheiros legados de Excel sem quebra do cabeçalho." },
    ],
    build: "rel-1.0.1-prod",
    engine: "motor WASM v0.4.2",
  },
  {
    id: "v1-0-0",
    version: "v1.0.0",
    date: "14 de Outubro de 2024",
    kinds: ["novidade"],
    tags: [
      { label: "Novo", icon: Rocket, tone: "orange" },
      { label: "Lançamento Oficial", tone: "blue" },
    ],
    title: "Lançamento inicial oficial do DataLens",
    text: "Apresentamos o DataLens: o analisador analítico de ficheiros CSV de vendas que processa tudo diretamente no teu navegador, sem enviar dados para a cloud. Privacidade absoluta e velocidade local sem fricção.",
    highlights: {
      kind: "stats",
      items: [
        { icon: Lock, value: "100% Local", label: "Zero upload cloud" },
        { icon: Gauge, value: "< 300ms", label: "Leitura de 50k linhas" },
        { icon: PieChart, value: "5 KPIs", label: "Receita, ticket e volume" },
        { icon: Database, value: "IndexedDB", label: "Histórico seguro" },
      ],
    },
    changesTitle: "Principais capacidades da versão 1.0",
    changes: [
      { icon: ScanSearch, title: "Análise de ficheiros CSV instantânea:", text: "Verificação automática de integridade estrutural, deteção de cabeçalhos vazios e separadores comuns." },
      { icon: ChartColumn, title: "Indicadores de vendas essenciais:", text: "Cálculo dinâmico de contagem de Registos, Quantidades transacionadas, Receita líquida em Kz e Ticket Médio por transação." },
      { icon: PieChart, title: "Distribuição de receita por categoria:", text: "Gráficos interativos em anel e barras percentuais com filtros rápidos por clique." },
      { icon: Trophy, title: "Ranking top 5 produtos:", text: "Destaque imediato dos itens mais vendidos por volume e contributo total para a margem de vendas." },
      { icon: LayoutDashboard, title: "Histórico 100% privado com IndexedDB:", text: "Retenção de análises anteriores na sandbox do dispositivo, garantindo confidencialidade empresarial integral." },
    ],
    build: "rel-1.0.0-genesis",
    engine: "motor WASM v0.4.0",
  },
];

const filters: { id: "all" | Kind; label: string; dot?: string }[] = [
  { id: "all", label: "Todas as notas" },
  { id: "novidade", label: "Novidades", dot: "bg-primary" },
  { id: "melhoria", label: "Melhorias", dot: "bg-muted-foreground" },
  { id: "correcao", label: "Correcções", dot: "bg-destructive" },
];

const toneClass = {
  orange: "bg-accent text-accent-foreground",
  blue: "bg-chart-2/70 text-foreground",
  soft: "bg-secondary text-muted-foreground",
};

/* -------------------------------------------------------------------------- */
/*  Componente                                                                */
/* -------------------------------------------------------------------------- */

export function ChangelogList() {
  const [filter, setFilter] = useState<"all" | Kind>("all");
  const [copied, setCopied] = useState<string | null>(null);

  const visible = releases.filter((r) => filter === "all" || r.kinds.includes(filter));

  async function copyLink(id: string) {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard indisponível: ignora */
    }
  }

  return (
    <>
      {/* Filtros */}
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar notas">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                active ? "bg-foreground text-background" : "bg-card text-muted-foreground shadow-sm hover:text-foreground"
              }`}
            >
              {f.dot && <span className={`size-1.5 rounded-full ${f.dot}`} />}
              {f.label}
              {f.id === "all" && (
                <span className="rounded-full bg-white/20 px-1.5 text-[10px]">{releases.length}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Linha do tempo */}
      <ol className="relative mt-12 space-y-8 pl-8 sm:pl-10">
        <span aria-hidden className="absolute top-3 bottom-3 left-[0.6rem] w-px bg-chart-2" />

        {visible.map((r) => (
          <li key={r.id} id={r.id} className="relative scroll-mt-24">
            <span
              aria-hidden
              className={`absolute top-7 -left-8 size-5 rounded-full border-[5px] sm:-left-10 ${
                r.latest ? "border-primary bg-background" : "border-foreground bg-primary"
              }`}
            />

            <article className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              {/* Versão, etiquetas e data */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-lg px-3 py-1.5 text-lg font-bold tracking-tight ${
                      r.latest ? "bg-foreground text-background" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {r.version}
                  </span>
                  {r.tags.map((t) => (
                    <span key={t.label} className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${toneClass[t.tone]}`}>
                      {t.icon && <t.icon className="size-3" />} {t.label}
                    </span>
                  ))}
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" /> {r.date}
                </p>
              </div>

              <h2 className="mt-5 text-2xl font-bold tracking-tight text-balance sm:text-3xl">{r.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{r.text}</p>

              {/* Destaques */}
              {r.highlights.kind === "features" ? (
                <div className="mt-6 grid gap-4 rounded-2xl bg-chart-2/40 p-4 md:grid-cols-2">
                  {r.highlights.items.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="flex items-center gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-chart-2 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <p className="font-semibold tracking-tight">{title}</p>
                        <p className="text-xs text-muted-foreground">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {r.highlights.items.map(({ icon: Icon, value, label }) => (
                    <div key={value} className="flex flex-col items-center rounded-2xl bg-chart-2/40 px-4 py-5 text-center">
                      <Icon className="size-5 text-primary" />
                      <p className="mt-2 font-bold tracking-tight">{value}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Mudanças */}
              <h3 className="mt-8 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                {r.changesTitle}
              </h3>
              <ul className="mt-4 space-y-4">
                {r.changes.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3 text-sm leading-relaxed">
                    <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                    <p>
                      <b className="font-semibold">{title}</b> <span className="text-muted-foreground">{text}</span>
                    </p>
                  </li>
                ))}
              </ul>

              {/* Rodapé do cartão */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-chart-2/40 px-4 py-3 text-xs text-muted-foreground">
                <p>
                  build: <b className="text-foreground">{r.build}</b> <span aria-hidden>•</span> {r.engine}
                </p>
                <button
                  type="button"
                  onClick={() => copyLink(r.id)}
                  className="inline-flex items-center gap-1.5 font-semibold text-accent-foreground hover:underline"
                >
                  {copied === r.id ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
                  <span aria-live="polite">{copied === r.id ? "Hiperligação copiada" : "Copiar hiperligação"}</span>
                </button>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </>
  );
}