export const PAGE_SIZE = 20;

// Data Cache lifetimes (seconds) for API fetches in lib/api.ts.
// Trending changes slowly; search results for a given query/page are stable
// enough to share across users for a few minutes.
export const TRENDING_REVALIDATE_SECONDS = 60 * 60;
export const SEARCH_REVALIDATE_SECONDS = 5 * 60;
// Movie details and videos rarely change.
export const MOVIE_REVALIDATE_SECONDS = 60 * 60;

// Number of posters in the first visible row(s) that are preloaded.
export const PRIORITY_POSTER_COUNT = 6;
