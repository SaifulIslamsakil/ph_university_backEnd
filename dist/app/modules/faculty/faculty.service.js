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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QureyBulder_1 = __importDefault(require("../../bulders/QureyBulder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const faculty_model_1 = require("./faculty.model");
const user_model_1 = __importDefault(require("../users/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllFacultyFormDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const FacultySearchableFields = [
        'email',
        'id',
        'contactNo',
        'emergencyContactNo',
        'name.firstName',
        'name.lastName',
        'name.middleName',
    ];
    const faculty = new QureyBulder_1.default(faculty_model_1.FacultyModel.find().populate('academicDepartment'), query).search(FacultySearchableFields).filter().sort().fields().paginate();
    const result = yield faculty.modelQuery;
    return result;
});
const getSingelFormDB = (facultyID) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.FacultyModel.findById(facultyID);
    return result;
});
const deleteFacultyFormDB = (facultyID) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedFaculty = yield faculty_model_1.FacultyModel.findByIdAndUpdate(facultyID, { isDeleted: true }, { new: true, session });
        if (!deletedFaculty) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete faculty');
        }
        // get user _id from deletedFaculty
        const userId = deletedFaculty.user;
        const deletedUser = yield user_model_1.default.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete user');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const updateFacultyIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload, remainingFacultyData = __rest(payload, ["name"]);
    const modifiedUpdatedData = Object.assign({}, remainingFacultyData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    const result = yield faculty_model_1.FacultyModel.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.FacultyService = {
    getAllFacultyFormDB,
    getSingelFormDB,
    deleteFacultyFormDB,
    updateFacultyIntoDB
};
