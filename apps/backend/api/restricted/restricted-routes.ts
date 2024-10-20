import { Hono } from 'hono';
import dynamicConfig from "./routes/dynamic-config.ts";

const app = new Hono();

app.route("/dynamicConfig", dynamicConfig)

app.get("/", (c) =>
    c.json({
        message: "Hello, world! (restricted)"
    }
));

export default app;