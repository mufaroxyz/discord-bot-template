import { Hono } from 'hono'
import { zValidator } from "@hono/zod-validator";
import {dynamicConfigService} from "../../index.ts";
import {dynamicConfigSchema} from "../../../../../packages/dbgate/src/schemas/dynamic-config.schema.ts";
import DynamicConfigUpdateFailError from "../../../errors/errors/dynamic-config-update-fail.error.ts";
import ServerError from "../../../errors/errors/server-error.error.ts";
import {logger} from "../../../index.ts";

const app = new Hono();

app.get("/", async (c) => {
    const config = await dynamicConfigService.getConfig();
    return c.json(config);
})

app.post("/", zValidator('json', dynamicConfigSchema), async (c) => {
    const data = c.req.valid('json');
    try {
        logger.info({
            message: "Updating config",
            obj: data
        });
        const updatedConfig = await dynamicConfigService.updateConfig(data);
        return c.json({
            message: "Config updated successfully",
            config: updatedConfig
        })
    } catch(e) {
        if (e instanceof Error) {
            throw new DynamicConfigUpdateFailError(e.toString());
        } else {
            throw new ServerError();
        }
    }
})

export default app;