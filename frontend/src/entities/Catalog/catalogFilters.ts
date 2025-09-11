import type { Catalog, House, Maf } from "./types";
import { filtersDefault } from "./useCatalogFilters";

export function filterCatalog(
  catalog: Catalog,
  filters: typeof filtersDefault
): { houses: House[]; mafs: Maf[] } {
  const filteredHouses = (catalog.houses || []).filter((el) => {
    return (
      (filters.buildingType === "" || filters.buildingType === "house") &&
      (filters.roomsCnt.length === 0 ||
        filters.roomsCnt.includes(
          (el.floors ?? []).reduce(
            (acc, fl) => acc + (fl.rooms?.length ?? 0),
            0
          )
        )) &&
      (filters.priceMin === 0 || filters.priceMin <= Number(el.price)) &&
      (filters.priceMax === 0 || filters.priceMax >= Number(el.price)) &&
      (filters.totalAreaMin === 0 ||
        filters.totalAreaMin <= Number(el.total_area)) &&
      (filters.totalAreaMax === 0 ||
        filters.totalAreaMax >= Number(el.total_area)) &&
      (filters.livingAreaMin === 0 ||
        filters.livingAreaMin <= Number(el.living_area)) &&
      (filters.livingAreaMax === 0 ||
        filters.livingAreaMax >= Number(el.living_area)) &&
      (filters.designer === 0 || filters.designer === el.designer.id) &&
      (filters.status === "" || filters.status === el.status)
    );
  });

  const filteredMafs = (catalog.mafs || []).filter((el) => {
    return (
      (filters.buildingType === "" || filters.buildingType === "maf") &&
      (filters.priceMin === 0 || filters.priceMin <= Number(el.price)) &&
      (filters.priceMax === 0 || filters.priceMax >= Number(el.price)) &&
      (filters.designer === 0 || filters.designer === el.designer.id) &&
      (filters.style === 0 || filters.style === el.style.id) &&
      (filters.type === 0 || filters.type === el.type.id) &&
      (filters.status === "" || filters.status === el.status)
    );
  });

  return { houses: filteredHouses, mafs: filteredMafs };
}
