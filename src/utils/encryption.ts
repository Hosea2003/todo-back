import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt, { Secret } from 'jsonwebtoken'

dotenv.config()

const saltRound=8

const SECRET_KEY=process.env.SECRET_KEY

if(!SECRET_KEY){
    throw new Error("You must set SECRET KEY")
}

export class encrypt{
    static hashString(raw:string){
        return bcrypt.hashSync(raw, saltRound)
    }
    static compareHashedString(rawString:string, hashedString:string){
        return bcrypt.compareSync(rawString, hashedString)
    }
    static generateToken(data:any,expiresIn:string){
        return jwt.sign(data, SECRET_KEY as Secret,{
            expiresIn:expiresIn
        })
    }
    static generatePairToken(data:any){
        const accessToken = this.generateToken(data, "8 hours")
        const refreshToken = this.generateToken(data, "2 days")

        return {accessToken, refreshToken}
    }
}