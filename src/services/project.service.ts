import { Types } from "mongoose";
import { IProject } from "../models/project";
import projectModel from "../models/project"
import taskModel from "../models/task";
import { IUser } from "../models/user";
import { ITask } from "../models/task";
import { NotFoundException } from "../exceptions/exceptions";

type ObjectId = Types.ObjectId

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

export async function projectDetails(projectId:ObjectId, ownerId:ObjectId){
    return await projectModel.findOne({
        _id:projectId,
        owner:ownerId
    })
        .select("+tasks").populate({
            path:"tasks"
        })
        .populate<{owner:IUser}>("owner", "email name")
}

export async function addTask(projectId:ObjectId, ownerId:ObjectId, task:Partial<ITask>){
    const createdTask = await taskModel.create(task)
    const project = await projectModel.findOne({
        _id:projectId,
        owner:ownerId
    }).select("+tasks")
    
    if(!project){
        throw new NotFoundException("project not found")
    }

    project.tasks.push(createdTask)
    await project.save()

    return createdTask;
}