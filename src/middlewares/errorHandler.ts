import { NextFunction, Request, Response } from "express";
import { APIException } from "../exceptions/exceptions";

export const errorHandler=(
    error:APIException | Error,
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const statusCode = error instanceof APIException ? error.statusCode : 500;
    const message = error instanceof APIException ? error.error:"Internal server error"

    res.status(statusCode).json({
        error:message
    })
}