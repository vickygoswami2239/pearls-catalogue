export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  videoUrl?: string;
  type: string;
  color: string;
  size: number;
  origin: string;
  shape: string;
  metal: string;
  price?: number;
  // NEW (optional)
  sku?: string;
  tags?: string[];
  images?: string[]; // gallery; first is primary
};
