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
