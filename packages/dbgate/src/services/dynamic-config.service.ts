import { eq } from "drizzle-orm";
import { db } from "../index.ts";
import { dynamicConfig } from "../schema.ts";
import { dynamicConfigSchema, type DynamicConfig } from "../schemas/dynamic-config.schema.ts";

export default class DynamicConfigService {
    public async getConfig(): Promise<DynamicConfig> {
        const configArray = await db.select().from(dynamicConfig);
        const configObject: DynamicConfig = configArray.reduce((acc, { key, value }) => {
            if (key !== null) {
                acc[key as keyof DynamicConfig] = value as DynamicConfig[keyof DynamicConfig];
            }
            return acc;
        }, {} as DynamicConfig);
        return dynamicConfigSchema.parse(configObject);
    }

    public async get<K extends keyof DynamicConfig>(key: K): Promise<DynamicConfig[K] | null> {
        const config = await db
            .select()
            .from(dynamicConfig)
            .where(eq(dynamicConfig.key, key));

        if (config.length === 0) {
            return null;
        }

        return config[0].value as DynamicConfig[K];
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

    public async updateConfig(config: DynamicConfig) {
        await db.transaction(async (trx) => {
            for (const key in config) {
                await trx
                    .update(dynamicConfig)
                    .set({
                        value: config[key as keyof DynamicConfig]
                    })
                    .where(eq(dynamicConfig.key, key));
            }
        });

        return this.getConfig();
    }

    public async ensureSchemaCompliance() {
        const configArray = await db.select().from(dynamicConfig);
        const configObject: DynamicConfig = configArray.reduce((acc, { key, value }) => {
            if (key !== null) {
                acc[key as keyof DynamicConfig] = value as DynamicConfig[keyof DynamicConfig];
            }
            return acc;
        }, {} as DynamicConfig);

        let parsed: DynamicConfig;

        try {
            parsed = dynamicConfigSchema.parse(configObject);
        } catch (_e) {
            parsed = dynamicConfigSchema.parse({});
            for (const key in parsed) {
                if (!Object.hasOwn(configObject, key)) {
                    await this.set(key as keyof DynamicConfig, parsed[key as keyof DynamicConfig]);
                }
            }
        }

        for (const key in parsed) {
            if (configObject[key as keyof DynamicConfig] !== parsed[key as keyof DynamicConfig]) {
                await this.set(key as keyof DynamicConfig, parsed[key as keyof DynamicConfig]);
            }
        }
    }
}