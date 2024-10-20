import { Hono } from "hono";
import DynamicConfigService from "../../../packages/dbgate/src/services/dynamic-config.service.ts";
import routes from "./routes/routes.ts";
import restrictedRoutes from "./restricted/restricted-routes.ts";
import {logger} from "../../../packages/dbgate/src/index.ts";

export const dynamicConfigService = new DynamicConfigService();
logger.info("Ensuring dynamic config schema compliance...");
await dynamicConfigService.ensureSchemaCompliance();

const app = new Hono();

app.route("/", routes)
app.route("/restricted", restrictedRoutes)

export default app;