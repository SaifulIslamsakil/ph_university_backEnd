"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../midelware/validateRequest"));
const student_validation_1 = __importDefault(require("../student/student.validation "));
const faculty_validation_1 = require("../faculty/faculty.validation");
const admin_validation_1 = require("../admin/admin.validation");
const UserRoute = express_1.default.Router();
UserRoute.post("/create-student", (0, validateRequest_1.default)(student_validation_1.default), user_controller_1.userController.studentCreate);
UserRoute.post("/create-faculty", (0, validateRequest_1.default)(faculty_validation_1.createFacultyValidationSchema), user_controller_1.userController.facultyCreate);
UserRoute.post("/create-admin", (0, validateRequest_1.default)(admin_validation_1.createAdminValidationSchema), user_controller_1.userController.createAdmin);
exports.default = UserRoute;
