import { z } from "zod";

const configSchema = z.object({})

export type Config = z.infer<typeof configSchema>;
export const config = configSchema.parse(process.env);