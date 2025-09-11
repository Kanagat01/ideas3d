import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { $catalog, getCatalogFx } from "~/entities/Catalog";
import type { Maf, House } from "~/entities/Catalog";

type CatalogType = "maf" | "house";

export function useCatalogItem<T extends Maf | House>(
  type: CatalogType,
  id: string | undefined
): {
  isLoading: boolean;
  triedLoad: boolean;
  item: T | undefined;
} {
  const [triedLoad, setTriedLoad] = useState(false);
  const [isLoading, catalog] = useUnit([getCatalogFx.pending, $catalog]);

  const list = type === "maf" ? catalog.mafs : catalog.houses;
  const item = list.find((el) => el.id === Number(id)) as T | undefined;

  useEffect(() => {
    if (list.length === 0 || !item) {
      getCatalogFx().then(() => setTriedLoad(true));
    }
  }, [list.length, item]);

  return { isLoading, triedLoad, item };
}
