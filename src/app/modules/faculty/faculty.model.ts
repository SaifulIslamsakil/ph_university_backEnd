import { Schema, model } from "mongoose";
import { TFaculty, TUserName } from "./faculty.interface";


const FacultyNameSchema = new Schema<TUserName>({
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
})

export const Gender = ['male', 'female', 'other'];

export const BloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const FacultySchema = new Schema<TFaculty>(
    {
        id: {
            type: String,
            required: [true, 'ID is required'],
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
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
                values: Gender,
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
                values: BloodGroup,
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
            type: Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            ref: 'User',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    })

    export const FacultyModel = model<TFaculty>("Faculty", FacultySchema)


