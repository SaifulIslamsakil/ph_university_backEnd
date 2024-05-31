import express from "express"
import { AcademicSemesterController } from "./academicSemester.controller"
import validateRequest from "../../midelware/validateRequest"
import { AcademicSemesterValidations } from "./academicSemester.validattion"

const route = express.Router()

route.post("/create-academic-semister",validateRequest(AcademicSemesterValidations.createAcdemicSemesterValidationSchema), AcademicSemesterController.createAcdemicSemester)

route.get("/", AcademicSemesterController.getAllAcademicSemesters)

export const  AcademicSemesterRoute = route