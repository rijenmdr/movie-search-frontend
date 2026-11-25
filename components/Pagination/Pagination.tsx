import Link from "next/link";

interface PaginationProps {
  query: string;
  page: number;
  totalPages: number;
  totalResults: number;
}

function searchPageHref(query: string, page: number): string {
  const params = new URLSearchParams({ query, page: String(page) });
  return `/?${params}`;
}

export function Pagination({
  query,
  page,
  totalPages,
  totalResults,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Search result pages"
      className="flex items-center justify-center gap-2 sm:gap-4"
    >
      {page > 1 ? (
        <Link
          href={searchPageHref(query, page - 1)}
          rel="prev"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border px-3 py-2 text-sm text-foreground hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          Previous
        </Link>
      ) : (
        <span aria-hidden="true" className="flex min-h-11 min-w-11 items-center justify-center px-3 py-2 text-sm text-muted">
          Previous
        </span>
      )}
      <p className="text-center text-sm text-muted">
        Page {page} of {totalPages} · {totalResults} results
      </p>
      {page < totalPages ? (
        <Link
          href={searchPageHref(query, page + 1)}
          rel="next"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border px-3 py-2 text-sm text-foreground hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          Next
        </Link>
      ) : (
        <span aria-hidden="true" className="flex min-h-11 min-w-11 items-center justify-center px-3 py-2 text-sm text-muted">
          Next
        </span>
      )}
    </nav>
  );
}