export function AppFooter() {
  return (
    <footer className="border-t border-border/70 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-block rounded px-2 py-1 text-xs md:text-2xl font-bold text-primary">
              DataLens
            </span>
            <span className="text-muted-foreground text-xs">v1.0</span>
          </div>
          
          {/* <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Processamento 100% no navegador</span>
            <span aria-hidden className="text-muted-foreground/40">
              •
            </span>
            <span>Privacidade garantida</span>
            <span aria-hidden className="text-muted-foreground/40">
              •
            </span>
            <span className="flex items-center gap-1 font-medium">
            </span>
          </div> */}
          
        </div>
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[11px] text-muted-foreground/70">
          <p>© 2026 DataLens. Todos os direitos reservados.</p>
          <p>
            Criado por{" "}
            <a
              href="https://github.com/manueljaiem007"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Manuel Jaime
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
