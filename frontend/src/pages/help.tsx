import { Fragment, ReactNode } from "react";
import { BackBtnContainer } from "~/widgets";
import { Spoiler } from "~/shared/ui";

const spoilers: Array<[string, ReactNode]> = [
  [
    "Что такое строительная 3D-печать?",
    <>
      Это технология послойного создания зданий и конструкций с использованием
      бетонных смесей и специализированных 3D-принтеров. <br />
      &nbsp;Преимущества технологии:
      <ul>
        <li>Скорость: Сокращение сроков строительства</li>
        <li>Экономия: Снижение затрат на материалы и рабочую силу</li>
        <li>Гибкость дизайна: Реализация сложных архитектурных форм </li>
        <li>
          Экологичность: Минимизация отходов и использование перерабатываемых
          материалов
        </li>
      </ul>
      Ограничения:
      <ul>
        <li>Максимальные размеры конструкций ограничены размерами принтера</li>
        <li>
          Климатические требования: Печать возможна при температуре от +5°C, что
          обеспечивает необходимое качество конструкции
        </li>
      </ul>
    </>,
  ],
  [
    "Как оформить заказ?",
    <>
      Шаг 1: Консультация <br />
      &nbsp;Свяжитесь с нами через форму на сайте. <br />
      Наш менеджер уточнит:
      <ul>
        <li>Тип проекта</li>
        <li>Сроки, бюджет, особые требования</li>
      </ul>
      Шаг 2: Подготовка проекта
      <ul>
        <li>Пришлите эскизы или описание идеи.</li>
        <li>Наши инженеры создадут 3D-модель и просчитают смету</li>
      </ul>
      Шаг 3: Заключение договора
      <ul>
        <li>
          После согласования модели подписываем договор с фиксацией сроков,
          стоимости и гарантий.
        </li>
      </ul>
      Документы для заказа:
      <ul>
        <li>Техническое задание (если есть).</li>
        <li>Данные участка (геодезия, кадастровый план).</li>
      </ul>
    </>,
  ],
  [
    "Как выглядит подготовка к строительству?",
    <>
      Что нужно для монтажа:
      <ul>
        <li>Участок с ровной поверхностью, допустимый уклон: до 3%</li>
        <li>Подведенные коммуникации</li>
        <li>фундамент</li>
      </ul>
    </>,
  ],
  [
    "Как выглядит доставка и монтаж?",
    <>
      Доставка:
      <ul>
        <li>
          Транспортировка модулей осуществляется нашими партнерами. Стоимость
          зависит от расстояния.
        </li>
      </ul>
      Монтаж:
      <ul>
        <li>
          Наши специалисты установят конструкцию и проконтролируют качество
          работ
        </li>
      </ul>
    </>,
  ],
  [
    "Можно ли печатать зимой?",
    <>Да, при использовании морозостойких смесей и подогреве площадки.</>,
  ],
  [
    "Какой срок эксплуатации дома?",
    <>Более 50 лет при соблюдении условий обслуживания.</>,
  ],
  [
    "Можно ли вносить изменения в проект после начала печати?",
    <>Да, но это может увеличить сроки и стоимость.</>,
  ],
];

export default function HelpPage() {
  return (
    <div className="help-page">
      <BackBtnContainer />
      {[
        [
          "Строительство будущего: как бетонные 3D-принтеры создают здания слой за слоем",
          "Технология 3D-печати зданий из бетона — это инновация в строительстве, объединяющая цифровой дизайн, робототехнику и инновационные материалы. В отличие от традиционных методов, где требуется опалубка, армирование и ручной труд, здесь конструкции «выращиваются» автоматически, с точностью до миллиметра. Процесс начинается с цифровой модели, которая превращается в реальный объект всего за несколько дней, но за этой скоростью скрывается сложная цепочка инженерных решений.",
        ],
        [
          "От виртуального чертежа к реальности",
          "Перед началом печати архитекторы и инженеры создают 3D-модель здания. Здесь учитывается не только эстетика, но и структурная целостность: алгоритмы анализируют распределение нагрузок, теплопотери и сейсмическую устойчивость. Готовый проект конвертируется в G-код — набор инструкций для принтера, который определяет траекторию движения печатающей головки, скорость подачи бетона и параметры слоев.",
        ],
        [
          "Секреты «чернил»: не просто бетон",
          "Основной материал — это высокотехнологичная бетонная смесь. В ее состав вводятся пластификаторы для повышения текучести, полимерные или базальтовые волокна для армирования, а также замедлители схватывания, предотвращающие закупорку сопла. Некоторые разработчики экспериментируют с «зелеными» составами, заменяя часть цемента переработанными материалами, например, золой или измельченным стеклом. Для сложных объектов применяют гибридные методы: например, печатают каркас, а затем заполняют его пенобетоном или укрепляют стальной сеткой.",
        ],
        [
          "Робот-строитель в действии",
          "Сам принтер напоминает гигантский станок с ЧПУ, хотя существуют и мобильные версии на гусеничном ходу. Его ключевой элемент — экструдер, через который под давлением подается бетонная смесь. Сопло перемещается по заданной траектории, выдавливая непрерывную «нить». Каждый новый слой наносится поверх предыдущего, формируя стены, перекрытия или даже декоративные элементы. Для контроля качества используются датчики, отслеживающие равномерность нанесения и внешние условия, такие как влажность и температура.",
        ],
        [
          "Плюсы, минусы и вызовы",
          "Главные преимущества 3D-печати — скорость (дом «растет» за 2–3 дня) и экономия: автоматизация сокращает трудозатраты на , а точность расчета материалов уменьшает отходы. Однако технология сталкивается с ограничениями: высота объектов редко превышает 10–12 метров из-за риска деформации свежих слоев, а из-за новизны метода нормативная база во многих странах еще не адаптирована или активно разрабатывается.",
        ],
      ].map(([title, content], key) => (
        <Fragment key={key}>
          <h3>{title}</h3>
          <p>{content}</p>
        </Fragment>
      ))}
      <div
        className="gray-bg"
        style={{ paddingBlock: "1px", marginBottom: "3.5em" }}
        // padding чтобы margin у h3 имел эффект
      >
        <h3 className="text-center">Частые вопросы</h3>
      </div>
      {spoilers.map(([title, content], key) => (
        <Spoiler key={key} title={title}>
          {content}
        </Spoiler>
      ))}
    </div>
  );
}
