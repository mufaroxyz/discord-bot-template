import { BaseError } from "../errors.ts";
import { errorCodes } from "../errorsCodes.ts";

export default class ServerError extends BaseError {
    public errorCode = errorCodes.SERVER_ERROR;
    public details = "";

    constructor() {
        super(500);

        Object.setPrototypeOf(this, ServerError.prototype);
    }
}