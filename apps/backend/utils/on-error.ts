import type { Context } from "hono";
import type { HTTPResponseError } from "hono/types";
import type { BaseError } from "../errors/errors.ts";
import { createErrorResponse } from "./error-response.ts";

const onError = async (err: Error | HTTPResponseError, c: Context) => {
    const path = c.req.path;

    if ("_tag" in err && err._tag === "BaseError") {
        const error = err as BaseError;
        const statusCode = error.status || 500;

        const response = createErrorResponse({
            statusCode,
            code: error.errorCode.code,
            message: error.errorCode.message,
            details: error.details || "An unexpected error occurred",
            path
        })

        return c.json(response, statusCode);
    }

    console.error(err);
    return c.json({
        status: "error",
        statusCode: 500,
        error: {
            code: 500,
            message: "Internal Server Error",
            timestamp: new Date().toISOString(),
            path
        }
    }, 500);
};

export default onError;