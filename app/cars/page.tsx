import type { Metadata } from "next";
import Link from "next/link";
import { CarSelector } from "@/components/CarSelector";
import { getPopularCars } from "@/lib/data";

export const metadata: Metadata = {
  title: "Подбор фаркопа по автомобилю",
  description:
    "Выберите марку, модель и год — мы покажем совместимые фаркопы для вашего автомобиля.",
};

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<{ make?: string; model?: string }>;
}) {
  const { make, model } = await searchParams;
  const popularCars = getPopularCars();

  return (
    <>
      {/* Hero */}
      <section className="bg-bg-primary border-b border-border">
        <div className="w-full px-6 lg:px-12 py-16 lg:py-24">
          <h1 className="font-display text-5xl lg:text-7xl text-white uppercase leading-none tracking-wide mb-4">
            Подбор фаркопа по автомобилю
          </h1>
          <p className="font-ui text-text-muted text-base lg:text-lg max-w-2xl">
            Выберите марку, модель и год — мы покажем совместимые фаркопы
          </p>
        </div>
      </section>

      {/* Car Selector */}
      <CarSelector initialMake={make} initialModel={model} />

      {/* Popular cars */}
      <section className="bg-bg-primary py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <h2 className="font-display text-3xl lg:text-4xl text-white uppercase tracking-wide mb-8">
            Популярные автомобили
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {popularCars.map((car) => (
              <Link
                key={car.slug}
                href={`/cars/${car.slug}`}
                className="bg-bg-secondary border border-border p-4 flex flex-col gap-1 hover:border-white transition-colors"
              >
                <span className="font-ui text-sm font-semibold text-white leading-tight">
                  {car.title}
                </span>
                <span className="font-ui text-xs text-text-muted">
                  {car.body}
                </span>
                <span className="font-ui text-xs text-text-dim mt-auto pt-2">
                  {car.yearFrom}–{car.yearTo ?? "н.в."}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
