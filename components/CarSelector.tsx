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

  const models = make ? getModelsByMake(make) : [];
  const bodyOptions = make && model ? getBodyOptionsByMakeModel(make, model) : [];

  const showModels = !!make && !model && models.length > 0;
  const showBodies = !!model && bodyOptions.length > 0;

  return (
    <div className="bg-bg-secondary border-b border-border">
      <div className="w-full px-6 lg:px-12 py-3">

        {/* Строка: метка + Марка + выбранная Модель */}
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-text-muted shrink-0 sm:mr-2">
            Подобрать по авто:
          </p>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Марка */}
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                setModel("");
              }}
              className="font-ui bg-bg-tertiary border border-border text-white text-sm px-3 py-2 focus:outline-none focus:border-accent transition-colors cursor-pointer"
            >
              <option value="">Марка</option>
              {makes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            {/* Выбранная модель — кнопка-крошка, клик сбрасывает */}
            {model && (
              <>
                <span className="text-text-dim text-sm">›</span>
                <button
                  onClick={() => setModel("")}
                  className="font-ui text-sm text-white border border-accent px-3 py-2 hover:bg-bg-tertiary transition-colors cursor-pointer"
                >
                  {model} ✕
                </button>
              </>
            )}
          </div>
        </div>

        {/* Грид моделей */}
        {showModels && (
          <div className="mt-3 pt-3 border-t border-border">
            <span className="font-ui text-xs text-text-dim uppercase tracking-wider block mb-2">
              Модель:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-2">
              {models.map((m) => (
                <button
                  key={m}
                  onClick={() => setModel(m)}
                  className="font-ui text-sm text-white text-left hover:text-accent transition-colors cursor-pointer truncate"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Чипы кузовов */}
        {showBodies && (
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2 items-center">
            <span className="font-ui text-xs text-text-dim uppercase tracking-wider shrink-0">
              Кузов:
            </span>
            {bodyOptions.map((car) => (
              <button
                key={car.slug}
                onClick={() => router.push(`/cars/${car.slug}`)}
                className="font-ui text-sm text-white border border-border px-4 py-1.5 hover:border-white hover:bg-bg-tertiary transition-colors cursor-pointer"
              >
                {formatBodyLabel(car)}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
