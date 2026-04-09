import type { ReactNode } from "react";
import type { Beast } from "../types/beast";
import { emojiForAnimal } from "../bestiary/animalEmoji";
import { getMantleAbilities } from "../bestiary/mantleAbilities";
import { RARITY_LABEL } from "../bestiary/elementCatalog";
import { getElementTheme } from "../bestiary/elementThemes";
import { BeastImage } from "./BeastImage";

type BeastCardProps = {
  beast: Beast;
  footer?: ReactNode;
  /** Live preview while Unsplash resolves (random / manual forge). */
  previewPhotoLoading?: boolean;
};

function mantleBadgeClass(rarity: Beast["rarity"]): string {
  switch (rarity) {
    case "common":
      return "border-violet-800/80 bg-violet-950/50 text-violet-300/95";
    case "uncommon":
      return "border-emerald-700/80 bg-emerald-950/50 text-emerald-300/95";
    case "rare":
      return "border-sky-600/80 bg-sky-950/50 text-sky-300/95";
    case "epic":
      return "border-amber-600/90 bg-amber-950/40 text-amber-200";
    default:
      return "border-zinc-600 bg-zinc-900/90 text-zinc-400";
  }
}

function beastBadgeClass(rarity: Beast["animalRarity"]): string {
  switch (rarity) {
    case "common":
      return "border-zinc-600 bg-zinc-900/90 text-zinc-400";
    case "uncommon":
      return "border-teal-700/80 bg-teal-950/50 text-teal-300/95";
    case "rare":
      return "border-rose-700/80 bg-rose-950/50 text-rose-300/95";
    case "epic":
      return "border-fuchsia-700/90 bg-fuchsia-950/40 text-fuchsia-200";
    default:
      return "border-zinc-600 bg-zinc-900/90 text-zinc-400";
  }
}

export function BeastCard({ beast, footer, previewPhotoLoading }: BeastCardProps) {
  const theme = getElementTheme(beast.element, beast.rarity);
  const accent = theme.cardAccent ?? "";

  const overlay = (
    <div
      className={`bg-gradient-to-t ${theme.overlayBackdrop} px-4 pb-5 pt-16`}
    >
      <p
        className={`text-center font-serif text-2xl font-semibold uppercase tracking-[0.2em] ${theme.overlayLabel}`}
      >
        {beast.element}
      </p>
      <p
        className={`mt-1 text-center text-xs font-medium uppercase tracking-widest opacity-90 ${theme.overlayLabel}`}
      >
        {beast.animal}
      </p>
    </div>
  );

  const portraitKey = `${beast.imageUrl}|${beast.placeholderHex ?? ""}|${beast.seed}`;

  const portraitEmoji =
    beast.placeholderHex ||
    (!beast.imageUrl?.length && !previewPhotoLoading)
      ? emojiForAnimal(beast.animal)
      : undefined;

  return (
    <article
      className={`flex max-w-sm flex-col overflow-hidden rounded-xl border-2 bg-zinc-950/90 ${theme.border} ${theme.shadow} shadow-lg ${accent}`}
    >
      <BeastImage
        key={portraitKey}
        src={beast.placeholderHex ? "" : beast.imageUrl}
        alt={`${beast.animal} portrait with ${beast.element} overlay`}
        className="rounded-none border-0"
        placeholderColor={beast.placeholderHex}
        placeholderEmoji={portraitEmoji}
        photoLoading={previewPhotoLoading}
        overlay={overlay}
      />

      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-serif text-xl font-semibold tracking-tight text-zinc-100">
            {beast.element} {beast.animal}
          </h3>
          <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
            <span
              title="Mantle (element) rarity"
              className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${mantleBadgeClass(beast.rarity)}`}
            >
              Mantle {RARITY_LABEL[beast.rarity]}
            </span>
            <span
              title="Beast rarity"
              className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${beastBadgeClass(beast.animalRarity)}`}
            >
              Beast {RARITY_LABEL[beast.animalRarity]}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Lore
            </h4>
            <p className="text-sm leading-relaxed text-zinc-400">{beast.uniqueDescription}</p>
          </div>
          <div>
            <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Mantle abilities
            </h4>
            <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-zinc-300 marker:text-zinc-600">
              {getMantleAbilities(beast.element).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        {footer}
      </div>
    </article>
  );
}
