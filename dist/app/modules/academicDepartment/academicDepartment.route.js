"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../midelware/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const route = express_1.default.Router();
route.post("/create-academic-department", (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), academicDepartment_controller_1.AcademicDepartmentControllers.createAcademicDepartmemt);
route.get("/", academicDepartment_controller_1.AcademicDepartmentControllers.getAllAcademicDepartments);
route.get("/:departmentId", academicDepartment_controller_1.AcademicDepartmentControllers.getSingleAcademicDepartment);
route.put("/:departmentId", (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartment_controller_1.AcademicDepartmentControllers.updateAcademicDeartment);
exports.AcademicDepartmentRoute = route;
