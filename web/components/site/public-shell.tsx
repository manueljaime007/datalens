import Link from "next/link";
import { PublicHeader } from "@/components/site/public-header";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/60 print:hidden">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:px-6">
          <p className="flex flex-wrap items-center gap-3">
            <span className="text-base font-extrabold tracking-tight text-foreground">
              DataLens
            </span>
            Plataforma analítica inteligente para ficheiros CSV de vendas.
          </p>
          <nav
            className="flex flex-wrap items-center gap-6"
            aria-label="Rodapé"
          >
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/changelog" className="hover:text-foreground">
              Changelog
            </Link>
            <Link href="/termos" className="hover:text-foreground">
              Termos
            </Link>
            <span>© 2026 DataLens. Todos os direitos reservados.</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
