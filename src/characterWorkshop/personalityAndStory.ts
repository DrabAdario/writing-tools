import type { FetchedName } from "./randomName";

const TEMPERAMENTS = [
  "measured and watchful",
  "quick to laugh, slow to trust",
  "intensely private but fiercely loyal",
  "restless, always scanning for the next problem",
  "soft-spoken until something crosses a line",
  "charm-first, steel underneath",
  "blunt, then unexpectedly gentle",
  "meticulous, with a streak of superstition",
];

const VIRTUES = [
  "keeps promises even when it hurts",
  "notices the person everyone else overlooks",
  "admits fault before anyone asks",
  "protects children and animals without thinking",
  "returns what was borrowed—plus interest in kindness",
  "documents everything; forgets nothing important",
  "stays calm when others spiral",
];

const FLAWS = [
  "sabotages closeness before it can disappoint",
  "confuses pride with principle",
  "runs toward danger to avoid stillness",
  "hoards secrets like currency",
  "mistakes control for safety",
  "apologizes too little—or far too much",
  "lets loyalty blind them to harm",
];

const DRIVES = [
  "earn a quiet life they do not believe they deserve",
  "prove a mentor wrong about their limits",
  "find someone who vanished without a trace",
  "pay a debt that can never fully clear",
  "build something that outlasts their name",
  "escape a reputation that follows like smoke",
  "learn the truth behind a sealed door",
];

const BONDS = [
  "a sibling who became a stranger",
  "a mentor who vanished mid-lesson",
  "a rival who understands them better than friends",
  "a place that only exists in memory",
  "a pet that saw them at their worst",
  "a community that welcomed them once—never twice",
  "a letter they reread until the ink blurred",
];

/** Invented settings only—no real-world geography. */
const ORIGINS = [
  "a river town that appears on no reliable map",
  "the long shadow of an older war",
  "a guild hall that took them in too young",
  "salt air and sharper promises",
  "high valleys where oaths outlast crowns",
  "border marches where law arrived late and left early",
  "the stalls and scandals of a market city",
  "a temple step they still climb in dreams",
  "ruins someone insisted were haunted for tax reasons",
  "a caravan's rhythm—always leaving, never quite gone",
  "an undercroft where candles never quite trusted the dark",
  "a forge-line family that measured love in sparks",
];

const FORMATIVE = [
  "a winter when the gates froze shut and rumor walked faster than truth",
  "being chosen for something they did not want",
  "a public humiliation they pretended to shrug off",
  "a kindness from a stranger that rewired them",
  "a lie that protected someone they loved",
  "a talent they hid because it made others uneasy",
  "a loss that arrived as a single sentence",
  "a festival night that ended in ash and vows",
  "a bargain spoken too quickly beside a sickbed",
];

const TENSIONS = [
  "They are one honest conversation away from unraveling—or healing.",
  "The next choice will cost them either safety or self-respect.",
  "Someone from the past is about to knock, uninvited.",
  "They are trusted for the wrong reasons.",
  "Their greatest skill is also their worst temptation.",
];

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(parts: string[]): number {
  const s = parts.join("|");
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)]!;
}

export function generateTraitsAndStory(name: FetchedName): {
  traits: {
    temperament: string;
    virtue: string;
    flaw: string;
    drive: string;
    bond: string;
  };
  backstory: string;
} {
  const seed = hashSeed([
    name.fullName,
    name.nationality,
    name.gender,
    String(Date.now()),
    crypto.randomUUID(),
  ]);
  const rng = mulberry32(seed);

  const traits = {
    temperament: pick(rng, TEMPERAMENTS),
    virtue: pick(rng, VIRTUES),
    flaw: pick(rng, FLAWS),
    drive: pick(rng, DRIVES),
    bond: pick(rng, BONDS),
  };

  const origin = pick(rng, ORIGINS);
  const formative = pick(rng, FORMATIVE);
  const tension = pick(rng, TENSIONS);

  const backstory = [
    `${name.fullName} was shaped by ${formative}, with roots in ${origin}. ` +
      `People read them as ${traits.temperament}; fewer see how they ${traits.virtue}. ` +
      `What most miss is the way they ${traits.flaw}.`,
    `What pulls them forward is the need to ${traits.drive}. ` +
      `The emotional anchor they cannot quite quit is ${traits.bond}.`,
    tension,
  ].join("\n\n");

  return { traits, backstory };
}
