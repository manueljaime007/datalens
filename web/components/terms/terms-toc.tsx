"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, ListTree, Printer } from "lucide-react";

type Section = { id: string; title: string };

export function TermsToc({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  function go(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  }

  return (
    <nav
      aria-label="Índice de secções"
      className="rounded-2xl border border-border bg-card p-5 shadow-sm print:hidden"
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-semibold tracking-tight">
          <ListTree className="size-4 text-primary" /> Índice de secções
        </h2>
        <span className="rounded-full bg-chart-2/70 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          {sections.length} itens
        </span>
      </div>

      <ol className="mt-4 space-y-1">
        {sections.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(s.id);
                }}
                aria-current={isActive ? "location" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs transition-colors ${
                  isActive
                    ? "bg-chart-2/60 font-semibold text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span className="w-4 text-[11px] tabular-nums opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  {i + 1}. {s.title}
                </span>
                {isActive && <ChevronRight className="size-3.5" />}
              </a>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 space-y-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-chart-2/60 px-4 py-2.5 text-xs font-semibold transition-colors hover:bg-chart-2"
        >
          <Printer className="size-4" /> Imprimir documento
        </button>
        <Link
          href="/analyses/new"
          className="flex w-full items-center justify-between rounded-full bg-primary py-1.5 pr-1.5 pl-4 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-transform hover:scale-[1.01]"
        >
          Abrir aplicação
          <span className="flex size-7 items-center justify-center rounded-full bg-white/25">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      </div>
    </nav>
  );
}
