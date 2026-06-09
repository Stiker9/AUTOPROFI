import Link from "next/link";
import type { Car } from "@/types";

interface CarChipProps {
  car: Car;
}

export function CarChip({ car }: CarChipProps) {
  const href = `/cars?make=${car.makeSlug}&model=${car.modelSlug}`;
  return (
    <Link
      href={href}
      className="font-ui inline-block border border-border hover:border-accent hover:text-accent text-text-muted text-xs font-medium px-3 py-1.5 transition-colors duration-150 cursor-pointer"
    >
      {car.make} {car.model}
    </Link>
  );
}
