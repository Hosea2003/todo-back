import express from "express"
import { userRouter } from "./controllers/userController"
import { db } from "./connection"
import { projectRouter } from "./controllers/project.controller"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler"

const app = express()
app.use(express.json())
app.use(cors())

// routers
app.use("/user", userRouter)
app.use("/project", projectRouter)

// error handling
app.use(errorHandler)

db.then(res=>{
    app.listen(5999, ()=>{
        console.log("server running on port 5999")
    })
})