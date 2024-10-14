import { sql } from "drizzle-orm";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import type { AutoResponseData } from "./types";
import { dynamicConfig } from "./schema";
import { logger } from ".";

export default async function seed(db: BunSQLiteDatabase) {
    logger.info("Seeding database");
    const defaultAutoResponse: AutoResponseData = [
        { trigger: "Hello", response: "World" }
    ]

    console.log(JSON.stringify(defaultAutoResponse));

    await db.insert(dynamicConfig).values({
        key: "auto_response",
        value: defaultAutoResponse
    }).onConflictDoNothing();

    const autoResponse = await db
        .select()
        .from(dynamicConfig)
        .where(sql`key = 'auto_response'`)

    logger.info({ obj: autoResponse });
    logger.info("Database seeded");
}