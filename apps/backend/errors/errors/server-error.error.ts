import { BaseError } from "../errors";
import { errorCodes } from "../errorsCodes";

export default class ServerError extends BaseError {
    public errorCode = errorCodes.SERVER_ERROR;
    public details = "";

    constructor() {
        super(500);

        Object.setPrototypeOf(this, ServerError.prototype);
    }
}