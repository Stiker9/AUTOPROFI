import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCars, getCarBySlug, getProductsForCar } from "@/lib/data";
import type { Product } from "@/types";

export async function generateStaticParams() {
  return getCars().map((c) => ({ carSlug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ carSlug: string }>;
}): Promise<Metadata> {
  const { carSlug } = await params;
  const car = getCarBySlug(carSlug);
  return {
    title: car ? `${car.title} | AUTOPROFI` : "Автомобиль | AUTOPROFI",
    description: car
      ? `Фаркопы и электрика для ${car.brand} ${car.model}`
      : "",
  };
}

export default async function CarPage({
  params,
}: {
  params: Promise<{ carSlug: string }>;
}) {
  const { carSlug } = await params;
  const car = getCarBySlug(carSlug);

  if (!car) {
    notFound();
  }

  const products = getProductsForCar(carSlug);

  const yearRange = `${car.yearFrom}–${car.yearTo ?? "н.в."}`;
  const subline = [
    car.generation ? car.generation : null,
    car.body,
    yearRange,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Breadcrumb */}
      <nav className="border-b border-border">
        <div className="w-full px-6 lg:px-12 py-4">
          <ol className="flex items-center gap-2 font-ui text-sm text-text-muted flex-wrap">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Главная
              </Link>
            </li>
            <li className="text-text-dim">/</li>
            <li>
              <Link
                href="/cars"
                className="hover:text-white transition-colors"
              >
                Подбор по авто
              </Link>
            </li>
            <li className="text-text-dim">/</li>
            <li className="text-white">
              {car.brand} {car.model}
            </li>
          </ol>
        </div>
      </nav>

      {/* Car header */}
      <section className="border-b border-border">
        <div className="w-full px-6 lg:px-12 py-16 lg:py-24">
          <h1 className="font-display text-5xl lg:text-7xl text-white uppercase leading-none tracking-wide mb-4">
            {car.brand} {car.model}
          </h1>
          <p className="font-ui text-text-muted text-base lg:text-lg">
            {subline}
          </p>
        </div>
      </section>

      {/* Products section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <h2 className="font-ui text-xl lg:text-2xl font-semibold text-white uppercase tracking-wider mb-8">
            Подходящие фаркопы
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product: Product) => (
                <div
                  key={product.id}
                  className="bg-bg-secondary border border-border hover:border-white transition-colors flex flex-col p-6 gap-4"
                >
                  {/* Name + brand */}
                  <div className="flex flex-col gap-1">
                    <span className="font-ui text-base font-semibold text-white leading-snug">
                      {product.name}
                    </span>
                    <span className="font-ui text-sm text-text-muted">
                      {product.brand}
                    </span>
                    <span className="font-ui text-xs text-text-dim">
                      {product.sku}
                    </span>
                  </div>

                  {/* Specs */}
                  <div className="flex flex-col gap-2 font-ui text-sm">
                    {!!product.hookType && (
                      <div className="flex justify-between gap-2">
                        <span className="text-text-muted">Тип крюка:</span>
                        <span className="text-white text-right">
                          {product.hookType}
                        </span>
                      </div>
                    )}
                    {product.towLoad !== null && (
                      <div className="flex justify-between gap-2">
                        <span className="text-text-muted">Тяговая нагрузка:</span>
                        <span className="text-white text-right">
                          {product.towLoad} кг
                        </span>
                      </div>
                    )}
                    {product.vertLoad !== null && (
                      <div className="flex justify-between gap-2">
                        <span className="text-text-muted">Нагрузка на шар:</span>
                        <span className="text-white text-right">
                          {product.vertLoad} кг
                        </span>
                      </div>
                    )}
                    {!!product.bumperCut && (
                      <div className="flex justify-between gap-2">
                        <span className="text-text-muted">Вырез в бампере:</span>
                        <span className="text-white text-right">
                          {product.bumperCut}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer: stock + price + button */}
                  <div className="mt-auto flex flex-col gap-3">
                    {/* Stock badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                          product.inStock ? "bg-green-500" : "bg-gray-500"
                        }`}
                      />
                      <span
                        className={`font-ui text-xs ${
                          product.inStock
                            ? "text-green-400"
                            : "text-text-muted"
                        }`}
                      >
                        {product.inStock ? "В наличии" : "Под заказ"}
                      </span>
                    </div>

                    {/* Price */}
                    <span className="font-display text-2xl text-white tracking-wide">
                      {product.price.toLocaleString("ru-RU")} ₽
                    </span>

                    {/* CTA */}
                    <Link
                      href="/contacts"
                      className="bg-accent text-black font-ui font-semibold text-sm uppercase tracking-wider px-4 py-3 text-center hover:bg-accent-hover transition-colors"
                    >
                      Заказать
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-bg-secondary border border-border p-8 flex flex-col gap-4 items-start max-w-md">
              <p className="font-ui text-text-muted text-base">
                Товары для этого автомобиля скоро появятся
              </p>
              <Link
                href="/catalog"
                className="font-ui text-sm font-semibold text-white uppercase tracking-wider border border-border px-4 py-2 hover:border-white transition-colors"
              >
                Перейти в каталог
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Back link */}
      <div className="pb-16 lg:pb-24">
        <div className="w-full px-6 lg:px-12">
          <Link
            href="/cars"
            className="font-ui text-sm text-text-muted hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>Вернуться к подбору</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
