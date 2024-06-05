
import express from "express"
import { createFacultyValidationSchema, updateFacultyValidationSchema } from "./faculty.validation"
import { FacultyControllers } from "./faculty.controller"
import validateRequest from "../../midelware/validateRequest"



const route = express.Router()

// route.post("/create-faculty", validateRequest(createFacultyValidationSchema))

route.get("/",FacultyControllers.getAllfaculty)

route.get("/:facultyId", FacultyControllers.getSingelFaculty)

route.delete("/:facultyId", FacultyControllers.deleteFaculty)

route.patch("/:facultyId", validateRequest(updateFacultyValidationSchema), FacultyControllers.updateFaculty)


export const FacultyRoute = route