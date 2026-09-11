"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout";

/**
 * Route-segment error boundary. Next.js renders this in place of the
 * segment that threw, keeping the rest of the layout (and navigation)
 * intact. Route segments that need bespoke recovery UI can add their own
 * error.tsx, which takes precedence over this one.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container
      as="main"
      className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center"
    >
      <h1 className="text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="text-foreground/70 max-w-md text-base leading-7">
        An unexpected error occurred while rendering this page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="border-foreground/20 hover:bg-foreground/10 rounded-full border px-5 py-2 text-sm font-medium transition-colors"
      >
        Try again
      </button>
    </Container>
  );
}
