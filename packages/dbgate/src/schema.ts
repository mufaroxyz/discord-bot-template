import { pgTable, text, json } from "drizzle-orm/pg-core";

export const dynamicConfig = pgTable("dynamic_config", {
    key: text().unique(),
    value: json()
})
