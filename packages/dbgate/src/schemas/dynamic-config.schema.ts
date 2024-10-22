import { z } from "zod";

const dynamicConfigSchema = z.object({
    auto_response: z.array(z.object({
        trigger: z.string(),
        response: z.string()
    })).optional().default([]),
    tags: z.object({
        privilegedRoles: z.array(z.string()),
        data: z.record(z.object({
            response: z.string()
        }))
    }).optional().default({
        privilegedRoles: [],
        data: {}
    })
}).refine(obj => {
    if (!Array.isArray(obj.auto_response)) {
        return false;
    }

    return true;
})

type DynamicConfig = z.infer<typeof dynamicConfigSchema>;

export { dynamicConfigSchema };
export type { DynamicConfig };