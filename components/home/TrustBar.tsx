type TrustItem = {
  label: string;
  description: string;
  icon: "wrench" | "document" | "shield" | "car" | "pin";
};

const items: TrustItem[] = [
  {
    label: "Профустановка",
    description: "Монтаж мастерами",
    icon: "wrench",
  },
  {
    label: "Документы для ТО",
    description: "Все для оформления",
    icon: "document",
  },
  {
    label: "Гарантия 2 года",
    description: "На работы и детали",
    icon: "shield",
  },
  {
    label: "500+ авто в базе",
    description: "Быстрый подбор",
    icon: "car",
  },
  {
    label: "Выезд мастера",
    description: "Приедем на адрес",
    icon: "pin",
  },
];

function TrustIcon({ name }: { name: TrustItem["icon"] }) {
  const commonProps = {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  switch (name) {
    case "wrench":
      return (
        <svg {...commonProps}>
          <path d="M14.7 6.3a4.8 4.8 0 0 0 5.8 5.8L12 20.6a2.1 2.1 0 0 1-3-3l8.5-8.5a4.8 4.8 0 0 0-2.8-2.8Z" />
          <path d="m7 17 2 2" />
        </svg>
      );
    case "document":
      return (
        <svg {...commonProps}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v5h5" />
          <path d="M10 12h5" />
          <path d="M10 16h6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...commonProps}>
          <path d="M12 3 19 6v5c0 4.4-2.8 8.3-7 10-4.2-1.7-7-5.6-7-10V6z" />
          <path d="m9 12 2 2 4-5" />
        </svg>
      );
    case "car":
      return (
        <svg {...commonProps}>
          <path d="M5 12 7 7h10l2 5" />
          <path d="M4 12h16v5H4z" />
          <path d="M7 17v2" />
          <path d="M17 17v2" />
          <circle cx="8" cy="15" r="1" />
          <circle cx="16" cy="15" r="1" />
        </svg>
      );
    case "pin":
      return (
        <svg {...commonProps}>
          <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" />
          <circle cx="12" cy="10" r="2" />
        </svg>
      );
  }
}

export function TrustBar() {
  return (
    <section className="bg-bg-secondary border-y border-border">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-5">
        <ul className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-5 gap-3">
          {items.map((item) => (
            <li
              key={item.label}
              className="group flex min-h-24 items-center gap-4 rounded-lg border border-white/10 bg-bg-tertiary/70 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-200 hover:border-white/30 hover:bg-[#202020]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black text-white transition-colors duration-200 group-hover:border-white/30">
                <TrustIcon name={item.icon} />
              </div>
              <div className="min-w-0">
                <p className="font-ui text-sm font-semibold uppercase leading-snug text-white">
                  {item.label}
                </p>
                <p className="mt-1 font-ui text-xs leading-snug text-text-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
