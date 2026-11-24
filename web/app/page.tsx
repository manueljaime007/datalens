import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero, Features, Steps, FinalCta } from "@/components/landing";
import { getRepoStars } from "@/lib/github";

export default async function Home() {
  const stars = await getRepoStars();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header stars={stars} />
      <main className="flex-1">
        <Hero />
        <Features />
        <Steps />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
