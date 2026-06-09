import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О компании | AUTOPROFI",
  description:
    "AUTOPROFI — профессиональная установка фаркопов и прицепной электрики в Москве.",
};

const advantages = [
  {
    title: "Только сертифицированные товары",
    description:
      "Работаем напрямую с официальными дистрибьюторами. Никаких неизвестных брендов и пересортицы.",
  },
  {
    title: "Гарантия на работы",
    description:
      "12 месяцев на монтаж. Устраним любой дефект, связанный с установкой, бесплатно.",
  },
  {
    title: "Оригинальная документация",
    description:
      "Чек, гарантийный талон, акт выполненных работ — полный пакет документов после каждого заказа.",
  },
  {
    title: "Честная диагностика",
    description:
      "Если фаркоп не нужен или не подойдёт к вашему автомобилю — скажем об этом прямо.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-primary border-b border-border">
        <div className="w-full px-6 lg:px-12 py-12 lg:py-16">
          <nav className="font-ui text-xs text-text-dim mb-4 flex gap-2">
            <Link href="/" className="hover:text-text-muted transition-colors">
              Главная
            </Link>
            <span>/</span>
            <span className="text-text-muted">О компании</span>
          </nav>
          <h1 className="font-display text-5xl lg:text-7xl text-white uppercase leading-none tracking-wide">
            О компании
          </h1>
          <p className="font-ui text-text-muted text-sm mt-3 max-w-xl">
            Специализируемся на подборе и установке фаркопов для легковых
            автомобилей
          </p>
        </div>
      </section>

      {/* About text */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-16 border-b border-border">
        <div className="max-w-2xl flex flex-col gap-5">
          <p className="font-ui text-text-muted text-sm leading-relaxed">
            Мы занимаемся продажей и установкой фаркопов для легковых и
            внедорожников с [уточнить] года. Работаем только с проверенными
            производителями: Лидер Плюс, ТСС, Bosal, Berg, PT Group, Westfalia
            и другими.
          </p>
          <p className="font-ui text-text-muted text-sm leading-relaxed">
            Каждый мастер прошёл обучение и работает по технологическим картам
            производителей. Мы не используем сверлёные решения там, где
            конструкция автомобиля предусматривает штатные точки крепления.
          </p>
          <p className="font-ui text-text-muted text-sm leading-relaxed">
            Принимаем автомобили по предварительной записи — без очередей и
            ожидания.
          </p>
        </div>
      </section>

      {/* Advantages */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-16 border-b border-border">
        <h2 className="font-display text-3xl lg:text-4xl text-white uppercase tracking-wide mb-8">
          Почему выбирают нас
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {advantages.map((a) => (
            <div
              key={a.title}
              className="border border-border bg-bg-secondary p-6 flex flex-col gap-3"
            >
              <h3 className="font-ui font-semibold text-white text-base">
                {a.title}
              </h3>
              <p className="font-ui text-text-muted text-sm leading-relaxed">
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Requisites */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-16">
        <h2 className="font-display text-3xl lg:text-4xl text-white uppercase tracking-wide mb-6">
          Реквизиты
        </h2>
        <dl className="flex flex-col gap-3">
          {[
            ["Наименование", "[уточнить]"],
            ["ИНН", "[уточнить]"],
            ["ОГРН", "[уточнить]"],
            ["Юридический адрес", "[уточнить]"],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-3 items-baseline">
              <dt className="font-ui text-xs text-text-dim uppercase tracking-wider shrink-0 w-36">
                {label}
              </dt>
              <dd className="font-ui text-sm text-text-muted">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
