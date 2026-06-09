import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, getProductById, getCarBySlug } from "@/lib/data";

export async function generateStaticParams() {
  return getProducts().map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "AUTOPROFI" };
  return {
    title: `${product.name} | AUTOPROFI`,
    description: `${product.name} — купить в Москве с установкой. Цена ${product.price.toLocaleString("ru-RU")} ₽. ${product.inStock ? "В наличии." : "Под заказ."}`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "RUB",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  const isTowbar = product.hookType !== null;

  const specRows: Array<{ label: string; value: string | null }> = isTowbar
    ? [
        { label: "Артикул", value: product.sku },
        { label: "Бренд", value: product.brand },
        { label: "Тип крюка", value: product.hookType },
        {
          label: "Макс. нагрузка на шар",
          value: product.towLoad !== null ? `${product.towLoad} кг` : null,
        },
        {
          label: "Верт. нагрузка",
          value: product.vertLoad !== null ? `${product.vertLoad} кг` : null,
        },
        { label: "Вырез в бампере", value: product.bumperCut },
        {
          label: "Электрика в комплекте",
          value:
            product.electricsIncluded !== null
              ? product.electricsIncluded
                ? "Да"
                : "Нет"
              : null,
        },
      ]
    : [];

  const visibleRows = specRows.filter((row) => row.value !== null);

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                href="/catalog"
                className="hover:text-white transition-colors"
              >
                Каталог
              </Link>
            </li>
            <li className="text-text-dim">/</li>
            <li className="text-white truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Product header block */}
      <section className="border-b border-border">
        <div className="w-full px-6 lg:px-12 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 lg:items-start">
            {/* Left: product image + info */}
            <div className="flex-1 min-w-0">
              <div className="relative w-full max-w-lg aspect-[4/3] bg-bg-tertiary overflow-hidden mb-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <h1 className="font-display text-5xl lg:text-7xl text-white uppercase leading-none tracking-wide mb-3">
                {product.name}
              </h1>
              <p className="font-ui text-sm text-text-muted">
                {product.brand}
                <span className="mx-2 text-text-dim">·</span>
                <span className="text-text-dim">{product.sku}</span>
              </p>
            </div>

            {/* Right: CTA box */}
            <div className="lg:w-80 shrink-0 bg-bg-secondary border border-border p-6 flex flex-col gap-5">
              {/* Price */}
              <div>
                <span className="font-display text-4xl text-white tracking-wide">
                  {product.price.toLocaleString("ru-RU")} ₽
                </span>
              </div>

              {/* Stock badge */}
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                    product.inStock ? "bg-green-500" : "bg-gray-500"
                  }`}
                />
                <span
                  className={`font-ui text-sm font-medium ${
                    product.inStock ? "text-green-400" : "text-text-muted"
                  }`}
                >
                  {product.inStock ? "В наличии" : "Под заказ"}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/contacts"
                  className="bg-accent text-black font-ui font-semibold text-sm uppercase tracking-wider px-4 py-3 text-center hover:bg-accent-hover transition-colors"
                >
                  Заказать
                </Link>
                <Link
                  href="/catalog"
                  className="font-ui text-sm font-semibold text-text-muted uppercase tracking-wider border border-border px-4 py-3 text-center hover:border-white hover:text-white transition-colors"
                >
                  Вернуться в каталог
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications table — towbars only */}
      {isTowbar && visibleRows.length > 0 && (
        <section className="border-b border-border">
          <div className="w-full px-6 lg:px-12 py-12 lg:py-16">
            <h2 className="font-ui text-sm font-semibold text-white uppercase tracking-widest mb-6">
              Характеристики
            </h2>
            <div className="max-w-2xl">
              <table className="w-full font-ui text-sm">
                <tbody>
                  {visibleRows.map((row) => (
                    <tr key={row.label} className="border-b border-border">
                      <td className="py-3 pr-8 text-text-muted w-1/2">
                        {row.label}
                      </td>
                      <td className="py-3 text-white">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Подходит на автомобили */}
      {product.fitsCars.length > 0 && (
        <section className="border-b border-border">
          <div className="w-full px-6 lg:px-12 py-12 lg:py-16">
            <h2 className="font-ui text-sm font-semibold text-white uppercase tracking-widest mb-6">
              Подходит на автомобили
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.fitsCars.map((slug) => {
                const car = getCarBySlug(slug);
                if (car) {
                  return (
                    <Link
                      key={slug}
                      href={`/cars/${car.slug}`}
                      className="font-ui text-xs text-text-muted border border-border px-3 py-1.5 hover:border-white hover:text-white transition-colors"
                    >
                      {car.title}
                    </Link>
                  );
                }
                return (
                  <span
                    key={slug}
                    className="font-ui text-xs text-text-dim border border-border px-3 py-1.5"
                  >
                    {slug}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="py-10 lg:py-14">
        <div className="w-full px-6 lg:px-12">
          <Link
            href="/catalog"
            className="font-ui text-sm text-text-muted hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>Весь каталог</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
