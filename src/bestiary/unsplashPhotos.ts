import { normalizeAnimalKey, UNSPLASH_ANIMAL_QUERIES } from "./animalPhotoRegistry";

type UnsplashSearchResponse = {
  results?: Array<{
    urls?: { regular?: string; small?: string };
  }>;
};

/**
 * Fetches a relevant stock photo from Unsplash search (requires a free Access Key).
 * Uses the same seed to pick a stable index within the result page.
 */
export async function fetchUnsplashAnimalPhoto(
  animal: string,
  seed: number,
  accessKey: string,
  signal?: AbortSignal,
): Promise<string | null> {
  const key = normalizeAnimalKey(animal);
  const q =
    UNSPLASH_ANIMAL_QUERIES[key] ?? `${key.toLowerCase()} animal wildlife photography`;

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", q);
  url.searchParams.set("per_page", "30");
  url.searchParams.set("orientation", "squarish");

  const res = await fetch(url.toString(), {
    signal,
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as UnsplashSearchResponse;
  const results = data.results;
  if (!results?.length) return null;

  const pick = Math.abs(seed) % results.length;
  const raw = results[pick]?.urls?.regular ?? results[pick]?.urls?.small;
  if (!raw) return null;

  const u = new URL(raw);
  u.searchParams.set("w", "1024");
  u.searchParams.set("h", "1024");
  u.searchParams.set("fit", "crop");
  u.searchParams.set("auto", "format");
  return u.toString();
}
