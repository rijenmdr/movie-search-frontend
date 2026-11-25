import Image from "next/image";
import { notFound } from "next/navigation";

import { SectionError } from "~/components/SectionError";
import { ApiError, getMovie } from "~/lib/api";
import type { MovieDetails as MovieDetailsData } from "~/types/movie";

interface MovieDetailsProps {
  id: number;
}

export async function MovieDetails({ id }: MovieDetailsProps) {
  let movie: MovieDetailsData;
  try {
    movie = await getMovie(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    console.error("Failed to load movie", error);
    return (
      <SectionError
        title="Couldn't load this movie"
        message="We couldn't load the movie details. Please try again."
      />
    );
  }

  const year = movie.releaseDate?.slice(0, 4) ?? null;
  const rating = movie.voteAverage.toFixed(1);

  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="relative aspect-[2/3] w-full max-w-64 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
          {movie.posterPath ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={`Poster for ${movie.title}`}
              fill
              sizes="256px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted">
              No poster
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-foreground">
              {movie.title}
              {year && <span className="font-normal text-muted"> ({year})</span>}
            </h1>
            {movie.tagline && (
              <p className="text-sm italic text-muted">{movie.tagline}</p>
            )}
          </div>

          <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-muted">Rating</dt>
              <dd className="text-foreground">
                <span aria-hidden="true">★ {rating}</span>
                <span className="sr-only">{rating} out of 10</span>
              </dd>
            </div>
            {movie.runtime !== null && (
              <div className="flex gap-2">
                <dt className="text-muted">Runtime</dt>
                <dd className="text-foreground">{movie.runtime} min</dd>
              </div>
            )}
            {movie.genres.length > 0 && (
              <div className="flex gap-2">
                <dt className="text-muted">Genres</dt>
                <dd className="text-foreground">{movie.genres.join(", ")}</dd>
              </div>
            )}
          </dl>

          <p className="text-sm leading-relaxed text-foreground">
            {movie.overview ?? "No overview available."}
          </p>
        </div>
      </div>
    </article>
  );
}
