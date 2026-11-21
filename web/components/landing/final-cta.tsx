import { PrimaryButton } from "../site/primary-button";

export function FinalCta() {
  return (
    <section className="bg-black/95 bg-[url('/land_bg.png')] bg-dots bg-dark-section py-20 text-dark-section-foreground sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
          Comece agora
        </span>
        <h2 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tighter text-balance text-white sm:text-6xl">
          Analise o seu CSV em segundos.
        </h2>
        <p className="mt-6 max-w-xl text-balance text-white/60">
          Carregue o ficheiro, veja os resultados, em tempo real
        </p>
        <div className="mt-8">
          <PrimaryButton href="/analyses/new">Analisar o meu CSV</PrimaryButton>
        </div>
      </div>
    </section>
  );
}