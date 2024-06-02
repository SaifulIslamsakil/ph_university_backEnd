"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentValidationSchema = exports.studentValidationSchema = void 0;
const zod_1 = require("zod");
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    }),
    middleName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const guardianSchema = zod_1.z.object({
    fatherName: zod_1.z.string(),
    fatherOccupation: zod_1.z.string(),
    fatherContactNo: zod_1.z.string(),
    motherName: zod_1.z.string(),
    motherOccupation: zod_1.z.string(),
    motherContactNo: zod_1.z.string(),
});
const localGuardianSchema = zod_1.z.object({
    name: zod_1.z.string(),
    occupation: zod_1.z.string(),
    contactNo: zod_1.z.string(),
    address: zod_1.z.string(),
});
exports.studentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string(),
        password: zod_1.z.string().max(20).optional(),
        name: userNameSchema,
        gender: zod_1.z.enum(['male', 'female', 'other']),
        dateOfBirth: zod_1.z.string(),
        email: zod_1.z.string().email(),
        contactNo: zod_1.z.string(),
        emergencyContactNo: zod_1.z.string(),
        bloogGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
        presentAddress: zod_1.z.string(),
        permanentAddress: zod_1.z.string(),
        guardian: guardianSchema,
        localGuardian: localGuardianSchema,
        profileImg: zod_1.z.string(),
        admissionSemester: zod_1.z.string(),
        isActive: zod_1.z.enum(['active', 'blocked']).default('active'),
        isDeleted: zod_1.z.boolean().optional(),
    })
});
const updateUserNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    }).optional(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
const updateGardianSchema = zod_1.z.object({
    fatherName: zod_1.z.string().optional(),
    fatherOccupation: zod_1.z.string().optional(),
    fatherContactNo: zod_1.z.string().optional(),
    motherName: zod_1.z.string().optional(),
    motherOccupation: zod_1.z.string().optional(),
    motherContactNo: zod_1.z.string().optional(),
});
const updateLocalGuardianSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    occupation: zod_1.z.string().optional(),
    contactNo: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
exports.updateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().optional(),
        password: zod_1.z.string().max(20).optional(),
        name: updateUserNameSchema.optional(),
        gender: zod_1.z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        bloogGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        guardian: updateGardianSchema.optional(),
        localGuardian: updateLocalGuardianSchema.optional(),
        profileImg: zod_1.z.string().optional(),
        admissionSemester: zod_1.z.string().optional(),
        isActive: zod_1.z.enum(['active', 'blocked']).default('active').optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
});
exports.default = exports.studentValidationSchema;
