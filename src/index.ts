import express from "express"
import { userRouter } from "./controllers/userController"
import { db } from "./connection"

const app = express()
app.use(express.json())

// routers
app.use("/user", userRouter)

db.then(res=>{
    app.listen(5999, ()=>{
        console.log("server running on port 5999")
    })
})