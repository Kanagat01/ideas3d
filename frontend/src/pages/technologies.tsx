import { Link } from "react-router-dom";
import Routes from "~/shared/routes";

export default function TechnologiesPage() {
  return (
    <div className="technologies">
      <div className="gray-bg"></div>
      <h1>наши технологии</h1>
      <div className="technologies__content">
        <Link
          to={Routes.MIXTURES}
          className="technologies__content__item"
          style={{ backgroundImage: `url("/assets/mixture-1.png")` }}
        >
          смеси и их свойства
        </Link>
        <Link
          to={Routes.PRINTERS}
          className="technologies__content__item"
          style={{ backgroundImage: `url("/assets/3d-printer-1.png")` }}
        >
          Строительный 3d-принтер
        </Link>
      </div>
    </div>
  );
}
