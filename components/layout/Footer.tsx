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
