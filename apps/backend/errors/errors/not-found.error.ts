import { BaseError } from "../errors.ts";
import { errorCodes } from "../errorsCodes.ts";

export default class NotFoundError extends BaseError {
    public errorCode = errorCodes.NOT_FOUND;
    public details = "";

    constructor() {
        super(404);
    }
}