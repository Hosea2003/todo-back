import { Request, Response } from "express";
import { Router } from "express";   
import { validateData } from "../middlewares/validationMiddleware";
import { RegistrationBody, registrationSchema } from "../schema/user";
import { createUser } from "../services/user.services";
import { encrypt } from "../utils/encryption";
import { StatusCodes } from "http-status-codes";

export const userRouter = Router()

userRouter.post("/register", validateData(registrationSchema),
    async (req:Request<{}, {}, RegistrationBody>, res:Response)=>{
    const {email, password}=req.body
    const {data} = await createUser({email, password:encrypt.hashString(password)})
    const {accessToken, refreshToken}=encrypt.generatePairToken({id:data?._id?.toString()})

    return res.status(StatusCodes.CREATED).json({
        accessToken, refreshToken, user:data
    })
})