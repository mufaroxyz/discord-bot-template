import { Hono } from "hono";
import DynamicConfigService from "@discord-bot/dbgate/src/services/dynamic-config.service";

const dynamicConfig = new DynamicConfigService();
const app = new Hono();

app.get("/", (c) =>
    c.json({
        message: "Hello, world!"
    })
)

export default app;