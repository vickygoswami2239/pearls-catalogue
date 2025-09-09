import { Product } from './types';


export type FilterState = Partial<{
color: string; type: string; size: string; origin: string; shape: string; metal: string;
}>;


export function applyFilters(products: Product[], filters: FilterState) {
return products.filter(p => {
return (!filters.color || p.color === filters.color)
&& (!filters.type || p.type === filters.type)
&& (!filters.size || String(p.size) === String(filters.size))
&& (!filters.origin || p.origin === filters.origin)
&& (!filters.shape || p.shape === filters.shape)
&& (!filters.metal || p.metal === filters.metal);
});
}


export function deriveFacets(products: Product[]) {
const pick = (k: keyof Product) => Array.from(new Set(products.map(p => String(p[k])))).sort();
return {
color: pick('color'),
type: pick('type'),
size: pick('size'),
origin: pick('origin'),
shape: pick('shape'),
metal: pick('metal')
};
}
