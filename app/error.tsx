"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main-content"
      className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-10"
    >
      <div role="alert" className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="text-sm text-muted">
          We couldn&apos;t reach the movie API. It might be slow, down, or
          unreachable right now.
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="min-h-11 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      >
        Try again
      </button>
    </main>
  );
}
