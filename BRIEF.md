# BRIEF — Сайт по продаже и установке фаркопов

## Стек (финальный, не добавлять лишнего)
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Деплой: Vercel
- Данные: пока JSON-моки в `/data` (cars.json, products.json). БД и CMS — позже.

## Главный принцип архитектуры — DATA-DRIVEN
Это закрывает сразу SEO, подбор и будущую CMS:
- НЕ зашивать данные внутрь компонентов.
- Весь доступ к данным — ТОЛЬКО через `/lib/data.ts`.
- Страницы и списки генерируются из данных, а не пишутся руками.
- Когда появится реальный фид/CMS — меняем только `data.ts`, остальной сайт не трогаем.

```ts
// lib/data.ts
import cars from "@/data/cars.json";
import products from "@/data/products.json";

export function getCars()     { return cars; }
export function getProducts() { return products; }
export function getProductsForCar(carSlug: string) {
  return products.filter(p => p.fitsCars.includes(carSlug));
}
```

## Структура проекта
```
/app        — страницы (маршруты)
/data       — cars.json, products.json (моки)
/lib        — data.ts (прослойка доступа к данным)
/components — CarSelector, Filters, ProductCard
```

## Маршруты
```
/                  главная: подбор по авто + блоки
/cars              страница подбора (марка → год → модель)
/cars/[carSlug]    результаты под авто  ← SEO-страницы
/catalog           каталог + фильтры
/catalog/[brand]   каталог по бренду
/product/[id]      карточка фаркопа
/services          услуги / установка
/about /faq /contacts
/blog /blog/[slug]
```

## SEO — заложить сразу (структурно)
- Каждое авто = статический маршрут `/cars/[carSlug]` через `generateStaticParams`.
- Metadata API Next.js: уникальные title/description на каждой странице.
- `sitemap.xml` и `robots.txt`.
- JSON-LD микроразметка: LocalBusiness (компания/контакты) + Product (карточки).
- Чистые ЧПУ-адреса, семантический HTML, рендеринг на сервере (SSG/SSR — Next делает сам).

## Готовность к CMS
Достигается тем же `data.ts`. Источник данных меняется только там. Больше сейчас ничего не нужно.

## Что НЕ делаем сейчас (важно — против усложнения)
- Нет реальной БД, CMS, онлайн-оплаты, личных кабинетов.
- Формы заявок — пока просто отправка на email/заглушку.

## Порядок работы (по одному шагу, не всё сразу)
1. Каркас: Next.js + TS + Tailwind, папка `/data` с моками, `/lib/data.ts`.
2. Подбор по авто (CarSelector, каскадные списки) + страница `/cars/[carSlug]`.
3. Каталог + фасетные фильтры + карточка товара `/product/[id]`.
4. Инфо-страницы: услуги, о компании, FAQ, контакты.
5. SEO-слой: sitemap, robots, метаданные, JSON-LD.
6. Формы заявки / записи на установку.
