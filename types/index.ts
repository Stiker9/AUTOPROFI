export interface Car {
  slug: string;
  make: string;
  makeSlug: string;
  model: string;
  modelSlug: string;
  generation: number;
  yearStart: number;
  yearEnd: number | null;
  bodyTypes: string[];
  displayName: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  brandDisplay: string;
  category: "towbars" | "electrics" | "accessories";
  hookType?: "flanged" | "removable" | "vertical" | null;
  price: number;
  fitsCars: string[];
  images: string[];
  description: string;
  maxLoad?: number;
  ballLoad?: number;
  articleNumber?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  readTime: number;
}
