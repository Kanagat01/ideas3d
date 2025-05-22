import { Modal } from "antd";
import { useUnit } from "effector-react";
import { generatePath, useNavigate } from "react-router-dom";
import { FormEvent, Fragment, ReactNode, useEffect, useState } from "react";
import { $catalog, getCatalogFx } from "~/entities/Catalog";
import {
  Checkbox,
  CustomSelect,
  MultiModelViewer,
  Preloader,
  RangeInput,
} from "~/shared/ui";
import Routes from "~/shared/routes";

const filtersDefault = {
  buildingType: "",
  roomsCnt: new Array<number>(),
  priceMin: 0,
  priceMax: 0,
  totalAreaMin: 0,
  totalAreaMax: 0,
  livingAreaMin: 0,
  livingAreaMax: 0,
  designer: 0,
  style: 0,
  type: 0,
  status: "",
};

export default function Catalog3DPage() {
  const navigate = useNavigate();
  const [isLoading, catalog] = useUnit([getCatalogFx.pending, $catalog]);
  useEffect(() => {
    getCatalogFx();
  }, []);

  const [show, setShow] = useState(false);
  const [filteredCatalog, setFilteredCatalog] = useState<{
    houses: House[];
    mafs: Maf[];
  }>(catalog);

  const [filters, setFilters] = useState(filtersDefault);
  const applyFilters = () => {
    const filteredHouses = catalog.houses.filter((el) => {
      return (
        (filters.buildingType === "" || filters.buildingType === "house") &&
        (filters.roomsCnt.length === 0 ||
          filters.roomsCnt.includes(
            el.floors.reduce((acc, el) => acc + el.rooms.length, 0)
          )) &&
        (filters.priceMin === 0 || filters.priceMin <= el.price) &&
        (filters.priceMax === 0 || filters.priceMax >= el.price) &&
        (filters.totalAreaMin === 0 || filters.totalAreaMin <= el.total_area) &&
        (filters.totalAreaMax === 0 || filters.totalAreaMax >= el.total_area) &&
        (filters.livingAreaMin === 0 ||
          filters.livingAreaMin <= el.living_area) &&
        (filters.livingAreaMax === 0 ||
          filters.livingAreaMax >= el.living_area) &&
        (filters.designer === 0 || filters.designer === el.designer.id) &&
        (filters.status === "" || filters.status === el.status)
      );
    });
    const filteredMafs = catalog.mafs.filter((el) => {
      return (
        (filters.buildingType === "" || filters.buildingType === "maf") &&
        (filters.priceMin === 0 || filters.priceMin <= el.price) &&
        (filters.priceMax === 0 || filters.priceMax >= el.price) &&
        (filters.designer === 0 || filters.designer === el.designer.id) &&
        (filters.style === 0 || filters.style === el.style.id) &&
        (filters.type === 0 || filters.type === el.type.id) &&
        (filters.status === "" || filters.status === el.status)
      );
    });
    setFilteredCatalog({
      houses: filteredHouses,
      mafs: filteredMafs,
    });
  };
  useEffect(() => {
    applyFilters();
  }, [catalog]);

  const handleChange = <K extends keyof typeof filters>(
    name: K,
    value: (typeof filters)[K]
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const fields = [
    <CustomSelect
      label="тип сооружения"
      value={filters.buildingType}
      options={[
        { value: "house", label: "дома" },
        { value: "maf", label: "малые архитектурные формы" },
      ]}
      handleChange={(value) => handleChange("buildingType", value as string)}
    />,
    filters.buildingType === "house" && (
      <Checkbox
        label="кол-во спален"
        values={filters.roomsCnt}
        options={[1, 2, 3, 4, 5]}
        handleChange={(value) => {
          let val = Number(value);
          handleChange(
            "roomsCnt",
            filters.roomsCnt.includes(val)
              ? filters.roomsCnt.filter((el) => el !== val)
              : [...filters.roomsCnt, val]
          );
        }}
      />
    ),
    <RangeInput
      label="стоимость"
      minValue={filters.priceMin}
      maxValue={filters.priceMax}
      onMinValueChange={(value) => handleChange("priceMin", value)}
      onMaxValueChange={(value) => handleChange("priceMax", value)}
    />,
    filters.buildingType === "house" && (
      <RangeInput
        label="общая площадь"
        minValue={filters.totalAreaMin}
        maxValue={filters.totalAreaMax}
        onMinValueChange={(value) => handleChange("totalAreaMin", value)}
        onMaxValueChange={(value) => handleChange("totalAreaMax", value)}
      />
    ),
    filters.buildingType === "house" && (
      <RangeInput
        label="жилая площадь"
        minValue={filters.livingAreaMin}
        maxValue={filters.livingAreaMax}
        onMinValueChange={(value) => handleChange("livingAreaMin", value)}
        onMaxValueChange={(value) => handleChange("livingAreaMax", value)}
      />
    ),
    <CustomSelect
      label="дизайнер"
      value={filters.designer}
      options={catalog.designers.map((el) => ({
        value: el.id,
        label: el.name,
      }))}
      handleChange={(value) => handleChange("designer", value as number)}
    />,
    filters.buildingType === "maf" && (
      <CustomSelect
        label="стиль"
        value={filters.style}
        options={catalog.styles.map((el) => ({ value: el.id, label: el.name }))}
        handleChange={(value) => handleChange("style", value as number)}
      />
    ),
    filters.buildingType === "maf" && (
      <CustomSelect
        label="тип"
        value={filters.type}
        options={catalog.types.map((el) => ({ value: el.id, label: el.name }))}
        handleChange={(value) => handleChange("type", value as number)}
      />
    ),
    <CustomSelect
      label="статус"
      value={filters.status}
      options={[
        { value: "RDY", label: "готов к постройке" },
        { value: "DEV", label: "в разработке" },
      ]}
      handleChange={(value) => handleChange("status", value as string)}
    />,
  ];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFilters(filtersDefault);
    applyFilters();
    setShow(false);
  };
  const onReset = (e: FormEvent) => {
    e.preventDefault();
    applyFilters();
    setShow(false);
  };

  if (isLoading) return <Preloader />;
  return (
    <div className="catalog">
      <div className="catalog-actions">
        <button>По коллекциям</button>
        <span className="catalog-actions__divider"></span>
        <button>Все изделия</button>
      </div>
      <button className="filter-btn" onClick={() => setShow(true)}>
        Фильтр
      </button>
      <Modal
        open={show}
        onCancel={() => setShow(false)}
        footer={null}
        centered
        destroyOnHidden
        maskClosable={true}
        styles={{
          content: { padding: "0", width: "min(90%, 335px)" },
          body: {
            padding: "3rem 0 2.5rem",
            background: "var(--dialog-bg)",
            border: "1px solid transparent",
            borderRadius: "3rem",
          },
        }}
      >
        <form onSubmit={onSubmit} onReset={onReset}>
          <div className="filter__title">фильтр</div>
          <div className="filter__divider" />
          <div className="filter__content">
            {fields.map((el, idx) => (
              <Fragment key={idx}>
                {el}
                {idx !== fields.length - 1 && (
                  <div className="filter__divider" />
                )}
              </Fragment>
            ))}
          </div>
          <div className="filter__actions">
            <button type="reset">Очистить</button>
            <button type="submit">Применить</button>
          </div>
        </form>
      </Modal>
      <MultiModelViewer
        models={[
          ...filteredCatalog.houses.map((el) => ({
            id: el.id,
            url: el.stl_file,
            tooltip: (
              <CatalogTooltip
                name={el.name}
                status={el.status}
                data={[
                  `Общая площадь: ${el.total_area}`,
                  `Жилая площадь: ${el.living_area}`,
                  `Кол-во комнат: ${el.floors.reduce(
                    (acc, el) => acc + el.rooms.length,
                    0
                  )}`,
                  `Кол-во этажей: ${el.floors.length}`,
                ]}
              />
            ),
            onClick: () =>
              navigate(generatePath(Routes.HOUSE, { id: `${el.id}` })),
          })),
          ...filteredCatalog.mafs.map((el) => ({
            id: el.id,
            url: el.stl_file,
            tooltip: (
              <CatalogTooltip
                name={el.name}
                status={el.status}
                data={[`Стиль: ${el.style.name}`, `Тип: ${el.type.name}`]}
              />
            ),
            onClick: () =>
              navigate(generatePath(Routes.MAF, { id: `${el.id}` })),
          })),
        ]}
      />
    </div>
  );
}

const CatalogTooltip = (props: {
  name: string;
  status: CatalogObjStatus;
  data: ReactNode[];
}) => (
  <div className="catalog-tooltip">
    <div>
      <div className="catalog-tooltip__name">{props.name}</div>
      <div className="catalog-tooltip__status">
        {props.status === "DEV" ? (
          <>
            <div className="circle red" />в разработке
          </>
        ) : (
          <>
            <div className="circle green" />
            готов к постройке
          </>
        )}
      </div>
    </div>
    <div className="vertical-divider" />
    <div className="catalog-tooltip__data">
      {props.data.map((el, idx) => (
        <Fragment key={idx}>
          <span>{el}</span>
          {idx !== props.data.length - 1 && (
            <div className="horizontal-divider" />
          )}
        </Fragment>
      ))}
    </div>
  </div>
);
