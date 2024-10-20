import { drizzle } from "drizzle-orm/node-postgres";
import { createClient } from "@libsql/client"
import { config } from "./config/index.ts";

// console.log(config.DB_FILE_NAME);
const sqlite = createClient({url: './local.db' });
const db = drizzle(sqlite);

export { db }; 