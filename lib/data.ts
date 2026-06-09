import type { Car, Product, BlogPost } from "@/types";

import carsData from "@/data/cars.json";
import productsData from "@/data/products.json";
import blogData from "@/data/blog.json";

const cars = carsData as Car[];
const products = productsData as Product[];
const blog = blogData as BlogPost[];

// ─── Авто ────────────────────────────────────────────────────────────────────

export function getCars(): Car[] {
  return cars;
}

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}

export function getMakes(): string[] {
  return [...new Set(cars.map((c) => c.make))].sort();
}

export function getModelsByMake(make: string): string[] {
  return [...new Set(
    cars.filter((c) => c.make === make).map((c) => c.model)
  )].sort();
}

export function getYearsByMakeModel(make: string, model: string): number[] {
  const matched = cars.filter((c) => c.make === make && c.model === model);
  const years = new Set<number>();
  const currentYear = new Date().getFullYear();
  matched.forEach((c) => {
    const end = c.yearEnd ?? currentYear;
    for (let y = c.yearStart; y <= end; y++) {
      years.add(y);
    }
  });
  return [...years].sort((a, b) => b - a);
}

export function getGenerationByMakeModelYear(
  make: string,
  model: string,
  year: number
): Car | undefined {
  const currentYear = new Date().getFullYear();
  return cars.find((c) => {
    const end = c.yearEnd ?? currentYear;
    return c.make === make && c.model === model &&
           year >= c.yearStart && year <= end;
  });
}

const POPULAR_CAR_SLUGS = [
  "toyota-rav4-5-2019",
  "kia-sportage-5-2021",
  "volkswagen-tiguan-2-2016",
  "hyundai-tucson-4-2021",
  "nissan-xtrail-4-2022",
  "toyota-rav4-4-2013",
  "kia-sportage-4-2016",
];

export function getPopularCars(limit = 7): Car[] {
  return POPULAR_CAR_SLUGS
    .slice(0, limit)
    .map((slug) => getCarBySlug(slug))
    .filter((c): c is Car => c !== undefined);
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
