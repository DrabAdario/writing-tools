/**
 * Element / concept types by rarity tier. Higher tiers roll less often.
 */

import { pickRandom } from "./constants";

export type RarityTier = "common" | "uncommon" | "rare" | "epic";

/** Percent chances (sum = 100): common most often, epic rarest. */
export const RARITY_CHANCE_PERCENT: Record<RarityTier, number> = {
  common: 46,
  uncommon: 28,
  rare: 18,
  epic: 8,
};

export const RARITY_ORDER: readonly RarityTier[] = ["common", "uncommon", "rare", "epic"];

export const RARITY_LABEL: Record<RarityTier, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
};

/** Cumulative thresholds for rolling [0, 100). */
const RARITY_THRESHOLDS: { max: number; tier: RarityTier }[] = (() => {
  let acc = 0;
  return RARITY_ORDER.map((tier) => {
    acc += RARITY_CHANCE_PERCENT[tier];
    return { max: acc, tier };
  });
})();
//
export const ELEMENTS_BY_RARITY: Record<RarityTier, readonly string[]> = {
  common: [
    "Flame",
    "Stone",
    "Frost",
    "Gale",
    "Sylvan",
    "Great",
    "Lesser",
    "Mossy",
    "Sand",
    "Earthen",
    "Crag",
    "Reef",
    "Hop",
    "Bark",
  ],
  uncommon: [
    "Ash",
    "Brine",
    "Vapor",
    "Static",
    "Cinder",
    "Ironbound",
    "Barbed",
    "Shimmer",
    "Crested",
    "Tundra",
    "Mire",
    "Petrified",
    "Venom-spit",
    "Storm-touched",
    "Thorn-hide",
    "Dread",
  ],
  rare: [
    "Solar",
    "Lunar",
    "Obsidian",
    "Glass",
    "Crystal",
    "Void",
    "Shadow",
    "Arcane",
    "Blighted",
    "Radiant",
    "Ivory",
    "Prismatic",
    "Runic",
    "Iron-bark",
    "Amber",
    "Mirror",
    "Chrono",
    "Timeless",
    "Phantom",
    "Ghost",
    "Gilded",
    "Molten",
  ],
  epic: [
    "Aether",
    "Elder",
    "Fabled",
    "Scourge",
    "Ethereal",
    "Reality-warped",
    "Abyssal",
    "Primordial",
    "Zenith",
    "Void-born",
    "Star-touched",
    "Omega",
    "Colossus",
  ],
};

/** Flat list of every element name (for validation / tools). */
export const ALL_ELEMENT_NAMES: readonly string[] = RARITY_ORDER.flatMap(
  (r) => ELEMENTS_BY_RARITY[r],
);

export function pickRarityTier(): RarityTier {
  const roll = Math.random() * 100;
  for (const { max, tier } of RARITY_THRESHOLDS) {
    if (roll < max) return tier;
  }
  return "epic";
}

export function pickWeightedElement(): { element: string; rarity: RarityTier } {
  const rarity = pickRarityTier();
  const pool = ELEMENTS_BY_RARITY[rarity];
  const element = pickRandom(pool);
  return { element, rarity };
}

export function isRarityTier(value: unknown): value is RarityTier {
  return (
    value === "common" ||
    value === "uncommon" ||
    value === "rare" ||
    value === "epic"
  );
}

/** Tier for a mantle name (manual forge / migration). */
export function inferMantleRarityFromName(element: string): RarityTier {
  const trim = element.trim();
  for (const tier of RARITY_ORDER) {
    if ((ELEMENTS_BY_RARITY[tier] as readonly string[]).includes(trim)) {
      return tier;
    }
  }
  return "common";
}
