import { Request } from "express";
import { IUser } from "../models/user";
import { HydratedDocument } from "mongoose";
import * as core from "express-serve-static-core";

export interface AppRequest<
    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>
    > extends Request{
    user?:HydratedDocument<IUser>
}