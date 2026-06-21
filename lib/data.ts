import type { Car, Product, BlogPost } from "@/types";

import carsData from "@/data/cars.json";
import productsData from "@/data/products.json";
import blogData from "@/data/blog.json";

const cars = carsData as unknown as Car[];
const products = productsData as unknown as Product[];
const blog = blogData as BlogPost[];

// ─── Авто ────────────────────────────────────────────────────────────────────

export function getCars(): Car[] {
  return cars;
}

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}

// 60 записей в данных хранят имя модели в поле generation вместо model.
// Эта функция нормализует: возвращает model, а при пустом model — generation.
function effectiveModel(car: Car): string {
  return car.model || car.generation || "";
}

export function getMakes(): string[] {
  return [...new Set(cars.map((c) => c.brand))].sort();
}

export function getModelsByMake(brand: string): string[] {
  return [...new Set(
    cars.filter((c) => c.brand === brand).map(effectiveModel).filter(Boolean)
  )].sort();
}

export function getYearsByMakeModel(brand: string, model: string): number[] {
  const matched = cars.filter((c) => c.brand === brand && effectiveModel(c) === model);
  const years = new Set<number>();
  const currentYear = new Date().getFullYear();
  matched.forEach((c) => {
    const end = c.yearTo ?? currentYear;
    for (let y = c.yearFrom; y <= end; y++) {
      years.add(y);
    }
  });
  return [...years].sort((a, b) => b - a);
}

export function getGenerationByMakeModelYear(
  brand: string,
  model: string,
  year: number
): Car | undefined {
  const currentYear = new Date().getFullYear();
  return cars.find((c) => {
    const end = c.yearTo ?? currentYear;
    return c.brand === brand && effectiveModel(c) === model &&
           year >= c.yearFrom && year <= end;
  });
}

export function getBodyOptionsByMakeModel(brand: string, model: string): Car[] {
  return cars.filter((c) => c.brand === brand && effectiveModel(c) === model);
}

export function getPopularCars(limit = 10): Car[] {
  const popular = cars.filter((c) => c.popular);
  return (popular.length > 0 ? popular : cars).slice(0, limit);
}

// ─── Товары ──────────────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsForCar(carSlug: string): Product[] {
  return products.filter((p) => p.fitsCars.includes(carSlug));
}

export function getProductsByCategory(
  cat: "towbars" | "electrics" | "accessories"
): Product[] {
  return products.filter((p) => p.category === cat);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand === brand);
}

function slugifyBrand(brand: string): string {
  const map: Record<string, string> = {
    "а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"yo","ж":"zh",
    "з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o",
    "п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"kh","ц":"ts",
    "ч":"ch","ш":"sh","щ":"sch","ъ":"","ы":"y","ь":"","э":"e","ю":"yu","я":"ya",
  };
  return brand
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getProductBrands(): Array<{ name: string; slug: string }> {
  const names = [...new Set(products.map((p) => p.brand))].sort();
  return names.map((name) => ({ name, slug: slugifyBrand(name) }));
}

export function getProductsByBrandSlug(brandSlug: string): Product[] {
  const brand = getProductBrands().find((b) => b.slug === brandSlug);
  if (!brand) return [];
  return products.filter((p) => p.brand === brand.name);
}

// ─── Блог ─────────────────────────────────────────────────────────────────────

export function getBlogPosts(): BlogPost[] {
  return blog;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blog.find((p) => p.slug === slug);
}

export function getLatestBlogPosts(limit = 3): BlogPost[] {
  return [...blog]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
