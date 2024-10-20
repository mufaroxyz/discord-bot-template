import { Hono } from "hono";

import NotFoundError from "./errors/errors/not-found.error.ts";
import { config } from "./config/index.ts";
import api from "./api/index.ts";
import successResponseMiddleware from "./utils/success-response-middleware.ts";
import onError from "./utils/on-error.ts";
import { LoggerService } from "../../packages/shared/services/logger.ts";

export const logger = new LoggerService("API");
logger.info("Starting Backend Service");

const app = new Hono();
app.use("*", successResponseMiddleware)
app.onError(onError);

app.notFound(() => {
    throw new NotFoundError();
});
app.route("/api", api)

export default {
    port: +config.BACKEND_PORT || 3000,
    fetch: app.fetch
}
