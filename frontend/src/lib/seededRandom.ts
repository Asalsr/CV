/**
 * Deterministic pseudo-random number generator using a seed.
 * Returns the same value for the same seed on both server and client,
 * preventing React hydration mismatches.
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
