import type { Context, Next } from "hono";

const successResponseMiddleware = async (c: Context, next: Next) => {
    await next();

    if (!c.res.body) {
        return;
    }

    const statusCode = c.res.status || 200;
    const path = c.req.path;
    const timestamp = new Date().toISOString();

    const response = {
        status: "success",
        statusCode,
        data: await c.res.json(),
        timestamp,
        path
    }

    c.res = undefined;
    c.res = new Response(JSON.stringify(response), {
        status: statusCode,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export default successResponseMiddleware;