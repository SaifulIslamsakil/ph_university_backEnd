"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../midelware/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const route = express_1.default.Router();
route.post("/create-academic-department", (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentValidationSchema));
route.get("/");
route.get("/:departmentId");
route.put("/:departmentId", (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema));
exports.AcademicDepartmentRoute = route;
