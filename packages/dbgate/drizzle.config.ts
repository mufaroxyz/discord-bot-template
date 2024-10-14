import { defineConfig } from "drizzle-kit";
import { config } from "./src/config";

export default defineConfig({
    out: "./src/migrations/",
    schema: "./src/schema.ts",
    dialect: "sqlite",
    dbCredentials: {
        url: "./database.sqlite"
    }
})