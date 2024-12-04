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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = createProject;
exports.listProject = listProject;
exports.projectDetails = projectDetails;
exports.addTask = addTask;
const project_1 = __importDefault(require("../models/project"));
const task_1 = __importDefault(require("../models/task"));
const exceptions_1 = require("../exceptions/exceptions");
function createProject(project) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield project_1.default.create(project);
        }
        catch (_a) {
            return null;
        }
    });
}
function listProject(ownerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield project_1.default.find({ owner: ownerId }).populate("owner", "email name");
    });
}
function projectDetails(projectId, ownerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield project_1.default.findOne({
            _id: projectId,
            owner: ownerId
        })
            .select("+tasks").populate({
            path: "tasks"
        })
            .populate("owner", "email name");
    });
}
function addTask(projectId, ownerId, task) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdTask = yield task_1.default.create(task);
        const project = yield project_1.default.findOne({
            _id: projectId,
            owner: ownerId
        }).select("+tasks");
        if (!project) {
            throw new exceptions_1.NotFoundException("project not found");
        }
        project.tasks.push(createdTask);
        yield project.save();
        return createdTask;
    });
}
