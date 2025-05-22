import { createEffect, createStore } from "effector";
import { API_URL, apiInstance } from "~/shared/apiInstance";

type Catalog = {
  mafs: Maf[];
  houses: House[];
  styles: MafStyle[];
  types: MafType[];
  designers: Designer[];
};

export const getCatalogFx = createEffect<void, Catalog>(async () => {
  const response = await apiInstance.get("api/catalog/");
  return response.data;
});

export const $catalog = createStore<Catalog>({
  mafs: [],
  houses: [],
  styles: [],
  types: [],
  designers: [],
}).on(getCatalogFx.doneData, (_, { mafs, houses, ...catalog }) => ({
  ...catalog,
  houses: houses.map((el) => ({
    ...el,
    stl_file: `${API_URL}${el.stl_file}`,
    price: Number(el.price),
    duration: Number(el.duration),
    living_area: Number(el.living_area),
    total_area: Number(el.total_area),
    floors: el.floors.map((floor) => ({
      ...floor,
      rooms: floor.rooms.map((room) => ({ ...room, area: Number(room.area) })),
    })),
  })),
  mafs: mafs.map((el) => ({
    ...el,
    stl_file: `${API_URL}${el.stl_file}`,
    price: Number(el.price),
    duration: Number(el.duration),
  })), // Convert price and duration to numbers
}));
