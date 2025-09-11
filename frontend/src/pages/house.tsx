import { Fragment, useState } from "react";
import { useUnit } from "effector-react";
import { Navigate, useParams } from "react-router-dom";
import { BackBtnContainer, Carousel } from "~/widgets";
import { $cart, setCart } from "~/entities/Catalog";
import { ModelViewer, Preloader } from "~/shared/ui";
import Routes from "~/shared/routes";
import { API_URL } from "~/shared/apiInstance";
import { useCatalogItem } from "~/shared/hooks/useCatalogItem";
import type { House } from "~/entities/Catalog/types";
import { useLocation } from "react-router-dom";
import type { ViewerCoordinates } from "~/entities/Catalog/types";

type LocationState = {
  stl_coordinates?: ViewerCoordinates;
};

export default function HousePage() {
  const { id } = useParams();

  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const {
    isLoading,
    triedLoad,
    item: house,
  } = useCatalogItem<House>("house", id);

  const [floorIdx, setFloorIdx] = useState(0);
  const cart = useUnit($cart);

  const inCart = house
    ? cart.some((el) => el.item_type === "house" && el.id === house.id)
    : false;

  const handleCartClick = () => {
    if (inCart) {
      setCart(
        cart.filter((el) => !(el.item_type === "house" && el.id === house?.id))
      );
    } else if (house) {
      setCart([...cart, { ...house, item_type: "house", amount: 1 }]);
    }
  };

  if (isLoading) return <Preloader />;
  if (triedLoad && !house) return <Navigate to={Routes.CATALOG_3D} replace />;

  const houseFloors = house?.floors ?? [];
  const houseImages = house?.images ?? [];
  const houseFiles = house?.files ?? [];

  const hasImages = houseImages.length > 0;
  const hasFiles = houseFiles.length > 0;
  const hasFloors = houseFloors.length > 0;
  const nothing = !hasImages && !hasFiles && !hasFloors;

  return (
    house && (
      <div className="model-page">
        <BackBtnContainer grayBg={false} />

        <div className="position-relative">
          <ModelViewer
            url={house.stl_file || ""}
            initialView={
              state?.stl_coordinates ?? house.stl_coordinates ?? undefined
            }
          />
          <div className="cart-btn-wrapper">
            <div className="cart-btn-background"></div>
            <button className="cart-btn" onClick={handleCartClick}>
              {inCart ? "Удалить из корзины" : "Добавить в корзину"}
            </button>
          </div>
        </div>

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
                    {hasFloors
                      ? houseFloors.reduce(
                          (acc, el) => acc + (el.rooms?.length || 0),
                          0
                        )
                      : 0}
                  </td>
                  <td>{houseFloors.length}</td>
                  <td>{house.total_area} м²</td>
                  <td>{house.living_area} м²</td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--table-border)" }}>
                  <th>Стоимость</th>
                  <th colSpan={2}>Продолжительность строительства</th>
                  <th>Дизайнер</th>
                  <th>Статус</th>
                </tr>
                <tr>
                  <td>{house.price} ₽</td>
                  <td colSpan={2}>{house.duration}</td>
                  <td>{house.designer?.name}</td>
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

        {/* --- ФОТО --- */}
        {hasImages && (
          <>
            <h4 className="photos">Фотографии здания</h4>
            <Carousel items={houseImages.map((el) => ({ img: el.image }))} />
          </>
        )}

        {/* --- ЭТАЖИ И ТАБЛИЦА ПО КОМНАТАМ --- */}
        {hasFloors && (
          <>
            <h4 className="floors-scheme">План этажей</h4>
            <div className="floor-scheme">
              <img
                src={houseFloors[floorIdx]?.plan_image}
                alt={`План этажа ${houseFloors[floorIdx]?.name}`}
              />
              <div className="floor-switcher-wrapper">
                <div className="floor-switcher">
                  {houseFloors.map((el, key) => (
                    <Fragment key={el.id}>
                      <input
                        id={`floor-${el.id}`}
                        type="radio"
                        checked={key === floorIdx}
                        onChange={() => setFloorIdx(key)}
                      />
                      <label htmlFor={`floor-${el.id}`}>{el.name}</label>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="floors-info">
              <img src="/assets/line.svg" alt="line" />
              Информация по этажам
            </div>
            <table>
              <tbody>
                {(houseFloors[floorIdx]?.rooms ?? []).map((room) => (
                  <tr key={room.id}>
                    <td>{room.name}</td>
                    <td>{room.area} м²</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {hasFiles && (
          <div
            className="house-files-center"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "32px 0 48px 0",
            }}
          >
            <h4 className="house-files" style={{ marginBottom: 8 }}>
              Файлы проекта
            </h4>
            <ul
              className="house-files-list"
              style={{ padding: 0, marginBottom: 8, listStyle: "none" }}
            >
              {houseFiles.map((file) => (
                <li key={file.id} style={{ marginBottom: 4 }}>
                  <a
                    href={`${API_URL}/api/house-files/${file.id}/download/`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#237",
                      fontWeight: 500,
                      textDecoration: "underline",
                    }}
                  >
                    {file.original_filename}
                  </a>
                  <span style={{ color: "#888", marginLeft: 8 }}>
                    ({file.mime_type})
                  </span>
                </li>
              ))}
            </ul>
            {houseFiles.length > 1 && house.id && (
              <a
                href={`${API_URL}/api/houses/${house.id}/download-files/`}
                target="_blank"
                rel="noopener noreferrer"
                className="download-zip-btn"
                style={{
                  display: "inline-block",
                  padding: "6px 18px",
                  background: "#238",
                  color: "#fff",
                  borderRadius: "1.5em",
                  fontWeight: 500,
                  textDecoration: "none",
                  marginTop: 8,
                }}
              >
                Скачать все файлы одним архивом
              </a>
            )}
          </div>
        )}
        {nothing && (
          <div style={{ margin: "2em 0", textAlign: "center", color: "#888" }}>
            Нет данных по объекту
          </div>
        )}
      </div>
    )
  );
}
