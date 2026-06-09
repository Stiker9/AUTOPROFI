import { HeroBanner } from "@/components/home/HeroBanner";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PopularCars } from "@/components/home/PopularCars";
import { CTABanner } from "@/components/home/CTABanner";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CarSelector } from "@/components/CarSelector";

export default function HomePage() {
  return (
    <>
      <CarSelector />
      <HeroBanner />
      <TrustBar />
      <CategoryGrid />
      <PopularCars />
      <CTABanner />
      <BlogPreview />
    </>
  );
}
