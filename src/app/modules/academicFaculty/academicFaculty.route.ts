import express from "express"
import validateRequest from "../../midelware/validateRequest"
import { AcademicFacultyValidation } from "./academicFaculty.validation"
import { AcademicFacultyControllers } from "./academicFaculty.controller"

const route = express.Router()

route.post("/create-academic-faculty", validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty)

route.get("/", AcademicFacultyControllers.getAllAcademicFaculties)
route.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty)

route.put("/:facultyId", validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty)

export const AcademicFacultyRoute = route