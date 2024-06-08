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
exports.AdminModel = exports.BloodGroup = exports.Gender = void 0;
const mongoose_1 = require("mongoose");
const FacultyNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        maxlength: [20, "Name can not be more than 20 characters"]
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});
exports.Gender = ['male', 'female', 'other'];
exports.BloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const FacultySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
    },
    designation: {
        type: String,
        required: [true, 'Designation is required'],
    },
    name: {
        type: FacultyNameSchema,
        required: [true, 'Name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: exports.Gender,
            message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required'],
    },
    bloogGroup: {
        type: String,
        enum: {
            values: exports.BloodGroup,
            message: '{VALUE} is not a valid blood group',
        },
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true
    }
});
// generating full name
FacultySchema.virtual("fullNamw").get(function () {
    var _a, _b, _c;
    return `${(_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.middleName} ${(_c = this === null || this === void 0 ? void 0 : this.name) === null || _c === void 0 ? void 0 : _c.lastName}`;
});
// filter out deleted documents
FacultySchema.pre("find", function (next) {
    this === null || this === void 0 ? void 0 : this.find({ isDeleted: { $ne: true } });
    next();
});
FacultySchema.pre("findOne", function (next) {
    this === null || this === void 0 ? void 0 : this.findOne({ isDeleted: { $ne: true } });
    next();
});
FacultySchema.pre("aggregate", function (next) {
    this === null || this === void 0 ? void 0 : this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
FacultyNameSchema.statics.isFacultyExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const facultyExists = yield exports.AdminModel.find({ id });
        return facultyExists;
    });
};
exports.AdminModel = (0, mongoose_1.model)("Admin", FacultySchema);
