import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "Фаркопы",
    href: "/catalog",
    sub: "Фланцевые, съёмные, вертикальные",
    image: "/images/stock/categories/towbars.png",
  },
  {
    label: "Электрика",
    href: "/catalog?cat=electrics",
    sub: "Розетки, жгуты, блоки",
    image: "/images/stock/categories/electrics.png",
  },
  {
    label: "Аксессуары",
    href: "/catalog?cat=accessories",
    sub: "Шары, адаптеры, накладки",
    image: "/images/stock/categories/accessories.png",
  },
];

export function CategoryGrid() {
  return (
    <section className="w-full px-6 lg:px-12 py-12">
      <h2 className="font-ui text-2xl font-bold text-white mb-6 uppercase tracking-wide">
        Каталог
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group block bg-bg-secondary border border-border hover:border-white p-4 transition-colors duration-200 cursor-pointer"
          >
            <div className="relative h-36 bg-bg-tertiary mb-4 overflow-hidden">
              <Image
                src={cat.image}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors duration-200 group-hover:bg-black/10" />
            </div>
            <p className="font-ui font-semibold text-white group-hover:text-white transition-colors uppercase tracking-wide text-sm">
              {cat.label}
            </p>
            <p className="font-ui text-xs text-text-dim mt-1">{cat.sub}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
