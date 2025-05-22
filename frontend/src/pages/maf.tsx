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

  if (isLoading) return <Preloader />;
  if (triedLoad && !maf) return <Navigate to={Routes.CATALOG_3D} replace />;

  return (
    maf && (
      <div className="model-page">
        <BackBtnContainer grayBg={false} />
        <ModelViewer url={maf.stl_file} />
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
      </div>
    )
  );
}
