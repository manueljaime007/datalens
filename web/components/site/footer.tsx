import Link from "next/link";

export function Footer() {
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
          <div>
            <p>© 2026 DataLens. Todos os direitos reservados.</p>
            <p>
              Criado por{" "}
              <a
                href="https://github.com/manueljaime007"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Manuel Jaime
              </a>
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </footer>
  );
}
