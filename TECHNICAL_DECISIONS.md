# Technical Decisions

## Overview

The implementation prioritizes the P0 core flow, P1 usability and accessibility requirements, and P2 movie-detail functionality. P3 caching/revalidation is also covered through Next.js fetch caching. The mock API and application remain contract-compatible, so the frontend can use the real API by changing `NEXT_PUBLIC_API_BASE_URL`.

## P0: Core functionality

### Mock API

**Implementation:** Next.js route handlers provide fixtures under `app/api/mock/v1/movies/`.

**Why:** Route handlers require no additional backend tooling and keep the contract close to the application. The mock is isolated in `app/api/mock/` and `mocks/`, while the application uses the same `apiFetch` abstraction it would use with a real backend.

**Covered cases:**

| Case                                                     | Trigger                                                  |
| -------------------------------------------------------- | -------------------------------------------------------- |
| Trending movies                                          | `GET /movies/trending`                                 |
| Normal paginated search, including more than three pages | Query `batman`                                         |
| No results                                               | Query `noresults`                                      |
| Approximately three-second response                      | Query `slow`                                           |
| Search service error (`503`)                           | Query `error`                                          |
| Missing query or invalid query                           | Empty or whitespace-only `query`                       |
| Invalid page                                             | Page outside `1`–`500`, or a non-whole-number value |
| Movie detail found                                       | A known fixture ID                                       |
| Movie not found (`404`)                                | An unknown positive movie ID                             |
| Movie detail service error (`503`)                     | Movie ID `603`                                         |
| No videos                                                | Movie ID `155`                                         |
| Video service error (`503`)                            | Movie ID `157336`                                      |

Mock errors use `application/problem+json` with an appropriate status, title, and detail.

### Search and pagination

**Implementation:** `lib/api.ts` adds `searchMovies(query, page)` using the existing `apiFetch` pattern. Search state is represented in URL parameters (`query` and `page`) and rendered with `SearchResults`, `SearchGrid`, and `Pagination`.

**Why:** URL query parameters make searches shareable, bookmarkable, and restorable after navigating to a movie detail page. Previous/next pagination was used instead of infinite scroll or load-more because it maps directly to the API's `page` and `totalPages` fields, keeps URL state and browser navigation predictable, and gives users clear feedback about their position in the results. It also avoids adding scroll listeners or client-side accumulation and is easier to navigate with a keyboard or assistive technology.

## P1: Loading, errors, accessibility

### Streaming and loading behavior

**Implementation:** Search and trending data are fetched inside server components. `Suspense` in the home page provides a grid skeleton while the content stream resolves.

**Why:** A route-level `app/loading.tsx` was intentionally not used because it could replace the complete page. The search form and heading remain available immediately while only the dynamic movie grid waits in a streaming boundary. This reduces the perceived blocking behavior for slow mock responses.

`GridSkeleton` exposes a screen-reader loading status and hides its visual placeholder animation from assistive technology.

### Empty and error states

**Implementation:** Empty searches return a visible no-results status. Search and trending failures return a retryable `SectionError` component. Slow responses demonstrate the loading state, and the `error` query demonstrates the retryable 503 state.

**Why:** Loading, empty, and failure states are kept as section-level UI so the rest of the page remains usable and the static search interface is not removed.

### Accessibility

**Implementation:**

- The search form uses a semantic `<form>`, a visible label, and native input/button controls.
- Search links and controls use visible keyboard focus states.
- Result counts and pagination context are announced through live/role status content.
- Card titles use real links with full-card click areas.
- Images have meaningful alternatives or an explicit no-poster state.
- Landmarks, headings, and navigation labels provide page structure.
- Unique movie and search metadata titles are generated for each view.

**Why:** Native form and link semantics provide keyboard behavior and assistive-technology support with less custom JavaScript than reimplementing equivalent controls.

## P2: Movie details and trailers

### Detail page

**Implementation:** `/movies/[id]` fetches movie details and renders runtime, tagline, genres, rating, overview, and poster. Unknown IDs use the application's 404 page; service failures use a retryable section error.

**Why:** Server-rendered detail pages preserve correct document titles and avoid transferring API-fetching logic to the client.

### Trailers

**Implementation:** `/movies/[id]/videos` is fetched independently and filtered by `pickTrailer` for YouTube videos. The selected video is embedded in a lazy-loading iframe; movies with no videos receive an explicit no-trailer state.

**Why:** Details and trailers are separate Suspense boundaries so a trailer delay does not block the movie information.

## P3: Caching and performance

**Implementation:** API requests use tagged Next.js revalidation intervals: trending data is cached for one hour, search data for five minutes, and movie details/videos for one hour. Search and detail parameters are cache keys through their URL/API paths.

**Why:** Popular reads are unlikely to change on every request, and server-side caching reduces repeated API work while preserving a bounded freshness policy.

## Rendering strategy

The home page and detail pages are rendered by Next.js server components. Data fetching and content rendering occur on the server, while `Suspense` streams dynamic sections independently.

The search form and retry controls are client components because they use local form state or Next.js navigation refresh behavior. Movie cards, grids, pagination, details, and trailers are server-rendered or contain minimal client behavior.

This split keeps API credentials and server fetching out of the browser, improves initial HTML and SEO, and limits client JavaScript to genuinely interactive controls.

## Image optimization

`next/image` is used for posters and detail imagery. The configuration allows the TMDB image host and sets `minimumCacheTTL` to 24 hours, reducing repeated image optimization work for unchanged poster URLs. Responsive `sizes` are used for grid and detail layouts. The first six posters in a grid use the `preload` option because they are likely above the fold, while later posters load as needed.

Fallback UI is rendered when a poster path is missing. This avoids broken-image layouts and distinguishes unavailable imagery from loading imagery.

## Recommended improvements

- Add unit and integration tests for search, pagination, route handlers, mock error cases, details, and trailers.
- Add TV/series search with a contract-supported endpoint and an explicit media-type interface.
- Improve UI/UX with more refined mobile layouts, stronger visual hierarchy, clearer search and pagination states, more polished skeletons, and enhanced keyboard and screen-reader feedback.
