import express from "express"
import { AdminController } from "./admin.controller"
import { Admin } from "./admin.model"
import validateRequest from "../../midelware/validateRequest"
import { updateAdminValidationSchema } from "./admin.validation"

const route = express.Router()


route.get("/", AdminController.getAllAdmin)

route.get("/:adminId", AdminController.getSingelAdmin)

route.delete("/:adminId", AdminController.deleteAdmin)

route.patch("/:adminId", validateRequest(updateAdminValidationSchema),AdminController.updateAdmin)


export const AdminRoute = route