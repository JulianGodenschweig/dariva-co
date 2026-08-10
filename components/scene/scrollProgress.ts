/**
 * The scroll value handed from the page to the scene.
 *
 * Deliberately a ref passed as a prop, NOT a module-level singleton.
 *
 * Scene.tsx is dynamically imported into its own chunk, and a module shared
 * between a static chunk and a lazy one can end up duplicated — each copy with
 * its own state. That happened here: the scale readout (written from the page
 * chunk) advanced through the acts while the particle field (reading the
 * scene chunk's copy) stayed frozen at zero. Passing the ref explicitly makes
 * the single shared instance a fact of the call graph rather than a hope
 * about how the bundler chose to split chunks.
 */
export type ScrollProgressRef = { current: number };
