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
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-display text-2xl tracking-widest text-accent"
        >
          AUTOPROFI
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-text-muted hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-text-muted hover:text-white cursor-pointer"
          aria-label="Открыть меню"
        >
          ☰
        </button>
      </nav>
    </header>
  );
}
