import { FileText, Settings2, Zap } from "lucide-react";
import { PrimaryButton } from "../site/primary-button";
import { DashboardPreview } from "./dashboard-preview";

export function Hero() {
  return (
    <section
      id="produto"
      className="bg-dots border-b border-border/60 pt-20 sm:pt-28 bg-[url('/land_bg.png')]"
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
            <PrimaryButton href="/analyses/new">
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


