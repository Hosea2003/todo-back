import { Document, model, models, Schema } from "mongoose";
import { IUser } from "./user";

export interface IProject extends Document{
    title:string;
    owner:IUser
}

const projectSchema = new Schema<IProject>({
    title:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:[true, "owner is required"]
    }
})

export default models.Project || model<IProject>("Project", projectSchema)