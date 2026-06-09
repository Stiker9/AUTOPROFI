import Image from "next/image";
import Link from "next/link";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-secondary">
      <Image
        src="/images/stock/cta/installation.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
      <div className="relative w-full px-6 lg:px-12 py-10 lg:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="max-w-xl">
          <p className="font-ui font-bold text-white text-xl lg:text-2xl">
            Привезём и установим за 1–2 часа
          </p>
          <p className="font-ui text-text-muted text-sm mt-2 leading-relaxed">
            Профессиональный монтаж, оформление документов, гарантия.
          </p>
        </div>
        <Link
          href="/contacts"
          className="font-ui bg-accent text-black hover:bg-accent-hover font-semibold px-6 py-3 text-sm uppercase tracking-wide whitespace-nowrap transition-colors cursor-pointer"
        >
          Записаться →
        </Link>
      </div>
    </section>
  );
}
