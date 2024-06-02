import mongoose from "mongoose"
import confiq from "../../confiq"
import { academicSemesterModel } from "../admissionSemester/admissionSemester.model"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import UserModel from "./user.model"
import { generateStudentId } from "./user.utils"
import { TnewUser } from "./users.interface"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"


const creatStudenIntoDB = async (password: string, studentData: TStudent) => {
    const user: TnewUser = {
        password: "",
        role: "",
        id: ""
    }
    // set an default password

    user.password = password || confiq.default_password as string
    // set role 
    user.role = "student"
    // find student by academicSemester id 

    const session = await mongoose.startSession()

    try {

        await session.startTransaction()
        const admissionSemester = await academicSemesterModel.findById(studentData.admissionSemester)
        if (!admissionSemester) {
            throw new Error('Admission semester not found');
        }
        // set genaret id
        user.id = await generateStudentId(admissionSemester)

        const userCreate = await UserModel.create([user], { session })
        console.log(userCreate)
        if (!userCreate.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
        }

        studentData.id = userCreate[0].id
        studentData.user = userCreate[0]._id
        const newStudent = await Student.create([studentData], { session })
        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
        }

       await session.commitTransaction()
        await session.endSession()
        return newStudent

    } catch (error) {
        await session.abortTransaction()
       await session.endSession()
    }
}

export const userSevice = {
    creatStudenIntoDB
}