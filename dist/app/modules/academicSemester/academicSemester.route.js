"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoute = void 0;
const express_1 = __importDefault(require("express"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const validateRequest_1 = __importDefault(require("../../midelware/validateRequest"));
const academicSemester_validattion_1 = require("./academicSemester.validattion");
const route = express_1.default.Router();
route.post("/create-academic-semister", (0, validateRequest_1.default)(academicSemester_validattion_1.AcademicSemesterValidations.createAcdemicSemesterValidationSchema), academicSemester_controller_1.AcademicSemesterController.createAcdemicSemester);
route.get("/", academicSemester_controller_1.AcademicSemesterController.getAllAcademicSemesters);
route.get("/:semesterID", academicSemester_controller_1.AcademicSemesterController.getSingelAcademicSemester);
route.put("/:semesterID", (0, validateRequest_1.default)(academicSemester_validattion_1.AcademicSemesterValidations.updateAcademicSemesterValidationSchema), academicSemester_controller_1.AcademicSemesterController.updateAcademicSemester);
exports.AcademicSemesterRoute = route;
