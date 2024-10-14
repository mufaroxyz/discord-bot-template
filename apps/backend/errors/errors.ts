import { HTTPException } from "hono/http-exception"
import type { StatusCode } from "hono/utils/http-status";

export abstract class BaseError extends HTTPException {
    public _tag = "BaseError";
    abstract details?: string;
    abstract errorCode: ErrorCode;

    constructor(status: StatusCode) {
        super(status);
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}