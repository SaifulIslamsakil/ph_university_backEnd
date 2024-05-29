"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_route_1 = require("./app/modules/student/student.route");
const globalErrorHandler_1 = __importDefault(require("./app/midelware/globalErrorHandler"));
const noteFoundRoute_1 = __importDefault(require("./app/midelware/noteFoundRoute"));
const academicSemester_route_1 = require("./app/modules/academicSemester/academicSemester.route");
const user_route_1 = __importDefault(require("./app/modules/users/user.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/student", student_route_1.StudentRoutes);
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/academic-semister", academicSemester_route_1.AcademicSemesterRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(globalErrorHandler_1.default);
app.use(noteFoundRoute_1.default);
exports.default = app;
