"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface SectionErrorProps {
  title?: string;
  message?: string;
}

export function SectionError({
  title = "Something went wrong",
  message = "We couldn't load this section. Please try again.",
}: SectionErrorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-4 rounded-md border border-border bg-surface p-4"
    >
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted">{message}</p>
      </div>
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => router.refresh())}
        className="min-h-11 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 disabled:opacity-60"
      >
        {isPending ? "Retrying…" : "Try again"}
      </button>
    </div>
  );
}
