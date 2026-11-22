"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/#produto", label: "Produto", match: null },
  { href: "/#funcionalidades", label: "Funcionalidades", match: null },
  { href: "/changelog", label: "Changelog", match: "/changelog" },
  { href: "/termos", label: "Termos", match: "/termos" },
];

export function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-extrabold tracking-tight">
            DataLens
          </Link>
          <nav
            className="hidden items-center gap-6 text-sm font-medium md:flex"
            aria-label="Principal"
          >
            {links.map(({ href, label, match }) => {
              const active = match !== null && pathname.startsWith(match);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "text-primary"
                      : "transition-colors hover:text-primary"
                  }
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* <Link href="/entrar" className="hidden text-sm font-medium transition-colors hover:text-primary sm:block">
            Entrar
          </Link> */}
          <Link
            href="/analyses/new"
            className="inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pr-1.5 pl-4 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-transform hover:scale-[1.02]"
          >
            Começar a analisar
            <span className="flex size-7 items-center justify-center rounded-full bg-white/25">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
          {/* <Link
            href="/entrar"
            aria-label="Conta"
            className="flex size-9 items-center justify-center rounded-full bg-foreground text-background"
          >
            <User className="size-4" />
          </Link> */}
        </div>
      </div>
    </header>
  );
}
