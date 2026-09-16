import { Compass, MousePointerClick, Network } from "lucide-react";
import { Container } from "@/components/layout";
import { SPINE_DOMAINS, type Domain } from "@/curriculum/metadata";
import { Hero, type HeroDomain } from "./_components/Hero";

/**
 * Fixed, short hero copy rather than curriculum data: this is marketing
 * prose for three specific rings, not a lesson summary, and it needs to stay
 * exactly this short regardless of how any concept's summary is worded
 * elsewhere. The destination each ring links to is what actually reads from
 * the curriculum. Ring order still comes from `SPINE_DOMAINS`, the one place
 * the AI ⊃ ML ⊃ DL containment order is authored.
 */
const HERO_DESCRIPTIONS: Record<Domain, string | undefined> = {
  ai: "Machines performing tasks associated with intelligent behavior.",
  ml: "Systems learning patterns from data.",
  dl: "Machine learning using multi-layer neural networks.",
  math: undefined,
  data: undefined,
  genai: undefined,
  responsible: undefined,
  mlops: undefined,
  research: undefined,
};

const heroDomains: HeroDomain[] = SPINE_DOMAINS.flatMap((domain) => {
  const description = HERO_DESCRIPTIONS[domain];
  return description ? [{ domain, description }] : [];
});

const belowHero: { icon: typeof Compass; label: string }[] = [
  { icon: Compass, label: "Explore visually" },
  { icon: MousePointerClick, label: "Interact with concepts" },
  { icon: Network, label: "Build your knowledge map" },
];

export default function Home() {
  return (
    <Container as="main" className="flex flex-1 flex-col justify-center py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Deep Dive AI
        </h1>
        <p className="text-foreground-secondary mt-4 text-base leading-relaxed text-balance sm:text-lg">
          Artificial intelligence, machine learning, and deep learning are not
          three subjects side by side. Each one sits inside the last.
        </p>
      </header>

      <div className="mt-12 sm:mt-16">
        <Hero domains={heroDomains} />
      </div>

      <ul className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:mt-20">
        {belowHero.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="text-foreground-muted flex items-center gap-2 text-sm"
          >
            <Icon aria-hidden className="size-4" />
            {label}
          </li>
        ))}
      </ul>
    </Container>
  );
}
