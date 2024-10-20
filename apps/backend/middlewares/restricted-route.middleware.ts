import type { Context, Next } from 'hono';
import UnauthroizedError from '../errors/errors/unauthorized.error.ts';

const apiKeyMiddleware = async (c: Context, next: Next) => {
    const apiKey = c.req.header('x-api-key');
    const validApiKey = Deno.env.get("API_KEY");

    if (!validApiKey) {
        return c.json({message: 'API key not set'}, 500);
    }

    if (!apiKey || apiKey !== validApiKey) {
        throw new UnauthroizedError();
    }

    await next();
};

export default apiKeyMiddleware;