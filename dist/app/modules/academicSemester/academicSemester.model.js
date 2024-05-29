"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterModel = void 0;
const mongoose_1 = require("mongoose");
const academicSemester_constant_1 = require("./academicSemester.constant");
const acdemicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.AcademicSemesterName,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.AcademicSemesterCode,
    },
    startMonth: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.Months,
    },
    endMonth: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.Months,
    },
}, {
    timestamps: true,
});
exports.academicSemesterModel = (0, mongoose_1.model)("AcademicSemester", acdemicSemesterSchema);
