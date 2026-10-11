"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type FavoriteBtnProps = {
  id: number;
  name: string;
  image?: string;
};

function parseFavoriteResponse(value: unknown): boolean | undefined {
  if (
    typeof value === "object" &&
    value !== null &&
    "isFavorite" in value &&
    typeof value.isFavorite === "boolean"
  ) {
    return value.isFavorite;
  }
  return undefined;
}

export default function FavoriteBtn({ id, name, image }: FavoriteBtnProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [requiresSignIn, setRequiresSignIn] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();

    async function loadFavorite() {
      try {
        const response = await fetch(`/api/favorites?gameId=${id}`, {
          signal: controller.signal,
        });

        if (response.status === 401) {
          setRequiresSignIn(true);
          return;
        }
        if (!response.ok) {
          throw new Error("Could not load favorite status.");
        }

        const isFavorite = parseFavoriteResponse(await response.json());
        if (isFavorite === undefined) {
          throw new Error("Invalid favorite status response.");
        }
        setIsFavorite(isFavorite);
      } catch (loadError) {
        if (!controller.signal.aborted) {
          console.error("Failed to load favorite status", loadError);
          setError("Could not load favorite status.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadFavorite();
    return () => controller.abort();
  }, [id]);

  async function handleClick() {
    setIsSaving(true);
    setError(undefined);

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId: id,
          favorited: !isFavorite,
          name,
          image,
        }),
      });

      if (response.status === 401) {
        setRequiresSignIn(true);
        return;
      }
      if (!response.ok) {
        throw new Error("Could not update favorite.");
      }

      const updatedFavorite = parseFavoriteResponse(await response.json());
      if (updatedFavorite === undefined) {
        throw new Error("Invalid favorite update response.");
      }
      setIsFavorite(updatedFavorite);
    } catch (saveError) {
      console.error("Failed to update favorite", saveError);
      setError("Could not update favorite. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  const buttonClassName =
    "group flex shrink-0 items-center whitespace-nowrap rounded-md px-1 uppercase text-foreground ring-1 ring-foreground transition-colors duration-100 ease-in-out hover:bg-foreground hover:text-background disabled:cursor-wait disabled:opacity-60";

  if (requiresSignIn) {
    return (
      <Link href="/api/auth/signin" className={buttonClassName}>
        Sign in to favorite
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading || isSaving}
        aria-pressed={isFavorite}
        className={buttonClassName}
      >
        {isLoading
          ? "Checking..."
          : isSaving
            ? "Saving..."
            : isFavorite
              ? "In favorites"
              : "Add to favorites"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          viewBox="0 0 24 24"
          className="ml-1 size-4 fill-current text-foreground duration-100 group-hover:text-background"
        >
          <path d="M0 0h24v24H0V0z" style={{ fill: "none" }} />
          {isFavorite ? (
            <path
              stroke="none"
              d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
            />
          ) : (
            <path
              stroke="none"
              d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"
            />
          )}
        </svg>
      </button>
      {error && (
        <p role="alert" className="mt-1 text-xs normal-case text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
