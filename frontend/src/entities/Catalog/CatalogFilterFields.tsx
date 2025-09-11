import { Checkbox, CustomSelect, RangeInput } from "~/shared/ui";
import type { Catalog } from "~/entities/Catalog/types";
import { filtersDefault } from "~/entities/Catalog/useCatalogFilters";

type Filters = typeof filtersDefault;

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  catalog: Catalog;
};

export function CatalogFilterFields({ filters, setFilters, catalog }: Props) {
  const handleChange = <K extends keyof Filters>(
    name: K,
    value: Filters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <CustomSelect
        label="тип сооружения"
        value={filters.buildingType}
        options={[
          { value: "house", label: "дома" },
          { value: "maf", label: "малые архитектурные формы" },
        ]}
        handleChange={(value) => handleChange("buildingType", value as string)}
      />
      {filters.buildingType === "house" && (
        <Checkbox
          label="кол-во спален"
          values={filters.roomsCnt}
          options={[1, 2, 3, 4, 5]}
          handleChange={(value) => {
            const val = Number(value);
            handleChange(
              "roomsCnt",
              filters.roomsCnt.includes(val)
                ? filters.roomsCnt.filter((el: number) => el !== val)
                : [...filters.roomsCnt, val]
            );
          }}
        />
      )}
      <RangeInput
        label="стоимость"
        minValue={filters.priceMin}
        maxValue={filters.priceMax}
        onMinValueChange={(value) => handleChange("priceMin", value)}
        onMaxValueChange={(value) => handleChange("priceMax", value)}
      />
      {filters.buildingType === "house" && (
        <RangeInput
          label="общая площадь (м²)"
          minValue={filters.totalAreaMin}
          maxValue={filters.totalAreaMax}
          onMinValueChange={(value) => handleChange("totalAreaMin", value)}
          onMaxValueChange={(value) => handleChange("totalAreaMax", value)}
        />
      )}
      {filters.buildingType === "house" && (
        <RangeInput
          label="жилая площадь (м²)"
          minValue={filters.livingAreaMin}
          maxValue={filters.livingAreaMax}
          onMinValueChange={(value) => handleChange("livingAreaMin", value)}
          onMaxValueChange={(value) => handleChange("livingAreaMax", value)}
        />
      )}
      <CustomSelect
        label="дизайнер"
        value={filters.designer}
        options={catalog.designers.map((el) => ({
          value: el.id,
          label: el.name,
        }))}
        handleChange={(value) => handleChange("designer", value as number)}
      />
      {filters.buildingType === "maf" && (
        <CustomSelect
          label="стиль"
          value={filters.style}
          options={catalog.styles.map((el) => ({
            value: el.id,
            label: el.name,
          }))}
          handleChange={(value) => handleChange("style", value as number)}
        />
      )}
      {filters.buildingType === "maf" && (
        <CustomSelect
          label="тип"
          value={filters.type}
          options={catalog.types.map((el) => ({
            value: el.id,
            label: el.name,
          }))}
          handleChange={(value) => handleChange("type", value as number)}
        />
      )}
      <CustomSelect
        label="статус"
        value={filters.status}
        options={[
          { value: "RDY", label: "готов к постройке" },
          { value: "DEV", label: "в разработке" },
        ]}
        handleChange={(value) => handleChange("status", value as string)}
      />
    </>
  );
}
