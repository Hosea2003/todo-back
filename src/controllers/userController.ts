import { Request, Response } from "express";
import { Router } from "express";   
import { validateData } from "../middlewares/validationMiddleware";
import { LoginBody, loginSchema, RegistrationBody, registrationSchema } from "../schema/user";
import { createUser, getUserByEmail } from "../services/user.services";
import { encrypt } from "../utils/encryption";
import { StatusCodes } from "http-status-codes";

export const userRouter = Router()

userRouter.post("/register", validateData(registrationSchema),
    async (req:Request<{}, {}, RegistrationBody>, res:Response)=>{
    const {email, password}=req.body
    const {data} = await createUser({email, password:encrypt.hashString(password)})
    const {accessToken, refreshToken}=encrypt.generatePairToken({_id:data?._id?.toString()})

    return res.status(StatusCodes.CREATED).json({
        accessToken, refreshToken, user:data
    })
})


userRouter.post("/login", validateData(loginSchema),
    async (req:Request<{}, {}, LoginBody>, res:Response)=>{
        const {email, password}=req.body
        const user = await getUserByEmail(email)
        if(!user || !encrypt.compareHashedString(password, user.password)){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message:"user with credentials not found"
            })
        }
        const {accessToken, refreshToken}=encrypt.generatePairToken({_id:user._id?.toString()})

        return res.json({
            accessToken, refreshToken, user
        })
    })