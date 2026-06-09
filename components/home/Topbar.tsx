export function Topbar() {
  return (
    <div className="bg-bg-secondary border-b border-border text-xs text-text-muted">
      <div className="w-full px-6 lg:px-12 py-2 flex flex-col sm:flex-row justify-between items-center gap-1">
        <a href="tel:+74951234567" className="hover:text-white transition-colors">
          +7 (495) 123-45-67
        </a>
        <span className="hidden sm:block">Пн–Сб: 9:00–19:00</span>
        <span className="text-white font-medium">Бесплатный выезд на замер</span>
      </div>
    </div>
  );
}
