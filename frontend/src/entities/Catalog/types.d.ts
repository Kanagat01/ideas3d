type CatalogObjStatus = "DEV" | "RDY";

interface Designer {
  id: number;
  name: string;
}

interface MafStyle {
  id: number;
  name: string;
}

interface MafType {
  id: number;
  name: string;
}

interface Maf {
  id: number;
  name: string;
  stl_file: string;
  price: number;
  duration: number;
  description: string;
  status: CatalogObjStatus;
  designer: Designer;
  style: MafStyle;
  type: MafType;
}

interface Room {
  id: number;
  name: string;
  area: number;
}

interface Floor {
  id: number;
  name: string;
  plan_image: string;
  order: number;
  rooms: Room[];
}

interface HouseImage {
  id: number;
  image: string;
}

interface House {
  id: number;
  name: string;
  stl_file: string;
  price: number;
  description: string;
  duration: number;
  living_area: number;
  total_area: number;
  status: CatalogObjStatus;
  designer: Designer;
  images: HouseImage[];
  floors: Floor[];
}
