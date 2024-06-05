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
exports.FacultyService = void 0;
const faculty_model_1 = require("./faculty.model");
const getAllFacultyFormDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.FacultyModel.find();
    return result;
});
const getSingelFormDB = (facultyID) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.FacultyModel.findById(facultyID);
    return result;
});
const deleteFacultyFormDB = (facultyID) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.FacultyModel.findByIdAndUpdate(facultyID, {
        isDeleted: true,
        new: true
    });
    return result;
});
const updateFacultyFormDB = (facultyID, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = faculty_model_1.FacultyModel.findByIdAndUpdate(facultyID, payload, { new: true });
    return result;
});
exports.FacultyService = {
    getAllFacultyFormDB,
    getSingelFormDB,
    deleteFacultyFormDB,
    updateFacultyFormDB
};
