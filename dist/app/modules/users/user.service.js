"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSevice = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const confiq_1 = __importDefault(require("../../confiq"));
const admissionSemester_model_1 = require("../admissionSemester/admissionSemester.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = __importDefault(require("./user.model"));
const user_utils_1 = require("./user.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const creatStudenIntoDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        password: "",
        role: "",
        id: ""
    };
    // set an default password
    user.password = password || confiq_1.default.default_password;
    // set role 
    user.role = "student";
    // find student by academicSemester id 
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const admissionSemester = yield admissionSemester_model_1.academicSemesterModel.findById(studentData.admissionSemester);
        if (!admissionSemester) {
            throw new Error('Admission semester not found');
        }
        // set genaret id
        user.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
        const userCreate = yield user_model_1.default.create([user], { session });
        console.log(userCreate);
        if (!userCreate.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        studentData.id = userCreate[0].id;
        studentData.user = userCreate[0]._id;
        const newStudent = yield student_model_1.Student.create([studentData], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
});
exports.userSevice = {
    creatStudenIntoDB
};
