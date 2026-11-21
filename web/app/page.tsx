
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero, Features, Steps, FinalCta } from "@/components/landing";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
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

