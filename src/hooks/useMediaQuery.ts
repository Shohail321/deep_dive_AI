"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string) {
  return (callback: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener("change", callback);
    return () => list.removeEventListener("change", callback);
  };
}

/**
 * `useSyncExternalStore` rather than an effect that calls `setState`: the
 * query's answer is unavailable during SSR (no `window`), and a
 * false-then-true render on mount is exactly the case this hook exists for
 * without a hydration mismatch or a cascading render.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}
