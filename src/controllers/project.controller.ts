import { Response, Router } from "express";
import { isAuthenticated } from "../middlewares/authenticationMiddleware";
import { AppRequest } from "../schema/request";
import { validateData } from "../middlewares/validationMiddleware";
import { createProjectSchema, ProjectBody } from "../schema/project";
import { createProject, listProject } from "../services/project.service";
import { StatusCodes } from "http-status-codes";

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