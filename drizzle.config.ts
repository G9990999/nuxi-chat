/* eslint-disable @stylistic/comma-dangle */
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
//import type { Config } from "drizzle-kit"

export default defineConfig({
  dialect: "sqlite",
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  // driver: "better-sqlite", // or "op-sqlite"
  dbCredentials: {
    url: "./locale.db", // process.env.DATABASE_URL!
  },
})
