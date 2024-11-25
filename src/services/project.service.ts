import { ObjectId } from "mongoose";
import { IProject } from "../models/project";
import projectModel from "../models/project"
import { IUser } from "../models/user";

export async function createProject(project:Partial<IProject>){
    try{
        return await projectModel.create(project)
    }
    catch{
        return null
    }
}

export async function listProject(ownerId:ObjectId){
    return await projectModel.find({owner:ownerId}).populate<{owner:IUser}>("owner", "email name")
}