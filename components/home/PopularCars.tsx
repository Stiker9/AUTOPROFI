import { getPopularCars } from "@/lib/data";
import { CarChip } from "@/components/shared/CarChip";

export function PopularCars() {
  const cars = getPopularCars();
  return (
    <section className="bg-bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="font-ui text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
          Часто ищут фаркоп для:
        </p>
        <div className="flex flex-wrap gap-2">
          {cars.map((car) => (
            <CarChip key={car.slug} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
