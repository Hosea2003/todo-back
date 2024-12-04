"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const DB_URL = process.env.DB_URL;
if (!DB_URL) {
    throw new Error("DB_URL must be set");
}
exports.db = mongoose_1.default.connect((DB_URL))
    .then(res => {
    if (res) {
        console.log("Db conected successfully");
    }
});
