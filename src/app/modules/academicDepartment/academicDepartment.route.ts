import express from "express"
import validateRequest from "../../midelware/validateRequest"
import { AcademicDepartmentValidation } from "./academicDepartment.validation"
import { AcademicDepartmentControllers } from "./academicDepartment.controller"

const route = express.Router()

route.post("/create-academic-department", validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentControllers.createAcademicDepartmemt)
route.get("/", AcademicDepartmentControllers.getAllAcademicDepartments)
route.get("/:departmentId", AcademicDepartmentControllers.getSingleAcademicDepartment)
route.put("/:departmentId", validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDeartment)





export const AcademicDepartmentRoute = route