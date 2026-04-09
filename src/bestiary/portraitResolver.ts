/**
 * Single source of truth for which beasts use photos vs solid placeholders.
 * Mythic epic creatures always use a flat color. A small allowlist uses Wikimedia when
 * no Unsplash key. Everyone else uses a stable HSL placeholder unless Unsplash returns a URL.
 */

import { ANIMALS_BY_RARITY } from "./animalCatalog";
import { pickCuratedPhotoUrl } from "./animalPhotoRegistry";

const EPIC_LIST = ANIMALS_BY_RARITY.epic as readonly string[];

/** Curated Wikimedia-only set (species-accurate pools) when Unsplash is unavailable. */
export const WIKIMEDIA_ALLOWLIST = new Set<string>([
  "Wolf",
  "Raven",
  "Serpent",
  "Stag",
  "Bear",
  "Owl",
  "Lynx",
  "Kraken",
]);

export function isEpicMythicAnimal(animal: string): boolean {
  return EPIC_LIST.includes(animal.trim());
}

const MYTHIC_HEX: Record<string, string> = Object.fromEntries(
  EPIC_LIST.map((name, i) => {
    const hue = (i * 26 + 180) % 360;
    return [name, `hsl(${hue} 38% 26%)`];
  }),
) as Record<string, string>;

export function mythicPlaceholderHex(animal: string): string {
  const k = animal.trim();
  return MYTHIC_HEX[k] ?? stablePlaceholderColor(k);
}

/** Deterministic muted color for non-photo beasts. */
export function stablePlaceholderColor(animal: string): string {
  let h = 2166136261;
  const s = animal.trim();
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const hue = Math.abs(h) % 360;
  const sat = 32 + (Math.abs(h >> 8) % 18);
  const light = 20 + (Math.abs(h >> 16) % 14);
  return `hsl(${hue} ${sat}% ${light}%)`;
}

/** Synchronous portrait for persistence / migration (no Unsplash). */
export function computePortraitSync(
  animal: string,
  seed: number,
): { imageUrl: string; placeholderHex?: string } {
  const k = animal.trim();
  if (isEpicMythicAnimal(k)) {
    return { imageUrl: "", placeholderHex: mythicPlaceholderHex(k) };
  }
  if (WIKIMEDIA_ALLOWLIST.has(k)) {
    return { imageUrl: pickCuratedPhotoUrl(animal, seed) };
  }
  return { imageUrl: "", placeholderHex: stablePlaceholderColor(k) };
}
