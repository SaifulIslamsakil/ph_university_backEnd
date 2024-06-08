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
const faculty_model_1 = require("../faculty/faculty.model");
const admin_model_1 = require("../admin/admin.model");
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
const createFacultInToDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userData = {};
    userData.password = password || confiq_1.default.default_password;
    userData.role = "faculty";
    userData.id = yield (0, user_utils_1.generateFacultyId)();
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_model_1.default.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        payload.id = (_a = newUser[0]) === null || _a === void 0 ? void 0 : _a.id,
            payload.user = (_b = newUser[0]) === null || _b === void 0 ? void 0 : _b._id;
        const newFaculty = yield faculty_model_1.FacultyModel.create([payload], { session });
        if (!newFaculty.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create Faculty");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createAdminIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    console.log({ password }, { payload });
    const userData = {};
    userData.password = password || confiq_1.default.default_password;
    userData.role = "admin";
    userData.id = yield (0, user_utils_1.genaretAdminId)();
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_model_1.default.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        payload.id = (_c = newUser[0]) === null || _c === void 0 ? void 0 : _c.id,
            payload.user = (_d = newUser[0]) === null || _d === void 0 ? void 0 : _d._id;
        const newAdmin = yield admin_model_1.Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create Admin");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newUser;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
exports.userSevice = {
    creatStudenIntoDB,
    createFacultInToDB,
    createAdminIntoDB
};
