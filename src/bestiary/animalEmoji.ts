/**
 * Portrait emoji when no photo: one emoji per catalog creature where possible.
 * Epic mythics missing from the map use ⭐ (dedicated mythical fallback).
 */

import { ANIMALS_BY_RARITY } from "./animalCatalog";

const EPIC_SET = new Set(ANIMALS_BY_RARITY.epic as string[]);

/** When a mythic (epic-tier) name has no dedicated emoji in the map. */
export const MYTHIC_EMOJI_FALLBACK = "⭐";

/** When a non-epic name is missing from the map (legacy / typo). */
export const GENERIC_CREATURE_EMOJI = "🐾";

/**
 * Curated emoji per beast name. Epic mythics not listed here resolve to ⭐.
 */
const ANIMAL_EMOJI: Record<string, string> = {
  // common
  Hare: "🐰",
  Boar: "🐗",
  Hound: "🐕",
  Goat: "🐐",
  Bull: "🐂",
  Sparrow: "🐦",
  Toad: "🐸",
  Fox: "🦊",
  Badger: "🦡",
  Beetle: "🪲",
  Cat: "🐱",
  Eel: "🐟",
  Crab: "🦀",
  Spider: "🕷️",
  Crow: "🐦‍⬛",
  Hawk: "🦅",
  Lizard: "🦎",
  Tortoise: "🐢",
  Rat: "🐀",
  Trout: "🐟",
  Pigeon: "🐦",
  Mouse: "🐭",
  Squirrel: "🐿️",
  Chicken: "🐔",
  Pig: "🐷",
  Sheep: "🐑",
  Donkey: "🫏",
  Mule: "🫏",
  Carp: "🐟",
  Minnow: "🐟",
  Cricket: "🦗",
  Moth: "🦋",
  Butterfly: "🦋",
  Newt: "🦎",
  Snail: "🐌",
  Slug: "🐌",
  Grasshopper: "🦗",
  Lobster: "🦞",
  Gopher: "🐀",
  Gull: "🐦",
  // uncommon
  Wolf: "🐺",
  Raven: "🐦‍⬛",
  Serpent: "🐍",
  Stag: "🦌",
  Owl: "🦉",
  Lynx: "🐈",
  Panther: "🐆",
  Eagle: "🦅",
  Mantis: "🦗",
  Heron: "🪶",
  Ram: "🐏",
  Rhino: "🦏",
  Scorpion: "🦂",
  Wasp: "🐝",
  Bat: "🦇",
  Stallion: "🐴",
  Jackal: "🐕",
  Salmon: "🐟",
  Moose: "🫎",
  Caribou: "🦌",
  Penguin: "🐧",
  Platypus: "🦆",
  Hyena: "🐕",
  Walrus: "🦭",
  // rare
  Bear: "🐻",
  Tiger: "🐅",
  Elephant: "🐘",
  Crocodile: "🐊",
  Gorilla: "🦍",
  Whale: "🐋",
  Condor: "🦅",
  Mammoth: "🦣",
  Manta: "🐟",
  Komodo: "🦎",
  Swordfish: "🐟",
  Wolverine: "🦡",
  Lion: "🦁",
  Hippo: "🦛",
  "Snow Leopard": "🐆",
  Narwhal: "🐋",
  "Great White": "🦈",
  Orca: "🐋",
  Anaconda: "🐍",
  Giraffe: "🦒",
  // epic (mythic)
  Kraken: "🐙",
  Dragon: "🐉",
  Phoenix: "🔥",
  Leviathan: "🐋",
  Griffin: "🦅",
  Hydra: "🐍",
  Chimera: "🦁",
  Basilisk: "🐍",
  Roc: "🦅",
  Behemoth: "⭐",
  Manticore: "🦁",
  Cerberus: "🐕‍🦺",
  Wyrm: "🐉",
  Sphinx: "🦁",
};

export function emojiForAnimal(animal: string): string {
  const k = animal.trim();
  const mapped = ANIMAL_EMOJI[k];
  if (mapped) return mapped;
  if (EPIC_SET.has(k)) return MYTHIC_EMOJI_FALLBACK;
  return GENERIC_CREATURE_EMOJI;
}
