import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Услуги по установке фаркопов | AUTOPROFI",
  description:
    "Профессиональная установка фаркопов и электрики в Москве. Гарантия, документы, выезд на замер.",
};

const services = [
  {
    title: "Установка фаркопа",
    description:
      "Монтаж фаркопа на вашем автомобиле с подготовкой технологического отверстия в бампере (при необходимости), затяжкой крепёжных элементов по моменту и проверкой геометрии.",
  },
  {
    title: "Подключение электрики",
    description:
      "Разводка жгута проводки прицепа, установка розетки 7 или 13 pin, программирование блока согласования (для CAN-шин). Проверка всех функций освещения.",
  },
  {
    title: "Выезд на замер",
    description:
      "Специалист приедет к вам, подберёт подходящий фаркоп, уточнит конструктивные особенности автомобиля. Бесплатно при последующем заказе.",
  },
  {
    title: "Гарантийное обслуживание",
    description:
      "Проверка и подтяжка крепежа через 1 000 км после установки. Входит в стоимость монтажа.",
  },
];

const steps = [
  "Выберите авто и товар через форму подбора или позвоните нам",
  "Согласуем дату и время — работаем без очередей по записи",
  "Установка занимает 1–2 часа, вы можете остаться или уехать",
  "Проверка, документы, гарантийный лист — всё на месте",
];

const priceRows = [
  {
    service: "Установка фаркопа на отечественный автомобиль (LADA, УАЗ)",
    price: "[уточнить] ₽",
  },
  {
    service: "Установка фаркопа на иномарку (бюджетный сегмент)",
    price: "[уточнить] ₽",
  },
  {
    service: "Установка фаркопа на иномарку (средний и премиум сегмент)",
    price: "[уточнить] ₽",
  },
  {
    service: "Подключение электрики (простая проводка)",
    price: "[уточнить] ₽",
  },
  {
    service: "Подключение электрики (CAN-шина, блок согласования)",
    price: "[уточнить] ₽",
  },
  { service: "Выезд специалиста по Москве", price: "[уточнить] ₽" },
  { service: "Выезд специалиста за МКАД (за км)", price: "[уточнить] ₽" },
];

export default function ServicesPage() {
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
            <span className="text-text-muted">Услуги</span>
          </nav>
          <h1 className="font-display text-5xl lg:text-7xl text-white uppercase leading-none tracking-wide">
            Услуги
          </h1>
          <p className="font-ui text-text-muted text-sm mt-3 max-w-xl">
            Продажа и профессиональная установка фаркопов, электрики и
            аксессуаров
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-16 border-b border-border">
        <h2 className="font-display text-3xl lg:text-4xl text-white uppercase tracking-wide mb-8">
          Что мы делаем
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="border border-border bg-bg-secondary p-6 flex flex-col gap-3"
            >
              <h3 className="font-ui font-semibold text-white text-base">
                {s.title}
              </h3>
              <p className="font-ui text-text-muted text-sm leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-16 border-b border-border">
        <h2 className="font-display text-3xl lg:text-4xl text-white uppercase tracking-wide mb-8">
          Как это работает
        </h2>
        <ol className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <li
              key={i}
              className="flex gap-6 items-start border-b border-border py-5 last:border-b-0"
            >
              <span className="font-display text-4xl text-text-dim leading-none shrink-0 w-10 text-right">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-ui text-white text-sm leading-relaxed pt-1">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing table */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-16 border-b border-border">
        <h2 className="font-display text-3xl lg:text-4xl text-white uppercase tracking-wide mb-8">
          Стоимость установки
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="font-ui text-xs text-text-dim uppercase tracking-wider text-left py-3 pr-6">
                  Услуга
                </th>
                <th className="font-ui text-xs text-text-dim uppercase tracking-wider text-right py-3 whitespace-nowrap">
                  Цена
                </th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map((row) => (
                <tr
                  key={row.service}
                  className="border-b border-border hover:bg-bg-secondary transition-colors"
                >
                  <td className="font-ui text-sm text-white py-4 pr-6">
                    {row.service}
                  </td>
                  <td className="font-ui text-sm text-text-muted py-4 text-right whitespace-nowrap">
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-ui text-text-dim text-xs mt-4 leading-relaxed">
          Точная стоимость зависит от модели автомобиля и сложности монтажа.
          Уточняйте при записи.
        </p>
      </section>

      {/* Warranty */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-16 border-b border-border">
        <h2 className="font-display text-3xl lg:text-4xl text-white uppercase tracking-wide mb-8">
          Гарантия
        </h2>
        <ul className="flex flex-col gap-3">
          <li className="flex gap-3 items-start">
            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
            <p className="font-ui text-text-muted text-sm leading-relaxed">
              <span className="text-white font-semibold">
                Гарантия на фаркоп:
              </span>{" "}
              по гарантии производителя (обычно 1–3 года)
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
            <p className="font-ui text-text-muted text-sm leading-relaxed">
              <span className="text-white font-semibold">
                Гарантия на работы по установке:
              </span>{" "}
              12 месяцев
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
            <p className="font-ui text-text-muted text-sm leading-relaxed">
              При выявлении дефектов в гарантийный период — бесплатное
              устранение
            </p>
          </li>
        </ul>
      </section>

      {/* Documents */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-16">
        <h2 className="font-display text-3xl lg:text-4xl text-white uppercase tracking-wide mb-8">
          Документы
        </h2>
        <p className="font-ui text-text-muted text-sm mb-5">
          После установки вы получаете:
        </p>
        <ul className="flex flex-col gap-3">
          {[
            "Кассовый чек / акт выполненных работ",
            "Гарантийный талон на установку",
            "Инструкция по эксплуатации фаркопа",
            "Сертификат соответствия (при наличии у производителя)",
          ].map((doc) => (
            <li key={doc} className="flex gap-3 items-start">
              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
              <p className="font-ui text-text-muted text-sm">{doc}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
