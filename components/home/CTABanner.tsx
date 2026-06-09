import Link from "next/link";

export function CTABanner() {
  return (
    <section className="bg-accent">
      <div className="w-full px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-ui font-bold text-black text-lg">
            Привезём и установим за 1–2 часа
          </p>
          <p className="font-ui text-black/70 text-sm mt-1">
            Профессиональный монтаж, оформление документов, гарантия.
          </p>
        </div>
        <Link
          href="/contacts"
          className="font-ui bg-black text-white hover:bg-black/80 font-semibold px-6 py-3 text-sm uppercase tracking-wide whitespace-nowrap transition-colors cursor-pointer"
        >
          Записаться →
        </Link>
      </div>
    </section>
  );
}
