const FAVS = 'favorites';
export function getFavorites(): string[] {
if (typeof window === 'undefined') return [];
return JSON.parse(localStorage.getItem(FAVS) || '[]');
}
export function isFavorite(id: string) { return getFavorites().includes(id); }
export function saveFavorite(id: string) {
if (typeof window === 'undefined') return;
const s = new Set(getFavorites()); s.add(id);
localStorage.setItem('favorites', JSON.stringify([...s]));
}
