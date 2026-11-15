import { Lock } from "lucide-react";
import { AppHeader } from "@/components/app/app-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">{children}</main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <p>
            DataLens v1.2 <span aria-hidden>•</span> Processamento 100% no navegador <span aria-hidden>•</span> Privacidade garantida
          </p>
          <p className="flex items-center gap-1.5 font-medium">
            <Lock className="size-3.5" /> TLS 1.3 Seguro
          </p>
        </div>
      </footer>
    </div>
  );
}