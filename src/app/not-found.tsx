import { Container } from "@/components/layout";
import { LinkButton } from "@/components/ui";

export default function NotFound() {
  return (
    <Container
      as="main"
      className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center"
    >
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-foreground-secondary max-w-md text-base leading-normal">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <LinkButton href="/" variant="secondary">
        Back to home
      </LinkButton>
    </Container>
  );
}
