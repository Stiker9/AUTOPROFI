import type { Metadata } from "next";
import { getProducts, getProductBrands } from "@/lib/data";
import { ProductCard } from "@/components/shared/ProductCard";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";

export const metadata: Metadata = {
  title: "Каталог фаркопов и электрики | AUTOPROFI",
  description: "Широкий выбор фаркопов, электрики и аксессуаров. Фильтрация по марке, типу крюка, наличию.",
};

type Product = ReturnType<typeof getProducts>[number];

function applyFilters(
  products: Product[],
  params: Record<string, string | undefined>
) {
  let result = [...products];

  if (params.cat) {
    result = result.filter((p) => p.category === params.cat);
  }
  if (params.brand) {
    const brands = getProductBrands();
    const found = brands.find((b) => b.slug === params.brand);
    if (found) result = result.filter((p) => p.brand === found.name);
  }
  if (params.hookType) {
    result = result.filter((p) => p.hookType === params.hookType);
  }
  if (params.bumperCut) {
    result = result.filter((p) => p.bumperCut === params.bumperCut);
  }
  if (params.inStock === "1") {
    result = result.filter((p) => p.inStock);
  }
  if (params.priceMin) {
    const min = Number(params.priceMin);
    if (!isNaN(min)) result = result.filter((p) => p.price >= min);
  }
  if (params.priceMax) {
    const max = Number(params.priceMax);
    if (!isNaN(max)) result = result.filter((p) => p.price <= max);
  }

  return result;
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const allProducts = getProducts();
  const filtered = applyFilters(allProducts, params);
  const brands = getProductBrands();

  // Derive filter options from ALL products (not filtered)
  const hookTypes = [
    ...new Set(
      allProducts.map((p) => p.hookType).filter((v): v is string => !!v)
    ),
  ].sort();
  const bumperCuts = [
    ...new Set(
      allProducts
        .map((p) => p.bumperCut)
        .filter((v): v is string => v !== null && v !== "нет")
    ),
  ].sort();

  return (
    <>
      {/* Page header */}
      <section className="bg-bg-primary border-b border-border">
        <div className="w-full px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="font-display text-5xl lg:text-6xl text-white uppercase leading-none tracking-wide">
            Каталог
          </h1>
          <p className="font-ui text-text-muted text-sm mt-2">
            Фаркопы, электрика и аксессуары для прицепа
          </p>
        </div>
      </section>

      {/* Main: sidebar + grid */}
      <div className="w-full px-6 lg:px-12 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* Sidebar */}
          <div className="lg:w-52 shrink-0">
            <CatalogFilters
              brands={brands}
              hookTypes={hookTypes}
              bumperCuts={bumperCuts}
              totalCount={allProducts.length}
              filteredCount={filtered.length}
            />
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 py-16 items-center">
                <p className="font-ui text-text-muted text-base">Ничего не найдено</p>
                <p className="font-ui text-text-dim text-sm">Попробуйте изменить фильтры</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
