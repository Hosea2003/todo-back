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
exports.projectRouter = void 0;
const express_1 = require("express");
const authenticationMiddleware_1 = require("../middlewares/authenticationMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const project_1 = require("../schema/project");
const project_service_1 = require("../services/project.service");
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const task_1 = require("../schema/task");
exports.projectRouter = (0, express_1.Router)();
exports.projectRouter.post("/create", authenticationMiddleware_1.isAuthenticated, (0, validationMiddleware_1.validateData)(project_1.createProjectSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const project = yield (0, project_service_1.createProject)({ title, owner: req.user });
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(project);
}));
exports.projectRouter.get('/list', authenticationMiddleware_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const projects = yield (0, project_service_1.listProject)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    return res.json(projects);
}));
exports.projectRouter.get("/:id", authenticationMiddleware_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    let objectId;
    try {
        objectId = mongoose_1.Types.ObjectId.createFromHexString(id);
    }
    catch (_b) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ "message": "project id invalid" });
    }
    const project = yield (0, project_service_1.projectDetails)(objectId, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    return res.json(project);
}));
exports.projectRouter.post("/:id/addTask", authenticationMiddleware_1.isAuthenticated, (0, validationMiddleware_1.validateData)(task_1.createTaskSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const projectId = mongoose_1.Types.ObjectId.createFromHexString(id);
    const { title, dueDate } = req.body;
    const createdTask = yield (0, project_service_1.addTask)(projectId, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, { title, dueDate });
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(createdTask);
}));
