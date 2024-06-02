import express from "express"
import validateRequest from "../../midelware/validateRequest"
import { AcademicDepartmentValidation } from "./academicDepartment.validation"

const route = express.Router()

route.post("/create-academic-department", validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema))
route.get("/",)
route.get("/:departmentId",)
route.put("/:departmentId", validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema))





export const AcademicDepartmentRoute = route