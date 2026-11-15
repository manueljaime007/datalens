import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Banknote,
  Box,
  CheckCircle2,
  ChevronRight,
  Download,
  FileSpreadsheet,
  FileText,
  Headphones,
  History,
  Keyboard,
  LineChart,
  Lock,
  Mouse,
  Monitor,
  Moon,
  PieChart,
  ScanSearch,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  UploadCloud,
  Zap,
  Receipt,
  Trophy,
  Settings2,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Dados estáticos                                                           */
/* -------------------------------------------------------------------------- */

const kpis: {
  label: string;
  value: string;
  delta: string;
  note: string;
  icon: LucideIcon;
  check?: boolean;
}[] = [
  {
    label: "Receita Total",
    value: "Kz148.920,50",
    delta: "+18.4%",
    note: "vs mês anterior",
    icon: Banknote,
  },
  {
    label: "Total de Encomendas",
    value: "1.842",
    delta: "+12.1%",
    note: "vs mês anterior",
    icon: ShoppingCart,
  },
  {
    label: "Ticket Médio",
    value: "Kz18.000,85",
    delta: "+5.6%",
    note: "vs mês anterior",
    icon: Receipt,
  },
  {
    label: "Produtos Ativos",
    value: "246",
    delta: "100% categorizados",
    note: "",
    icon: Box,
    check: true,
  },
];

const months = [
  { m: "Jan", h: 28 },
  { m: "Fev", h: 38 },
  { m: "Mar", h: 46 },
  { m: "Abr", h: 42 },
  { m: "Mai", h: 56 },
  { m: "Jun", h: 62 },
  { m: "Jul", h: 72 },
  { m: "Ago", h: 82 },
  { m: "Set", h: 100 },
];

const categories = [
  {
    name: "Eletrónicos",
    value: "Kz 63.107.027,63",
    pct: 42,
    bar: "bg-primary",
    badge: true,
  },
  {
    name: "Moda & Vestuário",
    value: "Kz 42.071.351,75",
    pct: 28,
    bar: "bg-foreground",
  },
  {
    name: "Casa & Decoração",
    value: "Kz 27.045.868,98",
    pct: 18,
    bar: "bg-chart-2",
  },
  {
    name: "Outros",
    value: "Kz 18.030.579,32",
    pct: 12,
    bar: "bg-muted-foreground/40",
  },
];

const products: {
  name: string;
  icon: LucideIcon;
  category: string;
  qty: string;
  price: string;
  total: string;
}[] = [
  {
    name: "Auriculares Wireless Pro X",
    icon: Headphones,
    category: "Eletrónicos",
    qty: "420 un",
    price: "Kz 90.705,50",
    total: "Kz 38.096.311,68",
  },
  {
    name: "Monitor UltraWide 34''",
    icon: Monitor,
    category: "Eletrónicos",
    qty: "185 un",
    price: "Kz 352.127,04",
    total: "Kz 65.143.502,40",
  },
  {
    name: "Teclado Mecânico RGB",
    icon: Keyboard,
    category: "Eletrónicos",
    qty: "310 un",
    price: "Kz 75.672,00",
    total: "Kz 23.458.320,00",
  },
  {
    name: "Rato Ergonómico Master",
    icon: Mouse,
    category: "Eletrónicos",
    qty: "290 un",
    price: "Kz 60.436,70",
    total: "Kz 17.526.644,16",
  },
];

const features: {
  title: string;
  badge: string;
  text: string;
  icon: LucideIcon;
  footIcon: LucideIcon;
  footLeft: string;
  footRight: string;
  badgeClass: string;
}[] = [
  {
    title: "Análise automática",
    badge: "Instantâneo",
    text: "Obtenha indicadores importantes a partir dos seus ficheiros CSV. O sistema deteta delimitadores, limpa anomalias e gera resumos estatísticos no momento do envio.",
    icon: ScanSearch,
    footIcon: CheckCircle2,
    footLeft: "Deteção automática de colunas",
    footRight: "< 300ms",
    badgeClass: "bg-accent text-accent-foreground",
  },
  {
    title: "Visualização de dados",
    badge: "Gráficos Dinâmicos",
    text: "Explore receitas por categoria através de gráficos claros e intuitivos. Converta folhas de cálculo monótonas em painéis interativos fáceis de partilhar com a sua equipa.",
    icon: PieChart,
    footIcon: BarChart3,
    footLeft: "Linhas temporais e distribuições",
    footRight: "Pronto a exportar",
    badgeClass: "bg-secondary text-muted-foreground",
  },
  {
    title: "Ranking de produtos",
    badge: "Pareto 80/20",
    text: "Identifique os produtos com maior quantidade vendida. Descubra quais as referências que geram maior margem e tome decisões de inventário certeiras.",
    icon: Trophy,
    footIcon: Sparkles,
    footLeft: "Classificação por quantidade e receita",
    footRight: "Top N items",
    badgeClass: "bg-secondary text-muted-foreground",
  },
  {
    title: "Histórico de análises",
    badge: "Guarda localmente",
    text: "Consulte os resultados das suas análises anteriores. Compare o desempenho entre trimestres ou semestres sem necessidade de recarregar ficheiros antigos.",
    icon: History,
    footIcon: Lock,
    footLeft: "Privacidade: zero uploads para servidores",
    footRight: "Offline-ready",
    badgeClass: "bg-success/10 text-success",
  },
];

/* -------------------------------------------------------------------------- */
/*  Página                                                                    */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Steps />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

/* ----------------------------------- Header -------------------------------- */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          DataLens
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link
            href="#produto"
            className="transition-colors hover:text-primary"
          >
            Produto
          </Link>
          <Link
            href="#funcionalidades"
            className="transition-colors hover:text-primary"
          >
            Funcionalidades
          </Link>
          <Link
            href="#changelog"
            className="transition-colors hover:text-primary"
          >
            Changelog
          </Link>
          <Link href="#termos" className="transition-colors hover:text-primary">
            Termos
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Alternar tema"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Moon className="size-5" />
          </button>
          <PrimaryButton href="/analisar" size="sm">
            Começar a analisar
          </PrimaryButton>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ Botão primário ----------------------------- */

function PrimaryButton({
  href,
  children,
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full bg-primary font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        size === "sm"
          ? "py-1.5 pr-1.5 pl-4 text-sm"
          : "py-2 pr-2 pl-6 text-base"
      }`}
    >
      {children}
      <span
        className={`flex items-center justify-center rounded-full bg-white/25 ${
          size === "sm" ? "size-7" : "size-9"
        }`}
      >
        <ArrowUpRight className={size === "sm" ? "size-4" : "size-5"} />
      </span>
    </Link>
  );
}

/* ------------------------------------ Hero --------------------------------- */

function Hero() {
  return (
    <section
      id="produto"
      className="bg-dots border-b border-border/60 pt-20 sm:pt-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Análise de vendas simplificada
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tighter text-balance sm:text-6xl">
            Transforme os seus dados em decisões.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-balance sm:text-lg">
            Analise ficheiros CSV de vendas, descubra tendências e obtenha
            informações importantes sobre o seu negócio, tudo num só lugar.
          </p>

          <div className="mt-8">
            <PrimaryButton href="/analisar">
              Começar gratuitamente
            </PrimaryButton>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <Settings2 className="size-3.5 text-primary" /> Sem configuração
              complexa
            </li>
            <li className="flex items-center gap-1.5">
              <Zap className="size-3.5 text-primary" /> Processamento 100% no
              navegador
            </li>
            <li className="flex items-center gap-1.5">
              <FileText className="size-3.5 text-primary" /> Suporta apenas
              formatos CSV
            </li>
          </ul>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}

/* ------------------------------ Preview do painel -------------------------- */

function DashboardPreview() {
  return (
    <div className="mt-16 rounded-t-3xl border border-b-0 border-border bg-background p-3 shadow-xl shadow-foreground/5 sm:p-5">
      {/* Barra superior */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 text-xs">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-3 rounded-full bg-destructive/80" />
          <span className="size-3 rounded-full bg-primary" />
          <span className="size-3 rounded-full bg-success" />
        </div>
        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1">
          <FileSpreadsheet className="size-3.5 text-primary" />
          <span className="font-medium">Vendas_Q3_2024.csv</span>
          <span className="text-muted-foreground">2.4 MB</span>
        </div>
        <span className="hidden items-center gap-1.5 text-muted-foreground sm:flex">
          <FileText className="size-3.5" /> Relatório Geral
        </span>
        <div className="ml-auto flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-success">
            <span className="size-1.5 rounded-full bg-success" /> Sincronizado
          </span>
          <span className="hidden items-center gap-1 text-muted-foreground sm:flex">
            <Download className="size-3.5" /> Exportar PDF
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, value, delta, note, icon: Icon, check }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card p-4 text-left"
          >
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {label}
              <Icon className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
            <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-success">
              {check ? (
                <CheckCircle2 className="size-3" />
              ) : (
                <TrendingUp className="size-3" />
              )}
              {delta}
              {note && (
                <span className="font-normal text-muted-foreground">
                  {note}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <div className="rounded-xl border border-border bg-card p-5 text-left lg:col-span-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold">
                Evolução da Receita Mensal
              </h3>
              <p className="text-xs text-muted-foreground">
                Valores faturados de Janeiro a Setembro
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="size-2 rounded-sm bg-primary" /> Receita
            </span>
          </div>

          <div className="mt-6 flex h-48 items-end gap-3 border-b border-border/70 pb-1">
            {months.map(({ m, h }, i) => {
              const active = i >= 6;
              const last = i === months.length - 1;
              return (
                <div
                  key={m}
                  className="relative flex h-full flex-1 flex-col justify-end"
                >
                  {last && (
                    <span className="absolute -top-2 right-0 rounded-md bg-foreground px-2 py-1 text-[10px] font-medium whitespace-nowrap text-background">
                      Kz 21,62M
                    </span>
                  )}
                  <div
                    className={`w-full rounded-t-md ${active ? "bg-primary" : "bg-chart-2"}`}
                    style={{ height: `${h}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex gap-3 text-[11px] text-muted-foreground">
            {months.map(({ m }, i) => (
              <span
                key={m}
                className={`flex-1 text-center ${i === months.length - 1 ? "font-semibold text-foreground" : ""}`}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-border bg-card p-5 text-left lg:col-span-2">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-semibold">Vendas por Categoria</h3>
            <span className="text-[11px] text-muted-foreground">
              4 Categorias
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Repartição percentual e volume financeiro
          </p>

          <ul className="mt-5 space-y-4">
            {categories.map((c) => (
              <li key={c.name}>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-medium">{c.name}</span>
                  <span className="flex items-center gap-2 font-medium">
                    {c.value}
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] ${
                        c.badge
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {c.pct}%
                    </span>
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full ${c.bar}`}
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted-foreground">
            Margem líquida global calculada:
            <span className="font-semibold text-success">31.2%</span>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="mt-4 rounded-xl border border-border bg-card p-5 text-left">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold">Top Produtos Vendidos</h3>
            <p className="text-xs text-muted-foreground">
              Classificados por volume total faturado
            </p>
          </div>
          <span className="rounded-md bg-secondary px-2 py-1 text-[11px] text-muted-foreground">
            Exibindo 4 de 246
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-xs">
            <thead>
              <tr className="text-[11px] tracking-wide text-muted-foreground uppercase">
                <th className="py-2 text-left font-medium">Produto</th>
                <th className="py-2 text-left font-medium">Categoria</th>
                <th className="py-2 text-right font-medium">Qtd. vendida</th>
                <th className="py-2 text-right font-medium">Preço médio</th>
                <th className="py-2 text-right font-medium">Receita total</th>
              </tr>
            </thead>
            <tbody>
              {products.map(
                ({ name, icon: Icon, category, qty, price, total }) => (
                  <tr key={name} className="border-t border-border/60">
                    <td className="py-3">
                      <span className="flex items-center gap-3 font-medium">
                        <span className="flex size-7 items-center justify-center rounded-md bg-secondary">
                          <Icon className="size-3.5" />
                        </span>
                        {name}
                      </span>
                    </td>
                    <td>
                      <span className="rounded bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                        {category}
                      </span>
                    </td>
                    <td className="text-right">{qty}</td>
                    <td className="text-right">{price}</td>
                    <td className="text-right font-semibold">{total}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Funcionalidades ------------------------- */

function Features() {
  return (
    <section
      id="funcionalidades"
      className="border-b border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <span className="inline-block rounded-md border border-border px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase">
          Recursos poderosos
        </span>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tighter text-balance sm:text-4xl">
          Tudo o que precisas para compreender os teus dados.
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Ferramentas pensadas para simplificar a interpretação de ficheiros de
          vendas sem fórmulas complicadas.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-background">
                  <f.icon className="size-5" />
                </span>
                <span
                  className={`rounded-md px-2 py-1 text-[11px] font-medium ${f.badgeClass}`}
                >
                  {f.badge}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.text}
              </p>
              <div className="mt-5 flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-xs">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <f.footIcon className="size-3.5 text-primary" /> {f.footLeft}
                </span>
                <span className="font-semibold">{f.footRight}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ Passos ------------------------------- */

function Steps() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-md border border-border px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase">
            Passo a passo
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
            Simples. Rápido. Intuitivo.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Em menos de 30 segundos, passe do ficheiro bruto a conclusões de
            negócio claras.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* 01 */}
          <article className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <span className="text-5xl font-extrabold tracking-tighter text-primary/20">
                01
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-secondary">
                <FileText className="size-4" />
              </span>
            </div>
            <h3 className="mt-6 text-lg font-semibold">Carregar ficheiro</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Escolha o ficheiro CSV que pretende analisar. Arraste e solte o
              ficheiro de vendas diretamente na janela da aplicação.
            </p>
            <div className="mt-auto pt-6">
              <div className="rounded-xl border border-dashed border-border bg-background p-4 text-center text-xs">
                <UploadCloud className="mx-auto mb-1 size-5 text-primary" />
                <p className="font-medium">Vendas_Setembro.csv</p>
                <p className="text-muted-foreground">
                  Formatos suportados: apenas CSV
                </p>
              </div>
            </div>
          </article>

          {/* 02 */}
          <article className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <span className="text-5xl font-extrabold tracking-tighter text-primary/20">
                02
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-secondary">
                <Settings2 className="size-4" />
              </span>
            </div>
            <h3 className="mt-6 text-lg font-semibold">Analisar dados</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Deixe o DataLens processar os seus dados automaticamente. Os
              cálculos de receitas, agrupamento de produtos e conversões ocorrem
              no cliente.
            </p>
            <div className="mt-auto pt-6">
              <div className="rounded-xl bg-secondary p-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-success" /> 1.842
                    linhas analisadas
                  </span>
                  <span className="font-semibold text-primary">100%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-background">
                  <div className="h-full w-full rounded-full bg-primary" />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                  <span>Indexação</span>
                  <span>Sanitização concluída</span>
                </div>
              </div>
            </div>
          </article>

          {/* 03 */}
          <article className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <span className="text-5xl font-extrabold tracking-tighter text-primary/20">
                03
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-secondary">
                <LineChart className="size-4" />
              </span>
            </div>
            <h3 className="mt-6 text-lg font-semibold">Explorar resultados</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Consulte métricas, gráficos e rankings dos seus produtos. Obtenha
              respostas instantâneas para partilhar com a administração e
              sócios.
            </p>
            <div className="mt-auto pt-6">
              <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4 text-xs">
                <span className="flex items-center gap-3">
                  <TrendingUp className="size-4 text-success" />
                  <span>
                    <span className="block font-semibold">
                      Kz 27,9k faturados
                    </span>
                    <span className="text-muted-foreground">
                      Pronto a exportar
                    </span>
                  </span>
                </span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ CTA final ---------------------------- */

function FinalCta() {
  return (
    <section className="bg-dots bg-dark-section py-20 text-dark-section-foreground sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide uppercase">
          Pronto para começar?
        </span>
        <h2 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tighter text-balance sm:text-6xl">
          Os seus dados têm histórias para contar.
        </h2>
        <p className="mt-6 max-w-xl text-white/60 text-balance">
          Comece a explorar os seus dados e descubra o que está por detrás dos
          números. Sem fricção, sem configurações complicadas.
        </p>
        <div className="mt-8">
          <PrimaryButton href="/analisar">Analisar o meu CSV</PrimaryButton>
        </div>
        <p className="mt-6 text-xs text-primary/80">
          Sem necessidade de registo de cartão de crédito • Resultados imediatos
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------ Footer ------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="text-2xl font-extrabold tracking-tight">DataLens</p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
              Plataforma analítica inteligente desenvolvida para transformar
              folhas de cálculo e ficheiros CSV de vendas em relatórios visuais
              acionáveis.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-wide uppercase">
              Navegação
            </p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#funcionalidades" className="hover:text-foreground">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="#changelog" className="hover:text-foreground">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-wide uppercase">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/termos" className="hover:text-foreground">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-foreground">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/seguranca" className="hover:text-foreground">
                  Segurança
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <p>© 2026 DataLens. Todos os direitos reservados.</p>
          <p>Criado por Manuel Jaime</p>
        </div>
      </div>
    </footer>
  );
}
