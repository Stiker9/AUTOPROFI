# Phase 1: Scaffold & Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Инициализировать работающий Next.js 14 проект с дизайн-системой, JSON-моками, полностью типизированным слоем данных `lib/data.ts` и визуальной оболочкой главной страницы (все 10 блоков, статические данные).

**Architecture:** App Router Next.js 14. Все данные — только через `lib/data.ts`. JSON-файлы в `/data` — mock-база. Компоненты рендерятся из возвращаемых значений функций, никогда не импортируют JSON напрямую.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS 3, Bebas Neue + Inter (Google Fonts), Vitest для unit-тестов.

---

## Карта файлов

```
/app
  layout.tsx          — RootLayout: шрифты, глобальные стили, Navbar + Footer
  page.tsx            — Главная: собирает все 10 блоков
  globals.css         — CSS custom properties (design tokens)
/components
  layout/
    Navbar.tsx        — Sticky header + nav
    Footer.tsx        — Footer 4 колонки
  home/
    Topbar.tsx        — Блок 01: телефон, часы
    HeroBanner.tsx    — Блок 04: hero секция
    TrustBar.tsx      — Блок 05: 5 иконок преимуществ
    CategoryGrid.tsx  — Блок 06: плитки категорий
    PopularCars.tsx   — Блок 07: SEO-чипы
    CTABanner.tsx     — Блок 08: CTA запись
    BlogPreview.tsx   — Блок 09: 3 карточки блога
  shared/
    CarChip.tsx       — Чип-ссылка на авто (переиспользуется)
    BlogCard.tsx      — Карточка статьи (переиспользуется)
/data
  cars.json           — поколения авто (generation-level)
  products.json       — товары (фаркопы + электрика)
  blog.json           — статьи блога
/lib
  data.ts             — единственная точка доступа к данным
/types
  index.ts            — Car, Product, BlogPost типы
vitest.config.ts
vitest.setup.ts
```

> **Блок 03 (CarSelector)** — клиентский компонент с каскадным стейтом. Входит в **Phase 2**, здесь только placeholder-заглушка.

---

## Task 1: Инициализация Next.js проекта

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`

- [ ] **Step 1: Инициализировать Next.js в текущей директории**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias="@/*" --yes
```

Если спросит про существующие файлы (`existing files`) — выбрать **продолжить** (continue). BRIEF.md и docs/ не будут затронуты.

Expected: создаются `package.json`, `app/`, `public/`, `tailwind.config.ts`, `tsconfig.json`.

- [ ] **Step 2: Проверить что проект запускается**

```bash
npm run dev
```

Expected: в браузере `http://localhost:3000` — дефолтная Next.js страница. Ctrl+C для остановки.

- [ ] **Step 3: Инициализировать git**

```bash
git init
git add .gitignore
git commit -m "chore: init Next.js 14 App Router project"
```

---

## Task 2: Установить Vitest

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Modify: `package.json` (добавить scripts + devDependencies)

- [ ] **Step 1: Установить зависимости**

```bash
npm install -D vitest @vitejs/plugin-react vite-tsconfig-paths
```

- [ ] **Step 2: Создать `vitest.config.ts`**

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "node",
    globals: true,
  },
});
```

- [ ] **Step 3: Добавить script в `package.json`**

В секцию `"scripts"` добавить:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Проверить что тесты запускаются (пустой прогон)**

```bash
npm test
```

Expected: `No test files found` или `0 passed` — без ошибок конфигурации.

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts package.json package-lock.json
git commit -m "chore: add Vitest for unit testing"
```

---

## Task 3: Дизайн-система — Tailwind + CSS tokens + шрифты

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx` (добавить шрифты)

- [ ] **Step 1: Обновить `tailwind.config.ts`**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#F59E0B",
          hover: "#D97706",
        },
        bg: {
          primary: "#000000",
          secondary: "#111111",
          tertiary: "#1a1a1a",
        },
        border: {
          DEFAULT: "#1F2937",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Обновить `app/globals.css`**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #000000;
  --bg-secondary: #111111;
  --bg-tertiary: #1a1a1a;
  --accent: #F59E0B;
  --accent-hover: #D97706;
  --text-primary: #ffffff;
  --text-muted: #9CA3AF;
  --text-dim: #4B5563;
  --border: #1F2937;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-inter), sans-serif;
}
```

- [ ] **Step 3: Установить Google Fonts и обновить `app/layout.tsx`**

```bash
npm install next
```

(уже установлен — убедись что версия 14+)

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

// Bebas Neue — только latin, кириллицы нет, используем для display-заголовков на латинице
// Для кириллических заголовков используем Inter 900
const bebasNeue = localFont({
  src: "../public/fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | AUTOPROFI — Фаркопы",
    default: "AUTOPROFI — Фаркопы: продажа и установка",
  },
  description: "Продажа и профессиональная установка фаркопов. Подбор по марке, модели и году автомобиля.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-body bg-bg-primary text-white">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Скачать Bebas Neue и положить в `/public/fonts/`**

Скачать с [fonts.google.com/specimen/Bebas+Neue](https://fonts.google.com/specimen/Bebas+Neue) → Download family → распаковать → скопировать `BebasNeue-Regular.ttf` в `public/fonts/BebasNeue-Regular.ttf`.

Создать папку:
```bash
mkdir -p public/fonts
```

- [ ] **Step 5: Проверить что дизайн-система работает**

```bash
npm run dev
```

Открыть `http://localhost:3000` — фон должен быть чёрным.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.ts app/globals.css app/layout.tsx public/fonts/
git commit -m "feat: add design system — Tailwind tokens, Bebas Neue + Inter fonts"
```

---

## Task 4: TypeScript типы

**Files:**
- Create: `types/index.ts`

- [ ] **Step 1: Создать `types/index.ts`**

```typescript
// types/index.ts

export interface Car {
  slug: string;
  make: string;
  makeSlug: string;
  model: string;
  modelSlug: string;
  generation: number;
  yearStart: number;
  yearEnd: number | null;       // null = по настоящее время
  bodyTypes: string[];
  displayName: string;          // "Toyota RAV4 (V поколение, 2019–н.в.)"
}

export interface Product {
  id: string;
  name: string;
  brand: string;                // "bosal" | "westfalia" | "baltex" | ...
  brandDisplay: string;         // "Bosal"
  category: "towbars" | "electrics" | "accessories";
  hookType?: "flanged" | "removable" | "vertical" | null;
  price: number;                // в рублях
  fitsCars: string[];           // carSlug[]
  images: string[];             // пути /products/...
  description: string;
  maxLoad?: number;             // кг, для фаркопов
  ballLoad?: number;            // кг, нагрузка на шар
  articleNumber?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;                 // ISO: "2026-05-15"
  image: string;
  readTime: number;             // минуты
}
```

- [ ] **Step 2: Commit**

```bash
git add types/index.ts
git commit -m "feat: add TypeScript types for Car, Product, BlogPost"
```

---

## Task 5: JSON моки

**Files:**
- Create: `data/cars.json`
- Create: `data/products.json`
- Create: `data/blog.json`

- [ ] **Step 1: Создать `data/cars.json`**

5 поколений трёх популярных моделей:

```json
[
  {
    "slug": "toyota-rav4-5-2019",
    "make": "Toyota",
    "makeSlug": "toyota",
    "model": "RAV4",
    "modelSlug": "rav4",
    "generation": 5,
    "yearStart": 2019,
    "yearEnd": null,
    "bodyTypes": ["SUV"],
    "displayName": "Toyota RAV4 (V поколение, 2019–н.в.)"
  },
  {
    "slug": "toyota-rav4-4-2013",
    "make": "Toyota",
    "makeSlug": "toyota",
    "model": "RAV4",
    "modelSlug": "rav4",
    "generation": 4,
    "yearStart": 2013,
    "yearEnd": 2018,
    "bodyTypes": ["SUV"],
    "displayName": "Toyota RAV4 (IV поколение, 2013–2018)"
  },
  {
    "slug": "kia-sportage-4-2016",
    "make": "Kia",
    "makeSlug": "kia",
    "model": "Sportage",
    "modelSlug": "sportage",
    "generation": 4,
    "yearStart": 2016,
    "yearEnd": 2021,
    "bodyTypes": ["SUV"],
    "displayName": "Kia Sportage (IV поколение, 2016–2021)"
  },
  {
    "slug": "kia-sportage-5-2021",
    "make": "Kia",
    "makeSlug": "kia",
    "model": "Sportage",
    "modelSlug": "sportage",
    "generation": 5,
    "yearStart": 2021,
    "yearEnd": null,
    "bodyTypes": ["SUV"],
    "displayName": "Kia Sportage (V поколение, 2021–н.в.)"
  },
  {
    "slug": "volkswagen-tiguan-2-2016",
    "make": "Volkswagen",
    "makeSlug": "volkswagen",
    "model": "Tiguan",
    "modelSlug": "tiguan",
    "generation": 2,
    "yearStart": 2016,
    "yearEnd": null,
    "bodyTypes": ["SUV"],
    "displayName": "Volkswagen Tiguan (II поколение, 2016–н.в.)"
  },
  {
    "slug": "hyundai-tucson-4-2021",
    "make": "Hyundai",
    "makeSlug": "hyundai",
    "model": "Tucson",
    "modelSlug": "tucson",
    "generation": 4,
    "yearStart": 2021,
    "yearEnd": null,
    "bodyTypes": ["SUV"],
    "displayName": "Hyundai Tucson (IV поколение, 2021–н.в.)"
  },
  {
    "slug": "nissan-xtrail-4-2022",
    "make": "Nissan",
    "makeSlug": "nissan",
    "model": "X-Trail",
    "modelSlug": "xtrail",
    "generation": 4,
    "yearStart": 2022,
    "yearEnd": null,
    "bodyTypes": ["SUV"],
    "displayName": "Nissan X-Trail (IV поколение, 2022–н.в.)"
  }
]
```

- [ ] **Step 2: Создать `data/products.json`**

```json
[
  {
    "id": "bosal-toyota-rav4-5",
    "name": "Фаркоп Bosal для Toyota RAV4 V (2019–н.в.)",
    "brand": "bosal",
    "brandDisplay": "Bosal",
    "category": "towbars",
    "hookType": "flanged",
    "price": 14500,
    "fitsCars": ["toyota-rav4-5-2019"],
    "images": ["/products/placeholder.jpg"],
    "description": "Оригинальный фаркоп Bosal для Toyota RAV4 V поколения. Фланцевое крепление, порошковое покрытие.",
    "maxLoad": 2000,
    "ballLoad": 100,
    "articleNumber": "BOL-031-391"
  },
  {
    "id": "baltex-toyota-rav4-5",
    "name": "Фаркоп Baltex для Toyota RAV4 V (2019–н.в.)",
    "brand": "baltex",
    "brandDisplay": "Baltex",
    "category": "towbars",
    "hookType": "flanged",
    "price": 11200,
    "fitsCars": ["toyota-rav4-5-2019"],
    "images": ["/products/placeholder.jpg"],
    "description": "Российское производство. Сертификат соответствия. Совместим с заводским бампером.",
    "maxLoad": 1800,
    "ballLoad": 80,
    "articleNumber": "F117A"
  },
  {
    "id": "bosal-kia-sportage-5",
    "name": "Фаркоп Bosal для Kia Sportage V (2021–н.в.)",
    "brand": "bosal",
    "brandDisplay": "Bosal",
    "category": "towbars",
    "hookType": "flanged",
    "price": 13800,
    "fitsCars": ["kia-sportage-5-2021"],
    "images": ["/products/placeholder.jpg"],
    "description": "Фаркоп с фланцевым креплением для Kia Sportage V. Оцинкованный шаровой узел.",
    "maxLoad": 1500,
    "ballLoad": 75,
    "articleNumber": "BOL-035-947"
  },
  {
    "id": "electrics-universal-7pin",
    "name": "Жгут проводки универсальный 7-контактный",
    "brand": "carcommit",
    "brandDisplay": "CarCommit",
    "category": "electrics",
    "hookType": null,
    "price": 2400,
    "fitsCars": ["toyota-rav4-5-2019", "toyota-rav4-4-2013", "kia-sportage-4-2016", "kia-sportage-5-2021", "volkswagen-tiguan-2-2016", "hyundai-tucson-4-2021", "nissan-xtrail-4-2022"],
    "images": ["/products/placeholder.jpg"],
    "description": "Универсальный жгут проводки для подключения прицепного оборудования. Разъём ISO 7-pin.",
    "articleNumber": "CC-7PIN-UNI"
  },
  {
    "id": "ball-50mm-standard",
    "name": "Шар тягово-сцепного устройства 50мм стандарт",
    "brand": "bosal",
    "brandDisplay": "Bosal",
    "category": "accessories",
    "hookType": null,
    "price": 1800,
    "fitsCars": ["toyota-rav4-5-2019", "toyota-rav4-4-2013", "kia-sportage-4-2016", "kia-sportage-5-2021", "volkswagen-tiguan-2-2016"],
    "images": ["/products/placeholder.jpg"],
    "description": "Стандартный шаровой узел 50мм. Оцинкованная сталь. Нагрузка до 100кг.",
    "ballLoad": 100,
    "articleNumber": "BOL-BALL-50"
  }
]
```

- [ ] **Step 3: Создать `data/blog.json`**

```json
[
  {
    "slug": "kak-vybrat-farkop",
    "title": "Как выбрать фаркоп: полное руководство",
    "excerpt": "Разбираем типы фаркопов, на что обратить внимание при выборе и чем отличаются фланцевые от съёмных.",
    "content": "Полный текст статьи...",
    "date": "2026-05-20",
    "image": "/blog/kak-vybrat-farkop.jpg",
    "readTime": 7
  },
  {
    "slug": "tipy-farkoopov",
    "title": "Типы фаркопов: фланцевый, съёмный, вертикальный",
    "excerpt": "Чем отличаются конструкции, в каких случаях какой тип предпочтительнее.",
    "content": "Полный текст статьи...",
    "date": "2026-05-10",
    "image": "/blog/tipy-farkoopov.jpg",
    "readTime": 5
  },
  {
    "slug": "nuzhna-li-elektrika",
    "title": "Нужна ли электрика к фаркопу?",
    "excerpt": "Электрика для прицепа — обязательна по ПДД. Рассказываем какие разъёмы бывают и что выбрать.",
    "content": "Полный текст статьи...",
    "date": "2026-04-28",
    "image": "/blog/nuzhna-li-elektrika.jpg",
    "readTime": 4
  }
]
```

- [ ] **Step 4: Commit**

```bash
git add data/
git commit -m "feat: add JSON mocks — cars (7 generations), products (5), blog (3)"
```

---

## Task 6: lib/data.ts

**Files:**
- Create: `lib/data.ts`

- [ ] **Step 1: Создать `lib/data.ts`**

```typescript
// lib/data.ts
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
  return [...years].sort((a, b) => b - a); // новые первыми
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

// Hardcoded топ для SEO-блока на главной.
// Заменить на поле popularity в cars.json когда появится реальная аналитика.
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
```

- [ ] **Step 2: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add lib/data.ts — typed data access layer"
```

---

## Task 7: Тесты для lib/data.ts

**Files:**
- Create: `lib/data.test.ts`

- [ ] **Step 1: Написать тесты**

```typescript
// lib/data.test.ts
import { describe, it, expect } from "vitest";
import {
  getCars,
  getCarBySlug,
  getMakes,
  getModelsByMake,
  getYearsByMakeModel,
  getGenerationByMakeModelYear,
  getPopularCars,
  getProducts,
  getProductById,
  getProductsForCar,
  getProductsByCategory,
  getLatestBlogPosts,
} from "./data";

describe("getCars", () => {
  it("returns non-empty array", () => {
    expect(getCars().length).toBeGreaterThan(0);
  });
  it("every car has required fields", () => {
    getCars().forEach((c) => {
      expect(c.slug).toBeTruthy();
      expect(c.make).toBeTruthy();
      expect(c.model).toBeTruthy();
      expect(c.yearStart).toBeGreaterThan(1990);
    });
  });
});

describe("getCarBySlug", () => {
  it("finds existing car", () => {
    const car = getCarBySlug("toyota-rav4-5-2019");
    expect(car).toBeDefined();
    expect(car!.make).toBe("Toyota");
    expect(car!.generation).toBe(5);
  });
  it("returns undefined for unknown slug", () => {
    expect(getCarBySlug("nonexistent-car")).toBeUndefined();
  });
});

describe("getMakes", () => {
  it("returns sorted unique makes", () => {
    const makes = getMakes();
    expect(makes).toContain("Toyota");
    expect(makes).toContain("Kia");
    expect(new Set(makes).size).toBe(makes.length); // уникальные
    expect([...makes].sort()).toEqual(makes);         // отсортированы
  });
});

describe("getModelsByMake", () => {
  it("returns models for Toyota", () => {
    const models = getModelsByMake("Toyota");
    expect(models).toContain("RAV4");
  });
  it("returns empty array for unknown make", () => {
    expect(getModelsByMake("UnknownBrand")).toEqual([]);
  });
});

describe("getYearsByMakeModel", () => {
  it("expands year range correctly", () => {
    const years = getYearsByMakeModel("Toyota", "RAV4");
    // RAV4 IV: 2013–2018, RAV4 V: 2019–now → все годы от 2013 до текущего
    expect(years).toContain(2013);
    expect(years).toContain(2019);
    expect(years).toContain(new Date().getFullYear());
  });
  it("returns years newest-first", () => {
    const years = getYearsByMakeModel("Toyota", "RAV4");
    expect(years[0]).toBeGreaterThan(years[years.length - 1]);
  });
  it("returns empty for unknown model", () => {
    expect(getYearsByMakeModel("Toyota", "Corolla")).toEqual([]);
  });
});

describe("getGenerationByMakeModelYear", () => {
  it("resolves 2020 to RAV4 gen 5 (2019–н.в.)", () => {
    const car = getGenerationByMakeModelYear("Toyota", "RAV4", 2020);
    expect(car).toBeDefined();
    expect(car!.slug).toBe("toyota-rav4-5-2019");
  });
  it("resolves 2015 to RAV4 gen 4 (2013–2018)", () => {
    const car = getGenerationByMakeModelYear("Toyota", "RAV4", 2015);
    expect(car).toBeDefined();
    expect(car!.slug).toBe("toyota-rav4-4-2013");
  });
  it("returns undefined for year outside all ranges", () => {
    const car = getGenerationByMakeModelYear("Toyota", "RAV4", 1990);
    expect(car).toBeUndefined();
  });
});

describe("getProductsForCar", () => {
  it("returns products for known carSlug", () => {
    const prods = getProductsForCar("toyota-rav4-5-2019");
    expect(prods.length).toBeGreaterThan(0);
    prods.forEach((p) => {
      expect(p.fitsCars).toContain("toyota-rav4-5-2019");
    });
  });
  it("returns empty for unknown carSlug", () => {
    expect(getProductsForCar("unknown-car-0-2000")).toEqual([]);
  });
});

describe("getProductsByCategory", () => {
  it("filters towbars", () => {
    const towbars = getProductsByCategory("towbars");
    expect(towbars.length).toBeGreaterThan(0);
    towbars.forEach((p) => expect(p.category).toBe("towbars"));
  });
  it("filters electrics", () => {
    const electrics = getProductsByCategory("electrics");
    electrics.forEach((p) => expect(p.category).toBe("electrics"));
  });
});

describe("getLatestBlogPosts", () => {
  it("returns posts sorted by date descending", () => {
    const posts = getLatestBlogPosts(3);
    expect(posts.length).toBeLessThanOrEqual(3);
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].date) >= new Date(posts[i].date)).toBe(true);
    }
  });
  it("respects limit", () => {
    expect(getLatestBlogPosts(1).length).toBe(1);
    expect(getLatestBlogPosts(2).length).toBe(2);
  });
});
```

- [ ] **Step 2: Запустить тесты — убедиться что все проходят**

```bash
npm test
```

Expected:
```
✓ lib/data.test.ts (15 tests)
Test Files: 1 passed
Tests: 15 passed
```

Если тест падает — исправить данные в JSON или логику в data.ts, не менять тест.

- [ ] **Step 3: Commit**

```bash
git add lib/data.test.ts
git commit -m "test: add unit tests for lib/data.ts — 15 tests passing"
```

---

## Task 8: Navbar компонент

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Создать `components/layout/Navbar.tsx`**

```tsx
// components/layout/Navbar.tsx
import Link from "next/link";

const navLinks = [
  { label: "Каталог", href: "/catalog" },
  { label: "Подбор по авто", href: "/cars" },
  { label: "Услуги", href: "/services" },
  { label: "О нас", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Контакты", href: "/contacts" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-bg-primary border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-display text-2xl tracking-widest text-accent"
        >
          AUTOPROFI
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-text-muted hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: placeholder, Phase 2 */}
        <button
          className="md:hidden text-text-muted hover:text-white cursor-pointer"
          aria-label="Открыть меню"
        >
          ☰
        </button>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Добавить Navbar в `app/layout.tsx`**

```tsx
// app/layout.tsx — обновить import и body
import { Navbar } from "@/components/layout/Navbar";

// ...внутри body:
<body className="font-body bg-bg-primary text-white">
  <Navbar />
  <main>{children}</main>
</body>
```

- [ ] **Step 3: Проверить в браузере**

`npm run dev` → `http://localhost:3000` — чёрный хедер с "AUTOPROFI" слева, ссылки справа.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Navbar.tsx app/layout.tsx
git commit -m "feat: add Navbar component"
```

---

## Task 9: Footer компонент

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Создать `components/layout/Footer.tsx`**

```tsx
// components/layout/Footer.tsx
import Link from "next/link";

const columns = [
  {
    title: "Каталог",
    links: [
      { label: "Все фаркопы", href: "/catalog" },
      { label: "Электрика", href: "/catalog?cat=electrics" },
      { label: "Аксессуары", href: "/catalog?cat=accessories" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "Услуги", href: "/services" },
      { label: "О нас", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Блог", href: "/blog" },
    ],
  },
  {
    title: "Помощь",
    links: [
      { label: "Доставка", href: "/delivery" },
      { label: "Гарантия", href: "/warranty" },
      { label: "Контакты", href: "/contacts" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Бренд */}
          <div>
            <p className="font-display text-xl text-accent tracking-widest mb-3">
              AUTOPROFI
            </p>
            <address className="not-italic text-sm text-text-dim space-y-1">
              <p>г. Москва, ул. Примерная, 1</p>
              <p>
                <a href="tel:+74951234567" className="hover:text-accent transition-colors">
                  +7 (495) 123-45-67
                </a>
              </p>
              <p>
                <a href="mailto:info@autoprofi.ru" className="hover:text-accent transition-colors">
                  info@autoprofi.ru
                </a>
              </p>
            </address>
          </div>

          {/* Колонки */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-dim hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-dim">
          <p>© {new Date().getFullYear()} AUTOPROFI. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Добавить Footer в `app/layout.tsx`**

```tsx
import { Footer } from "@/components/layout/Footer";

// ...внутри body:
<body className="font-body bg-bg-primary text-white flex flex-col min-h-screen">
  <Navbar />
  <main className="flex-1">{children}</main>
  <Footer />
</body>
```

- [ ] **Step 3: Проверить в браузере**

Хедер вверху, футер внизу, страница растягивается на всю высоту.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer.tsx app/layout.tsx
git commit -m "feat: add Footer component"
```

---

## Task 10: Главная страница — статические блоки

**Files:**
- Create: `components/home/Topbar.tsx`
- Create: `components/home/HeroBanner.tsx`
- Create: `components/home/TrustBar.tsx`
- Create: `components/home/CategoryGrid.tsx`
- Create: `components/shared/CarChip.tsx`
- Create: `components/home/PopularCars.tsx`
- Create: `components/home/CTABanner.tsx`
- Create: `components/shared/BlogCard.tsx`
- Create: `components/home/BlogPreview.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Topbar**

```tsx
// components/home/Topbar.tsx
export function Topbar() {
  return (
    <div className="bg-bg-secondary border-b border-border text-xs text-text-muted">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-1">
        <a href="tel:+74951234567" className="hover:text-accent transition-colors">
          +7 (495) 123-45-67
        </a>
        <span className="hidden sm:block">Пн–Сб: 9:00–19:00</span>
        <span className="text-accent font-medium">Бесплатный выезд на замер</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Добавить hero-изображение**

Сохранить файл как `public/hero.jpg` в корень проекта вручную.
Файл: готовый баннер «ФАРКОПЫ С УСТАНОВКОЙ» (Toyota LC Prado, Петербург).

- [ ] **Step 3: HeroBanner**

Изображение уже содержит весь текст и кнопку — используем как `<Image>` без HTML-оверлея.

```tsx
// components/home/HeroBanner.tsx
import Image from "next/image";

export function HeroBanner() {
  return (
    <section className="w-full">
      <div className="relative w-full" style={{ aspectRatio: "2179 / 722" }}>
        <Image
          src="/hero.jpg"
          alt="Фаркопы с установкой — подбор по авто, установка, подключение электрики, гарантия"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: TrustBar**

```tsx
// components/home/TrustBar.tsx
const items = [
  { icon: "🔧", label: "Профустановка" },
  { icon: "📋", label: "Документы / ТО" },
  { icon: "✅", label: "Гарантия 2 года" },
  { icon: "🚗", label: "500+ авто в базе" },
  { icon: "📍", label: "Выезд мастера" },
];

export function TrustBar() {
  return (
    <section className="bg-bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {items.map((item) => (
            <li key={item.label} className="flex flex-col items-center text-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs text-text-muted font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: CategoryGrid**

```tsx
// components/home/CategoryGrid.tsx
import Link from "next/link";

const categories = [
  { label: "Фаркопы", href: "/catalog", sub: "Фланцевые, съёмные, вертикальные" },
  { label: "Электрика", href: "/catalog?cat=electrics", sub: "Розетки, жгуты, блоки" },
  { label: "Аксессуары", href: "/catalog?cat=accessories", sub: "Шары, адаптеры, накладки" },
];

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-white mb-6">Каталог</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group block bg-bg-secondary border border-border hover:border-accent p-6 transition-colors duration-200 cursor-pointer"
          >
            <div className="h-24 bg-bg-tertiary mb-4 flex items-center justify-center text-text-dim text-sm">
              фото
            </div>
            <p className="font-semibold text-white group-hover:text-accent transition-colors">
              {cat.label}
            </p>
            <p className="text-xs text-text-dim mt-1">{cat.sub}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: CarChip**

```tsx
// components/shared/CarChip.tsx
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
      className="inline-block border border-border hover:border-accent hover:text-accent text-text-muted text-sm px-3 py-1.5 transition-colors duration-150"
    >
      {car.make} {car.model}
    </Link>
  );
}
```

- [ ] **Step 6: PopularCars**

```tsx
// components/home/PopularCars.tsx
import { getPopularCars } from "@/lib/data";
import { CarChip } from "@/components/shared/CarChip";

export function PopularCars() {
  const cars = getPopularCars();
  return (
    <section className="bg-bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
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
```

- [ ] **Step 7: CTABanner**

```tsx
// components/home/CTABanner.tsx
import Link from "next/link";

export function CTABanner() {
  return (
    <section className="bg-accent">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-black text-lg">
            Привезём и установим за 1–2 часа
          </p>
          <p className="text-black/70 text-sm">
            Профессиональный монтаж, оформление документов, гарантия.
          </p>
        </div>
        <Link
          href="/contacts"
          className="bg-black text-white hover:bg-black/80 font-semibold px-6 py-3 text-sm whitespace-nowrap transition-colors cursor-pointer"
        >
          Записаться →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: BlogCard**

```tsx
// components/shared/BlogCard.tsx
import Link from "next/link";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-bg-secondary border border-border hover:border-accent transition-colors duration-200"
    >
      <div className="h-40 bg-bg-tertiary flex items-center justify-center text-text-dim text-sm">
        фото
      </div>
      <div className="p-4">
        <p className="text-xs text-text-dim mb-2">
          {new Date(post.date).toLocaleDateString("ru-RU")} · {post.readTime} мин
        </p>
        <h3 className="font-semibold text-white group-hover:text-accent transition-colors text-sm leading-snug mb-2">
          {post.title}
        </h3>
        <p className="text-xs text-text-dim line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 9: BlogPreview**

```tsx
// components/home/BlogPreview.tsx
import Link from "next/link";
import { getLatestBlogPosts } from "@/lib/data";
import { BlogCard } from "@/components/shared/BlogCard";

export function BlogPreview() {
  const posts = getLatestBlogPosts(3);
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Полезное</h2>
        <Link href="/blog" className="text-sm text-accent hover:text-accent-hover transition-colors">
          Все статьи →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 10: Собрать главную страницу `app/page.tsx`**

```tsx
// app/page.tsx
import { Topbar } from "@/components/home/Topbar";
import { HeroBanner } from "@/components/home/HeroBanner";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PopularCars } from "@/components/home/PopularCars";
import { CTABanner } from "@/components/home/CTABanner";
import { BlogPreview } from "@/components/home/BlogPreview";
// Блок 03 (CarSelector) — Phase 2

export default function HomePage() {
  return (
    <>
      <Topbar />
      {/* Блок 03: CarSelector — placeholder до Phase 2 */}
      <div className="bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 text-text-dim text-sm">
          [Селектор авто — Phase 2]
        </div>
      </div>
      <HeroBanner />
      <TrustBar />
      <CategoryGrid />
      <PopularCars />
      <CTABanner />
      <BlogPreview />
    </>
  );
}
```

- [ ] **Step 11: Проверить главную в браузере**

```bash
npm run dev
```

`http://localhost:3000` — должны быть видны все блоки: topbar, hero с жёлтым заголовком, иконки доверия, плитки каталога, чипы авто, жёлтый CTA, карточки блога, footer.

- [ ] **Step 12: Запустить тесты ещё раз — убедиться что всё ещё проходит**

```bash
npm test
```

Expected: 15 tests passed.

- [ ] **Step 13: Финальный commit**

```bash
git add components/ app/page.tsx
git commit -m "feat: add home page — all 10 blocks (CarSelector placeholder for Phase 2)"
```

---

## Self-Review

**Spec coverage:**
- ✅ Стек: Next.js 14 + TS + Tailwind
- ✅ Дизайн-система: CSS vars, Tailwind tokens, Bebas Neue + Inter
- ✅ JSON-моки: cars (7 поколений), products (5), blog (3)
- ✅ lib/data.ts: все 13 функций из spec
- ✅ carSlug на уровне поколения: `toyota-rav4-5-2019`
- ✅ `getGenerationByMakeModelYear` для резолвинга года → поколение
- ✅ `getPopularCars()` hardcoded (нет поля popularity)
- ✅ Navbar + Footer в layout
- ✅ Все 10 блоков главной (Блок 03 — placeholder)
- ✅ URL-таксономия: `/catalog/[brand]` маршрут, `/catalog?cat=` query param
- ✅ Тесты для критических функций data.ts

**Не входит в этот план (Phase 2+):**
- CarSelector (клиентский компонент с каскадным стейтом)
- `/cars/[carSlug]` страница
- `/catalog` с фильтрами
- Мобильное меню (бургер)
- SEO metadata, sitemap, robots
- Реальные изображения (placeholder везде)
