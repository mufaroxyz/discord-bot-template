import { z } from "zod";

const configSchema = z.object({
    BACKEND_PORT: z.string(),
});

export const config = configSchema.parse(process.env);