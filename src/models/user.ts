import { Document, model, Schema, models } from "mongoose";

export interface IUser extends Document{
    email:string;
    password:string
}

const userSchema = new Schema<IUser>({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:[6, "Password should be at least 6 characters"],
        select:false
    }
})

export default model<IUser>("User", userSchema)