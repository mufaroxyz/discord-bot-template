import { z } from "zod";

const configSchema = z.object({
    LOG_PATH: z.string().default('./data/logs'),
})

export type Config = z.infer<typeof configSchema>;
export const config = configSchema.parse(Deno.env.toObject());