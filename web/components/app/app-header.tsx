"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileUp } from "lucide-react";
import { Suspense, useEffect, useRef } from "react";
import { Github } from "@hugeicons/core-free-icons";
import { GitHubStarsBadge } from "../site/github-stars";

const links: { href: string; label: string; also?: string[] }[] = [
  { href: "/dashboard", label: "Dashboard", also: ["/analysis"] },
  { href: "/history", label: "Histórico" },
];

export function AppHeader({ stars }: { stars: number}) {
  const pathname = usePathname();

  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        menuRef.current.removeAttribute("open");
      }
    }

    // Adiciona o event listener ao document para fechar o menu ao clicar fora
    document.addEventListener("click", handleClickOutside);
    // No retorno, removemos o event listener para evitar múltiplos listeners e vazamentos de memória.
    // Isso garante que o listener só está ativo enquanto o componente está montado.
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="text-lg font-bold tracking-tight text-[24px]">
              DataLens
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 text-sm font-medium lg:flex"
            aria-label="Principal"
          >
            {links.map(({ href, label, also = [] }) => {
              const active = [href, ...also].some(
                (p) => pathname === p || pathname.startsWith(`${p}/`),
              );
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
            href="/analyses/new"
            className="hidden items-center gap-3 rounded-full bg-primary py-1.5 pr-1.5 pl-4 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:inline-flex"
          >
            Carregar CSV
            <span className="flex size-7 items-center justify-center rounded-full bg-white/25">
              <FileUp className="size-4" />
            </span>
          </Link>

          <GitHubStarsBadge stars={stars}/>

          <details ref={menuRef} className="relative lg:hidden">
            <summary
              aria-label="Abrir menu"
              className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&::-webkit-details-marker]:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="size-5"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>

            <nav
              aria-label="Principal (mobile)"
              className="absolute right-0 top-12 w-64 rounded-2xl border border-border bg-background p-2 shadow-lg"
            >
              {links.map(({ href, label, also = [] }) => {
                const active = [href, ...also].some(
                  (p) => pathname === p || pathname.startsWith(`${p}/`),
                );
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-chart-2/70 text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}

              <Link
                href="/analyses/new"
                className="mt-2 flex items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground sm:hidden"
              >
                Carregar CSV
                <span className="flex size-7 items-center justify-center rounded-full bg-white/25">
                  <FileUp className="size-4" />
                </span>
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
