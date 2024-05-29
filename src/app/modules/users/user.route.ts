import express from "express"
import { userController } from "./user.controller"
import validateRequest from "../../midelware/validateRequest"
import studentValidationSchema from "../student/student.validation "


const UserRoute = express.Router()

UserRoute.post("/create-student", validateRequest(studentValidationSchema), userController.studentCreate)

export default UserRoute
