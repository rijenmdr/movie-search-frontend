import { MovieCard } from "~/components/MovieCard";
import { PRIORITY_POSTER_COUNT } from "~/constants/generic";
import { movieHref } from "~/lib/search-href";
import type { Movie } from "~/types/movie";

interface SearchGridProps {
  movies: Movie[];
  query: string;
  page: number;
}

export function SearchGrid({ movies, query, page }: SearchGridProps) {
  if (movies.length === 0) {
    return (
      <div role="status" className="rounded-md border border-border bg-surface p-4">
        <p className="text-sm text-muted">No movies found for “{query}”.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" aria-label="Movie search results">
      {movies.map((movie, index) => (
        <li key={movie.id}>
          <MovieCard
            movie={movie}
            href={movieHref(movie.id, query, page)}
            preloadPoster={index < PRIORITY_POSTER_COUNT}
          />
        </li>
      ))}
    </ul>
  );
}