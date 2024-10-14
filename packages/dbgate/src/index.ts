
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { config } from "./config";
import { LoggerService } from "@discord-bot/shared/services/logger";
import { db } from "./db";

const logger = new LoggerService("dbgate");

try {
    logger.info("Applying migrations...");
    migrate(db, { migrationsFolder: `${__dirname}/migrations` })
} catch (e) {
    if (e instanceof Error) {
        if (e.message.includes("CREATE TABLE")) {
            logger.warn("Table already exists, skipping migration");
        }
    } else {
        logger.error("Error applying migrations", e);
    }
}

export { db, logger };