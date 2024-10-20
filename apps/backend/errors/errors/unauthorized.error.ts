import { BaseError } from "../errors.ts";
import { errorCodes } from "../errorsCodes.ts";

export default class UnauthorizedError extends BaseError {
    public errorCode = errorCodes.UNAUTHORIZED;
    public details = "You are not authorized to access this resource";

    constructor() {
        super(401);
    }
}