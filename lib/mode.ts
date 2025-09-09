export type Mode = 'b2b' | 'b2c';

export function readMode(): Mode {
  if (typeof window === 'undefined') return 'b2c';
  const m = localStorage.getItem('mode');
  return m === 'b2b' || m === 'b2c' ? m : 'b2c';
}
