import { PartnersSection } from "~/widgets";

export default function AboutPage() {
  return (
    <>
      <section className="about gray-bg">
        <h4>
          стремимся воплотить в жизнь смелые идеи, чтобы сделать строительство
          доступным, инновационным и экологичным для всех.
        </h4>
        <div className="about__content">
          <img src="/assets/logo-footer.png" alt="logo" />
          <p>
            IDEAS – это инновационная строительная компания, специализирующаяся
            на использовании технологий 3D-печати в строительстве. Мы создаем
            уникальные архитектурные решения, сочетая передовые технологии и
            экологичные материалы, чтобы предложить нашим клиентам эффективные,
            экономичные и устойчивые строительные проекты.
          </p>
        </div>
      </section>
      <PartnersSection />
      <div className="contacts-block">
        <a href="mailto:ideas3dbuild@gmail.com" className="mail">
          <div className="icon-wrapper">
            <img
              src="/assets/mail.svg"
              alt="mail-icon"
              width="100%"
              height="100%"
            />
          </div>
          ideas3dbuild@gmail.com
        </a>
        <a href="tel:+79960382729" className="phone">
          <div className="icon-wrapper">
            <img
              src="/assets/vibrating_phone.svg"
              alt="phone"
              width="65%"
              height="65%"
            />
          </div>
          +7 (996)-038-27-29
        </a>
      </div>
    </>
  );
}
