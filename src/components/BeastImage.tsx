import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type LoadState = "loading" | "loaded" | "error";

type BeastImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  placeholderColor?: string;
  /** Shown centered on solid placeholder or empty portrait (no photo). */
  placeholderEmoji?: string;
  photoLoading?: boolean;
  overlay?: ReactNode;
};

export function BeastImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  placeholderColor,
  placeholderEmoji,
  photoLoading = false,
  overlay,
}: BeastImageProps) {
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    if (placeholderColor) {
      setState("loaded");
      return;
    }
    if (photoLoading) {
      setState("loading");
      return;
    }
    if (src.length > 0) {
      setState("loading");
    }
  }, [src, placeholderColor, photoLoading]);

  if (placeholderColor) {
    return (
      <div
        className={`relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-t-xl ${className}`}
        style={{ backgroundColor: placeholderColor }}
      >
        {placeholderEmoji != null && placeholderEmoji.length > 0 && (
          <span
            className="pointer-events-none select-none text-[clamp(3rem,18vw,5.5rem)] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
            aria-hidden
          >
            {placeholderEmoji}
          </span>
        )}
        {overlay != null && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end">
            {overlay}
          </div>
        )}
      </div>
    );
  }

  if (photoLoading) {
    return (
      <div
        className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-t-xl bg-zinc-900/80 ${className}`}
      >
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-zinc-950/90 text-zinc-300"
          aria-live="polite"
        >
          <div
            className="bestiary-spinner h-10 w-10 rounded-full border-2 border-zinc-600 border-t-violet-400"
            aria-hidden
          />
          <span className="text-sm font-medium tracking-wide">Finding photo…</span>
        </div>
        {overlay != null && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end opacity-50">
            {overlay}
          </div>
        )}
      </div>
    );
  }

  if (!src.length) {
    return (
      <div
        className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-t-xl bg-zinc-800 ${className}`}
      >
        {placeholderEmoji != null && placeholderEmoji.length > 0 ? (
          <span
            className="pointer-events-none select-none text-[clamp(3rem,18vw,5.5rem)] leading-none text-zinc-200"
            aria-hidden
          >
            {placeholderEmoji}
          </span>
        ) : (
          <span className="text-xs text-zinc-500">No portrait</span>
        )}
        {overlay != null && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end">
            {overlay}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-t-xl bg-zinc-900/80 ${className}`}
    >
      {state === "loading" && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-zinc-950/90 text-zinc-300"
          aria-live="polite"
        >
          <div
            className="bestiary-spinner h-10 w-10 rounded-full border-2 border-zinc-600 border-t-violet-400"
            aria-hidden
          />
          <span className="text-sm font-medium tracking-wide">Loading photo…</span>
        </div>
      )}

      {state === "error" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-zinc-950 p-4 text-center text-zinc-400">
          <span className="text-4xl" aria-hidden>
            ✦
          </span>
          <p className="text-sm">Could not load photo.</p>
          <p className="text-xs text-zinc-500">Check your connection.</p>
        </div>
      )}

      {state !== "error" && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setState("loaded")}
          onError={() => {
            setState("error");
            if (import.meta.env.DEV) {
              console.warn("[BeastImage] Image failed to load. Src:", src);
            }
          }}
          className={`relative z-0 h-full w-full object-cover transition-opacity duration-300 ${
            state === "loaded" ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}

      {overlay != null && state !== "error" && (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end">
          {overlay}
        </div>
      )}
    </div>
  );
}
