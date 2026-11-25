import { DETAILS_EXTRAS, MOCK_ID, TRAILER } from "~/mocks/data/movie-details";
import { trendingMovies } from "~/mocks/data/movies";
import { searchMovies } from "~/mocks/data/search-movies";
import type { MovieDetails, MovieVideo } from "~/types/movie";

/** Details are just the movie from the lists plus fixed extras. */
export function getMockMovieDetails(id: number): MovieDetails | undefined {
  const movie = [...trendingMovies, ...searchMovies].find((m) => m.id === id);
  return movie && { ...movie, ...DETAILS_EXTRAS };
}

export function getMockMovieVideos(id: number): MovieVideo[] {
  return id === MOCK_ID.noVideos ? [] : [TRAILER];
}
