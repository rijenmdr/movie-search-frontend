import { handleError } from "~/lib/error-response";
import { parseMovieId } from "~/lib/parse-movie-id";
import { MOCK_ID } from "~/mocks/data/movie-details";
import { getMockMovieDetails } from "~/mocks/lib/movie-details";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const id = parseMovieId((await params).id);
  if (id === null) {
    return handleError(400, "Invalid request", "The 'id' must be a positive whole number.");
  }

  if (id === MOCK_ID.errorDetails) {
    return handleError(503, "Service unavailable", "The mock movie service is unavailable.");
  }

  const movie = getMockMovieDetails(id);
  if (!movie) {
    return handleError(404, "Not found", `Movie ${id} was not found.`);
  }

  return Response.json(movie);
}
