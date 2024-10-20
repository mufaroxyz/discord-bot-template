import { Hono } from "hono";

import NotFoundError from "./errors/errors/not-found.error.ts";
import { config } from "./config/index.ts";
import api from "./api/index.ts";
import successResponseMiddleware from "./middlewares/success-response-middleware.ts";
import onError from "./utils/on-error.ts";
import { LoggerService } from "../../packages/shared/services/logger.ts";
import restrictedRouteMiddleware from "./middlewares/restricted-route.middleware.ts";

export const logger = new LoggerService("API");
logger.info("Starting Backend Service");

const app = new Hono();
app.use("/api/restricted/*", restrictedRouteMiddleware)
app.use("*", successResponseMiddleware)
app.onError(onError);

app.notFound(() => {
    throw new NotFoundError();
});
app.route("/api", api)
app.get("/", (c) => {
    return c.json({
        message: "Hello, world!"
    })
});

Deno.serve({ port: +config.BACKEND_PORT }, app.fetch);