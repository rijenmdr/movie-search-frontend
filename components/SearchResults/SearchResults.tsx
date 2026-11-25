import { Pagination } from "~/components/Pagination";
import { SearchGrid } from "~/components/SearchGrid";
import { SectionError } from "~/components/SectionError";
import { searchMovies } from "~/lib/api";

interface SearchResultsProps {
  query: string;
  page: number;
}

export async function SearchResults({ query, page }: SearchResultsProps) {
  let searchResults: Awaited<ReturnType<typeof searchMovies>>;
  try {
    searchResults = await searchMovies(query, page);
  } catch (error) {
    console.error("Failed to search movies", error);
    return <SectionError />;
  }

  return (
    <>
      <p role="status" aria-live="polite" className="sr-only">
        {searchResults.totalResults === 1
          ? "1 search result"
          : `${searchResults.totalResults} search results`}{" "}
        found for {query}.
        {searchResults.totalPages > 1 &&
          ` Showing page ${searchResults.page} of ${searchResults.totalPages}.`}
      </p>
      <SearchGrid
        movies={searchResults.results}
        query={query}
        page={searchResults.page}
      />
      <Pagination
        query={query}
        page={searchResults.page}
        totalPages={searchResults.totalPages}
        totalResults={searchResults.totalResults}
      />
    </>
  );
}
