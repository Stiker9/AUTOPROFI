"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface CatalogFiltersProps {
  brands: Array<{ name: string; slug: string }>;
  hookTypes: string[];
  bumperCuts: string[];
  totalCount: number;
  filteredCount: number;
}

export function CatalogFilters({ brands, hookTypes, bumperCuts, totalCount, filteredCount }: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function update(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    router.replace(`${pathname}?${next.toString()}`);
  }

  function toggle(key: string, value: string) {
    const current = params.get(key);
    update(key, current === value ? null : value);
  }

  const cat = params.get("cat") ?? "";
  const brand = params.get("brand") ?? "";
  const hookType = params.get("hookType") ?? "";
  const bumperCut = params.get("bumperCut") ?? "";
  const inStock = params.get("inStock") === "1";
  const priceMin = params.get("priceMin") ?? "";
  const priceMax = params.get("priceMax") ?? "";

  const selectClass = "font-ui bg-bg-tertiary border border-border text-white text-xs px-2 py-1.5 w-full focus:outline-none focus:border-white transition-colors cursor-pointer";
  const inputClass = "font-ui bg-bg-tertiary border border-border text-white text-xs px-2 py-1.5 w-full focus:outline-none focus:border-white transition-colors placeholder:text-text-dim";

  return (
    <aside className="flex flex-col gap-5">
      {/* Result count */}
      <p className="font-ui text-xs text-text-muted">
        Найдено: <span className="text-white font-medium">{filteredCount}</span> из {totalCount}
      </p>

      {/* Category */}
      <div>
        <p className="font-ui text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Категория</p>
        <div className="flex flex-col gap-1">
          {[
            { label: "Все", value: "" },
            { label: "Фаркопы", value: "towbars" },
            { label: "Электрика", value: "electrics" },
            { label: "Аксессуары", value: "accessories" },
          ].map((o) => (
            <button
              key={o.value}
              onClick={() => update("cat", o.value || null)}
              className={`font-ui text-xs text-left px-2 py-1.5 transition-colors cursor-pointer ${
                cat === o.value ? "text-white bg-bg-tertiary" : "text-text-muted hover:text-white"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <p className="font-ui text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Бренд</p>
        <select value={brand} onChange={(e) => update("brand", e.target.value || null)} className={selectClass}>
          <option value="">Все бренды</option>
          {brands.map((b) => (
            <option key={b.slug} value={b.slug}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Hook type (only shown if there are options) */}
      {hookTypes.length > 0 && (
        <div>
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Тип крюка</p>
          <div className="flex flex-col gap-1">
            {hookTypes.map((ht) => (
              <button
                key={ht}
                onClick={() => toggle("hookType", ht)}
                className={`font-ui text-xs text-left px-2 py-1.5 transition-colors cursor-pointer ${
                  hookType === ht ? "text-white bg-bg-tertiary" : "text-text-muted hover:text-white"
                }`}
              >
                {ht}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bumper cut */}
      {bumperCuts.length > 0 && (
        <div>
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Вырез в бампере</p>
          <div className="flex flex-col gap-1">
            {bumperCuts.map((bc) => (
              <button
                key={bc}
                onClick={() => toggle("bumperCut", bc)}
                className={`font-ui text-xs text-left px-2 py-1.5 transition-colors cursor-pointer ${
                  bumperCut === bc ? "text-white bg-bg-tertiary" : "text-text-muted hover:text-white"
                }`}
              >
                {bc}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* In stock */}
      <div>
        <button
          onClick={() => update("inStock", inStock ? null : "1")}
          className={`font-ui text-xs flex items-center gap-2 cursor-pointer transition-colors ${inStock ? "text-white" : "text-text-muted hover:text-white"}`}
        >
          <span className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center text-black text-[10px] ${inStock ? "bg-accent border-accent" : "border-border"}`}>
            {inStock ? "✓" : ""}
          </span>
          Только в наличии
        </button>
      </div>

      {/* Price range */}
      <div>
        <p className="font-ui text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Цена, ₽</p>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="от"
            value={priceMin}
            onChange={(e) => update("priceMin", e.target.value || null)}
            className={inputClass}
          />
          <span className="text-text-dim text-xs">—</span>
          <input
            type="number"
            placeholder="до"
            value={priceMax}
            onChange={(e) => update("priceMax", e.target.value || null)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Reset all */}
      <button
        onClick={() => router.replace(pathname)}
        className="font-ui text-xs text-text-dim hover:text-white transition-colors cursor-pointer text-left underline underline-offset-2"
      >
        Сбросить фильтры
      </button>
    </aside>
  );
}
