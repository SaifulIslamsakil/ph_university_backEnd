"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = __importDefault(require("../modules/users/user.route"));
const admissionSemester_route_1 = require("../modules/admissionSemester/admissionSemester.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const router = express_1.default.Router();
const moduleRoute = [
    {
        path: '/student',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/user',
        route: user_route_1.default,
    },
    {
        path: '/academic-semister',
        route: admissionSemester_route_1.AcademicSemesterRoute,
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_route_1.AcademicFacultyRoute,
    },
    {
        path: '/academic-department',
        route: academicDepartment_route_1.AcademicDepartmentRoute,
    },
];
moduleRoute.forEach(route => router.use(route.path, route.route));
exports.default = router;
