import Link from "next/link";
import { Container } from "@/components/layout";

export default function NotFound() {
  return (
    <Container
      as="main"
      className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center"
    >
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-foreground/70 max-w-md text-base leading-7">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="border-foreground/20 hover:bg-foreground/10 rounded-full border px-5 py-2 text-sm font-medium transition-colors"
      >
        Back to home
      </Link>
    </Container>
  );
}
