import { Spinner } from "@/components/ui";
import { Container } from "@/components/layout";

/**
 * Route-segment loading convention: Next.js renders this automatically
 * while a segment (or its data) is loading. Nested routes with their own
 * async work should add a colocated loading.tsx that reuses <Spinner />
 * rather than inventing a new loading treatment.
 */
export default function Loading() {
  return (
    <Container
      as="main"
      className="flex flex-1 items-center justify-center py-24"
    >
      <Spinner />
    </Container>
  );
}
