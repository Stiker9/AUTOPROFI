import Link from "next/link";

const categories = [
  { label: "Фаркопы", href: "/catalog", sub: "Фланцевые, съёмные, вертикальные" },
  { label: "Электрика", href: "/catalog?cat=electrics", sub: "Розетки, жгуты, блоки" },
  { label: "Аксессуары", href: "/catalog?cat=accessories", sub: "Шары, адаптеры, накладки" },
];

export function CategoryGrid() {
  return (
    <section className="w-full px-6 lg:px-12 py-12">
      <h2 className="font-ui text-2xl font-bold text-white mb-6 uppercase tracking-wide">Каталог</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group block bg-bg-secondary border border-border hover:border-white p-6 transition-colors duration-200 cursor-pointer"
          >
            <div className="h-24 bg-bg-tertiary mb-4 flex items-center justify-center text-text-dim text-sm">
              фото
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
