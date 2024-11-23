import { IUser } from "../models/user";
import UserModel from "../models/user"

export async function createUser(userData:Partial<IUser>){
    try{
        const result = await UserModel.create(userData)
        return {data:result, success:true}
    }
    catch(error){
        console.log(error)
        return {data:null, success:false}
    }
}

export async function getUserByEmail(email:string){
    try{
        const user = await UserModel.findOne({email:email})
        return user
    }
    catch{
        return null
    }
}

export async function getUserById(_id:string){
    try{
        return await UserModel.findById(_id)
    }
    catch{
        null
    }
}