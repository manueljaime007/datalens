import type { Metadata } from "next";
import Link from "next/link";
import { BellRing, Headset, Lightbulb, Rss } from "lucide-react";
import { ChangelogList } from "@/components/changelog/changelog-list";

export const metadata: Metadata = {
  title: "Changelog | DataLens",
  description:
    "Novidades, melhorias e correcções do DataLens. Transparência total sobre a evolução do analisador direto no navegador.",
};

export default function ChangelogPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Brilhos decorativos */}
      <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-96 w-[36rem] rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-96 -left-40 h-96 w-96 rounded-full bg-chart-2/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6">
        {/* Cabeçalho */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-chart-2/60 px-3 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-primary" /> Atualizações do produto
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/changelog/rss.xml"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold shadow-sm transition-colors hover:bg-secondary"
            >
              <Rss className="size-3.5 text-primary" /> Feed RSS
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-90"
            >
              <BellRing className="size-3.5" /> Notificações por email
            </button>
          </div>
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tighter text-balance sm:text-6xl">
          O que há de novo no <span className="text-primary">DataLens</span>?
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Acompanha as novidades, melhorias e correcções do DataLens. Criado para manter transparência total sobre a evolução do analisador direto no navegador.
        </p>

        {/* Filtros e linha do tempo */}
        <ChangelogList />

        {/* Comunidade */}
        <section className="relative mt-16 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12">
          <div aria-hidden className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground uppercase">
              Canal aberto à comunidade
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tighter text-balance sm:text-4xl">
              Tens uma sugestão de melhoria ou encontraste um problema?
            </h2>
            <p className="mt-4 text-muted-foreground">
              O DataLens evolui com a experiência dos utilizadores. Se tens um formato de CSV específico ou precisas de novas métricas de vendas, partilha connosco.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contacto?assunto=sugestao"
                className="inline-flex items-center gap-3 rounded-full bg-primary py-2 pr-2 pl-6 font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-transform hover:scale-[1.02]"
              >
                Sugerir funcionalidade
                <span className="flex size-8 items-center justify-center rounded-full bg-white/25">
                  <Lightbulb className="size-4" />
                </span>
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full bg-chart-2/70 px-5 py-3 font-semibold transition-colors hover:bg-chart-2"
              >
                <Headset className="size-4" /> Contactar suporte
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}