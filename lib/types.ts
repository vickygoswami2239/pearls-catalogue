export type Product = {
  id: number;
  slug: string;
  name: string;
  image: string;
  images?: string[];
  description?: string;
  price?: number;
  type?: string;
  shape?: string;
  color?: string;
  origin?: string;
  metal?: string;
  videoUrl?: string;

  // NEW fields for detailed specs
  sku?: string;
  sizeMm?: number;         // e.g. 7.5
  luster?: string;         // 'High', etc.
  surfaceGrade?: string;   // 'AA+'
  nacreMm?: number;        // 0.6
  treatment?: string;      // 'None'
  dimensions?: string;     // '45 cm length'
  weightG?: number;        // 15.2
  clasp?: string;          // 'Lobster'
  stock?: number;          // 8
  leadTimeDays?: number;   // 3

  // keep index signature if you already had it
  [key: string]: any;
};
