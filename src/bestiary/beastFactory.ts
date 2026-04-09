import type { RarityTier } from "./elementCatalog";
import { buildUniqueDescription } from "./animalLore";
import type { Beast } from "../types/beast";

export { buildUniqueDescription };

export function createBeastDraft(input: {
  element: string;
  animal: string;
  rarity: RarityTier;
  animalRarity: RarityTier;
  seed: number;
  imageUrl: string;
  placeholderHex?: string;
  id?: string;
}): Beast {
  const { element, animal, rarity, animalRarity, seed, imageUrl, placeholderHex, id } =
    input;
  return {
    id: id ?? crypto.randomUUID(),
    element,
    animal,
    rarity,
    animalRarity,
    seed,
    imageUrl,
    placeholderHex,
    uniqueDescription: buildUniqueDescription(element, animal, rarity, animalRarity),
  };
}
