import express from "express"
import { userRouter } from "./controllers/userController"
import { db } from "./connection"
import { projectRouter } from "./controllers/project.controller"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler"
import dotenv from 'dotenv' 

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

// routers
app.use("/user", userRouter)
app.use("/project", projectRouter)

// error handling
app.use(errorHandler)

const PORT = process.env.PORT

db.then(res=>{
    app.listen(PORT|| 5999, ()=>{
        console.log(`Server running on port ${PORT}`)
    })
})