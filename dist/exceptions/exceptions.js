"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = exports.NotFoundException = exports.BadRequestException = exports.APIException = void 0;
const http_status_codes_1 = require("http-status-codes");
class APIException extends Error {
    constructor(statusCode, error) {
        super(error);
        this.statusCode = statusCode;
        this.error = error;
    }
}
exports.APIException = APIException;
class BadRequestException extends APIException {
    constructor(error) {
        super(http_status_codes_1.StatusCodes.BAD_REQUEST, error);
    }
}
exports.BadRequestException = BadRequestException;
class NotFoundException extends APIException {
    constructor(error) {
        super(http_status_codes_1.StatusCodes.NOT_FOUND, error);
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends APIException {
    constructor(error) {
        super(http_status_codes_1.StatusCodes.UNAUTHORIZED, error);
    }
}
exports.UnauthorizedException = UnauthorizedException;
