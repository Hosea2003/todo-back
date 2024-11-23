import { Request } from "express";
import { IUser } from "../models/user";
import { HydratedDocument } from "mongoose";

export interface AppRequest extends Request{
    user?:HydratedDocument<IUser>
}