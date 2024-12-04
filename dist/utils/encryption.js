"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const saltRound = 8;
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
    throw new Error("You must set SECRET KEY");
}
class encrypt {
    static hashString(raw) {
        return bcrypt_1.default.hashSync(raw, saltRound);
    }
    static compareHashedString(rawString, hashedString) {
        return bcrypt_1.default.compareSync(rawString, hashedString);
    }
    static generateToken(data, expiresIn) {
        return jsonwebtoken_1.default.sign(data, SECRET_KEY, {
            expiresIn: expiresIn
        });
    }
    static generatePairToken(data) {
        const accessToken = this.generateToken(data, "8 hours");
        const refreshToken = this.generateToken(data, "2 days");
        return { accessToken, refreshToken };
    }
    static verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, SECRET_KEY);
    }
}
exports.encrypt = encrypt;
