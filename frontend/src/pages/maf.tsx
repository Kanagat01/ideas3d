import { useUnit } from "effector-react";
import { Navigate, useParams } from "react-router-dom";
import { BackBtnContainer, Carousel } from "~/widgets";
import { $cart, setCart } from "~/entities/Catalog";
import { ModelViewer, Preloader } from "~/shared/ui";
import Routes from "~/shared/routes";
import { API_URL } from "~/shared/apiInstance";
import { useCatalogItem } from "~/shared/hooks/useCatalogItem";
import { Maf } from "~/entities/Catalog/types";
import { useLocation } from "react-router-dom";
import type { ViewerCoordinates } from "~/entities/Catalog/types";

type LocationState = {
  stl_coordinates?: ViewerCoordinates;
};

export default function MafPage() {
  const { id } = useParams();

  const location = useLocation();
  const state = location.state as LocationState | undefined;
  // const { isLoading, triedLoad, item: maf } = useCatalogItem("maf", id);
  const { isLoading, triedLoad, item: maf } = useCatalogItem<Maf>("maf", id);
  const cart = useUnit($cart);
  const inCart = maf
    ? cart.some((el) => el.item_type === "maf" && el.id === maf.id)
    : false;

  const handleCartClick = () => {
    if (!maf) return;
    if (inCart) {
      setCart(
        cart.filter((el) => !(el.item_type === "maf" && el.id === maf.id))
      );
    } else {
      setCart([...cart, { ...maf, item_type: "maf", amount: 1 }]);
    }
  };

  if (isLoading) return <Preloader />;
  if (triedLoad && !maf) return <Navigate to={Routes.CATALOG_3D} replace />;

  const mafImages = maf?.images ?? [];
  const mafFiles = maf?.files ?? [];
  const hasImages = mafImages.length > 0;
  const hasFiles = mafFiles.length > 0;
  const nothing = !hasImages && !hasFiles;

  const values = [maf?.length, maf?.width, maf?.height, maf?.diameter];
  const nonZeroCount = values.filter(Boolean).length;

  return (
    maf && (
      <div className="model-page">
        <BackBtnContainer grayBg={false} />
        <div className="position-relative">
          <ModelViewer
            url={maf.stl_file || ""}
            initialView={
              state?.stl_coordinates ?? maf.stl_coordinates ?? undefined
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
                {["length", "width", "height", "diameter"].map((key) => {
                  const className =
                    nonZeroCount >= 3 ? "col-narrow" : "col-medium";
                  return maf[key as keyof typeof maf] ? (
                    <col key={key} className={className} />
                  ) : null;
                })}
                <col className="col-wide" />
                <col className="col-wide" />
              </colgroup>
              <thead>
                <tr>
                  <th>Название</th>
                  {[
                    ["length", "Длина"],
                    ["width", "Ширина"],
                    ["height", "Высота"],
                    ["diameter", "Диаметр"],
                  ].map(
                    ([key, value]) =>
                      maf[key as keyof typeof maf] && <th key={key}>{value}</th>
                  )}
                  <th>Тип</th>
                  <th>Стиль</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{maf.name}</td>
                  {["length", "width", "height", "diameter"].map(
                    (key) =>
                      maf[key as keyof typeof maf] && (
                        <td key={key}>
                          {maf[key as keyof typeof maf] as string}
                        </td>
                      )
                  )}
                  <td>{maf.type.name}</td>
                  <td>{maf.style.name}</td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--table-border)" }}>
                  <th>Стоимость</th>
                  <th colSpan={nonZeroCount}>
                    Продолжительность строительства
                  </th>
                  <th>Дизайнер</th>
                  <th>Статус</th>
                </tr>
                <tr>
                  <td>{maf.price} ₽</td>
                  <td colSpan={nonZeroCount}>{maf.duration}</td>
                  <td>{maf.designer.name}</td>
                  <td>
                    {maf.status === "RDY"
                      ? "Готов к постройке"
                      : "В разработке"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Описание</h4>
          <p className="description">{maf.description}</p>
        </div>

        {/* Фотографии */}
        {hasImages && (
          <>
            <h4 className="photos">Фотографии объекта</h4>
            <Carousel items={mafImages.map((el) => ({ img: el.image }))} />
          </>
        )}
        {hasFiles && (
          <div
            className="maf-files-center"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "32px 0 48px 0",
            }}
          >
            <h4 className="maf-files">Файлы проекта</h4>
            <ul className="maf-files-list" style={{ marginBottom: 12 }}>
              {mafFiles.map((file) => (
                <li key={file.id}>
                  <a
                    href={`${API_URL}/api/maf-files/${file.id}/download/`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.original_filename}
                  </a>
                  <span style={{ color: "#888", marginLeft: 8 }}>
                    ({file.mime_type})
                  </span>
                </li>
              ))}
            </ul>
            {mafFiles.length > 1 && maf.id && (
              <a
                href={`${API_URL}/api/mafs/${maf.id}/download-files/`}
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
                  marginTop: 12,
                }}
              >
                Скачать все файлы одним архивом
              </a>
            )}
          </div>
        )}

        {/* Если нет ни файлов, ни фото */}
        {nothing && (
          <div style={{ margin: "2em 0", textAlign: "center", color: "#888" }}>
            Нет данных по объекту
          </div>
        )}
      </div>
    )
  );
}
