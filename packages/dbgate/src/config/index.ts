import { z } from "zod";

const configSchema = z.object({
    DB_FILE_NAME: z.string(),
});

export const config = configSchema.parse(Deno.env.toObject());