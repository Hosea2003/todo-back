import { Document, model, Schema } from "mongoose";

export interface ITask extends Document{
    title:string;
    complete:boolean;
    dueDate:Date;
}

const taskSchema = new Schema<ITask>({
    title:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    dueDate: {
        type:Date
    }
})

export default model<ITask>("Task", taskSchema);