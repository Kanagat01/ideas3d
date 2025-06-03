import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { Navigate, useParams } from "react-router-dom";
import { BackBtnContainer } from "~/widgets";
import { $catalog, getCatalogFx } from "~/entities/Catalog";
import { ModelViewer, Preloader } from "~/shared/ui";
import Routes from "~/shared/routes";

export default function MafPage() {
  const { id } = useParams();
  const [triedLoad, setTriedLoad] = useState(false);
  const [isLoading, catalog] = useUnit([getCatalogFx.pending, $catalog]);
  const maf = catalog.mafs.find((el) => el.id === Number(id));

  useEffect(() => {
    if (catalog.mafs.length === 0 || !maf) {
      getCatalogFx().then(() => setTriedLoad(true));
    }
  }, []);

  const values = [maf?.length, maf?.width, maf?.height, maf?.diameter];
  const nonZeroCount = values.filter(Boolean).length;

  if (isLoading) return <Preloader />;
  if (triedLoad && !maf) return <Navigate to={Routes.CATALOG_3D} replace />;

  return (
    maf && (
      <div className="model-page">
        <BackBtnContainer grayBg={false} />
        <ModelViewer url={maf.stl_file} />
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
                    ([key, value], idx) =>
                      maf[key as keyof typeof maf] && <th key={idx}>{value}</th>
                  )}
                  <th>Тип</th>
                  <th>Стиль</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{maf.name}</td>
                  {["length", "width", "height", "diameter"].map(
                    (key, idx) =>
                      maf[key as keyof typeof maf] && (
                        <td key={idx}>
                          {maf[key as keyof typeof maf] as string}
                        </td>
                      )
                  )}
                  <td>{maf.type.name}</td>
                  <td>{maf.style.name}</td>
                </tr>

                {/* Вторая таблица */}
                <tr
                  style={{
                    borderTop: "1px solid var(--table-border)",
                  }}
                >
                  {[
                    "Стоимость",
                    "Продолжительность строительства",
                    "Дизайнер",
                    "Статус",
                  ].map((el, key) => (
                    <th key={key} colSpan={key === 1 ? nonZeroCount : 1}>
                      {el}
                    </th>
                  ))}
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

            {/* <table className="model-table">
              <colgroup>
                <col className="col-wide" />
                {["length", "width", "height", "diameter"].map((key) => {
                  const values = [
                    maf.length,
                    maf.width,
                    maf.height,
                    maf.diameter,
                  ];
                  const nonZeroCount = values.filter(Boolean).length;
                  const className =
                    nonZeroCount >= 3 ? "col-narrow" : "col-medium";
                  if (maf[key as keyof typeof maf]) {
                    return <col key={key} className={className} />;
                  }
                  return null;
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
                    ([key, value], idx) =>
                      maf[key as keyof typeof maf] && <th key={idx}>{value}</th>
                  )}
                  <th>Тип</th>
                  <th>Стиль</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{maf.name}</td>
                  {["length", "width", "height", "diameter"].map(
                    (key, idx) =>
                      maf[key as keyof typeof maf] && (
                        <td key={idx}>
                          {maf[key as keyof typeof maf] as string}
                        </td>
                      )
                  )}
                  <td>{maf.type.name}</td>
                  <td>{maf.style.name}</td>
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
                  <td>{maf.price} ₽</td>
                  <td>{maf.duration}</td>
                  <td>{maf.designer.name}</td>
                  <td>
                    {maf.status === "RDY"
                      ? "Готов к постройке"
                      : "В разработке"}
                  </td>
                </tr>
              </tbody>
            </table> */}
          </div>
          <h4>Описание</h4>
          <p className="description">{maf.description}</p>
        </div>
      </div>
    )
  );
}
