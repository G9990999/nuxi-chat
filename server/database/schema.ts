/* eslint-disable @stylistic/quotes */
/* eslint-disable @stylistic/comma-dangle */
import { sqliteTable as table } from "drizzle-orm/sqlite-core"
import * as t from "drizzle-orm/sqlite-core"
import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core"
import { sql, relations } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid"

export const users = table(
  "users",
  {
    id: t
      .text("id")
      .primaryKey({ autoIncrement: true })
      .$defaultFn(() => uuidv4()),
    email: t.text().notNull(),
    name: t.text().notNull(),
    avatar: t.text().notNull(),
    username: t.text().notNull(),
    providerId: t.int().notNull(),
    provider: t.text().$type<"github">().default("github"),
    createdAt: t
      .integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch() * 1000)`)
      .notNull(),
  },
  (table) => [
    t.uniqueIndex("users_provider_id_idx").on(table.provider, table.providerId),
  ],
)

export const usersRelations = relations(users, ({ many }) => ({
  chats: many(chats),
}))

/*
      //invitee: t.int().references((): AnySQLiteColumn => users.id),
    //role: t.text().$type<"guest" | "user" | "admin">().default("guest"),
    slug: t.text().$default(() => generateUniqueString(16)),

function generateUniqueString(length: number = 12): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueString += characters[randomIndex];
  }

  return uniqueString;
}
*/
export const chats = table(
  "chats",
  {
    id: t
      .text("id")
      .primaryKey({ autoIncrement: true })
      .$defaultFn(() => uuidv4()),
    title: t.text().notNull(),
    userId: t.int().notNull(),
    createdAt: t
      .integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch() * 1000)`)
      .notNull(),
  },
  (table) => [t.index("chat_user_id_idx").on(table.userId)],
)

export const chatsRelations = relations(chats, ({ one, many }) => ({
  user: one(users, {
    fields: [chats.userId],
    references: [users.id],
  }),
  messages: many(messages),
}))

export const messages = table(
  "messages",
  {
    id: t
      .text("id")
      .primaryKey({ autoIncrement: true })
      .$defaultFn(() => uuidv4()),
    parts: t
      .text("parts", { mode: "json" })
      .notNull()
      .$type<string[]>()
      .default(sql`(json_array())`),
    chatId: t.int().references((): AnySQLiteColumn => chats.id),
    role: t.text().$type<"user" | "assistant">().default("user"),
    createdAt: t
      .integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch() * 1000)`)
      .notNull(),
  },
  (table) => [t.uniqueIndex("messages_chat_id_idx").on(table.chatId)],
)

export const messagesRelations = relations(messages, ({ one }) => ({
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
  }),
}))
