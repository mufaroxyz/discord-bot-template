import { z } from "zod";

const configSchema = z.object({
    DISCORD_TOKEN: z.string().min(1, "DISCORD_TOKEN must not be empty"),
})

export type Config = z.infer<typeof configSchema>;
export const config = configSchema.parse(Deno.env.toObject());