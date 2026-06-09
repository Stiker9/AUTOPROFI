import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBrands, getProductsByBrandSlug } from "@/lib/data";
import { ProductCard } from "@/components/shared/ProductCard";

export async function generateStaticParams() {
  return getProductBrands().map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brandInfo = getProductBrands().find((b) => b.slug === brandSlug);
  if (!brandInfo) return { title: "AUTOPROFI" };
  return {
    title: `Фаркопы ${brandInfo.name} | AUTOPROFI`,
    description: `Полный каталог фаркопов и аксессуаров бренда ${brandInfo.name} с ценами и наличием.`,
  };
}

export default async function CatalogBrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: brandSlug } = await params;
  const brandInfo = getProductBrands().find((b) => b.slug === brandSlug);

  if (!brandInfo) notFound();

  const products = getProductsByBrandSlug(brandSlug);

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Breadcrumb */}
      <nav className="border-b border-border">
        <div className="w-full px-6 lg:px-12 py-4">
          <ol className="flex items-center gap-2 font-ui text-sm text-text-muted flex-wrap">
            <li><Link href="/" className="hover:text-white transition-colors">Главная</Link></li>
            <li className="text-text-dim">/</li>
            <li><Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link></li>
            <li className="text-text-dim">/</li>
            <li className="text-white">{brandInfo.name}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <section className="border-b border-border">
        <div className="w-full px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="font-display text-5xl lg:text-6xl text-white uppercase leading-none tracking-wide mb-2">
            {brandInfo.name}
          </h1>
          <p className="font-ui text-text-muted text-sm">
            {products.length} {products.length === 1 ? "товар" : products.length < 5 ? "товара" : "товаров"} в каталоге
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="w-full px-6 lg:px-12 py-10 lg:py-14">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="font-ui text-text-muted text-sm">Товары этого бренда временно недоступны.</p>
        )}
      </section>

      {/* Back link */}
      <div className="pb-14 w-full px-6 lg:px-12">
        <Link href="/catalog" className="font-ui text-sm text-text-muted hover:text-white transition-colors inline-flex items-center gap-2">
          <span>←</span>
          <span>Весь каталог</span>
        </Link>
      </div>
    </div>
  );
}
