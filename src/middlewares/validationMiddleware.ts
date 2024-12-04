import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";
import { BadRequestException } from "../exceptions/exceptions";

export function validateData(schema:z.ZodObject<any, any>){
    return (req:Request, res:Response, next:NextFunction)=>{
        try{
            schema.parse(req.body)
            next()
        }
        catch(error){
            if(error instanceof ZodError){
                const errorMessages = error.errors.map((issue:any)=>({
                    message:`${issue.path.join('.')} is ${issue.message}`
                }))
                // return res.status(StatusCodes.BAD_REQUEST).json({error:errorMessages})
                throw new BadRequestException(errorMessages);
            }
            throw new Error();
        }
    }
}