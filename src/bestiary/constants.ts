export function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 1_000_000_000);
}
