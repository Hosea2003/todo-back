import express from "express"
import { userRouter } from "./controllers/userController"
import { db } from "./connection"
import { projectRouter } from "./controllers/project.controller"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

// routers
app.use("/user", userRouter)
app.use("/project", projectRouter)

db.then(res=>{
    app.listen(5999, ()=>{
        console.log("server running on port 5999")
    })
})