"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMakes, getModelsByMake, getBodyOptionsByMakeModel } from "@/lib/data";
import type { Car } from "@/types";

const BRAND_LOGOS: Record<string, string> = {
  BMW: "/images/brands/bmw.svg",
};

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

  const showMakes = !make;
  const showModels = !!make && !model;
  const showBodies = !!model && bodyOptions.length > 0;

  const chipBase =
    "font-ui text-sm text-left border border-border px-3 py-1.5 hover:border-white hover:bg-bg-tertiary transition-colors cursor-pointer";

  return (
    <div className="bg-bg-secondary border-b border-border">
      <div className="w-full px-6 lg:px-12 py-3">

        {/* Метка + хлебные крошки */}
        <div className="flex flex-wrap gap-2 items-center">
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-text-muted shrink-0 mr-2">
            Подобрать по авто:
          </p>

          {/* Выбранная марка */}
          {make && (
            <button
              onClick={() => { setMake(""); setModel(""); }}
              className="flex items-center gap-1.5 font-ui text-sm text-white border border-accent px-3 py-1.5 hover:bg-bg-tertiary transition-colors cursor-pointer"
            >
              {BRAND_LOGOS[make] && (
                <Image src={BRAND_LOGOS[make]} alt={make} width={16} height={16} className="rounded-full" />
              )}
              {make}
              <span className="text-text-dim ml-0.5">✕</span>
            </button>
          )}

          {/* Выбранная модель */}
          {model && (
            <>
              <span className="text-text-dim text-sm">›</span>
              <button
                onClick={() => setModel("")}
                className="font-ui text-sm text-white border border-border px-3 py-1.5 hover:bg-bg-tertiary transition-colors cursor-pointer"
              >
                {model} <span className="text-text-dim">✕</span>
              </button>
            </>
          )}
        </div>

        {/* Грид марок */}
        {showMakes && (
          <div className="mt-3 pt-3 border-t border-border">
            <span className="font-ui text-xs text-text-dim uppercase tracking-wider block mb-2">
              Марка:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-x-4 gap-y-1.5">
              {makes.map((m) => (
                <button
                  key={m}
                  onClick={() => setMake(m)}
                  className="flex items-center gap-1.5 font-ui text-sm text-white text-left hover:text-accent transition-colors cursor-pointer truncate"
                >
                  {BRAND_LOGOS[m] && (
                    <Image src={BRAND_LOGOS[m]} alt={m} width={16} height={16} className="rounded-full shrink-0" />
                  )}
                  <span className="truncate">{m}</span>
                </button>
              ))}
            </div>
          </div>
        )}

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
                className={`${chipBase} text-white`}
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
