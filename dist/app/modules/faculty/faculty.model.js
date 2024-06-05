"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyModel = exports.BloodGroup = exports.Gender = void 0;
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
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'User',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.FacultyModel = (0, mongoose_1.model)("Faculty", FacultySchema);
