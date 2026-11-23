"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links: { href: string; label: string; also?: string[] }[] = [
  { href: "/dashboard", label: "Dashboard", also: ["/analysis"] },
  { href: "/history", label: "Histórico" },
];

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      className={
        mobile
          ? "flex flex-col gap-1"
          : "hidden items-center gap-1 text-sm font-medium lg:flex"
      }
      aria-label={mobile ? "Principal (mobile)" : "Principal"}
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
            className={
              mobile
                ? `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-chart-2/70 text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`
                : `rounded-full px-4 py-2 transition-colors ${
                    active
                      ? "bg-chart-2/70 text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}