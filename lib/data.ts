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

export function getMakes(): string[] {
  return [...new Set(cars.map((c) => c.brand))].sort();
}

export function getModelsByMake(brand: string): string[] {
  return [...new Set(
    cars.filter((c) => c.brand === brand).map((c) => c.model)
  )].sort();
}

export function getYearsByMakeModel(brand: string, model: string): number[] {
  const matched = cars.filter((c) => c.brand === brand && c.model === model);
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
    return c.brand === brand && c.model === model &&
           year >= c.yearFrom && year <= end;
  });
}

export function getPopularCars(limit = 10): Car[] {
  return cars.filter((c) => c.popular).slice(0, limit);
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
