import Image from "next/image";

export function HeroBanner() {
  return (
    <section className="w-full">
      <div className="relative w-full" style={{ aspectRatio: "2179 / 722" }}>
        <Image
          src="/hero.jpg"
          alt="Фаркопы с установкой — подбор по авто, установка, подключение электрики, гарантия"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
