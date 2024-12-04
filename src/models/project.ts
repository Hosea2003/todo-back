import { Document, model, models, Schema } from "mongoose";
import { IUser } from "./user";
import { ITask } from "./task";

export interface IProject extends Document{
    title:string;
    owner:IUser,
    tasks:ITask[]
}

const projectSchema = new Schema<IProject>({
    title:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true, "owner is required"]
    },
    tasks:[{type:Schema.Types.ObjectId, ref:"Task",select:false}]
})

export default model<IProject>("Project", projectSchema)