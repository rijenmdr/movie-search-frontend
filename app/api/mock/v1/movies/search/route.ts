import { searchMovies } from "~/mocks/data/search-movies";
import { handleError } from "~/lib/error-response";
import { PAGE_SIZE } from "~/constants/generic";

const MAX_PAGE = 500;

export async function GET(request: Request): Promise<Response> {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get("query")?.trim() ?? "";

  const pageValue = searchParams.get("page") ?? "1";
  const page = /^\d+$/.test(pageValue) ? Number(pageValue) : NaN;
  if (!Number.isInteger(page) || page < 1 || page > MAX_PAGE) {
    return handleError(
      400,
      "Invalid request",
      `The 'page' parameter must be a whole number from 1 to ${MAX_PAGE}.`,
    );
  }

  const normalizedQuery = query.toLowerCase();

  if (normalizedQuery === "error") {
    return handleError(503, "Service unavailable", "The mock search service is unavailable.");
  }

  if (normalizedQuery === "slow") {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  const results = searchMovies.filter((movie) =>
          `${movie.title} ${movie.overview ?? ""}`.toLowerCase().includes(normalizedQuery),
        );
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;

  return Response.json({
    page,
    totalPages,
    totalResults,
    results: results.slice(start, start + PAGE_SIZE),
  });
}
