import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CatalogCardItem {
  id: number | string;
  itemType: "house" | "maf";
  images?: { image: string }[];
  name: string;
  type?: { name: string };
  status: "DEV" | "RDY" | string;
  total_area?: number | string;
  living_area?: number | string;
  rooms?: number | string;
  floors?: unknown[];
  length?: number | string | null;
  width?: number | string | null;
  height?: number | string | null;
  diameter?: number | string | null;
}

interface CatalogCardProps {
  item: CatalogCardItem;
}

export function CatalogCard({ item }: CatalogCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const isHouse = item.itemType === "house";
  const image = item.images?.[0]?.image || "";
  const name = item.name;
  const type = isHouse ? "Дом" : item.type?.name || "МАФ";
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const STATUS_MAP = {
    RDY: { label: "Готов к постройке", color: "#B5FF69" },
    DEV: { label: "В разработке", color: "#FF7878" },
  };

  const currentStatus = STATUS_MAP[item.status as keyof typeof STATUS_MAP] || {
    label: "",
    color: "#aaa",
  };
  const status = currentStatus.label;
  const statusColor = currentStatus.color;

  const details = isHouse
    ? [
        {
          label: "ОБЩАЯ ПЛОЩАДЬ",
          value: item.total_area ? `${item.total_area} м²` : "",
        },
        {
          label: "ЖИЛАЯ ПЛОЩАДЬ",
          value: item.living_area ? `${item.living_area} м²` : "",
        },
        { label: "КОЛ-ВО КОМНАТ", value: item.rooms || "" },
        { label: "КОЛ-ВО ЭТАЖЕЙ", value: item.floors?.length || "" },
      ]
    : [
        { label: "ДЛИНА", value: item.length ? `${item.length} см` : "" },
        { label: "ШИРИНА", value: item.width ? `${item.width} см` : "" },
        { label: "ВЫСОТА", value: item.height ? `${item.height} см` : "" },
        { label: "ДИАМЕТР", value: item.diameter ? `${item.diameter} см` : "" },
      ];

  const handleCardClick = () => {
    const url =
      item.itemType === "house" ? `/house/${item.id}` : `/mafs/${item.id}`;
    navigate(url);
  };

  return (
    <div
      className="catalog-card"
      style={{ height: 306 }}
      onMouseEnter={isDesktop ? () => setShowDetails(true) : undefined}
      onMouseLeave={isDesktop ? () => setShowDetails(false) : undefined}
      onClick={handleCardClick}
      tabIndex={0}
    >
      {!showDetails ? (
        <>
          <div className="catalog-card-image">
            <img src={image} alt={name} />
          </div>
          <div className="catalog-card-bottom">
            <div className="catalog-card-name">{name}</div>
            <div className="catalog-card-type">{type}</div>
          </div>
        </>
      ) : (
        <div className="catalog-card-details">
          <div className="catalog-card-details-left">
            <div className="catalog-card-title">{name}</div>
            <div className="catalog-card-status">
              <span
                className="status-dot"
                style={{ background: statusColor }}
              />
              <span className="status-text">{status}</span>
            </div>
          </div>
          <div className="catalog-card-details-divider" />
          <div className="catalog-card-details-right">
            {details
              .filter((d) => d.value && d.value !== "см" && d.value !== " м²")
              .map((d) => (
                <div className="details-row" key={d.label}>
                  <div className="details-label">{d.label}</div>
                  <div className="details-value">
                    <div className="details-underline" />
                    <span>{d.value}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
