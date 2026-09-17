"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import type { Concept } from "@/curriculum/metadata";
import { useMediaQuery } from "@/hooks";
import type { ProgressStore } from "@/progress";
import { ConceptPanel } from "./ConceptPanel";
import { HierarchicalExplorer } from "./HierarchicalExplorer";
import { KnowledgeMapCanvas } from "./KnowledgeMapCanvas";
import { SearchBar } from "./SearchBar";
import { useKnowledgeMapState } from "./useKnowledgeMapState";

export interface KnowledgeMapExplorerProps {
  concepts: Concept[];
  /** Absent today — see `nodeState.ts` on why that means everything is honestly `unexplored`. */
  progress?: ProgressStore;
}

/**
 * Owns the one piece of state the spatial map and the accessible
 * hierarchical list both read and write (`useKnowledgeMapState`), so a
 * search, an expansion, or a selection made in either view is exactly
 * reflected in the other — switching tabs never loses or duplicates state.
 */
export function KnowledgeMapExplorer({
  concepts,
  progress,
}: KnowledgeMapExplorerProps) {
  const state = useKnowledgeMapState(concepts, progress);
  const [view, setView] = useState<"map" | "list">("map");
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className="space-y-4">
      <SearchBar concepts={concepts} onSelect={state.revealAndSelect} />

      <Tabs
        value={view}
        onValueChange={(v) => setView(v as "map" | "list")}
        label="View"
      >
        <TabsList>
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        <TabsContent value="map">
          <KnowledgeMapCanvas state={state} focusedMode={isMobile} />
        </TabsContent>

        <TabsContent value="list">
          <div className="border-border max-h-[38rem] overflow-y-auto rounded-xl border p-4">
            <HierarchicalExplorer state={state} />
          </div>
        </TabsContent>
      </Tabs>

      {state.selected && (
        <ConceptPanel
          detail={state.selected}
          graph={state.graph}
          progress={progress}
          onClose={() => state.selectConcept(null)}
          onNavigate={state.revealAndSelect}
        />
      )}
    </div>
  );
}
