import express from "express"
import validateRequest from "../../midelware/validateRequest"
import { CourseValidations } from "./course.validation"
import { CourseController } from "./course.controllers"

const Route = express.Router()


Route.post("/create-course", validateRequest(CourseValidations.createCourseValidationSchema), CourseController.createCourse)


export const CourseRoute = Route