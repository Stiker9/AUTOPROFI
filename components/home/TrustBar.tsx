const items = [
  { label: "Профустановка мастерами" },
  { label: "Документы / ТО" },
  { label: "Гарантия 2 года" },
  { label: "500+ авто в базе" },
  { label: "Выезд мастера к вам" },
];

export function TrustBar() {
  return (
    <section className="bg-bg-secondary border-y border-border">
      <div className="w-full px-6 lg:px-12 py-6">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {items.map((item) => (
            <li key={item.label} className="flex flex-col items-center text-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-xs text-text-muted font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
