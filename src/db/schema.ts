import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  slug: text("slug"),
  email: text("email").notNull(),
  bio: text("bio"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  userId: text("user_id"),
  published: boolean("published"),
});

export const profiles = pgTable(
  "profile",
  {
    id: serial("id").primaryKey(),
    name: text("name"),
    bio: text("bio"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
  },
  (profile) => [uniqueIndex("profile_user_id_unique").on(profile.userId)],
);

export const favoritesGames = pgTable(
  "userFavorite",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    game: text("game"),
    gameId: text("gameId").notNull(),
    gameImg: text("gameImg"),
    formId: integer("formId")
      .notNull()
      .references(() => forms.id),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  },
  (favorite) => [
    uniqueIndex("userFavorite_userId_gameId_unique").on(
      favorite.userId,
      favorite.gameId,
    ),
  ],
);

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  favoritesGames: many(favoritesGames),
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  sessions: many(sessions),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export const formsRelations = relations(forms, ({ many }) => ({
  favoritesGames: many(favoritesGames),
}));

export const favoritesGamesRelations = relations(favoritesGames, ({ one }) => ({
  form: one(forms, {
    fields: [favoritesGames.formId],
    references: [forms.id],
  }),
  user: one(users, {
    fields: [favoritesGames.userId],
    references: [users.id],
  }),
}));
