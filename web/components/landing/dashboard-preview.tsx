import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  TrendingUp,
} from "lucide-react";
import {
  categories,
  kpis,
  months,
  products,
} from "@/shared/utils/dashboard-preview-data";

export function DashboardPreview() {
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
