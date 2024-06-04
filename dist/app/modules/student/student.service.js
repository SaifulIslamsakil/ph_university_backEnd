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
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../users/user.model"));
const QureyBulder_1 = __importDefault(require("../../bulders/QureyBulder"));
const student_constnt_1 = require("./student.constnt");
const getAllStudentsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    //  Raw searching 
    // const copyQuray = { ...query }
    // let searchParams = ''
    // if (query?.searchParams) {
    //   searchParams = query?.searchParams as string
    // }
    // const searchParamsData = Student.find({
    //   $or: searchParamsField.map((field) => ({
    //     [field]: { $regex: searchParams, $options: "i" }
    //   }))
    // })
    // // filtering 
    // const deletedField = ["searchParams", "sort", "limit", "page", "field"]
    // deletedField.forEach(element => delete copyQuray[element]);
    // const filteringData = searchParamsData.find(copyQuray)
    // //  sorting
    // let sort = '-createdAt'
    // if (query?.sort) {
    //   sort = query?.sort
    // }
    // const sortData = filteringData.sort(sort)
    // // limit data and paganition
    // let limit = 1
    // let page = 1
    // let skip = 0
    // if (query?.limit) {
    //   limit = Number(query?.limit)
    // }
    // if (query?.page) {
    //   page = Number(query?.page)
    //   skip = (page - 1) * limit
    // }
    // const paginateData = sortData.skip(skip)
    // const limitedData = paginateData.limit(limit)
    // // field limit
    // let fields = "-_V"
    // if (query?.field) {
    //   fields = query?.field.split(',').join(" ")
    // }
    // Class searchnig and reusedable cord 
    const queryBuilder = new QureyBulder_1.default(student_model_1.Student.find(), query).search(student_constnt_1.searchParamsField).filter().paginate().sort().fields();
    const result = yield queryBuilder.modelQuery;
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
        if (!deletUser || deletUser.isDeleted) {
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
const updateStudentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, localGuardian, guardian } = payload, remainingStudentData = __rest(payload, ["name", "localGuardian", "guardian"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    console.log(modifiedUpdatedData);
    const result = yield student_model_1.Student.findOneAndUpdate({ id }, modifiedUpdatedData, { new: true, runValidators: true });
    return result;
});
exports.StudentServices = {
    // createStudent,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentFromDB
};
