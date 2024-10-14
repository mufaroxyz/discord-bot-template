import { BaseError } from "../errors";
import { errorCodes } from "../errorsCodes";

export default class NotFoundError extends BaseError {
    public errorCode = errorCodes.NOT_FOUND;
    public details = "";

    constructor() {
        super(404);
    }
}