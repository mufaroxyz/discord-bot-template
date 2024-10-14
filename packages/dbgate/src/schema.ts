import { blob, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const dynamicConfig = sqliteTable("dynamic_config", {
    key: text().unique(),
    value: blob({ mode: "json" })
})
