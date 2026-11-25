import { MovieCard } from "~/components/MovieCard";
import { SectionError } from "~/components/SectionError";
import { getTrendingMovies } from "~/lib/api";
import { PRIORITY_POSTER_COUNT } from "~/constants/generic";
import type { Movie } from "~/types/movie";

export async function TrendingGrid() {
  let movies: Movie[];
  try {
    movies = await getTrendingMovies();
  } catch (error) {
    console.error("Failed to load trending movies", error);
    return <SectionError />;
  }

  if (movies.length === 0) {
    return (
      <p role="status" className="rounded-md border border-border bg-surface p-4 text-sm text-muted">
        No trending movies right now.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" aria-label="Trending movies">
      {movies.map((movie, index) => (
        <li key={movie.id}>
          <MovieCard movie={movie} preloadPoster={index < PRIORITY_POSTER_COUNT} />
        </li>
      ))}
    </ul>
  );
}
