"use client";

import Link from "next/link";
import {} from "lucide-react";
import { PrimaryButton } from "./primary-button";
import { usePathname } from "next/navigation";
import { GitHubStarsBadge } from "./github-stars";

import { useEffect, useRef } from "react";
import { cn } from "cn";

const links = [
  { href: "/#produto", label: "Produto", match: null },
  { href: "/#funcionalidades", label: "Funcionalidades", match: null },
  { href: "/changelog", label: "Changelog", match: "/changelog" },
  { href: "/terms", label: "Termos", match: "/terms" },
];

export function Header({ stars }: { stars: number }) {
  const pathname = usePathname();

  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current?.contains(event.target as Node)) {
        menuRef.current.removeAttribute("open");
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-16">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
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
        <div className="flex items-center gap-2 sm:gap-3">
          <GitHubStarsBadge stars={stars} />

          <div className="hidden sm:block">
            <PrimaryButton href="/analyses/new" size="sm">
              Começar a analisar
            </PrimaryButton>
          </div>
          <details ref={menuRef} className="relative md:hidden">
            <summary
              aria-label="Abrir menu"
              className="flex size-9 cursor-pointer list-none items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
            <nav className="absolute right-0 top-12 w-64 rounded-2xl border border-border bg-background p-2 shadow-lg">
              {links.map(({ href, label, match }) => {
                const active = match !== null && pathname.startsWith(match);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => {
                      menuRef.current?.removeAttribute("open");
                    }}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary",
                      active
                        ? "text-primary"
                        : "transition-colors hover:text-primary",
                    )}
                  >
                    {label}
                  </Link>
                );
              })}

              <Link
                href="/analyses/new"
                onClick={() => {
                  menuRef.current?.removeAttribute("open");
                }}
                className="mt-2 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground sm:hidden"
              >
                Começar a analisar
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
