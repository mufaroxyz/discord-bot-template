import { defineConfig } from "npm:drizzle-kit";

export default defineConfig({
    out: "./src/migrations/",
    schema: "./src/schema.ts",
    dialect: "sqlite",
    dbCredentials: {
        url: Deno.env.get("DB_FILE_NAME")!,
    }
})