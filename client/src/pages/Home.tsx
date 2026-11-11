import { HomeHeader } from "../components/home/HomeHeader";
import { HomeHero } from "../components/home/HomeHero";
import { HowItWorks } from "../components/home/HowItWorks";
import { PreviewCall } from "../components/home/PreviewCall";

export const Home = () => (
  <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6">
    <HomeHeader />
    <main className="grid flex-1 items-center gap-12 py-12 md:grid-cols-2">
      <HomeHero />
      <PreviewCall />
    </main>
    <HowItWorks />
  </div>
);
