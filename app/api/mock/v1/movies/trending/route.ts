import { trendingMovies } from "~/mocks/data/movies";

export function GET() {
  return Response.json(trendingMovies);
}
