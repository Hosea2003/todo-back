"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    }
});
exports.default = (0, mongoose_1.model)("Task", taskSchema);
