import { SectionError } from "~/components/SectionError";
import { getMovieVideos } from "~/lib/api";
import { pickTrailer } from "~/lib/pick-trailer";
import type { MovieVideo } from "~/types/movie";

interface MovieTrailerProps {
  id: number;
}

export async function MovieTrailer({ id }: MovieTrailerProps) {
  let videos: MovieVideo[];
  try {
    videos = await getMovieVideos(id);
  } catch (error) {
    console.error("Failed to load movie videos", error);
    return (
      <SectionError
        title="Couldn't load the trailer"
        message="We couldn't load the trailer. Please try again."
      />
    );
  }

  const trailer = pickTrailer(videos);
  if (!trailer) {
    return <p className="text-sm text-muted">No trailer available.</p>;
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface">
      <iframe
        src={`https://www.youtube.com/embed/${encodeURIComponent(trailer.key)}`}
        title={`Trailer: ${trailer.name}`}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full w-full"
      />
    </div>
  );
}
