import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function PrimaryButton({
  href,
  children,
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full bg-primary font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        size === "sm"
          ? "py-1.5 pr-1.5 pl-4 text-sm"
          : "py-2 pr-2 pl-6 text-base"
      }`}
    >
      {children}
      <span
        className={`flex items-center justify-center rounded-full bg-white/25 ${
          size === "sm" ? "size-7" : "size-9"
        }`}
      >
        <ArrowUpRight className={size === "sm" ? "size-4" : "size-5"} />
      </span>
    </Link>
  );
}
