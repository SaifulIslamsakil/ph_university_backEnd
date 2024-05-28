import express from "express"
import { userController } from "./user.controller"

const userRoute = express.Router()

userRoute.post("/create-student", userController.studentCreate)

export default userRoute
