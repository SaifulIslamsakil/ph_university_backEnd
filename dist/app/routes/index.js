"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = __importDefault(require("../modules/users/user.route"));
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
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
        route: academicSemester_route_1.AcademicSemesterRoute,
    },
];
moduleRoute.forEach(route => router.use(route.path, route.route));
exports.default = router;
