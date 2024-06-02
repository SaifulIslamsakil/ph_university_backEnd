"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../midelware/validateRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const route = express_1.default.Router();
route.post("/create-academic-faculty", (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.createAcademicFacultyValidationSchema), academicFaculty_controller_1.AcademicFacultyControllers.createAcademicFaculty);
route.get("/", academicFaculty_controller_1.AcademicFacultyControllers.getAllAcademicFaculties);
route.get("/:facultyId", academicFaculty_controller_1.AcademicFacultyControllers.getSingleAcademicFaculty);
route.put("/:facultyId", (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.updateAcademicFacultyValidationSchema), academicFaculty_controller_1.AcademicFacultyControllers.updateAcademicFaculty);
exports.AcademicFacultyRoute = route;
