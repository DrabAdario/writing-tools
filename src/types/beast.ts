import type { RarityTier } from "../bestiary/elementCatalog";

export interface Beast {
  id: string;
  element: string;
  animal: string;
  /** Mantle (element concept) tier — drives overlay theme. */
  rarity: RarityTier;
  /** Beast / body tier — weighted catalog. */
  animalRarity: RarityTier;
  seed: number;
  imageUrl: string;
  /** Solid portrait when no photo (mythic / fallback). */
  placeholderHex?: string;
  /** Unique lore for this beast (stored with the save). Mantle abilities are separate. */
  uniqueDescription: string;
}
