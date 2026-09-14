import { FeatureStrip } from "@/components/home/FeatureStrip";
import { LeadCapture } from "@/components/home/LeadCapture";
import { Hero } from "@/components/home/Hero";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-aa-page">
      <SiteHeader />
      <main>
      <Hero />
      <LeadCapture />
      <FeatureStrip />
      </main>
    </div>
  );
}
