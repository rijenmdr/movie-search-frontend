/**
 * Parses a raw `page` query-string value into a valid 1-based page number.
 * Falls back to 1 for missing, non-numeric, non-integer, or < 1 values.
 */
export function parsePage(raw: string | undefined): number {
  const page = Number(raw);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}
