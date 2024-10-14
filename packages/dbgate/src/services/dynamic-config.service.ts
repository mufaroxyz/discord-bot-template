import { eq } from "drizzle-orm";
import { db } from "..";
import { dynamicConfig } from "../schema";
import { dynamicConfigSchema, type DynamicConfig } from "../schemas/dynamic-config.schema";

export default class DynamicConfigService {
    public async getConfig(): Promise<DynamicConfig> {
        const config = await db.select().from(dynamicConfig);
        const parsed = dynamicConfigSchema.parse(config);

        return parsed;
    }

    public async get(key: keyof DynamicConfig) {
        const config = await db
            .select()
            .from(dynamicConfig)
            .where(eq(dynamicConfig.key, key));
        const parsed = dynamicConfigSchema.parse(config);

        return parsed;
    }

    public async set<K extends keyof DynamicConfig>(key: K, value: DynamicConfig[K]) {
        const config = await db
            .select()
            .from(dynamicConfig)
            .where(eq(dynamicConfig.key, key));

        if (config.length === 0) {
            await db.insert(dynamicConfig).values({
                key,
                value
            });
        } else {
            await db.update(dynamicConfig).set({
                value
            }).where(eq(dynamicConfig.key, key));
        }
    }
}