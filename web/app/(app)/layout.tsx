import { AppHeader } from "@/components/app/app-header";
import { AppFooter } from "@/components/app/app-footer";
import { getRepoStars } from "@/lib/github";

export const instant = false;

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const stars = await getRepoStars();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader stars={stars} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}