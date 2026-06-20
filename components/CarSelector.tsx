"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getMakes, getModelsByMake, getBodyOptionsByMakeModel } from "@/lib/data";
import type { Car } from "@/types";

function formatBodyLabel(car: Car): string {
  const yearTo = car.yearTo ?? "н.в.";
  const years = `${car.yearFrom}–${yearTo}`;
  return car.generation ? `${car.generation} (${years})` : `(${years})`;
}

function matchSlug(displayName: string, slug: string): boolean {
  return displayName.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase();
}

interface CarSelectorProps {
  initialMake?: string;
  initialModel?: string;
}

export function CarSelector({ initialMake, initialModel }: CarSelectorProps) {
  const router = useRouter();

  const makes = getMakes();

  const [make, setMake] = useState(() => {
    if (!initialMake) return "";
    return getMakes().find((m) => matchSlug(m, initialMake)) ?? "";
  });

  const [model, setModel] = useState(() => {
    if (!initialMake || !initialModel) return "";
    const foundMake = getMakes().find((m) => matchSlug(m, initialMake));
    if (!foundMake) return "";
    return getModelsByMake(foundMake).find((m) => matchSlug(m, initialModel)) ?? "";
  });

  const [carSlug, setCarSlug] = useState("");
  const [error, setError] = useState("");

  const models = make ? getModelsByMake(make) : [];
  const bodyOptions = make && model ? getBodyOptionsByMakeModel(make, model) : [];

  function handleSearch() {
    if (!carSlug) return;
    router.push(`/cars/${carSlug}`);
  }

  const selectClass =
    "font-ui bg-bg-tertiary border border-border text-white text-sm px-3 py-2.5 focus:outline-none focus:border-accent transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed w-full";

  return (
    <div className="bg-bg-secondary border-b border-border">
      <div className="w-full px-6 lg:px-12 py-3">
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-text-muted shrink-0 sm:mr-2">
            Подобрать по авто:
          </p>

          <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full">
            {/* Make */}
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                setModel("");
                setCarSlug("");
                setError("");
              }}
              className={selectClass}
            >
              <option value="">Марка</option>
              {makes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            {/* Model */}
            <select
              value={model}
              disabled={!make}
              onChange={(e) => {
                setModel(e.target.value);
                setCarSlug("");
                setError("");
              }}
              className={selectClass}
            >
              <option value="">Модель</option>
              {models.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            {/* Body / Generation */}
            <select
              value={carSlug}
              disabled={!model}
              onChange={(e) => {
                setCarSlug(e.target.value);
                setError("");
              }}
              className={selectClass}
            >
              <option value="">Кузов</option>
              {bodyOptions.map((car) => (
                <option key={car.slug} value={car.slug}>
                  {formatBodyLabel(car)}
                </option>
              ))}
            </select>

            {/* Search button */}
            <button
              onClick={handleSearch}
              disabled={!carSlug}
              className="font-ui bg-accent text-black font-semibold text-sm px-6 py-2.5 uppercase tracking-wide hover:bg-accent-hover transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              Найти
            </button>
          </div>
        </div>

        {error && (
          <p className="font-ui text-xs text-red-400 mt-1.5">{error}</p>
        )}
      </div>
    </div>
  );
}
