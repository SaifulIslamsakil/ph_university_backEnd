import express from "express"
import validateRequest from "../../midelware/validateRequest"
import { AcademicFacultyValidation } from "./academicFaculty.validation"

const route = express.Router()

route.post("/create-academic-faculty", validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema))

route.get("/:facultyId")

route.put("/:facultyId", validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema))

export const AcademicFacultyRoute = route