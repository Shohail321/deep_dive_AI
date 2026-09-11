"use client";

import { RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { Container } from "@/components/layout";
import { Button, ErrorState } from "@/components/ui";

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
    <Container as="main" className="flex flex-1 flex-col justify-center py-24">
      <ErrorState
        title="Something went wrong"
        description="An unexpected error occurred while rendering this page."
        action={
          <Button
            variant="secondary"
            onClick={reset}
            leadingIcon={<RefreshCw />}
          >
            Try again
          </Button>
        }
        className="mx-auto w-full max-w-xl"
      />
    </Container>
  );
}
