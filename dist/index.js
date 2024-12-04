"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./controllers/userController");
const connection_1 = require("./connection");
const project_controller_1 = require("./controllers/project.controller");
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routers
app.use("/user", userController_1.userRouter);
app.use("/project", project_controller_1.projectRouter);
// error handling
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT;
connection_1.db.then(res => {
    app.listen(PORT || 5999, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
