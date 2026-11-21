import Link from "next/link";
import {
  ChevronRight,
  FileText,
  LineChart,
  Settings2,
  TrendingUp,
  UploadCloud,
} from "lucide-react";

export function Steps() {
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
