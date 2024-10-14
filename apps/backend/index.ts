import { Hono } from "hono";

import NotFoundError from "./errors/errors/not-found.error";
import { config } from "./config";
import api from "./api";
import successResponseMiddleware from "./utils/success-response-middleware";
import onError from "./utils/on-error";
import { LoggerService } from "@nova-bot/shared/services/logger";

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
