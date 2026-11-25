import type { MovieVideo } from "~/types/movie";

/** Only YouTube videos can be embedded; prefer a real "Trailer" over other types. */
export function pickTrailer(videos: MovieVideo[]): MovieVideo | null {
  const youtube = videos.filter((video) => video.site === "YouTube");
  return youtube.find((video) => video.type === "Trailer") ?? youtube[0] ?? null;
}
