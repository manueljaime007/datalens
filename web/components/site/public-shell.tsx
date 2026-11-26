import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

export function PublicShell({
  children,
  stars,
}: {
  children: React.ReactNode;
  stars: number;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header stars={stars} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
