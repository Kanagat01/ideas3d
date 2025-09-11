import { useState } from "react";

export const filtersDefault = {
  buildingType: "",
  roomsCnt: [] as number[],
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

export function useCatalogFilters() {
  const [filters, setFilters] = useState<typeof filtersDefault>(filtersDefault);

  const resetFilters = () => setFilters(filtersDefault);

  return { filters, setFilters, resetFilters };
}
