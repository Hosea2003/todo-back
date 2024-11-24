import { IProject } from "../models/project";
import projectModel from "../models/project"

export async function createProject(project:Partial<IProject>){
    try{
        return await projectModel.create(project)
    }
    catch{
        return null
    }
}