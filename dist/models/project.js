"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "owner is required"]
    },
    tasks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Task", select: false }]
});
exports.default = (0, mongoose_1.model)("Project", projectSchema);
