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
      {/* Topbar */}
      <div className="bg-bg-secondary border-b border-border text-xs text-text-muted">
        <div className="w-full px-6 lg:px-12 py-1.5 flex justify-between items-center">
          <a href="tel:+74951234567" className="hover:text-accent transition-colors">
            +7 (495) 123-45-67
          </a>
          <span className="hidden sm:block">Пн–Сб: 9:00–19:00</span>
          <span className="text-accent font-medium">Бесплатный выезд на замер</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="w-full px-6 lg:px-12 flex items-center h-14 gap-8">
        <Link href="/" className="font-display text-2xl tracking-widest text-accent shrink-0 uppercase">
          AUTOPROFI
        </Link>

        <ul className="hidden md:flex items-center gap-6 flex-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-ui text-sm font-medium text-text-muted hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden ml-auto text-text-muted hover:text-white cursor-pointer"
          aria-label="Открыть меню"
        >
          ☰
        </button>
      </nav>
    </header>
  );
}
