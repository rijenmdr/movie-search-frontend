import { handleError } from "~/lib/error-response";
import { parseMovieId } from "~/lib/parse-movie-id";
import { MOCK_ID } from "~/mocks/data/movie-details";
import {
  getMockMovieDetails,
  getMockMovieVideos,
} from "~/mocks/lib/movie-details";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const id = parseMovieId((await params).id);
  if (id === null) {
    return handleError(400, "Invalid request", "The 'id' must be a positive whole number.");
  }

  if (id === MOCK_ID.errorVideos) {
    return handleError(503, "Service unavailable", "The mock video service is unavailable.");
  }

  if (!getMockMovieDetails(id)) {
    return handleError(404, "Not found", `Movie ${id} was not found.`);
  }

  return Response.json(getMockMovieVideos(id));
}
