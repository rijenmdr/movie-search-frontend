/** Returns a positive integer id, or null for anything else (e.g. "abc", "1.5", "0"). */
export function parseMovieId(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
