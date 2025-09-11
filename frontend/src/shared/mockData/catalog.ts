// export type FileObj = {
//   id: number;
//   original_filename: string;
//   mime_type: string;
//   uploaded_at: string;
//   download_url: string;
// };

// export type ImageObj = {
//   id: number;
//   image: string;
//   house?: number;
//   maf?: number;
// };

// export type Designer = {
//   id: number;
//   name: string;
// };

// export type Style = {
//   id: number;
//   name: string;
// };

// export type TypeObj = {
//   id: number;
//   name: string;
// };

// export type Room = {
//   id: number;
//   name: string;
//   area: string;
// };

// export type Floor = {
//   id: number;
//   name: string;
//   plan_image: string;
//   rooms: Room[];
// };

// export type House = {
//   id: number;
//   name: string;
//   price: string;
//   description: string;
//   living_area: string;
//   total_area: string;
//   duration: string;
//   status: "RDY" | "DEV";
//   designer: Designer;
//   stl_file: string | null;
//   images: ImageObj[];
//   files: FileObj[];
//   floors?: Floor[];
// };

// export type Maf = {
//   id: number;
//   name: string;
//   price: string;
//   description: string;
//   status: "RDY" | "DEV";
//   designer: Designer;
//   style: Style;
//   type: TypeObj;
//   stl_file: string | null;
//   images: ImageObj[];
//   files: FileObj[];
//   duration: string;
//   length: string;
//   width: string;
//   height: string;
//   diameter: string;
// };

// export type Catalog = {
//   houses: House[];
//   mafs: Maf[];
//   designers: Designer[];
//   styles: Style[];
//   types: TypeObj[];
// };

// // --- Designers, Styles, Types ---
// const designers: Designer[] = [
//   { id: 1, name: "Demo Design Studio" },
//   { id: 2, name: "Modern House Makers" },
// ];
// const styles: Style[] = [
//   { id: 1, name: "Modern" },
//   { id: 2, name: "Classic" },
// ];
// const types: TypeObj[] = [
//   { id: 1, name: "Bench" },
//   { id: 2, name: "Fountain" },
// ];

// // --- Mock Catalog Data ---
// export const catalog: Catalog = {
//   houses: [
//     {
//       id: 1,
//       name: "Дом с террасой",
//       price: "15000000.00",
//       description: "Современный дом с просторной террасой.",
//       living_area: "120.00",
//       total_area: "180.00",
//       duration: "10 месяцев",
//       status: "RDY",
//       designer: designers[0],
//       stl_file: "/assets/house1.stl",
//       images: [
//         { id: 1, image: "/assets/house1-1.jpg", house: 1 },
//         { id: 2, image: "/assets/house1-2.jpg", house: 1 },
//       ],
//       files: [
//         {
//           id: 1,
//           original_filename: "План дома.pdf",
//           mime_type: "application/pdf",
//           uploaded_at: "2025-07-08T10:00:00+03:00",
//           download_url: "/assets/plan1.pdf",
//         },
//       ],
//       floors: [
//         {
//           id: 1,
//           name: "1 этаж",
//           plan_image: "/assets/plan1-floor1.png",
//           rooms: [
//             { id: 1, name: "Гостиная", area: "30" },
//             { id: 2, name: "Кухня", area: "15" },
//           ],
//         },
//         {
//           id: 2,
//           name: "2 этаж",
//           plan_image: "/assets/plan1-floor2.png",
//           rooms: [
//             { id: 3, name: "Спальня", area: "20" },
//             { id: 4, name: "Ванная", area: "10" },
//           ],
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "Минималистичный дом",
//       price: "8000000.00",
//       description: "Уютный минималистичный дом.",
//       living_area: "85.00",
//       total_area: "110.00",
//       duration: "8 месяцев",
//       status: "DEV",
//       designer: designers[1],
//       stl_file: null,
//       images: [],
//       files: [],
//       // No floors
//     },
//     {
//       id: 3,
//       name: "Классический особняк",
//       price: "20000000.00",
//       description: "Роскошный классический особняк для большой семьи.",
//       living_area: "200.00",
//       total_area: "350.00",
//       duration: "14 месяцев",
//       status: "RDY",
//       designer: designers[0],
//       stl_file: "/assets/house3.stl",
//       images: [{ id: 3, image: "/assets/house3.jpg", house: 3 }],
//       files: [
//         {
//           id: 2,
//           original_filename: "Проект особняка.pdf",
//           mime_type: "application/pdf",
//           uploaded_at: "2025-07-08T12:00:00+03:00",
//           download_url: "/assets/plan3.pdf",
//         },
//       ],
//       floors: [
//         {
//           id: 1,
//           name: "1 этаж",
//           plan_image: "/assets/plan3-floor1.png",
//           rooms: [],
//         },
//       ],
//     },
//     //House + images, files, no STL, no floors
//     {
//       id: 4,
//       name: "Маленький домик",
//       price: "4000000.00",
//       description: "Идеально для дачи или загородной жизни.",
//       living_area: "40.00",
//       total_area: "65.00",
//       duration: "5 месяцев",
//       status: "DEV",
//       designer: designers[1],
//       stl_file: null,
//       images: [{ id: 4, image: "/assets/house4.jpg", house: 4 }],
//       files: [
//         {
//           id: 3,
//           original_filename: "План маленького дома.pdf",
//           mime_type: "application/pdf",
//           uploaded_at: "2025-07-08T15:00:00+03:00",
//           download_url: "/assets/plan4.pdf",
//         },
//       ],
//     },
//   ],
//   mafs: [
//     {
//       id: 1,
//       name: "Современная скамейка",
//       price: "30000.00",
//       description: "Стильная скамейка для городского парка.",
//       status: "RDY",
//       designer: designers[0],
//       style: styles[0],
//       type: types[0],
//       stl_file: "/assets/maf1.stl",
//       images: [{ id: 10, image: "/assets/maf1.jpg", maf: 1 }],
//       files: [
//         {
//           id: 10,
//           original_filename: "Проект скамейки.pdf",
//           mime_type: "application/pdf",
//           uploaded_at: "2025-07-08T11:00:00+03:00",
//           download_url: "/assets/maf1.pdf",
//         },
//       ],
//       duration: "3 недели",
//       length: "180.00",
//       width: "60.00",
//       height: "90.00",
//       diameter: "0.00",
//     },
//     {
//       id: 2,
//       name: "Фонтан в стиле модерн",
//       price: "120000.00",
//       description: "Современный фонтан для городской площади.",
//       status: "DEV",
//       designer: designers[1],
//       style: styles[1],
//       type: types[1],
//       stl_file: null,
//       images: [],
//       files: [],
//       duration: "6 недель",
//       length: "200.00",
//       width: "200.00",
//       height: "250.00",
//       diameter: "350.00",
//     },
//     //MAF all
//     {
//       id: 3,
//       name: "Садовая скульптура",
//       price: "45000.00",
//       description: "Красивая скульптура для сада.",
//       status: "RDY",
//       designer: designers[0],
//       style: styles[1],
//       type: types[0],
//       stl_file: "/assets/maf3.stl",
//       images: [{ id: 12, image: "/assets/maf3.jpg", maf: 3 }],
//       files: [
//         {
//           id: 13,
//           original_filename: "Скульптура проект.pdf",
//           mime_type: "application/pdf",
//           uploaded_at: "2025-07-08T13:00:00+03:00",
//           download_url: "/assets/maf3.pdf",
//         },
//       ],
//       duration: "2 недели",
//       length: "90.00",
//       width: "45.00",
//       height: "120.00",
//       diameter: "30.00",
//     },
//   ],
//   designers,
//   styles,
//   types,
// };

// export const catalog = {
//   houses: [
//     {
//       id: 1,
//       name: "Дом без всего",
//       price: "1000000",
//       description: "Простой дом без изображений и планов.",
//       living_area: "50",
//       total_area: "80",
//       duration: "6 месяцев",
//       status: "RDY",
//       designer: { id: 1, name: "Demo Design Studio" },
//       stl_file: "/assets/house1.stl",
//     },
//     {
//       id: 2,
//       name: "Второй дом",
//       price: "2000000",
//       description: "Ещё один дом.",
//       living_area: "60",
//       total_area: "100",
//       duration: "8 месяцев",
//       status: "DEV",
//       designer: { id: 2, name: "Modern House Makers" },
//       stl_file: "/assets/house1.stl",
//     },
//   ],
//   mafs: [
//     {
//       id: 1,
//       name: "Простая скамейка",
//       price: "10000",
//       description: "Без моделей, файлов и изображений.",
//       status: "RDY",
//       designer: { id: 1, name: "Demo Design Studio" },
//       style: { id: 1, name: "Modern" },
//       type: { id: 1, name: "Bench" },
//       duration: "2 недели",
//       length: "120",
//       width: "50",
//       height: "60",
//       diameter: "0",
//       stl_file: "/assets/house1.stl",
//     },
//     {
//       id: 2,
//       name: "Фонтан простой",
//       price: "25000",
//       description: "Максимально простой МАФ.",
//       status: "DEV",
//       designer: { id: 2, name: "Modern House Makers" },
//       style: { id: 2, name: "Classic" },
//       type: { id: 2, name: "Fountain" },
//       duration: "4 недели",
//       length: "100",
//       width: "100",
//       height: "80",
//       diameter: "80",
//       stl_file: "/assets/house1.stl",
//     },
//   ],
//   designers: [
//     { id: 1, name: "Demo Design Studio" },
//     { id: 2, name: "Modern House Makers" },
//   ],
//   styles: [
//     { id: 1, name: "Modern" },
//     { id: 2, name: "Classic" },
//   ],
//   types: [
//     { id: 1, name: "Bench" },
//     { id: 2, name: "Fountain" },
//   ],
// };

export const catalog = {
  houses: [
    {
      id: 1,
      name: "Современный дом",
      price: "12000000",
      description: "Уютный дом с панорамными окнами.",
      living_area: "95",
      total_area: "135",
      duration: "9 месяцев",
      status: "RDY",
      designer: { id: 1, name: "Demo Design Studio" },
      stl_file: "/assets/maf1.stl",
      images: [
        { id: 1, image: "/assets/mockData/house_2.jpeg", house: 1 },
        { id: 2, image: "/assets/mockData/house_modern_1.jpeg", house: 1 },
        { id: 3, image: "/assets/mockData/house_2.jpeg", house: 1 },
      ],
      files: [
        {
          id: 1,
          original_filename: "Планировка.pdf",
          mime_type: "application/pdf",
          uploaded_at: "2025-07-09T10:00:00+03:00",
          download_url: "/assets/mockData/plan1.pdf",
        },
      ],
      floors: [
        {
          id: 1,
          name: "1 этаж",
          plan_image: "/assets/mockData/plan3-floor1.png",
          rooms: [{ id: 1, name: "Гостиная", area: "38" }],
        },
      ],
    },
  ],
  mafs: [
    {
      id: 1,
      name: "Скамейка №1",
      price: "25000",
      description: "Надежная парковая скамейка из массива дуба.",
      status: "RDY",
      designer: { id: 1, name: "Demo Design Studio" },
      style: { id: 1, name: "Modern" },
      type: { id: 1, name: "Bench" },
      stl_file: "/assets/maf1.stl",
      images: [
        { id: 1, image: "/assets/mockData/house_2.jpeg", house: 1 },
        { id: 2, image: "/assets/mockData/house_modern_1.jpeg", house: 1 },
        { id: 3, image: "/assets/mockData/house_2.jpeg", house: 1 },
        { id: 4, image: "/assets/mockData/house_2.jpeg", house: 1 },
      ],
      files: [
        {
          id: 11,
          original_filename: "Чертеж.pdf",
          mime_type: "application/pdf",
          uploaded_at: "2025-07-09T15:00:00+03:00",
          download_url: "/assets/mockData/skam1.pdf",
        },
      ],
      duration: "2 недели",
      length: "150.00",
      width: "50.00",
      height: "90.00",
      diameter: "0.00",
    },
  ],

  designers: [{ id: 1, name: "Demo Design Studio" }],
  styles: [{ id: 1, name: "Modern" }],
  types: [{ id: 1, name: "Bench" }],
};
