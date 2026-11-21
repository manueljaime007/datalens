import { features } from "@/shared/utils/features";

export function Features() {
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
