"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoute = void 0;
const express_1 = __importDefault(require("express"));
const admissionSemester_controller_1 = require("./admissionSemester.controller");
const validateRequest_1 = __importDefault(require("../../midelware/validateRequest"));
const admissionSemester_validattion_1 = require("./admissionSemester.validattion");
const route = express_1.default.Router();
route.post("/create-academic-semister", (0, validateRequest_1.default)(admissionSemester_validattion_1.AcademicSemesterValidations.createAcdemicSemesterValidationSchema), admissionSemester_controller_1.AcademicSemesterController.createAcdemicSemester);
route.get("/", admissionSemester_controller_1.AcademicSemesterController.getAllAcademicSemesters);
route.get("/:semesterID", admissionSemester_controller_1.AcademicSemesterController.getSingelAcademicSemester);
route.put("/:semesterID", (0, validateRequest_1.default)(admissionSemester_validattion_1.AcademicSemesterValidations.updateAcademicSemesterValidationSchema), admissionSemester_controller_1.AcademicSemesterController.updateAcademicSemester);
exports.AcademicSemesterRoute = route;
