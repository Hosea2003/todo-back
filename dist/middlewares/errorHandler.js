"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const exceptions_1 = require("../exceptions/exceptions");
const errorHandler = (error, req, res, next) => {
    const statusCode = error instanceof exceptions_1.APIException ? error.statusCode : 500;
    const message = error instanceof exceptions_1.APIException ? error.error : "Internal server error";
    res.status(statusCode).json({
        error: message
    });
};
exports.errorHandler = errorHandler;
