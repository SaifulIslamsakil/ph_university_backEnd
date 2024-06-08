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
exports.genaretAdminId = exports.generateFacultyId = exports.findLastFacultyId = exports.generateStudentId = void 0;
const admin_model_1 = require("../admin/admin.model");
const user_model_1 = __importDefault(require("./user.model"));
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.default.findOne({
        role: 'student',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id : undefined;
});
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastStudentId = yield findLastStudentId();
    const lastStudentSemesterYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    const lastStudentSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    const currentSemesterCode = payload.code;
    const currentSemesterYear = payload.year;
    if (lastStudentId &&
        lastStudentSemesterCode === currentSemesterCode &&
        lastStudentSemesterYear === currentSemesterYear) {
        currentId = lastStudentId.substring(6); // 00001
    }
    console.log(currentId);
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
});
exports.generateStudentId = generateStudentId;
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFacult = yield user_model_1.default.findOne({
        role: "faculty"
    }, {
        _id: 1,
        id: 1
    }).sort({
        createdAt: -1,
    }).lean();
    return (lastFacult === null || lastFacult === void 0 ? void 0 : lastFacult.id) ? lastFacult === null || lastFacult === void 0 ? void 0 : lastFacult.id.substring(2) : undefined;
});
exports.findLastFacultyId = findLastFacultyId;
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastFacultId = yield (0, exports.findLastFacultyId)();
    if (lastFacultId) {
        currentId = lastFacultId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.generateFacultyId = generateFacultyId;
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield admin_model_1.Admin.findOne({
        role: "admin"
    }, {
        _id: 1,
        id: 1
    }).sort({
        createdAt: -1,
    }).lean();
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id.substring(2) : undefined;
});
const genaretAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastAdminId = yield findLastAdminId();
    if (lastAdminId) {
        currentId = lastAdminId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.genaretAdminId = genaretAdminId;
