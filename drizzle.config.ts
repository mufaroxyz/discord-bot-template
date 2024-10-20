import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./packages/dbgate/src/migrations/",
    schema: "./packages/dbgate/src/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: Deno.env.get("DB_FILE_NAME")!,
    }
});