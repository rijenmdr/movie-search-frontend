import type { MovieVideo } from "~/types/movie";

export const MOCK_ID = {
  noVideos: 155, 
  errorVideos: 157336, 
  errorDetails: 603,
} as const;

export const DETAILS_EXTRAS = {
  runtime: 120,
  tagline: null,
  genres: [] as string[],
};

export const TRAILER: MovieVideo = {
  key: "YoHD9XEInc0",
  name: "Official Trailer",
  site: "YouTube",
  type: "Trailer",
};
