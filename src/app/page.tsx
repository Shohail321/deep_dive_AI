import { Container } from "@/components/layout";

export default function Home() {
  return (
    <Container
      as="main"
      className="flex flex-1 flex-col items-center justify-center gap-4 text-center"
    >
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Deep Dive AI
      </h1>
      <p className="text-foreground/70 max-w-md text-base leading-7 text-balance">
        An interactive visual learning platform for Artificial Intelligence,
        Machine Learning, and Deep Learning.
      </p>
    </Container>
  );
}
