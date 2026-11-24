import { Star } from "lucide-react";

const REPO = "manueljaime007/datalens";

export function GitHubStarsBadge({ stars = 0 }: { stars?: number }) {
  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      aria-label="Ver o repositório do DataLens no GitHub"
    >
      <Star className="size-3.5" />
      <span className="tabular-nums">{stars}</span>
    </a>
  );
}
