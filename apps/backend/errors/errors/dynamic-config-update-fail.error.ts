import { BaseError } from "../errors.ts";
import { errorCodes } from "../errorsCodes.ts";

export default class DynamicConfigUpdateFailError extends BaseError {
    public errorCode = errorCodes.DYNAMIC_CONFIG_UPDATE_FAIL;
    public details = "";

    constructor(additionalDetails: string) {
        super(500);
        this.details = additionalDetails;
    }
}