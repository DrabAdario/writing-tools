/**
 * Unique lore paragraphs per beast type. Mantle name is woven into each body;
 * rarity adds a short closing beat (mantle weight + beast presence).
 */

import { ALL_ANIMAL_NAMES } from "./animalCatalog";
import type { RarityTier } from "./elementCatalog";

function mantleClosing(r: RarityTier): string {
  switch (r) {
    case "epic":
      return "The mantle itself is named in oaths and left out of ledgers.";
    case "rare":
      return "Whispers tie that mantle to borders on the map.";
    case "uncommon":
      return "Trackers disagree which trail the mantle truly favors.";
    default:
      return "Tavern talk treats the mantle like half a joke—until it isn't.";
  }
}

function beastClosing(r: RarityTier): string {
  switch (r) {
    case "epic":
      return "The creature feels older than the roads that cross its range.";
    case "rare":
      return "Its kind rarely stays in one rumor for long.";
    case "uncommon":
      return "Locals read its habits better than passing strangers do.";
    default:
      return "A common shape—until the mantle turns the ordinary wrong.";
  }
}

type BodyFn = (element: string) => string;

const ANIMAL_LORE_BODY: Record<string, BodyFn> = {
  // —— common ——
  Hare: (el) =>
    `Twitch-grass runner, freeze-frame heart: the hare outran stories before the ${el.toLowerCase()} mantle settled on it like weather. Warrens remember paths that never made it onto parchment.`,
  Boar: (el) =>
    `Root-snouted and stubborn, the boar tears through understory as if the world owed it a straight line. The ${el.toLowerCase()} mantle rides its shoulders like heat off iron.`,
  Hound: (el) =>
    `Breath and leash-broken loyalty—the hound lives where scent becomes truth. With the ${el.toLowerCase()} mantle, every trail gains a second ending.`,
  Goat: (el) =>
    `Sure-footed blasphemer of cliffs, the goat laughs at fences and gravity in the same breath. The ${el.toLowerCase()} mantle turns that climb into doctrine.`,
  Bull: (el) =>
    `Low thunder between the ribs, the bull measures ground in what it refuses to yield. The ${el.toLowerCase()} mantle rings in its chest like a bell no hand struck.`,
  Sparrow: (el) =>
    `Small enough to be overlooked, loud enough to own a hedge— the sparrow stitches gossip into the air. The ${el.toLowerCase()} mantle threads through its wings like static.`,
  Toad: (el) =>
    `Patient as mud, sudden as hunger, the toad swallows distance in one gulp. The ${el.toLowerCase()} mantle beads on its skin like dew that never dries.`,
  Fox: (el) =>
    `Red whisper at the field edge, the fox trades straight answers for survival. The ${el.toLowerCase()} mantle makes its cleverness feel like prophecy.`,
  Badger: (el) =>
    `Tunnel-loyal and quarrelsome, the badger defends a few yards as if they were kingdoms. The ${el.toLowerCase()} mantle roots deeper than any deed.`,
  Beetle: (el) =>
    `Armored patience, horn and shell— the beetle carries sky on its back in miniature. The ${el.toLowerCase()} mantle hums in its joints like a secret engine.`,
  Cat: (el) =>
    `Soft-footed verdict, the cat approves or ignores on its own schedule. The ${el.toLowerCase()} mantle sits in its pupils like a second moon.`,
  Eel: (el) =>
    `Ribbon of voltage in murk, the eel writes curves only water reads. The ${el.toLowerCase()} mantle slides along its length like a live wire.`,
  Crab: (el) =>
    `Sideways philosopher of the tide line, the crab tests the world with pincers first. The ${el.toLowerCase()} mantle salts every step it takes.`,
  Spider: (el) =>
    `Silk architect of corners, the spider waits where patience becomes hunger. The ${el.toLowerCase()} mantle strings its web with meanings strangers walk into.`,
  Crow: (el) =>
    `Black jury on the branch, the crow collects shiny guilt and shiny hope alike. The ${el.toLowerCase()} mantle sharpens its caw into something like law.`,
  Hawk: (el) =>
    `Sun-high clarity, the hawk makes small things visible from impossible distance. The ${el.toLowerCase()} mantle draws a line between prey and parable.`,
  Lizard: (el) =>
    `Stone-colored patience, the lizard worships heat and stillness in equal measure. The ${el.toLowerCase()} mantle sheds old skins a little too eagerly.`,
  Tortoise: (el) =>
    `Carrying home on its back, the tortoise outlasts hurry by principle. The ${el.toLowerCase()} mantle ages slowly inside that shell, like wine in dark.`,
  Rat: (el) =>
    `Whiskered survivor of walls and wars, the rat knows which basements outlive crowns. The ${el.toLowerCase()} mantle turns scorn into a kind of map.`,
  Trout: (el) =>
    `Flash in cold water, the trout proves current is a kind of thought. The ${el.toLowerCase()} mantle ripples along its flanks like a second stream.`,
  Pigeon: (el) =>
    `Rooftop postman, the pigeon finds home when maps fail. The ${el.toLowerCase()} mantle marks every rooftop letter with weight.`,
  Mouse: (el) =>
    `Small enough to slip prophecy, the mouse listens through floorboards like a confession. The ${el.toLowerCase()} mantle makes its quiet enormous.`,
  Squirrel: (el) =>
    `Scatter-hoarder of futures, the squirrel buries tomorrow in bark and forgets on purpose. The ${el.toLowerCase()} mantle rustles in every hidden store.`,
  Chicken: (el) =>
    `Dust-bath philosopher, the chicken announces dawn whether the world agrees. The ${el.toLowerCase()} mantle clucks once and means more than it should.`,
  Pig: (el) =>
    `Root-turner, mud-saint, the pig finds value where others see filth. The ${el.toLowerCase()} mantle fattens meaning as well as flank.`,
  Sheep: (el) =>
    `Wool-soft consensus, the sheep moves when the flock moves—unless something breaks the spell. The ${el.toLowerCase()} mantle threads through that wool like rumor.`,
  Donkey: (el) =>
    `Long-eared refusal, the donkey knows which loads are not worth carrying. The ${el.toLowerCase()} mantle sits stubborn between its shoulder blades.`,
  Mule: (el) =>
    `Hybrid patience, the mule inherits stubbornness like a crown. The ${el.toLowerCase()} mantle tests every strap twice before it yields.`,
  Carp: (el) =>
    `Gold rumor in murky water, the carp turns circles into ambition. The ${el.toLowerCase()} mantle scales its sides like coins someone once blessed.`,
  Minnow: (el) =>
    `Silver flicker en masse, the minnow is safety in numbers until the numbers lie. The ${el.toLowerCase()} mantle schools its thoughts tighter than its body.`,
  Cricket: (el) =>
    `Chirp metronome of warm nights, the cricket measures silence and fills it. The ${el.toLowerCase()} mantle tunes its song to frequencies only believers hear.`,
  Moth: (el) =>
    `Ash-winged pilgrim to flame, the moth mistakes destruction for destiny on purpose. The ${el.toLowerCase()} mantle powders its wings with inconvenient truth.`,
  Butterfly: (el) =>
    `Pattern made of days, the butterfly wears change on its sleeves. The ${el.toLowerCase()} mantle rests on those wings like paint that refuses to dry.`,
  Newt: (el) =>
    `Small dragon of the ditch, the newt keeps poison polite and pretty. The ${el.toLowerCase()} mantle beads along its spine like wet jewels.`,
  Snail: (el) =>
    `Spiral home, the snail writes patience in slime across stone. The ${el.toLowerCase()} mantle thickens that trail into something like scripture.`,
  Slug: (el) =>
    `Soft insurgent of the garden, the slug dissolves certainty one leaf at a time. The ${el.toLowerCase()} mantle makes its slow invasion feel inevitable.`,
  Grasshopper: (el) =>
    `Leap and scrape, the grasshopper turns summer into percussion. The ${el.toLowerCase()} mantle lands between notes where hymns go wrong.`,
  Lobster: (el) =>
    `Armor and appetite at the bottom, the lobster negotiates with pressure. The ${el.toLowerCase()} mantle clicks in its claws like dice in a gambler's fist.`,
  Gopher: (el) =>
    `Earth-mover with dirt on its conscience, the gopher undermines fields from below. The ${el.toLowerCase()} mantle maps tunnels the surface pretends not to know.`,
  Gull: (el) =>
    `Sky-thief, cry of the harbor, the gull reads tides and trash with equal reverence. The ${el.toLowerCase()} mantle salts its cry until even laughter sounds like verdict.`,

  // —— uncommon ——
  Wolf: (el) =>
    `Pack math in muscle, the wolf teaches distance how to be afraid. The ${el.toLowerCase()} mantle runs with it—moon or no moon.`,
  Raven: (el) =>
    `Black grammarian of carrion, the raven jokes with omens until they answer. The ${el.toLowerCase()} mantle croaks in its throat like a second language.`,
  Serpent: (el) =>
    `Muscle written as a line, the serpent prefers corners and warm stone. The ${el.toLowerCase()} mantle sheds skins the world still thinks it owns.`,
  Stag: (el) =>
    `Crown of bone in the wood, the stag pauses like a decision made of antlers. The ${el.toLowerCase()} mantle deepens that pause until it feels like law.`,
  Owl: (el) =>
    `Feathered hinge between night and sense, the owl hears what silence hides. The ${el.toLowerCase()} mantle turns its stare into a kind of reading.`,
  Lynx: (el) =>
    `Tufted ghost of the treeline, the lynx measures snow in heartbeats. The ${el.toLowerCase()} mantle sharpens every print into a promise.`,
  Panther: (el) =>
    `Velvet engine in dark leaves, the panther makes stillness feel expensive. The ${el.toLowerCase()} mantle drinks light until only intent remains.`,
  Eagle: (el) =>
    `Sun-borne verdict, the eagle keeps altitude as a moral position. The ${el.toLowerCase()} mantle rings its cry like a bell through cloud.`,
  Mantis: (el) =>
    `Prayer with blades for hands, the mantis mistakes patience for holiness—then proves it. The ${el.toLowerCase()} mantle stills the air before the strike.`,
  Heron: (el) =>
    `Stilt-legged patience at the waterline, the heron translates ripples into meals. The ${el.toLowerCase()} mantle lengthens its neck toward meaning.`,
  Ram: (el) =>
    `Curve of argument in bone, the ram tests stone with skull and pride. The ${el.toLowerCase()} mantle echoes in that clash like prophecy.`,
  Rhino: (el) =>
    `Armored certainty, the rhino turns doubt into dust behind it. The ${el.toLowerCase()} mantle thickens hide into philosophy.`,
  Scorpion: (el) =>
    `Tail like punctuation at the end of a warning, the scorpion prefers shadows with exits. The ${el.toLowerCase()} mantle drips in its sting like ink.`,
  Wasp: (el) =>
    `Paper architect of pain, the wasp builds small empires under eaves. The ${el.toLowerCase()} mantle hums in its paper like a threat you can touch.`,
  Bat: (el) =>
    `Leather-winged question mark, the bat trusts echoes more than daylight. The ${el.toLowerCase()} mantle folds sound until maps become unnecessary.`,
  Stallion: (el) =>
    `Thunder with a mane, the stallion measures freedom in hooves and wind. The ${el.toLowerCase()} mantle rides its breath like a banner.`,
  Jackal: (el) =>
    `Laugh at the edge of the kill, the jackal survives on timing and teeth. The ${el.toLowerCase()} mantle makes its grin feel older than the meat.`,
  Salmon: (el) =>
    `Upstream argument with fate, the salmon spends its body on a direction. The ${el.toLowerCase()} mantle reddens its purpose beyond hunger.`,
  Moose: (el) =>
    `Forest ship with antlers for masts, the moose moves slow until it doesn't. The ${el.toLowerCase()} mantle creaks in its joints like ice deciding.`,
  Caribou: (el) =>
    `Migration written in hoofbeats, the caribou trusts grass that hasn't grown yet. The ${el.toLowerCase()} mantle drifts with it like weather with intent.`,
  Penguin: (el) =>
    `Tuxedoed comedian of cold, the penguin waddles dignity across ice. The ${el.toLowerCase()} mantle slides beneath that dignity like black water.`,
  Platypus: (el) =>
    `Joke the Creator forgot to undo, the platypus stitches fur to bill to venom and grins. The ${el.toLowerCase()} mantle loves that contradiction.`,
  Hyena: (el) =>
    `Laughter with teeth in it, the hyena eats order and calls it hygiene. The ${el.toLowerCase()} mantle turns its cackle into something like weather.`,
  Walrus: (el) =>
    `Mustache of the floe, the walrus hauls mass like philosophy hauls doubt. The ${el.toLowerCase()} mantle rests heavy on tusks meant for more than display.`,

  // —— rare ——
  Bear: (el) =>
    `Hunger with furniture, the bear owns valleys by sleeping in them. The ${el.toLowerCase()} mantle dreams inside that sleep and wakes with different hungers.`,
  Tiger: (el) =>
    `Stripe of verdict in bamboo, the tiger is absence that bites. The ${el.toLowerCase()} mantle stripes its breath until the jungle rewrites itself.`,
  Elephant: (el) =>
    `Memory walking on pillars, the elephant carries graves it never dug. The ${el.toLowerCase()} mantle rings in its bones like distant bells.`,
  Crocodile: (el) =>
    `Log that learns patience from epochs, the crocodile smiles with everything closed. The ${el.toLowerCase()} mantle slides through water like a second jaw.`,
  Gorilla: (el) =>
    `Gentle thunder behind the leaves, the gorilla teaches strength to be careful. The ${el.toLowerCase()} mantle knits its knuckles into something like covenant.`,
  Whale: (el) =>
    `Song in salt, the whale measures depth in loneliness and choir. The ${el.toLowerCase()} mantle vibrates along its flanks until coastlines feel it.`,
  Condor: (el) =>
    `Feathered eclipse on thermals, the condor makes small death visible from far away. The ${el.toLowerCase()} mantle widens that shadow into parable.`,
  Mammoth: (el) =>
    `Ice-age rumor returned, the mammoth drags winter behind it like a cloak. The ${el.toLowerCase()} mantle shivers in its hair like memory refusing thaw.`,
  Manta: (el) =>
    `Wing of night underwater, the manta glides where pressure becomes prayer. The ${el.toLowerCase()} mantle ripples its underside like a sky beneath sky.`,
  Komodo: (el) =>
    `Dragon that kept biology's receipt, the komodo waits until patience becomes poison. The ${el.toLowerCase()} mantle thickens that wait into legend.`,
  Swordfish: (el) =>
    `Spear with a fish attached, the swordfish writes speed in foam. The ${el.toLowerCase()} mantle hones that line until the sea argues back.`,
  Wolverine: (el) =>
    `Fury in a small package, the wolverine fights geography itself for room. The ${el.toLowerCase()} mantle bristles until borders apologize.`,
  Lion: (el) =>
    `Mane like sunlight in debt, the lion makes savannas feel judged. The ${el.toLowerCase()} mantle rests on that judgment like a crown no one borrowed.`,
  Hippo: (el) =>
    `River-mass with teeth for rules, the hippo owns water it doesn't even drink. The ${el.toLowerCase()} mantle churns beneath the surface like old kings.`,
  "Snow Leopard": (el) =>
    `Ghost on the ridgeline, the snow leopard leaves proof only in absence. The ${el.toLowerCase()} mantle powders its silence until mountains listen.`,
  Narwhal: (el) =>
    `Tusk like a question aimed at ice, the narwhal threads impossible narrows. The ${el.toLowerCase()} mantle spirals along that tusk like truth with a twist.`,
  "Great White": (el) =>
    `Patrol without malice, the great white edits the food chain in clean arcs. The ${el.toLowerCase()} mantle salts every circle it carves into blue.`,
  Orca: (el) =>
    `Black-and-white strategy in pod, the orca teaches the sea about family and slaughter. The ${el.toLowerCase()} mantle clicks through water like a second language.`,
  Anaconda: (el) =>
    `River muscle coiled in green, the anaconda measures time in constriction. The ${el.toLowerCase()} mantle slides along scales until breath becomes negotiation.`,
  Giraffe: (el) =>
    `Neck as ladder to leaves others abandon, the giraffe wears horizon on its shoulders. The ${el.toLowerCase()} mantle lengthens that horizon into myth.`,

  // —— epic (mythic) ——
  Kraken: (el) =>
    `Arms like drowned geography, the kraken rearranges harbors without asking. The ${el.toLowerCase()} mantle pulls tides into shapes cartographers refuse to file.`,
  Dragon: (el) =>
    `Hoard and furnace in one spine, the dragon keeps promises the way fire keeps wood. The ${el.toLowerCase()} mantle sleeps in its lungs like a second sun.`,
  Phoenix: (el) =>
    `Ash that refuses to be an ending, the phoenix rehearses death until it becomes craft. The ${el.toLowerCase()} mantle lights each return with a stranger color.`,
  Leviathan: (el) =>
    `Depth made muscle, the leviathan swallows distance and calls it quiet. The ${el.toLowerCase()} mantle presses on hulls like a thought too large for minds.`,
  Griffin: (el) =>
    `Beak and talon married to lion-weight, the griffin guards thresholds real and imagined. The ${el.toLowerCase()} mantle perches on that border like law with wings.`,
  Hydra: (el) =>
    `Argument that grows new throats, the hydra teaches heroes about second chances—cruelly. The ${el.toLowerCase()} mantle hisses from every neck at once.`,
  Chimera: (el) =>
    `Patchwork prophecy, the chimera wears species like borrowed coats. The ${el.toLowerCase()} mantle stitches those coats until identity becomes choir.`,
  Basilisk: (el) =>
    `Gaze that files life down to zero, the basilisk prefers stone to argument. The ${el.toLowerCase()} mantle hardens that stare into something like scripture.`,
  Roc: (el) =>
    `Feathered mountain in the sky, the roc carries elephants in its claws as casually as gossip. The ${el.toLowerCase()} mantle shadows the earth it crosses.`,
  Behemoth: (el) =>
    `Land made restless, the behemoth tests rivers like threads and finds them wanting. The ${el.toLowerCase()} mantle trembles in its ribs like continents arguing.`,
  Manticore: (el) =>
    `Smile full of needles, tail full of verdicts, the manticore prefers riddles to meals. The ${el.toLowerCase()} mantle sweetens its voice until lies taste honest.`,
  Cerberus: (el) =>
    `Three-headed argument at the last door, the cerberus counts souls like coins it cannot spend. The ${el.toLowerCase()} mantle triples every oath spoken near it.`,
  Wyrm: (el) =>
    `Old serpent spelling, the wyrm prefers rings of ruin to crowns. The ${el.toLowerCase()} mantle coils through its scales like grammar older than speech.`,
  Sphinx: (el) =>
    `Riddle with a lion's patience, the sphinx waits until curiosity becomes debt. The ${el.toLowerCase()} mantle sits between its paws like an unpaid answer.`,
};

for (const name of ALL_ANIMAL_NAMES) {
  if (!ANIMAL_LORE_BODY[name]) {
    throw new Error(`animalLore: missing lore body for "${name}"`);
  }
}

function fallbackBody(animal: string, element: string): string {
  const a = animal.trim();
  const e = element.trim().toLowerCase();
  return `This ${a.toLowerCase()} carries the ${e} mantle like a second skin the world keeps misreading. Where it walks, older stories lean closer to listen.`;
}

export function buildUniqueDescription(
  element: string,
  animal: string,
  mantleRarity: RarityTier,
  animalRarity: RarityTier,
): string {
  const key = animal.trim();
  const bodyFn = ANIMAL_LORE_BODY[key];
  const body = bodyFn ? bodyFn(element) : fallbackBody(key, element);
  return `${body} ${mantleClosing(mantleRarity)} ${beastClosing(animalRarity)}`;
}
