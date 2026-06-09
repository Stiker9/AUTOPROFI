export function Topbar() {
  return (
    <div className="bg-bg-secondary border-b border-border text-xs text-text-muted">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-1">
        <a href="tel:+74951234567" className="hover:text-accent transition-colors">
          +7 (495) 123-45-67
        </a>
        <span className="hidden sm:block">Пн–Сб: 9:00–19:00</span>
        <span className="text-accent font-medium">Бесплатный выезд на замер</span>
      </div>
    </div>
  );
}
