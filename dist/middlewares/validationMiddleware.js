"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const zod_1 = require("zod");
const exceptions_1 = require("../exceptions/exceptions");
function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`
                }));
                // return res.status(StatusCodes.BAD_REQUEST).json({error:errorMessages})
                throw new exceptions_1.BadRequestException(errorMessages);
            }
            throw new Error();
        }
    };
}
