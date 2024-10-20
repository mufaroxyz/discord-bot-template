import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) =>
    c.json({
        message: "Hello, world!"
    })
)

export default app;