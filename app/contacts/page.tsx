import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Контакты | AUTOPROFI",
  description:
    "Адрес, телефон, email и часы работы AUTOPROFI. Запись на установку фаркопа в Москве.",
};

export default function ContactsPage() {
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
            <span className="text-text-muted">Контакты</span>
          </nav>
          <h1 className="font-display text-5xl lg:text-7xl text-white uppercase leading-none tracking-wide">
            Контакты
          </h1>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-16 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left — contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-2xl lg:text-3xl text-white uppercase tracking-wide mb-5">
                Как нас найти
              </h2>
              <dl className="flex flex-col gap-3">
                {[
                  ["Адрес", "[уточнить], Москва"],
                  ["Телефон", "[уточнить]"],
                  ["Email", "info@autoprofi.ru"],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3 items-baseline">
                    <dt className="font-ui text-xs text-text-dim uppercase tracking-wider shrink-0 w-20">
                      {label}
                    </dt>
                    <dd className="font-ui text-sm text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="font-ui text-xs text-text-dim uppercase tracking-wider mb-4">
                Часы работы
              </h3>
              <table className="w-full max-w-xs border-collapse">
                <tbody>
                  {[
                    ["Понедельник – Пятница", "[уточнить]"],
                    ["Суббота", "[уточнить]"],
                    ["Воскресенье", "Выходной"],
                  ].map(([day, hours]) => (
                    <tr key={day} className="border-b border-border">
                      <td className="font-ui text-sm text-text-muted py-2.5 pr-6">
                        {day}
                      </td>
                      <td
                        className={`font-ui text-sm py-2.5 text-right ${
                          hours === "Выходной"
                            ? "text-text-dim"
                            : "text-white"
                        }`}
                      >
                        {hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right — form stub */}
          <div className="border border-border bg-bg-secondary p-6 flex flex-col gap-5">
            <h2 className="font-display text-2xl lg:text-3xl text-white uppercase tracking-wide">
              Оставить заявку
            </h2>

            <form className="flex flex-col gap-4" noValidate>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="font-ui text-xs text-text-muted uppercase tracking-wider"
                >
                  Ваше имя
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Иван Иванов"
                  disabled
                  className="bg-bg-tertiary border border-border text-white font-ui text-sm px-3 py-2.5 w-full focus:outline-none focus:border-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="font-ui text-xs text-text-muted uppercase tracking-wider"
                >
                  Телефон
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  disabled
                  className="bg-bg-tertiary border border-border text-white font-ui text-sm px-3 py-2.5 w-full focus:outline-none focus:border-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="font-ui text-xs text-text-muted uppercase tracking-wider"
                >
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Марка и модель автомобиля, год выпуска, вопрос..."
                  disabled
                  className="bg-bg-tertiary border border-border text-white font-ui text-sm px-3 py-2.5 w-full focus:outline-none focus:border-white resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled
                className="bg-accent text-black font-ui font-semibold text-sm px-6 py-3 w-full disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                Отправить заявку
              </button>

              <p className="font-ui text-text-dim text-xs text-center leading-relaxed">
                Форма отправки будет подключена в следующей версии
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Yandex map placeholder */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-16 border-b border-border">
        <h2 className="font-display text-2xl lg:text-3xl text-white uppercase tracking-wide mb-6">
          На карте
        </h2>
        <div className="w-full h-64 bg-bg-secondary border border-border flex items-center justify-center">
          <p className="font-ui text-text-dim text-sm">
            [Здесь будет карта — вставить iframe Яндекс.Карты]
          </p>
        </div>
      </section>

      {/* Requisites */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-16">
        <h2 className="font-display text-2xl lg:text-3xl text-white uppercase tracking-wide mb-6">
          Реквизиты
        </h2>
        <dl className="flex flex-col gap-3">
          {[
            ["Наименование", "[уточнить]"],
            ["ИНН", "[уточнить]"],
            ["ОГРН", "[уточнить]"],
            ["Расчётный счёт", "[уточнить]"],
            ["Банк", "[уточнить]"],
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
