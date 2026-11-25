/** Home URL for a search state; plain "/" when there is no query. */
export function searchHref(query: string, page = 1): string {
  const trimmed = query.trim();
  if (!trimmed) return "/";
  const params = new URLSearchParams({ query: trimmed });
  if (page > 1) params.set("page", String(page));
  return `/?${params}`;
}

/** Detail URL that remembers which search it was opened from. */
export function movieHref(id: number, query?: string, page = 1): string {
  const trimmed = query?.trim();
  if (!trimmed) return `/movies/${id}`;
  const params = new URLSearchParams({ query: trimmed });
  if (page > 1) params.set("page", String(page));
  return `/movies/${id}?${params}`;
}
