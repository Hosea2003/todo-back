"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const http_status_codes_1 = require("http-status-codes");
const encryption_1 = require("../utils/encryption");
const user_services_1 = require("../services/user.services");
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // get headers
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: "authorization header not set"
            });
        }
        // get the bearer token
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: "provide the access token"
            });
        }
        try {
            const userPayload = encryption_1.encrypt.verifyToken(token);
            const user = yield (0, user_services_1.getUserById)(userPayload._id);
            if (!user) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            req.user = user;
            next();
        }
        catch (_a) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: "invalid token"
            });
        }
    });
}
