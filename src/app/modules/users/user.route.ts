import express from "express"
import { userController } from "./user.controller"
import validateRequest from "../../midelware/validateRequest"
import studentValidationSchema from "../student/student.validation "
import { createFacultyValidationSchema } from "../faculty/faculty.validation"


const UserRoute = express.Router()

UserRoute.post("/create-student", validateRequest(studentValidationSchema), userController.studentCreate)

UserRoute.post("/create-faculty", validateRequest(createFacultyValidationSchema), userController.facultyCreate)

export default UserRoute
