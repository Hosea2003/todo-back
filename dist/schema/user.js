"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registrationSchema = void 0;
const zod_1 = require("zod");
exports.registrationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.loginSchema = exports.registrationSchema;
