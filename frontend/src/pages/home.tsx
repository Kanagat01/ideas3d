import { useUnit } from "effector-react";
import { useEffect } from "react";
import { $news, getNewsFx } from "~/entities/News";
import { Carousel, PartnersSection } from "~/widgets";

export default function HomePage() {
  const news = useUnit($news);
  useEffect(() => {
    getNewsFx();
  }, []);

  return (
    <>
      <section className="first-section">
        <span>3D Каталог</span>
        <div className="first-section__divider"></div>
        <span>Индивидуальный проект</span>
      </section>
      <section className="printing-construction">
        <h2 className="text-center">Строительная 3D-печать</h2>
        <div className="features">
          <img src="/assets/3d-printer-home.png" alt="3d-printer" />
          <p>
            Строительный 3D-принтер - устройство для автоматизированного
            возведения конструкций путем послойного нанесения строительных
            материалов
          </p>
          <div className="advantage">
            <img src="/assets/coins-stack.svg" alt="coins-stack" />
            <span>экономия до 25%, не теряя качества</span>
          </div>
          <div className="advantage">
            <img src="/assets/clock.svg" alt="clock" />
            <span>быстрая реализация проектов</span>
          </div>
        </div>
      </section>
      {news.length !== 0 && (
        <section className="news gray-bg">
          <h2 className="text-center">Новости</h2>
          <Carousel items={news} />
        </section>
      )}
      <PartnersSection />
    </>
  );
}
