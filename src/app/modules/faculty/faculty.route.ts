
import express from "express"
import { FacultyControllers } from "./faculty.controller"
import validateRequest from "../../midelware/validateRequest"
import { updateFacultyValidationSchema } from "./faculty.validation"



const route = express.Router()

route.get("/",FacultyControllers.getAllfaculty)

route.get("/:facultyId", FacultyControllers.getSingelFaculty)

route.delete("/:facultyId", FacultyControllers.deleteFaculty)
route.patch(
    '/:id',
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
  );






export const FacultyRoute = route