import { config } from "dotenv";
import type { Config } from "drizzle-kit";

config({ path: ".dev.vars" });

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
