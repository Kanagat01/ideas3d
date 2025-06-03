import { Fragment, useEffect, useState } from "react";
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
  const [floorIdx, setFloorIdx] = useState(0);

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
          <div className="table-wrapper">
            <table className="model-table">
              <colgroup>
                <col className="col-wide" />
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
                  <th>Общая площадь</th>
                  <th>Жилая площадь</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{house.name}</td>
                  <td>
                    {house.floors.reduce((acc, el) => acc + el.rooms.length, 0)}
                  </td>
                  <td>{house.floors.length}</td>
                  <td>{house.total_area} м²</td>
                  <td>{house.living_area} м²</td>
                </tr>

                {/* Вторая таблица */}
                <tr
                  style={{
                    borderTop: "1px solid var(--table-border)",
                  }}
                >
                  <th>Стоимость</th>
                  <th colSpan={2}>Продолжительность строительства</th>
                  <th>Дизайнер</th>
                  <th>Статус</th>
                </tr>
                <tr>
                  <td>{house.price} ₽</td>
                  <td colSpan={2}>{house.duration}</td>
                  <td>{house.designer.name}</td>
                  <td>
                    {house.status === "RDY"
                      ? "Готов к постройке"
                      : "В разработке"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Описание</h4>
          <p className="description">{house.description}</p>
        </div>

        <h4 className="photos">Фотографии здания</h4>
        <Carousel items={house.images.map((el) => ({ img: el.image }))} />

        <h4 className="floors-scheme">План этажей</h4>
        <div className="floor-scheme">
          <img src={house.floors[floorIdx].plan_image} alt="План этажа" />
          <div className="floor-switcher-wrapper">
            <div className="floor-switcher">
              {house.floors.map((el, key) => (
                <Fragment key={key}>
                  <input
                    id={`floor-${el.id}`}
                    type="radio"
                    checked={key === floorIdx}
                    onChange={() => setFloorIdx(key)}
                  />
                  <label
                    htmlFor={`floor-${el.id}`}
                    style={
                      key + 1 === floorIdx
                        ? { borderRightColor: "transparent" }
                        : {}
                    }
                  >
                    {el.name}
                  </label>
                </Fragment>
              ))}
              <input
                id={`floor-${3}`}
                type="radio"
                checked={3 === floorIdx}
                onChange={() => setFloorIdx(3)}
              />
              <label htmlFor={`floor-${3}`}>3 этаж</label>
            </div>
          </div>
        </div>

        <div className="floors-info">
          <img src="/assets/line.svg" alt="line" />
          Инвормация по этажам
        </div>
        <table>
          <tbody>
            {house.floors[floorIdx].rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.area} м²</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}
