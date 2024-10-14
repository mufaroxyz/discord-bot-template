import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite"
import { config } from "./config";

const sqlite = new Database(config.DB_FILE_NAME);
const db = drizzle(sqlite);

export { db }; 