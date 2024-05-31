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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterServices = void 0;
const academicSemester_model_1 = require("./academicSemester.model");
const createAcdemicSemesterInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.academicSemesterModel.create(payload);
    return result;
});
const getAllAcademicSemestersFormDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.academicSemesterModel.find();
    return result;
});
const getSingelAcademicSemesterFormDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.academicSemesterModel.findById(id);
    return result;
});
const updateAcademicSemesterFormDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const resutl = yield academicSemester_model_1.academicSemesterModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return resutl;
});
exports.AcademicSemesterServices = {
    createAcdemicSemesterInToDB,
    getAllAcademicSemestersFormDB,
    getSingelAcademicSemesterFormDB,
    updateAcademicSemesterFormDB
};
