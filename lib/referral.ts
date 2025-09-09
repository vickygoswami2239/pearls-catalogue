export function getOrCreateRID() {
  if (typeof window === 'undefined') return '';
  let rid = localStorage.getItem('rid');
  if (!rid) {
    rid = 'RID-' + Math.random().toString(36).slice(2, 10).toUpperCase();
    localStorage.setItem('rid', rid);
  }
  return rid;
}

export function getRefFromURL(): string | null {
  if (typeof window === 'undefined') return null;
  const u = new URL(window.location.href);
  return u.searchParams.get('ref');
}

export function buildShareUrl(path: string) {
  if (typeof window === 'undefined') return path;
  const rid = getOrCreateRID();
  const base = window.location.origin;
  const url = new URL(path, base);
  url.searchParams.set('ref', rid);
  return url.toString();
}
