/**
 * A simulation is a pure function from parameters to a result. It must not
 * import React or touch the DOM — visualization components render a
 * simulation's output, they don't own its logic.
 */
export interface Simulation<TParams, TResult> {
  run: (params: TParams) => TResult;
}
