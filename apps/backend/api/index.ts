import { Hono } from "hono";
import DynamicConfigService from "../../../packages/dbgate/src/services/dynamic-config.service.ts";

const dynamicConfig = new DynamicConfigService();
const app = new Hono();

app.get("/", (c) =>
    c.json({
        message: "Hello, world!"
    })
)

export default app;