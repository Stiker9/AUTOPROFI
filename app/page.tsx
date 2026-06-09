import { HeroBanner } from "@/components/home/HeroBanner";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PopularCars } from "@/components/home/PopularCars";
import { CTABanner } from "@/components/home/CTABanner";
import { BlogPreview } from "@/components/home/BlogPreview";

export default function HomePage() {
  return (
    <>
      <div className="bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 text-text-dim text-sm">
          [Селектор авто — Phase 2]
        </div>
      </div>
      <HeroBanner />
      <TrustBar />
      <CategoryGrid />
      <PopularCars />
      <CTABanner />
      <BlogPreview />
    </>
  );
}
