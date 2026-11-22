import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog | DataLens",
  description:
    "Novidades, melhorias e correções do DataLens. Transparência total sobre a evolução do analisador.",
};

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
        Changelog
      </h1>
      <p className="mt-4 text-muted-foreground">
        Acompanha as novidades, melhorias e correções do DataLens.
      </p>

      <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm font-semibold">
          Ainda não há atualizações publicadas.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Esta página será preenchida quando o changelog tiver uma fonte real.
        </p>
      </div>
    </div>
  );
}
