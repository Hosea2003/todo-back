import { Response, Router } from "express";
import { isAuthenticated } from "../middlewares/authenticationMiddleware";
import { AppRequest } from "../schema/request";
import { validateData } from "../middlewares/validationMiddleware";
import { createProjectSchema, ProjectBody } from "../schema/project";
import { addTask, createProject, listProject, projectDetails } from "../services/project.service";
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import { createTaskSchema, TaskBody } from "../schema/task";

export const projectRouter = Router()

projectRouter.post("/create", isAuthenticated, validateData(createProjectSchema),
    async (req:AppRequest<{}, {}, ProjectBody>, res:Response)=>{
        const {title}=req.body
        const project = await createProject({title, owner:req.user})
        return res.status(StatusCodes.CREATED).json(project)
    }
)

projectRouter.get('/list', isAuthenticated,
    async (req:AppRequest, res:Response)=>{
        const projects = await listProject(req.user?.id)
        return res.json(projects)
    }
)

projectRouter.get("/:id", isAuthenticated,
    async (req:AppRequest, res:Response)=>{
        const {id}=req.params
        let objectId;
        try{
            objectId = Types.ObjectId.createFromHexString(id);
        }
        catch{
            return res.status(StatusCodes.BAD_REQUEST).json({"message":"project id invalid"})
        }
        const project = await projectDetails(objectId, req.user?.id)

        return res.json(project)
    }
)

projectRouter.post("/:id/addTask", isAuthenticated, validateData(createTaskSchema),
    async (req:AppRequest<{}, {}, TaskBody>, res:Response)=>{
        const {id}=req.params
        const projectId = Types.ObjectId.createFromHexString(id);
        const {title,dueDate} = req.body

        const createdTask = await addTask(projectId, req.user?.id, {title,dueDate})

        return res.status(StatusCodes.CREATED).json(createdTask)
    }
)