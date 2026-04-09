/**
 * Mantle-granted abilities: each element defines what a bearer can do.
 * Unknown mantle names fall back to generic resonance lines.
 */

import { ALL_ELEMENT_NAMES } from "./elementCatalog";

export const DEFAULT_MANTLE_ABILITIES: readonly string[] = [
  "Sense currents of power tied to this mantle",
  "Channel the mantle's nature through instinct and will",
];

const M: Record<string, readonly string[]> = {
  // —— common ——
  Flame: [
    "Shape and feed open flame without being consumed",
    "Endure heat that would blister ordinary flesh",
    "Sense smoke, embers, and dry tinder nearby",
  ],
  Stone: [
    "Feel vibrations through rock and packed earth",
    "Harden skin or limbs like quarried stone",
    "Raise small shards or pebbles with a thought",
  ],
  Frost: [
    "Draw heat from air, water, or touch to form rime and ice",
    "Breathe easily in bitter cold and thin mountain air",
    "Walk frost without slipping; leave freezing footprints",
  ],
  Gale: [
    "Summon gusts and still pockets of air at will",
    "Leap farther and land lighter, as if wind catches you",
    "Redirect light missiles and smoke with sudden drafts",
  ],
  Sylvan: [
    "Read growth, rot, and season in leaves and soil",
    "Coax shoots, vines, or roots to twist toward your intent",
    "Move unseen along game trails and old paths",
  ],
  Great: [
    "Project overwhelming presence that bends weaker wills",
    "Bear weight and injury that would fell lesser beasts",
    "Claim space—foes hesitate before they strike",
  ],
  Lesser: [
    "Pass unnoticed when you choose not to be the story",
    "Slip through gaps and crowds others would block",
    "Turn small size and humility into advantage",
  ],
  Mossy: [
    "Draw moisture and patience from damp stone and rot",
    "Blend into lichen, bark, and misted hollows",
    "Cling and climb where handholds seem impossible",
  ],
  Sand: [
    "Shape dunes and grit like slow liquid",
    "Sense dehydration, heat shimmer, and buried things",
    "Raise stinging clouds or blinding curtains of dust",
  ],
  Earthen: [
    "Taste minerals and water tables through the soles",
    "Stabilize footing—hard to knock you fully down",
    "Open soft earth to bury or unearth in a hurry",
  ],
  Crag: [
    "Scale cliffs and broken stone as if born to the height",
    "Feel loose rock and avalanche before it falls",
    "Endure thin air and biting wind on high ridges",
  ],
  Reef: [
    "Breathe underwater as easily as in open air",
    "Sense currents, pressure, and life in salt water",
    "Understand and nudge water—eddies, surges, still pools",
    "Tolerate depth and cold that would crush others",
  ],
  Hop: [
    "Leap distances and heights that mock gravity's bill",
    "Land balanced on narrow or shifting footing",
    "Find luck at thresholds, crossings, and first steps",
  ],
  Bark: [
    "Harden skin like layered bark against cuts and flame",
    "Anchor to living wood—sense trees as kin",
    "Command burrowing insects and crawling things at need",
  ],
  // —— uncommon ——
  Ash: [
    "Rise from ruin—what burns leaves you changed, not ended",
    "Smother small flames and steal their breath",
    "See clearly through smoke, ash-fall, and grey haze",
  ],
  Brine: [
    "Thrive in salt, spray, and crushing depth",
    "Corrode metal and resolve with a touch of brine",
    "Read tides, reefs, and the moods of the sea",
  ],
  Vapor: [
    "Become mist and reform—edges blur, steps silent",
    "Thicken or banish fog; hide allies in humidity",
    "Scald or chill with invisible, clinging steam",
  ],
  Static: [
    "Store and release small lightning along skin or teeth",
    "Sense storms before the sky admits them",
    "Jolt metal, hearts, or nerves with a focused spark",
  ],
  Cinder: [
    "Leave smoldering trails that reignite when disturbed",
    "Walk ember beds and cooling slag unharmed",
    "Slow-burn harm—wounds worsen if ignored",
  ],
  Ironbound: [
    "Sense ore, forge-heat, and worked metal nearby",
    "Grip and hold with iron certainty; hard to break free",
    "Temper body like steel—fatigue comes slower",
  ],
  Barbed: [
    "Sprout spines or wire when struck or cornered",
    "Riposte with extra sting—attackers bleed easier",
    "Barb your words—insults and threats carry weight",
  ],
  Shimmer: [
    "Bend light—mirages, afterimages, false positions",
    "Dazzle eyes that rely on a single clear sightline",
    "Leave glittering decoys that confuse tracking",
  ],
  Crested: [
    "Project nobility and right-to-lead in posture alone",
    "Charge with focused momentum—foes break first",
    "Sense hierarchy—know who leads and who follows",
  ],
  Tundra: [
    "Summon biting wind and ground-frost in a wide radius",
    "Slow foes with cold sleep and numb limbs",
    "Walk ice and snow without sinking or cracking through",
  ],
  Mire: [
    "Turn solid ground to sucking mud under chosen feet",
    "Drag the struggling down—weight becomes drowning",
    "Hide in reeds and rot; breathe the stench without sickness",
  ],
  Petrified: [
    "Stand still as statue—breath and heartbeat nearly gone",
    "Resist gaze and curse that would fix or freeze flesh",
    "Chip stone from self to throw without lasting harm",
  ],
  "Venom-spit": [
    "Spit or weep toxins that burn, blind, or paralyze",
    "Sense poison in food, wounds, and veins",
    "Immune to lesser venoms that would drop others",
  ],
  "Storm-touched": [
    "Hear thunder before it arrives; taste ozone on the wind",
    "Call rain or sheet lightning in unstable air",
    "Ride gusts and stand in gales others cannot face",
  ],
  "Thorn-hide": [
    "Sprout brambles from skin when threatened",
    "Leave bleeding scratches on anything that grabs you",
    "Regrow barbs and thorns after they are torn away",
  ],
  Dread: [
    "Seed doubt and fear with a look or a word",
    "Weigh shadows so they feel like hands on throats",
    "Feed on panic—yours grows when others shrink",
  ],
  // —— rare ——
  Solar: [
    "Channel noon light into searing strikes or healing warmth",
    "Burn away undeath, mold, and clinging curse with sun",
    "See clearly in glare; never truly blinded by brightness",
  ],
  Lunar: [
    "Read phases—power waxes and wanes with the moon",
    "Pull tides of emotion and actual water in subtle ways",
    "Walk silver-lit paths invisible to sun-bound eyes",
  ],
  Obsidian: [
    "Cut truth and lies with glass-sharp clarity",
    "Shape volcanic glass into edges that never dull",
    "Reflect nothing—or everything—in black mirror skin",
  ],
  Glass: [
    "Turn briefly transparent or prismatic at will",
    "Refract beams and gazes; split one image into many",
    "Move faster but risk shatter—speed has a cost",
  ],
  Crystal: [
    "Focus power through facets—amplify or split effects",
    "Resonate with other crystals and structured magic",
    "See through distortion when intent is pure",
  ],
  Void: [
    "Open small pockets where nothing—not light—returns",
    "Silence sound and dampen magic in a tight sphere",
    "Feel hunger that pulls matter toward oblivion",
  ],
  Shadow: [
    "Merge with darkness; step from shade to shade",
    "Stretch and steal shadows to cloak allies",
    "See heat and life as dim outlines in total dark",
  ],
  Arcane: [
    "Weave raw mana into simple effects without formal spell",
    "Sense ley lines, wards, and active enchantment nearby",
    "Stabilize or disrupt rituals you can touch or see",
  ],
  Blighted: [
    "Spread rot and wither in living tissue and crop",
    "Corrupt healing—restoration curdles in your presence",
    "Thrive where life should not—plague is kin",
  ],
  Radiant: [
    "Heal with light that burns only corruption",
    "Banish shadow beings and curses tied to darkness",
    "Glow as beacon—ally morale, enemy aim",
  ],
  Ivory: [
    "Exude calm purity—lies feel filthy on your tongue",
    "Shape bone—yours or fallen—into tools and wards",
    "Sanctify space like quiet cathedral stone",
  ],
  Prismatic: [
    "Shift resonance through colors—each hue a different trick",
    "Split incoming energy across weak copies of many elements",
    "Dazzle with rainbow halos that confuse targeting",
  ],
  Runic: [
    "Sense carved or blood-drawn power before it triggers",
    "Inscribe temporary runes that hold one charge",
    "Break or bend wards by tracing opposing lines",
  ],
  "Iron-bark": [
    "Armor of living ironwood—heavy, nearly blade-proof",
    "Root in place—nearly impossible to drag you away",
    "Share vitality with ancient trees in line of sight",
  ],
  Amber: [
    "Trap a moment—small objects frozen in golden resin",
    "Preserve flesh, memory, or poison unchanged for ages",
    "Sense time trapped inside old amber and resin",
  ],
  Mirror: [
    "Reflect spells and strikes back at imperfect angles",
    "Copy an opponent's last motion once, imperfectly",
    "Become a double image—foes strike the wrong you",
  ],
  Chrono: [
    "Stutter time—a heartbeat out of sync to dodge",
    "Feel déjà vu when timelines nearly branch",
    "Sense hourglasses, bells, and counted moments",
  ],
  Timeless: [
    "Ignore small aging—wounds don't fester as they should",
    "Hold breath and thought in unnatural stillness",
    "Patience becomes armor—rush fails against you",
  ],
  Phantom: [
    "Flicker incorporeal—blows sometimes pass through",
    "Haunt a place—cold spots, whispers, dread",
    "Drain warmth with a touch like grave air",
  ],
  Ghost: [
    "Pass through thin barriers when you hold breath",
    "Ride objects—possess tools or corpses briefly",
    "Leave ectoplasm that chills and clings",
  ],
  Gilded: [
    "Lure greed—eyes catch on gold you wear or make",
    "Sense coin, contract, and debt in a room",
    "Turn small metal golden for a time—brittle after",
  ],
  Molten: [
    "Walk cooling lava and swim forge-spills",
    "Bleed heat—metal softens near your skin",
    "Melt barriers that cannot endure forge temperatures",
  ],
  // —— epic ——
  Aether: [
    "Breathe thin air and void-touched heights",
    "Levitate in faint lift—true flight's shy cousin",
    "Sense the fifth element threading between the four",
  ],
  Elder: [
    "Command beasts and spirits of lesser myth to hesitate",
    "Recall stories older than written word as living memory",
    "Speak and be heard as law among wild things",
  ],
  Fabled: [
    "Make narrative weight real—what is told shapes what is",
    "Twist expectation—heroes stumble, underdogs rise",
    "Exist slightly outside plain fact until belief fixes you",
  ],
  Scourge: [
    "Spread withering wind—crops, hope, and flesh alike",
    "Mark for ruin—marked things fail faster",
    "Immune to plague you carry; others are not",
  ],
  Ethereal: [
    "Slip toward the plane where matter is suggestion",
    "Starve physical needs while you linger half-there",
    "Touch minds and dreams easier than doors",
  ],
  "Reality-warped": [
    "Glitch space—short steps cover wrong distances",
    "Fork probability once—two outcomes, you pick after",
    "Ignore one law of physics at a time, briefly",
  ],
  Abyssal: [
    "Endure crushing pressure and absolute dark",
    "Sense tentacular vastness below thought",
    "Pull others toward a fall that has no end",
  ],
  Primordial: [
    "Touch raw creation—shape matter before names exist",
    "Ignore refined magic—older rules answer you first",
    "Exist as first draft of life—beautiful, wrong, huge",
  ],
  Zenith: [
    "Strike once at perfect moment—no second needed",
    "Stand at noon of your power; dusk waits for you",
    "Elevate one deed to legend in witnesses' minds",
  ],
  "Void-born": [
    "Erase small things from existence—not destroyed, unmade",
    "Speak in voice that carries no vibration",
    "Born of nothing—anchors slip, bindings fray",
  ],
  "Star-touched": [
    "Read omens in constellations and shooting stars",
    "Pull cold fire from above—meteoric sparks",
    "Navigate by stars even under cloud and canopy",
  ],
  Omega: [
    "End what you name—seals break, stories close",
    "Last stand—when all is lost, you peak once",
    "Final word carries weight no reply can lift",
  ],
  Colossus: [
    "Stride like earthquake—ground obeys your weight",
    "Tower in spirit; rooms feel too small",
    "Shrug off blows meant for fortresses, not beasts",
  ],
};

for (const name of ALL_ELEMENT_NAMES) {
  if (!M[name]) {
    throw new Error(`mantleAbilities: missing abilities for mantle "${name}"`);
  }
}

export function getMantleAbilities(element: string): readonly string[] {
  const k = element.trim();
  return M[k] ?? DEFAULT_MANTLE_ABILITIES;
}
