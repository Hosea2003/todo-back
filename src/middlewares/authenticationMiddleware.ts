import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { encrypt } from "../utils/encryption";
import { getUserById } from "../services/user.services";
import { DecodedToken } from "../schema/user";
import { AppRequest } from "../schema/request";

export async function isAuthenticated(req:AppRequest, res:Response, next:NextFunction){
    // get headers
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message:"authorization header not set"
        })
    }
    // get the bearer token
    const token =authorization.split(" ")[1]
    if(!token){return res.status(StatusCodes.UNAUTHORIZED).json({
        message:"provide the access token"
        })
    }

    try{
        const userPayload = encrypt.verifyToken(token) as DecodedToken
        const user = await getUserById(userPayload._id)
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED)
        }
        req.user=user
        next()
    }
    catch{
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message:"invalid token"
        })
    }

}