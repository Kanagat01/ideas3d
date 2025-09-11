import { createEffect, createEvent, createStore } from "effector";
import { API_URL, apiInstance } from "~/shared/apiInstance";
import { catalog as mockCatalog } from "~/shared/mockData/catalog";
import type {
  Catalog,
  CartItem,
  House,
  Maf,
  Floor,
  Room,
  ImageObj,
} from "./types";

const USE_MOCK = false; //false=API, true = fakeData

export const getCatalogFx = createEffect<void, Catalog>(async () => {
  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 200));
    return mockCatalog;
  }
  const response = await apiInstance.get("api/catalog/");
  return response.data;
});

export const $catalog = createStore<Catalog>({
  mafs: [],
  houses: [],
  styles: [],
  types: [],
  designers: [],
}).on(getCatalogFx.doneData, (_, payload) => {
  const { mafs, houses, styles, types, designers } = payload;
  return {
    houses: houses.map((el: House) => ({
      ...el,
      stl_file: el.stl_file
        ? el.stl_file.startsWith("/assets/")
          ? el.stl_file
          : `${API_URL}${el.stl_file}`
        : null,
      price: typeof el.price === "string" ? Number(el.price) : el.price,
      living_area:
        typeof el.living_area === "string"
          ? Number(el.living_area)
          : el.living_area,
      total_area:
        typeof el.total_area === "string"
          ? Number(el.total_area)
          : el.total_area,
      images: Array.isArray(el.images)
        ? el.images.map((img: ImageObj) => ({
            ...img,
            image: img.image.startsWith("/assets/")
              ? img.image
              : `${API_URL}${img.image}`,
          }))
        : [],
      files: Array.isArray(el.files) ? el.files : [],
      floors: el.floors
        ? el.floors.map((floor: Floor) => ({
            ...floor,
            plan_image: floor.plan_image.startsWith("/assets/")
              ? floor.plan_image
              : `${API_URL}${floor.plan_image}`,
            rooms: Array.isArray(floor.rooms)
              ? floor.rooms.map((room: Room) => ({
                  ...room,
                  area:
                    typeof room.area === "string"
                      ? Number(room.area)
                      : room.area,
                }))
              : [],
          }))
        : [],
    })),
    mafs: mafs.map((el: Maf) => ({
      ...el,
      stl_file: el.stl_file
        ? el.stl_file.startsWith("/assets/")
          ? el.stl_file
          : `${API_URL}${el.stl_file}`
        : null,
      price: typeof el.price === "string" ? Number(el.price) : el.price,
      images: Array.isArray(el.images)
        ? el.images.map((img: ImageObj) => ({
            ...img,
            image: img.image.startsWith("/assets/")
              ? img.image
              : `${API_URL}${img.image}`,
          }))
        : [],
      files: Array.isArray(el.files) ? el.files : [],
    })),
    styles,
    types,
    designers,
  };
});

$catalog.watch((catalog) => {
  console.log("Current catalog state:", catalog);
});

export const updateCatalog = createEvent<Catalog>();
$catalog.on(updateCatalog, (_, payload) => payload);

// ----------------------------- CART -------------------------
export const createApplicationFx = createEffect<
  { full_name: string; contact: string; cart: CartItem[] },
  string
>(async (data) => {
  const response = await apiInstance.post("api/create-application/", data);
  console.log("response:", response);
  return response.data.message;
});

const savedCart = sessionStorage.getItem("cart");
export const setCart = createEvent<CartItem[]>();
export const $cart = createStore<CartItem[]>(
  savedCart ? JSON.parse(savedCart) : []
)
  .on(setCart, (_, state) => state)
  .on(createApplicationFx.doneData, () => []);

$cart.watch((state) => {
  sessionStorage.setItem("cart", JSON.stringify(state));
});

$cart.watch((cart) => {
  console.log("Current cart state:", cart);
});
