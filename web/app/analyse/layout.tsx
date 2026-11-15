import Link from "next/link";
import { Lock, Moon } from "lucide-react";

export default function UploadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            DataLens
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/#produto" className="transition-colors hover:text-primary">Produto</Link>
            <Link href="/#funcionalidades" className="transition-colors hover:text-primary">Funcionalidades</Link>
            <Link href="/#changelog" className="transition-colors hover:text-primary">Changelog</Link>
            <Link href="/termos" className="transition-colors hover:text-primary">Termos</Link>
          </nav>

          <button
            type="button"
            aria-label="Alternar tema"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Moon className="size-5" />
          </button>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <p className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" aria-hidden />
            DataLens v1.2
            <span aria-hidden>•</span>
            Processamento 100% no navegador
            <span aria-hidden>•</span>
            Privacidade garantida
          </p>
          <p className="flex items-center gap-1.5">
            <Lock className="size-3.5" /> TLS 1.3 Seguro
          </p>
        </div>
      </footer>
    </div>
  );
}