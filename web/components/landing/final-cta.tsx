import { PrimaryButton } from "../site/primary-button";

export function FinalCta() {
  return (
    <section className="bg-black/95 bg-[url('/land_bg.png')] bg-dots bg-dark-section py-20 text-dark-section-foreground sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white font-medium tracking-wide uppercase">
          Pronto para começar?
        </span>
        <h2 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tighter text-balance sm:text-6xl text-white">
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
