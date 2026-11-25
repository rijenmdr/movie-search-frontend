import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { DetailsSkeleton, TrailerSkeleton } from "~/components/DetailsSkeleton";
import { MovieDetails } from "~/components/MovieDetails";
import { MovieTrailer } from "~/components/MovieTrailer";
import { getMovie } from "~/lib/api";
import { parseMovieId } from "~/lib/parse-movie-id";
import { parsePage } from "~/lib/parse-page";
import { searchHref } from "~/lib/search-href";

// Same reason as app/page.tsx: depends on the API being reachable per request.
export const dynamic = "force-dynamic";

type MoviePageParams = Promise<{ id: string }>;
type MoviePageSearchParams = Promise<{ query?: string; page?: string }>;

const SITE_TITLE = "Movie Search Case";

// Unique <title> per movie (WCAG 2.4.2). getMovie is deduped with the page's own
// fetch, so this costs no extra request.
export async function generateMetadata({
  params,
}: {
  params: MoviePageParams;
}): Promise<Metadata> {
  const id = parseMovieId((await params).id);
  if (id === null) return { title: SITE_TITLE };

  try {
    const movie = await getMovie(id);
    const year = movie.releaseDate?.slice(0, 4);
    return { title: `${movie.title}${year ? ` (${year})` : ""} | ${SITE_TITLE}` };
  } catch {
    return { title: SITE_TITLE };
  }
}

export default async function MoviePage({
  params,
  searchParams,
}: {
  params: MoviePageParams;
  searchParams: MoviePageSearchParams;
}) {
  const id = parseMovieId((await params).id);
  if (id === null) notFound();

  // Restore the search (and results page) the user came from.
  const { query, page } = await searchParams;
  const backHref = searchHref(query ?? "", parsePage(page));

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 outline-none">
      <Link
        href={backHref}
        className="w-fit rounded-md text-sm text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      >
        <span aria-hidden="true">← </span>Back to search
      </Link>

      <Suspense fallback={<DetailsSkeleton />}>
        <MovieDetails id={id} />
      </Suspense>

      <section aria-labelledby="trailer-heading" className="flex flex-col gap-4">
        <h2 id="trailer-heading" className="text-lg font-medium text-foreground">
          Trailer
        </h2>
        <Suspense fallback={<TrailerSkeleton />}>
          <MovieTrailer id={id} />
        </Suspense>
      </section>
    </main>
  );
}
