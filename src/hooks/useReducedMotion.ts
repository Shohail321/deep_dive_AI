"use client";

import { useReducedMotion as useMotionReducedMotion } from "motion/react";

/**
 * Re-exported from `motion` so every animated component in the app reads
 * `prefers-reduced-motion` through one hook, rather than each component
 * querying `matchMedia` independently.
 */
export const useReducedMotion = useMotionReducedMotion;
