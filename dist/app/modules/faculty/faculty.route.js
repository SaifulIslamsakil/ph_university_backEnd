"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = __importDefault(require("../../midelware/validateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const route = express_1.default.Router();
route.get("/", faculty_controller_1.FacultyControllers.getAllfaculty);
route.get("/:facultyId", faculty_controller_1.FacultyControllers.getSingelFaculty);
route.delete("/:facultyId", faculty_controller_1.FacultyControllers.deleteFaculty);
route.patch('/:id', (0, validateRequest_1.default)(faculty_validation_1.updateFacultyValidationSchema), faculty_controller_1.FacultyControllers.updateFaculty);
exports.FacultyRoute = route;
