export function DetailsSkeleton() {
  return (
    <>
      <p role="status" className="sr-only">
        Loading movie details
      </p>
      <div aria-hidden="true" className="flex flex-col gap-6 sm:flex-row">
        <div className="aspect-2/3 w-full max-w-64 animate-pulse rounded-lg bg-surface motion-reduce:animate-none" />
        <div className="flex flex-1 flex-col gap-3">
          <div className="h-8 w-2/3 animate-pulse rounded bg-surface motion-reduce:animate-none" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-surface motion-reduce:animate-none" />
          <div className="h-24 w-full animate-pulse rounded bg-surface motion-reduce:animate-none" />
        </div>
      </div>
    </>
  );
}

export function TrailerSkeleton() {
  return (
    <>
      <p role="status" className="sr-only">
        Loading trailer
      </p>
      <div
        aria-hidden="true"
        className="aspect-video w-full animate-pulse rounded-lg bg-surface motion-reduce:animate-none"
      />
    </>
  );
}
