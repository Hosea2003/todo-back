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