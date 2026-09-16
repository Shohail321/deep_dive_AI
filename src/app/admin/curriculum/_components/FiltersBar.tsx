"use client";

import {
  Button,
  SearchInput,
  Select,
  type SelectOption,
} from "@/components/ui";
import type { ContentFilterValue, CoverageFilter } from "@/curriculum/graph";
import {
  DOMAIN_META,
  type AuthoringStatus,
  type Difficulty,
  type Domain,
} from "@/curriculum/metadata";

/** "all"/"any" are UI sentinels for "no filter" — `CoverageFilter` itself uses `undefined`. */
export type FilterState = {
  domain: Domain | "all";
  category: string | "all";
  difficulty: Difficulty | "all";
  status: AuthoringStatus | "all";
  lesson: ContentFilterValue;
  visualization: ContentFilterValue;
  quiz: ContentFilterValue;
  playground: ContentFilterValue;
  search: string;
};

export const EMPTY_FILTER_STATE: FilterState = {
  domain: "all",
  category: "all",
  difficulty: "all",
  status: "all",
  lesson: "any",
  visualization: "any",
  quiz: "any",
  playground: "any",
  search: "",
};

export function toCoverageFilter(state: FilterState): CoverageFilter {
  return {
    domain: state.domain === "all" ? undefined : state.domain,
    category: state.category === "all" ? undefined : state.category,
    difficulty: state.difficulty === "all" ? undefined : state.difficulty,
    status: state.status === "all" ? undefined : state.status,
    lesson: state.lesson,
    visualization: state.visualization,
    quiz: state.quiz,
    playground: state.playground,
    search: state.search,
  };
}

const difficultyOptions: SelectOption<Difficulty | "all">[] = [
  { value: "all", label: "All difficulties" },
  { value: "intro", label: "Intro" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const statusOptions: SelectOption<AuthoringStatus | "all">[] = [
  { value: "all", label: "All statuses" },
  { value: "planned", label: "Planned" },
  { value: "drafting", label: "Drafting" },
  { value: "review", label: "In review" },
  { value: "complete", label: "Complete" },
];

function contentOptions(label: string): SelectOption<ContentFilterValue>[] {
  return [
    { value: "any", label: `Any ${label}` },
    { value: "has", label: `Has ${label}` },
    { value: "missing", label: `Missing ${label}` },
  ];
}

export interface FiltersBarProps {
  state: FilterState;
  onChange: (next: FilterState) => void;
  domains: Domain[];
  categoriesForDomain: string[];
}

export function FiltersBar({
  state,
  onChange,
  domains,
  categoriesForDomain,
}: FiltersBarProps) {
  function set<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    if (key === "domain") {
      // A category from the previous domain rarely exists in the new one.
      onChange({
        ...state,
        domain: value as FilterState["domain"],
        category: "all",
      });
      return;
    }
    onChange({ ...state, [key]: value });
  }

  const domainOptions: SelectOption<Domain | "all">[] = [
    { value: "all", label: "All domains" },
    ...domains.map((domain) => ({
      value: domain,
      label: DOMAIN_META[domain].label,
    })),
  ];

  const categoryOptions: SelectOption<string>[] = [
    { value: "all", label: "All categories" },
    ...categoriesForDomain.map((category) => ({
      value: category,
      label: category,
    })),
  ];

  return (
    <fieldset className="border-border rounded-lg border p-4">
      <legend className="text-foreground-secondary px-1 text-xs font-medium">
        Filter and search
      </legend>

      <div className="mb-4">
        <SearchInput
          label="Search concepts"
          placeholder="Search by title or id"
          value={state.search}
          onValueChange={(value) => set("search", value)}
          showLabel
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Select
          label="Domain"
          value={state.domain}
          onValueChange={(value) => set("domain", value)}
          options={domainOptions}
          showLabel
        />
        <Select
          label="Category"
          value={state.category}
          onValueChange={(value) => set("category", value)}
          options={categoryOptions}
          showLabel
        />
        <Select
          label="Difficulty"
          value={state.difficulty}
          onValueChange={(value) => set("difficulty", value)}
          options={difficultyOptions}
          showLabel
        />
        <Select
          label="Content status"
          value={state.status}
          onValueChange={(value) => set("status", value)}
          options={statusOptions}
          showLabel
        />
        <Select
          label="Lesson status"
          value={state.lesson}
          onValueChange={(value) => set("lesson", value)}
          options={contentOptions("lesson")}
          showLabel
        />
        <Select
          label="Visualization status"
          value={state.visualization}
          onValueChange={(value) => set("visualization", value)}
          options={contentOptions("visualization")}
          showLabel
        />
        <Select
          label="Quiz status"
          value={state.quiz}
          onValueChange={(value) => set("quiz", value)}
          options={contentOptions("quiz")}
          showLabel
        />
        <Select
          label="Playground status"
          value={state.playground}
          onValueChange={(value) => set("playground", value)}
          options={contentOptions("playground")}
          showLabel
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(EMPTY_FILTER_STATE)}
        >
          Reset filters
        </Button>
      </div>
    </fieldset>
  );
}
