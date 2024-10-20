import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "./config/index.ts";

const db = drizzle(config.DB_FILE_NAME);

export { db }; 