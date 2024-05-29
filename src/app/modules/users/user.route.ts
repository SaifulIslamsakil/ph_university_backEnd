import express from "express"
import { userController } from "./user.controller"
import validateRequest from "../../midelware/validateRequest"
import studentValidationSchema from "../student/student.validation "


const userRoute = express.Router()

userRoute.post("/create-student", validateRequest(studentValidationSchema), userController.studentCreate)

export default userRoute
