"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
// route.post("/create-faculty", validateRequest(createFacultyValidationSchema))
route.get("/");
route.get("/:facultyId");
route.delete("/:facultyId");
route.patch("/:facultyId");
exports.FacultyRoute = route;
