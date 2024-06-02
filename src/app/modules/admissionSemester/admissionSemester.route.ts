import express from "express"
import { AcademicSemesterController } from "./admissionSemester.controller"
import validateRequest from "../../midelware/validateRequest"
import { AcademicSemesterValidations } from "./admissionSemester.validattion"

const route = express.Router()

route.post("/create-academic-semister",validateRequest(AcademicSemesterValidations.createAcdemicSemesterValidationSchema), AcademicSemesterController.createAcdemicSemester)

route.get("/", AcademicSemesterController.getAllAcademicSemesters)

route.get("/:semesterID", AcademicSemesterController.getSingelAcademicSemester)
route.put("/:semesterID", validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema), AcademicSemesterController.updateAcademicSemester)



export const  AcademicSemesterRoute = route