import { z } from "zod";

const configSchema = z.object({
    BACKEND_PORT: z.string(),
    API_KEY: z.string(),
});


export const config = configSchema.parse(Deno.env.toObject());