"use client";

import Form from "next/form";
import { useState } from "react";

interface SearchBarProps {
  query?: string;
}

export function SearchBar({ query = "" }: SearchBarProps) {
  const [value, setValue] = useState(query);

  return (
    <Form role="search" action="/" className="flex w-full max-w-md items-end gap-2">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <label htmlFor="movie-search" className="text-sm font-medium text-foreground">
          Search for a movie
        </label>
        <input
          id="movie-search"
          type="search"
          name="query"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search for a movie…"
          className="min-h-11 w-full rounded-md border border-border bg-surface px-3 py-2 text-base text-foreground placeholder:text-muted focus-visible:border-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="min-h-11 min-w-24 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      >
        Search
      </button>
    </Form>
  );
}
