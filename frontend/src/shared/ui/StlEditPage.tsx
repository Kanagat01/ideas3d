import { useRef } from "react";
import {
  useParams,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import toast from "react-hot-toast";
import { BackBtnContainer } from "~/widgets";
import { getCatalogFx } from "~/entities/Catalog";
import type { ViewerCoordinates, Maf, House } from "~/entities/Catalog";
import { ModelViewer, Preloader } from "~/shared/ui";
import { useCatalogItem } from "~/shared/hooks";
import { API_URL } from "~/shared/apiInstance";
import Routes from "~/shared/routes";

type ModelViewerRef = {
  getCoordinates: () => ViewerCoordinates;
  setCameraPosition: (
    position?: [number, number, number],
    target?: [number, number, number]
  ) => void;
};

export default function StlEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isMaf = location.pathname.includes("/mafs/");
  const isHouse = location.pathname.includes("/house/");
  const itemType: "maf" | "house" | null = isMaf
    ? "maf"
    : isHouse
    ? "house"
    : null;

  const { isLoading, triedLoad, item } = useCatalogItem(itemType ?? "maf", id);

  const viewerRef = useRef<ModelViewerRef | null>(null);

  if (!itemType) return <Navigate to={Routes.CATALOG_3D} replace />;
  if (isLoading) return <Preloader />;
  if (triedLoad && !item) return <Navigate to={Routes.CATALOG_3D} replace />;

  const handleSave = async () => {
    if (!viewerRef.current || !item) return;
    const coords = viewerRef.current.getCoordinates();

    try {
      const res = await fetch(
        `${API_URL}/api/${itemType}s/${id}/update-coords/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stl_coordinates: coords }),
        }
      );

      if (!res.ok) throw new Error("Failed to save");

      if (itemType === "maf") {
        const mafItem = item as Maf;
        console.log("Updated Maf:", { ...mafItem, stl_coordinates: coords });
      } else {
        const houseItem = item as House;
        console.log("Updated House:", {
          ...houseItem,
          stl_coordinates: coords,
        });
      }

      toast.success("Вид успешно сохранён ✅");

      await getCatalogFx();
      navigate(`/${itemType === "house" ? "house" : "mafs"}/${id}`, {
        state: { stl_coordinates: coords },
      });
    } catch (err) {
      console.error(err);
      toast.error("Не удалось сохранить вид 😞");
    }
  };

  return (
    item && (
      <div className="model-page">
        <BackBtnContainer grayBg={false} />

        <div className="position-relative">
          <ModelViewer
            ref={viewerRef}
            url={item.stl_file || ""}
            initialView={item.stl_coordinates ?? undefined}
          />

          <div className="cart-btn-wrapper">
            <div className="cart-btn-background"></div>
            <button
              className="cart-btn"
              style={{ background: "#238", color: "#fff" }}
              onClick={handleSave}
            >
              Сохранить вид
            </button>
          </div>
        </div>
      </div>
    )
  );
}
