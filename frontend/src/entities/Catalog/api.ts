import { createEffect, createEvent, createStore } from "effector";
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
    living_area: Number(el.living_area),
    total_area: Number(el.total_area),
    images: el.images.map((el) => ({
      ...el,
      image: `${API_URL}${el.image}`,
    })),
    floors: el.floors.map((floor) => ({
      ...floor,
      plan_image: `${API_URL}${floor.plan_image}`,
      rooms: floor.rooms.map((room) => ({ ...room, area: Number(room.area) })),
    })),
  })),
  mafs: mafs.map((el) => ({
    ...el,
    stl_file: `${API_URL}${el.stl_file}`,
    price: Number(el.price),
  })), // Convert price to number
}));

const savedCart = sessionStorage.getItem("cart");
export const setCart = createEvent<CartItem[]>();
export const $cart = createStore<CartItem[]>(
  savedCart ? JSON.parse(savedCart) : []
).on(setCart, (_, state) => {
  sessionStorage.setItem("cart", JSON.stringify(state));
  return state;
});
