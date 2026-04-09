/**
 * Creature types by rarity tier (beast / body). Uses same tier weights as mantle rolls.
 */

import { pickRandom } from "./constants";
import {
  pickRarityTier,
  RARITY_ORDER,
  type RarityTier,
} from "./elementCatalog";

export type { RarityTier };

export const ANIMALS_BY_RARITY: Record<RarityTier, readonly string[]> = {
  common: [
    "Hare",
    "Boar",
    "Hound",
    "Goat",
    "Bull",
    "Sparrow",
    "Toad",
    "Fox",
    "Badger",
    "Beetle",
    "Cat",
    "Eel",
    "Crab",
    "Spider",
    "Crow",
    "Hawk",
    "Lizard",
    "Tortoise",
    "Rat",
    "Trout",
    "Pigeon",
    "Mouse",
    "Squirrel",
    "Chicken",
    "Pig",
    "Sheep",
    "Donkey",
    "Mule",
    "Carp",
    "Minnow",
    "Cricket",
    "Moth",
    "Butterfly",
    "Newt",
    "Snail",
    "Slug",
    "Grasshopper",
    "Lobster",
    "Gopher",
    "Gull",
  ],
  uncommon: [
    "Wolf",
    "Raven",
    "Serpent",
    "Stag",
    "Owl",
    "Lynx",
    "Panther",
    "Eagle",
    "Mantis",
    "Heron",
    "Ram",
    "Rhino",
    "Scorpion",
    "Wasp",
    "Bat",
    "Stallion",
    "Jackal",
    "Salmon",
    "Moose",
    "Caribou",
    "Penguin",
    "Platypus",
    "Hyena",
    "Walrus",
  ],
  rare: [
    "Bear",
    "Tiger",
    "Elephant",
    "Crocodile",
    "Gorilla",
    "Whale",
    "Condor",
    "Mammoth",
    "Manta",
    "Komodo",
    "Swordfish",
    "Wolverine",
    "Lion",
    "Hippo",
    "Snow Leopard",
    "Narwhal",
    "Great White",
    "Orca",
    "Anaconda",
    "Giraffe",
  ],
  epic: [
    "Kraken",
    "Dragon",
    "Phoenix",
    "Leviathan",
    "Griffin",
    "Hydra",
    "Chimera",
    "Basilisk",
    "Roc",
    "Behemoth",
    "Manticore",
    "Cerberus",
    "Wyrm",
    "Sphinx",
  ],
};

export const ALL_ANIMAL_NAMES: readonly string[] = RARITY_ORDER.flatMap(
  (r) => ANIMALS_BY_RARITY[r],
);

export function pickWeightedAnimal(): {
  animal: string;
  animalRarity: RarityTier;
} {
  const animalRarity = pickRarityTier();
  const pool = ANIMALS_BY_RARITY[animalRarity];
  const animal = pickRandom(pool);
  return { animal, animalRarity };
}

/** Resolve tier for saved beasts missing `animalRarity`, or unknown legacy names. */
export function inferAnimalRarityFromName(animal: string): RarityTier {
  const trim = animal.trim();
  for (const tier of RARITY_ORDER) {
    if ((ANIMALS_BY_RARITY[tier] as readonly string[]).includes(trim)) {
      return tier;
    }
  }
  return "common";
}
