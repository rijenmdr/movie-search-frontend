import type { Metadata } from "next";

import { Suspense } from "react";

import { GridSkeleton } from "~/components/GridSkeleton";
import { SearchBar } from "~/components/SearchBar";
import { SearchResults } from "~/components/SearchResults";
import { TrendingGrid } from "~/components/TrendingGrid";
import { parsePage } from "~/lib/parse-page";

// Renders per-request rather than being statically generated at build time,
// since this page depends on the .NET API being reachable — which it isn't
// during `next build` in CI.
export const dynamic = "force-dynamic";

type HomeSearchParams = Promise<{
  query?: string;
  page?: string;
}>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const query = params.query?.trim();
  if (!query) return { title: "Movie Search Case" };
  const page = parsePage(params.page);
  return {
    title: `Results for “${query}”${page > 1 ? ` – page ${page}` : ""} | Movie Search Case`,
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";
  const page = parsePage(params.page);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 outline-none">
      <header className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-foreground">
          Movie Search Case
        </h1>
        <SearchBar key={query} query={query} />
      </header>

      <section aria-labelledby="content-heading" className="flex flex-col gap-4">
        <h2 id="content-heading" className="text-lg font-medium text-foreground">
          {query ? `Search results for “${query}”` : "Trending this week"}
        </h2>
     
        <Suspense key={`${query}:${page}`} fallback={<GridSkeleton count={query ? 12 : 6} />}>
          {query ? <SearchResults query={query} page={page} /> : <TrendingGrid />}
        </Suspense>
      </section>
    </main>
  );
}
