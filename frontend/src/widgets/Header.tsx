import { Link, NavLink } from "react-router-dom";
import Routes from "~/shared/routes";

export function Header() {
  return (
    <header className="header">
      <Link className="header__logo" to={Routes.HOME}>
        <img src="/assets/logo.png" alt="logo" />
      </Link>
      <nav className="header__navigation">
        <ul>
          {[
            ["Главная", Routes.HOME],
            ["3D каталог", Routes.CATALOG_3D],
            ["Технология", Routes.TECHNOLOGIES],
            ["О нас", Routes.ABOUT],
            ["Корзина", Routes.CART],
            ["Помощь и поддержка", Routes.HELP],
          ].map(([name, link], key) => (
            <li key={key}>
              <NavLink to={link}>{name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <NavLink to={Routes.HELP} className="header__support">
        Помощь и поддержка
      </NavLink>
    </header>
  );
}
