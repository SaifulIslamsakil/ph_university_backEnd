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
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../users/user.model"));
const getAllStudentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.find();
    return result;
});
const getSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.aggregate([{ $match: { id } }]);
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deleteStudent = yield student_model_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteStudent) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete student");
        }
        const deletUser = yield user_model_1.default.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failded to delete user");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deleteStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
});
exports.StudentServices = {
    // createStudent,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
};
