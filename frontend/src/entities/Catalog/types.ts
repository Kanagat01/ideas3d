export type CatalogObjStatus = "DEV" | "RDY";

export interface Designer {
  id: number;
  name: string;
}

export interface MafStyle {
  id: number;
  name: string;
}

export interface MafType {
  id: number;
  name: string;
}

export interface FileObj {
  id: number;
  original_filename: string;
  mime_type: string;
  uploaded_at: string;
  download_url: string;
}

export interface ImageObj {
  id: number;
  image: string;
  house?: number;
  maf?: number;
}

// export type ViewerCoordinates = {
//   cameraPosition: [number, number, number];
//   target: [number, number, number];
// };

import type { ViewerCoordinates as ModelViewerCoordinates } from "~/shared/ui/ModelViewer";

export type ViewerCoordinates = ModelViewerCoordinates;

export interface Maf {
  id: number;
  name: string;
  stl_file: string | null;
  stl_coordinates: ViewerCoordinates | null;
  price: number | string;
  duration: string;
  description: string;
  status: CatalogObjStatus;
  designer: Designer;
  style: MafStyle;
  type: MafType;
  length?: string;
  width?: string;
  height?: string;
  diameter?: string;
  images: ImageObj[];
  files: FileObj[];
}

export interface Room {
  id: number;
  name: string;
  area: number | string;
}

export interface Floor {
  id: number;
  name: string;
  plan_image: string;
  order?: number;
  rooms: Room[];
}

export interface House {
  id: number;
  name: string;
  stl_file: string | null;
  stl_coordinates: ViewerCoordinates | null;
  price: number | string;
  description: string;
  duration: string;
  living_area: number | string;
  total_area: number | string;
  status: CatalogObjStatus;
  designer: Designer;
  images: ImageObj[];
  files: FileObj[];
  floors?: Floor[];
}

export type CartItem =
  | (Maf & { item_type: "maf"; amount: number })
  | (House & { item_type: "house"; amount: number });

export interface Catalog {
  mafs: Maf[];
  houses: House[];
  styles: MafStyle[];
  types: MafType[];
  designers: Designer[];
}
