import { AppHeader } from "@/components/app/app-header";
import { AppFooter } from "@/components/app/app-footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </main>

      <AppFooter />
    </div>
  );
}
