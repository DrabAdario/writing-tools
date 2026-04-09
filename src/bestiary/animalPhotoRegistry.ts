/**
 * Species photos via Wikimedia Commons Special:FilePath. Pools use verified filenames;
 * semantic pools reuse a small SAFE set. Unsplash queries add variety when API key is set.
 */

import { ALL_ANIMAL_NAMES } from "./animalCatalog";

const WIDTH = 1024;

export function commonsFilePathUrl(filename: string): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${WIDTH}`;
}

/** Curated Commons files known to resolve. */
const SAFE_VERIFIED: readonly string[] = [
  "Canis_lupus_laying.jpg",
  "Canis_lupus_265b.jpg",
  "Corvus_corax_(FWS).jpg",
  "Corvus_corax_(NPS).jpg",
  "Grass_snake_(Natrix_natrix).jpg",
  "Grass_snake_(Natrix_natrix)_2.jpg",
  "Red_deer_stag.jpg",
  "Ursus_arctos_-_Norway.jpg",
  "Ursus_arctos_horribilis.jpg",
  "Great_Horned_Owl_in_Oregon.jpg",
  "Screeching_Great_Horned_Owl.jpg",
  "Lynx_lynx_1.jpg",
  "Lynx_lynx_poing.jpg",
  "Octopus2.jpg",
  "Octopus_vulgaris_2.jpg",
  "House_sparrow_male.jpg",
  "Felis_catus-cat_on_snow.jpg",
];

const P_WOLF = ["Canis_lupus_laying.jpg", "Canis_lupus_265b.jpg"] as const;
const P_RAVEN = ["Corvus_corax_(FWS).jpg", "Corvus_corax_(NPS).jpg"] as const;
const P_SNAKE = [
  "Grass_snake_(Natrix_natrix).jpg",
  "Grass_snake_(Natrix_natrix)_2.jpg",
] as const;
const P_STAG = ["Red_deer_stag.jpg"] as const;
const P_BEAR = ["Ursus_arctos_-_Norway.jpg", "Ursus_arctos_horribilis.jpg"] as const;
const P_OWL = [
  "Great_Horned_Owl_in_Oregon.jpg",
  "Screeching_Great_Horned_Owl.jpg",
] as const;
const P_LYNX = ["Lynx_lynx_1.jpg", "Lynx_lynx_poing.jpg"] as const;
const P_OCTOPUS = ["Octopus2.jpg", "Octopus_vulgaris_2.jpg"] as const;
const P_CAT = ["Felis_catus-cat_on_snow.jpg"] as const;
const P_BIRD = [
  "House_sparrow_male.jpg",
  "Corvus_corax_(FWS).jpg",
  "Corvus_corax_(NPS).jpg",
] as const;

/** Thematic overrides — filenames ⊆ SAFE_VERIFIED. */
const SEMANTIC_POOLS: Record<string, readonly string[]> = {
  Hare: P_LYNX,
  Boar: P_BEAR,
  Hound: P_WOLF,
  Goat: P_STAG,
  Bull: P_STAG,
  Sparrow: P_BIRD,
  Toad: P_SNAKE,
  Fox: P_LYNX,
  Badger: P_BEAR,
  Beetle: P_BIRD,
  Cat: P_CAT,
  Eel: P_OCTOPUS,
  Crab: P_OCTOPUS,
  Spider: P_SNAKE,
  Crow: P_RAVEN,
  Hawk: P_OWL,
  Lizard: P_SNAKE,
  Tortoise: P_SNAKE,
  Rat: P_CAT,
  Trout: P_OCTOPUS,
  Pigeon: P_BIRD,
  Mouse: P_CAT,
  Squirrel: P_CAT,
  Chicken: P_BIRD,
  Pig: P_STAG,
  Sheep: P_STAG,
  Donkey: P_STAG,
  Mule: P_STAG,
  Carp: P_OCTOPUS,
  Minnow: P_OCTOPUS,
  Cricket: P_BIRD,
  Moth: P_BIRD,
  Butterfly: P_BIRD,
  Newt: P_SNAKE,
  Snail: P_SNAKE,
  Slug: P_SNAKE,
  Grasshopper: P_BIRD,
  Lobster: P_OCTOPUS,
  Gopher: P_CAT,
  Gull: P_BIRD,

  Wolf: P_WOLF,
  Raven: P_RAVEN,
  Serpent: P_SNAKE,
  Stag: P_STAG,
  Owl: P_OWL,
  Lynx: P_LYNX,
  Panther: P_LYNX,
  Eagle: P_OWL,
  Mantis: P_BIRD,
  Heron: P_BIRD,
  Ram: P_STAG,
  Rhino: P_BEAR,
  Scorpion: P_SNAKE,
  Wasp: P_BIRD,
  Bat: P_OWL,
  Stallion: P_STAG,
  Jackal: P_WOLF,
  Salmon: P_OCTOPUS,
  Moose: P_STAG,
  Caribou: P_STAG,
  Penguin: P_BIRD,
  Platypus: P_OCTOPUS,
  Hyena: P_WOLF,
  Walrus: P_BEAR,

  Bear: P_BEAR,
  Tiger: P_LYNX,
  Elephant: P_BEAR,
  Crocodile: P_SNAKE,
  Gorilla: P_BEAR,
  Whale: P_OCTOPUS,
  Condor: P_OWL,
  Mammoth: P_BEAR,
  Manta: P_OCTOPUS,
  Komodo: P_SNAKE,
  Swordfish: P_OCTOPUS,
  Wolverine: P_LYNX,
  Lion: P_LYNX,
  Hippo: P_BEAR,
  "Snow Leopard": P_LYNX,
  Narwhal: P_OCTOPUS,
  "Great White": P_OCTOPUS,
  Orca: P_OCTOPUS,
  Anaconda: P_SNAKE,
  Giraffe: P_STAG,

  Kraken: P_OCTOPUS,
  Dragon: P_SNAKE,
  Phoenix: P_OWL,
  Leviathan: P_OCTOPUS,
  Griffin: P_OWL,
  Hydra: P_SNAKE,
  Chimera: P_LYNX,
  Basilisk: P_SNAKE,
  Roc: P_OWL,
  Behemoth: P_BEAR,
  Manticore: P_LYNX,
  Cerberus: P_WOLF,
  Wyrm: P_SNAKE,
  Sphinx: P_CAT,
};

export const WIKIMEDIA_ANIMAL_POOLS: Record<string, readonly string[]> =
  Object.fromEntries(
    ALL_ANIMAL_NAMES.map((name) => [
      name,
      SEMANTIC_POOLS[name] ?? SAFE_VERIFIED,
    ]),
  ) as Record<string, readonly string[]>;

/** Tighter search terms for Unsplash (optional API). */
export const UNSPLASH_ANIMAL_QUERIES: Record<string, string> = {
  Hare: "european hare wildlife",
  Boar: "wild boar wildlife",
  Hound: "hound dog wildlife",
  Goat: "goat farm wildlife",
  Bull: "bull cattle wildlife",
  Sparrow: "house sparrow bird",
  Toad: "common toad amphibian wildlife",
  Fox: "red fox wildlife",
  Badger: "european badger wildlife",
  Beetle: "beetle insect macro wildlife",
  Cat: "domestic cat wildlife",
  Eel: "eel fish underwater",
  Crab: "crab marine wildlife",
  Spider: "spider wildlife macro",
  Crow: "carrion crow bird wildlife",
  Hawk: "hawk bird of prey wildlife",
  Lizard: "lizard reptile wildlife",
  Tortoise: "tortoise reptile wildlife",
  Rat: "brown rat wildlife",
  Trout: "brown trout fish wildlife",
  Pigeon: "rock dove pigeon urban bird",
  Mouse: "house mouse wildlife",
  Squirrel: "red squirrel wildlife",
  Chicken: "chicken farm bird",
  Pig: "pig farm animal",
  Sheep: "sheep pasture wildlife",
  Donkey: "donkey wildlife",
  Mule: "mule horse wildlife",
  Carp: "carp fish freshwater",
  Minnow: "minnow fish freshwater",
  Cricket: "cricket insect macro",
  Moth: "moth insect macro wildlife",
  Butterfly: "butterfly insect wildlife",
  Newt: "newt amphibian wildlife",
  Snail: "snail macro wildlife",
  Slug: "slug wildlife",
  Grasshopper: "grasshopper insect wildlife",
  Lobster: "lobster marine wildlife",
  Gopher: "pocket gopher wildlife",
  Gull: "seagull bird wildlife",

  Wolf: "gray wolf wildlife photography",
  Raven: "common raven bird wildlife",
  Serpent: "grass snake wildlife reptile",
  Stag: "red deer stag wildlife",
  Owl: "great horned owl wildlife",
  Lynx: "eurasian lynx wildlife",
  Panther: "black panther wildlife",
  Eagle: "bald eagle wildlife",
  Mantis: "praying mantis insect wildlife",
  Heron: "grey heron bird wildlife",
  Ram: "mouflon ram wildlife",
  Rhino: "rhinoceros wildlife africa",
  Scorpion: "scorpion desert wildlife",
  Wasp: "wasp insect wildlife",
  Bat: "bat flying wildlife",
  Stallion: "horse stallion wildlife",
  Jackal: "golden jackal wildlife",
  Salmon: "salmon fish jumping river",
  Moose: "moose wildlife",
  Caribou: "caribou reindeer wildlife",
  Penguin: "penguin antarctica wildlife",
  Platypus: "platypus australia wildlife",
  Hyena: "spotted hyena wildlife",
  Walrus: "walrus arctic wildlife",

  Bear: "brown bear wildlife",
  Tiger: "tiger wildlife photography",
  Elephant: "african elephant wildlife",
  Crocodile: "crocodile wildlife",
  Gorilla: "mountain gorilla wildlife",
  Whale: "humpback whale ocean",
  Condor: "andean condor bird wildlife",
  Mammoth: "woolly mammoth museum model",
  Manta: "manta ray underwater",
  Komodo: "komodo dragon wildlife",
  Swordfish: "swordfish ocean fish",
  Wolverine: "wolverine animal wildlife",
  Lion: "lion wildlife africa",
  Hippo: "hippopotamus wildlife",
  "Snow Leopard": "snow leopard wildlife mountains",
  Narwhal: "narwhal arctic ocean",
  "Great White": "great white shark ocean",
  Orca: "orca killer whale ocean",
  Anaconda: "anaconda snake wildlife",
  Giraffe: "giraffe wildlife savanna",

  Kraken: "giant pacific octopus underwater wildlife",
  Dragon: "dragon fantasy creature art",
  Phoenix: "phoenix myth fantasy fire bird art",
  Leviathan: "whale storm ocean dramatic",
  Griffin: "griffin myth fantasy creature art",
  Hydra: "mythical hydra fantasy serpent art",
  Chimera: "chimera myth fantasy creature art",
  Basilisk: "lizard fantasy basilisk myth art",
  Roc: "giant eagle myth fantasy bird art",
  Behemoth: "elephant ancient myth fantasy art",
  Manticore: "manticore myth fantasy creature art",
  Cerberus: "cerberus myth fantasy dog art",
  Wyrm: "dragon wyrm fantasy myth art",
  Sphinx: "sphinx myth fantasy statue art",
};

export function normalizeAnimalKey(animal: string): string {
  const t = animal.trim();
  return t.length > 0 ? t : "Wolf";
}

export function pickCuratedPhotoUrl(animal: string, seed: number): string {
  const key = normalizeAnimalKey(animal);
  const pool = WIKIMEDIA_ANIMAL_POOLS[key] ?? SAFE_VERIFIED;
  const idx = Math.abs(seed) % pool.length;
  return commonsFilePathUrl(pool[idx]!);
}

export function normalizeStoredImageUrl(beast: {
  imageUrl: string;
  animal: string;
  seed: number;
}): string {
  const u = beast.imageUrl;
  if (u.includes("pollinations.ai") || u.includes("loremflickr.com")) {
    return pickCuratedPhotoUrl(beast.animal, beast.seed);
  }
  return u;
}
