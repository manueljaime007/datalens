// app/(app)/history/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-64 animate-pulse rounded bg-secondary" />
      <div className="h-40 animate-pulse rounded-2xl bg-secondary" />
      <div className="h-64 animate-pulse rounded-2xl bg-secondary" />
    </div>
  );
}
