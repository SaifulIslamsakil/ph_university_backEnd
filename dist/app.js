"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/midelware/globalErrorHandler"));
const noteFoundRoute_1 = __importDefault(require("./app/midelware/noteFoundRoute"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1", routes_1.default);
// app.use("/api/v1/student", StudentRoutes)
// app.use("/api/v1/user", UserRoute)
// app.use("/api/v1/academic-semister", AcademicSemesterRoute)
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(globalErrorHandler_1.default);
app.use(noteFoundRoute_1.default);
exports.default = app;
