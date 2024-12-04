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
exports.userRouter = void 0;
const express_1 = require("express");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const user_1 = require("../schema/user");
const user_services_1 = require("../services/user.services");
const encryption_1 = require("../utils/encryption");
const http_status_codes_1 = require("http-status-codes");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/register", (0, validationMiddleware_1.validateData)(user_1.registrationSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    const { data } = yield (0, user_services_1.createUser)({ email, password: encryption_1.encrypt.hashString(password) });
    const { accessToken, refreshToken } = encryption_1.encrypt.generatePairToken({ _id: (_a = data === null || data === void 0 ? void 0 : data._id) === null || _a === void 0 ? void 0 : _a.toString() });
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({
        accessToken, refreshToken, user: data
    });
}));
exports.userRouter.post("/login", (0, validationMiddleware_1.validateData)(user_1.loginSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    const user = yield (0, user_services_1.getUserByEmail)(email);
    if (!user || !encryption_1.encrypt.compareHashedString(password, user.password)) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            message: "user with credentials not found"
        });
    }
    const { accessToken, refreshToken } = encryption_1.encrypt.generatePairToken({ _id: (_a = user._id) === null || _a === void 0 ? void 0 : _a.toString() });
    return res.json({
        accessToken, refreshToken, user
    });
}));
