"use client";

import { useEffect } from "react";

/**
 * Root-layout error boundary. Only used when an error escapes the root
 * layout itself (rare — most errors are caught by error.tsx instead). Must
 * render its own <html>/<body> since it replaces the root layout.
 */
export default function GlobalError({
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
    <html lang="en" style={{ colorScheme: "dark" }}>
      <body
        style={{ background: "#050507", color: "#f5f5f7" }}
        className="flex min-h-full flex-col items-center justify-center gap-4 px-6 text-center"
      >
        <h1 className="text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="max-w-md text-base leading-7 opacity-70">
          The application hit an unrecoverable error.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
