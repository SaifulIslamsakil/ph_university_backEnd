
import express from "express"
import { createFacultyValidationSchema } from "./faculty.validation"



const route = express.Router()

// route.post("/create-faculty", validateRequest(createFacultyValidationSchema))

route.get("/")

route.get("/:facultyId")

route.delete("/:facultyId")

route.patch("/:facultyId")


export const FacultyRoute = route