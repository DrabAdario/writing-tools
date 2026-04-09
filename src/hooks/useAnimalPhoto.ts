import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { pickCuratedPhotoUrl } from "../bestiary/animalPhotoRegistry";
import {
  isEpicMythicAnimal,
  mythicPlaceholderHex,
  stablePlaceholderColor,
  WIKIMEDIA_ALLOWLIST,
} from "../bestiary/portraitResolver";
import { fetchUnsplashAnimalPhoto } from "../bestiary/unsplashPhotos";

export type AnimalPhotoSource =
  | "mythic"
  | "curated"
  | "unsplash"
  | "color"
  | "loading";

export function useAnimalPhoto(animal: string, seed: number) {
  const trimmed = animal.trim();
  const mythic = isEpicMythicAnimal(trimmed);
  const allow = WIKIMEDIA_ALLOWLIST.has(trimmed);

  const curatedUrl = useMemo(
    () => pickCuratedPhotoUrl(animal, seed),
    [animal, seed],
  );

  const hasUnsplashKey = Boolean(
    import.meta.env.VITE_UNSPLASH_ACCESS_KEY?.length,
  );

  const [unsplashUrl, setUnsplashUrl] = useState<string | null | undefined>(
    undefined,
  );

  useLayoutEffect(() => {
    setUnsplashUrl(undefined);
  }, [animal, seed]);

  useEffect(() => {
    if (mythic || !hasUnsplashKey) {
      setUnsplashUrl(null);
      return;
    }

    const ac = new AbortController();
    const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY!;

    fetchUnsplashAnimalPhoto(animal, seed, key, ac.signal)
      .then((url) => {
        if (!ac.signal.aborted) setUnsplashUrl(url ?? null);
      })
      .catch(() => {
        if (!ac.signal.aborted) setUnsplashUrl(null);
      });

    return () => ac.abort();
  }, [animal, seed, mythic, hasUnsplashKey]);

  return useMemo(() => {
    if (mythic) {
      return {
        imageUrl: "",
        placeholderHex: mythicPlaceholderHex(trimmed),
        source: "mythic" as const,
        photoLoading: false,
      };
    }

    if (allow) {
      const url = unsplashUrl ?? curatedUrl;
      return {
        imageUrl: url,
        placeholderHex: undefined,
        source: (unsplashUrl ? "unsplash" : "curated") as AnimalPhotoSource,
        photoLoading: false,
      };
    }

    if (hasUnsplashKey) {
      if (unsplashUrl === undefined) {
        return {
          imageUrl: "",
          placeholderHex: undefined,
          source: "loading" as const,
          photoLoading: true,
        };
      }
      if (unsplashUrl) {
        return {
          imageUrl: unsplashUrl,
          placeholderHex: undefined,
          source: "unsplash" as const,
          photoLoading: false,
        };
      }
      return {
        imageUrl: "",
        placeholderHex: stablePlaceholderColor(trimmed),
        source: "color" as const,
        photoLoading: false,
      };
    }

    return {
      imageUrl: "",
      placeholderHex: stablePlaceholderColor(trimmed),
      source: "color" as const,
      photoLoading: false,
    };
  }, [
    mythic,
    allow,
    hasUnsplashKey,
    trimmed,
    unsplashUrl,
    curatedUrl,
  ]);
}
