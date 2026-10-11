import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { favoritesGames, forms } from "@/db/schema";

function parseGameId(value: unknown): string | undefined {
  if (
    (typeof value === "number" && Number.isSafeInteger(value) && value > 0) ||
    (typeof value === "string" && /^[1-9]\d*$/.test(value))
  ) {
    return String(value);
  }
  return undefined;
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Sign in is required." }, { status: 401 });
  }

  const gameId = parseGameId(new URL(request.url).searchParams.get("gameId"));
  if (!gameId) {
    return Response.json(
      { error: "A valid gameId is required." },
      { status: 400 },
    );
  }

  try {
    const favorite = await db.query.favoritesGames.findFirst({
      columns: { gameId: true },
      where: and(
        eq(favoritesGames.userId, session.user.id),
        eq(favoritesGames.gameId, gameId),
      ),
    });

    return Response.json({ isFavorite: Boolean(favorite) });
  } catch (error) {
    console.error("Failed to load favorite status", error);
    return Response.json(
      { error: "Could not load favorite status." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Sign in is required." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    console.error("Invalid favorite request body", error);
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json(
      { error: "Invalid favorite request." },
      { status: 400 },
    );
  }

  const { gameId, favorited, name, image } = body as {
    gameId?: unknown;
    favorited?: unknown;
    name?: unknown;
    image?: unknown;
  };
  const parsedGameId = parseGameId(gameId);
  if (
    !parsedGameId ||
    typeof favorited !== "boolean" ||
    (name !== undefined && typeof name !== "string") ||
    (image !== undefined && typeof image !== "string")
  ) {
    return Response.json(
      { error: "Invalid favorite request." },
      { status: 400 },
    );
  }

  try {
    if (!favorited) {
      await db
        .delete(favoritesGames)
        .where(
          and(
            eq(favoritesGames.userId, session.user.id),
            eq(favoritesGames.gameId, parsedGameId),
          ),
        );
      return Response.json({ isFavorite: false });
    }

    const [form] = await db
      .insert(forms)
      .values({
        name: "Favorites",
        userId: session.user.id,
        published: false,
      })
      .onConflictDoNothing({
        target: [forms.userId, forms.name],
      })
      .returning({ id: forms.id });

    const favoriteForm =
      form ??
      (await db.query.forms.findFirst({
        columns: { id: true },
        where: and(
          eq(forms.userId, session.user.id),
          eq(forms.name, "Favorites"),
        ),
      }));

    if (!favoriteForm) {
      throw new Error("Could not create or find the user's Favorites form.");
    }

    await db
      .insert(favoritesGames)
      .values({
        userId: session.user.id,
        gameId: parsedGameId,
        game: typeof name === "string" ? name.slice(0, 500) : null,
        gameImg: typeof image === "string" ? image.slice(0, 2000) : null,
        formId: favoriteForm.id,
        createdAt: new Date(),
      })
      .onConflictDoNothing({
        target: [favoritesGames.userId, favoritesGames.gameId],
      });

    return Response.json({ isFavorite: true });
  } catch (error) {
    console.error("Failed to update favorite", error);
    return Response.json(
      { error: "Could not update favorite." },
      { status: 500 },
    );
  }
}
