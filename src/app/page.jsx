import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import PortfolioSection from "@/components/PortfolioSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <TrustBadges />
        </div>
      </div>
      <PortfolioSection />
    </>
  );
}
