import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { Navigate, useParams } from "react-router-dom";
import { BackBtnContainer, Carousel } from "~/widgets";
import { $catalog, getCatalogFx } from "~/entities/Catalog";
import { ModelViewer, Preloader } from "~/shared/ui";
import Routes from "~/shared/routes";

export default function HousePage() {
  const { id } = useParams();
  const [triedLoad, setTriedLoad] = useState(false);
  const [isLoading, catalog] = useUnit([getCatalogFx.pending, $catalog]);
  const house = catalog.houses.find((el) => el.id === Number(id));

  useEffect(() => {
    if (catalog.houses.length === 0) {
      getCatalogFx().then(() => setTriedLoad(true));
    }
  }, []);

  if (isLoading) return <Preloader />;
  if (triedLoad && !house) return <Navigate to={Routes.CATALOG_3D} replace />;

  return (
    house && (
      <div className="model-page">
        <BackBtnContainer grayBg={false} />
        <ModelViewer url={house.stl_file} />
        <div className="gray-bg">
          <table className="model-table">
            <colgroup>
              <col className="col-wide" />
              <col className="col-narrow" />
              <col className="col-narrow" />
              <col className="col-narrow" />
              <col className="col-wide" />
              <col className="col-wide" />
            </colgroup>
            <thead>
              <tr>
                <th>Название</th>
                <th>Кол-во комнат</th>
                <th>Кол-во этажей</th>
                <th>Кол-во уборных</th>
                <th>Площадь</th>
                <th>Площадь</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>*Название продукта*</td>
                <td>4</td>
                <td>1</td>
                <td>1</td>
                <td>1 м2</td>
                <td>1 м2</td>
              </tr>
            </tbody>
          </table>
          <table className="model-table">
            <thead>
              <tr>
                <th>Стоимость</th>
                <th>Продолжительность</th>
                <th>Дизайнер</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>*Стоимость*</td>
                <td>*Продолжительность*</td>
                <td>*Имя или название компании*</td>
                <td>Готов к постройке</td>
              </tr>
            </tbody>
          </table>
          <h4>Описание</h4>
          <p className="description">*Описание продукта*</p>
        </div>
        <h4 className="photos">Фотографии здания</h4>
        <Carousel
          items={[
            { img: "/assets/news-1.png" },
            { img: "/assets/news-2.png" },
            { img: "/assets/news-3.png" },
            { img: "/assets/mixture-1.png" },
          ]}
        />
        <h4 className="floors-scheme">План этажей</h4>
        <div className="floor-scheme">
          <img src="/assets/scheme.png" alt="План этажа" />
          <div className="floor-switcher">
            <input type="radio" name="floor" id="floor1" defaultChecked />
            <label htmlFor="floor1">1 этаж</label>
            <input type="radio" name="floor" id="floor2" />
            <label htmlFor="floor2">2 этаж</label>
          </div>
        </div>
        <div className="floors-info">
          <img src="/assets/line.svg" alt="line" />
          Инвормация по этажам
        </div>
        <table>
          <tbody>
            {[
              ["*название комнаты*", "*площадь* м2"],
              ["*название комнаты*", "*площадь* м2"],
              ["*название комнаты*", "*площадь* м2"],
              ["*название комнаты*", "*площадь* м2"],
              ["*название комнаты*", "*площадь* м2"],
            ].map((item, key) => (
              <tr key={key}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}
