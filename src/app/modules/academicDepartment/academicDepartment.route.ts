import express from "express"
import validateRequest from "../../midelware/validateRequest"
import { AcademicDepartmentValidation } from "./academicDepartment.validation"

const route = express.Router()

route.post("/create-academic-department", validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema))
route.post("/create-academic-department", validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema))
route.post("/create-academic-department", validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema))





export const AcademicDepartmentRoute = route