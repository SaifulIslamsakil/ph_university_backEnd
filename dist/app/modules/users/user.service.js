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
const confiq_1 = __importDefault(require("../../confiq"));
const student_model_1 = require("../student/student.model");
const user_model_1 = __importDefault(require("./user.model"));
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
    // set genaret id
    user.id = "2023102222";
    const userCreate = yield user_model_1.default.create(user);
    if (Object.keys(userCreate).length) {
        studentData.id = userCreate.id;
        studentData.user = userCreate._id;
        const newStudent = yield student_model_1.Student.create(studentData);
        return newStudent;
    }
});
exports.userSevice = {
    creatStudenIntoDB
};
