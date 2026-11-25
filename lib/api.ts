import "server-only";

import {
  MOVIE_REVALIDATE_SECONDS,
  SEARCH_REVALIDATE_SECONDS,
  TRENDING_REVALIDATE_SECONDS,
} from "~/constants/generic";
import type {
  Movie,
  MovieDetails,
  MovieSearchResponse,
  MovieVideo,
} from "~/types/movie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not set. Copy .env.example to .env.local and point it at the running API.",
  );
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { Accept: "application/json", ...init?.headers },
  });

  if (!response.ok) {
    throw new ApiError(
      `Request to ${path} failed with status ${response.status}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

/** TMDB-backed trending movies fetch. */
export function getTrendingMovies(): Promise<Movie[]> {
  return apiFetch<Movie[]>("/movies/trending", {
    next: { revalidate: TRENDING_REVALIDATE_SECONDS, tags: ["trending"] },
  });
}

export function searchMovies(
  query: string,
  page: number,
): Promise<MovieSearchResponse> {
  const params = new URLSearchParams({ query, page: String(page) });
  return apiFetch<MovieSearchResponse>(`/movies/search?${params}`, {
    next: { revalidate: SEARCH_REVALIDATE_SECONDS, tags: ["search"] },
  });
}

export function getMovie(id: number): Promise<MovieDetails> {
  return apiFetch<MovieDetails>(`/movies/${id}`, {
    next: { revalidate: MOVIE_REVALIDATE_SECONDS, tags: ["movie"] },
  });
}

export function getMovieVideos(id: number): Promise<MovieVideo[]> {
  return apiFetch<MovieVideo[]>(`/movies/${id}/videos`, {
    next: { revalidate: MOVIE_REVALIDATE_SECONDS, tags: ["movie"] },
  });
}
