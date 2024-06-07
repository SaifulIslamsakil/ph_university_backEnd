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
exports.AdminService = void 0;
const QureyBulder_1 = __importDefault(require("../../bulders/QureyBulder"));
const admin_constan_1 = require("./admin.constan");
const admin_model_1 = require("./admin.model");
const getAllAdminFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const adminData = new QureyBulder_1.default(admin_model_1.Admin.find(), query)
        .search(admin_constan_1.AdminSearchableFields)
        .sort()
        .filter()
        .paginate()
        .fields();
    const result = yield adminData.modelQuery;
    return result;
});
const getSingelAdminFromDB = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findById(adminId);
    return result;
});
const deletedAdminFormDB = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findByIdAndUpdate(adminId, {
        isDeleted: true,
        new: true
    });
    return result;
});
const updateAdminFormDB = (adminId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(adminId, payload);
});
exports.AdminService = {
    getAllAdminFromDB,
    getSingelAdminFromDB,
    deletedAdminFormDB,
    updateAdminFormDB
};
