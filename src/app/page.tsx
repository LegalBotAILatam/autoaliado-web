import { FeatureStrip } from "@/components/home/FeatureStrip";
import { SignupFlow } from "@/components/signup/SignupFlow";
import { Hero } from "@/components/home/Hero";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-aa-page">
      <SiteHeader />
      <main>
      <Hero />
      <SignupFlow embedded />
      <FeatureStrip />
      </main>
    </div>
  );
}
