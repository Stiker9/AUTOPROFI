import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-bg-secondary border border-border hover:border-white transition-colors flex flex-col">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative w-full aspect-[4/3] bg-bg-tertiary overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      {/* Body */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex flex-col gap-0.5">
          <Link
            href={`/product/${product.id}`}
            className="font-ui text-sm font-semibold text-white leading-snug hover:text-text-muted transition-colors"
          >
            {product.name}
          </Link>
          <span className="font-ui text-xs text-text-muted">{product.brand}</span>
          <span className="font-ui text-xs text-text-dim">арт. {product.sku}</span>
        </div>

        {/* Specs (only if towbar) */}
        {(product.hookType !== null || product.towLoad !== null) && (
          <div className="flex flex-col gap-1.5 font-ui text-xs border-t border-border pt-3">
            {product.hookType !== null && (
              <div className="flex justify-between gap-2">
                <span className="text-text-muted">Тип крюка</span>
                <span className="text-white">{product.hookType}</span>
              </div>
            )}
            {product.towLoad !== null && (
              <div className="flex justify-between gap-2">
                <span className="text-text-muted">Нагрузка</span>
                <span className="text-white">{product.towLoad} кг</span>
              </div>
            )}
            {product.bumperCut !== null && product.bumperCut !== "нет" && (
              <div className="flex justify-between gap-2">
                <span className="text-text-muted">Вырез в бампере</span>
                <span className="text-white">{product.bumperCut}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex flex-col gap-2.5 pt-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.inStock ? "bg-green-500" : "bg-gray-500"}`} />
            <span className={`font-ui text-xs ${product.inStock ? "text-green-400" : "text-text-muted"}`}>
              {product.inStock ? "В наличии" : "Под заказ"}
            </span>
          </div>
          <span className="font-display text-2xl text-white tracking-wide">
            {product.price.toLocaleString("ru-RU")} ₽
          </span>
          <div className="flex gap-2">
            <Link
              href={`/product/${product.id}`}
              className="font-ui text-xs font-medium text-text-muted border border-border hover:border-white hover:text-white transition-colors px-3 py-2 flex-1 text-center"
            >
              Подробнее
            </Link>
            <Link
              href="/contacts"
              className="font-ui text-xs font-semibold bg-accent text-black hover:bg-accent-hover transition-colors px-3 py-2 uppercase tracking-wide flex-1 text-center"
            >
              Заказать
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
