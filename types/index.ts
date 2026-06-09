export interface Car {
  slug: string;
  brand: string;
  model: string;
  generation: string;
  body: string;
  yearFrom: number;
  yearTo: number | null;
  popular: boolean;
  title: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: "towbars" | "electrics" | "accessories";
  hookType: string | null;
  towLoad: number | null;
  vertLoad: number | null;
  bumperCut: string | null;
  electricsIncluded: boolean | null;
  price: number;
  inStock: boolean;
  image: string;
  fitsCars: string[];
  universal: boolean;
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
