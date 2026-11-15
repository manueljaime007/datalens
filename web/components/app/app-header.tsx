"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChartLine, CircleHelp, FileUp, User } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/historico", label: "Histórico" },
  { href: "/documentacao", label: "Documentação" },
  { href: "/ajuda", label: "Ajuda" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background">
              <ChartLine className="size-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">DataLens</span>
            <span className="hidden rounded bg-chart-2 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground sm:inline">
              SAAS
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 text-sm font-medium lg:flex"
            aria-label="Principal"
          >
            {links.map(({ href, label }) => {
              const active =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 transition-colors ${
                    active
                      ? "bg-chart-2/70 text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/analisar"
            className="inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pr-1.5 pl-4 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Carregar CSV
            <span className="flex size-7 items-center justify-center rounded-full bg-white/25">
              <FileUp className="size-4" />
            </span>
          </Link>

          <button
            type="button"
            aria-label="Ajuda"
            className="hidden rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground sm:block"
          >
            <CircleHelp className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Notificações"
            className="relative hidden rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground sm:block"
          >
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
          </button>

          <div className="hidden items-center gap-2.5 border-l border-border pl-4 sm:flex">
            <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-background">
              <User className="size-4" />
            </span>
            <span className="text-xs leading-tight">
              <span className="block font-semibold">João Silva</span>
              <span className="text-muted-foreground">Admin</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
