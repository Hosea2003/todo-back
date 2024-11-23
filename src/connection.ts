import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const DB_URL = process.env.DB_URL

if(!DB_URL){
    throw new Error("DB_URL must be set")
}

export const db = mongoose.connect((DB_URL))
    .then(res=>{
        if(res){
            console.log("Db conected successfully")
        }
    })