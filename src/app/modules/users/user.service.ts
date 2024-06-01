import confiq from "../../confiq"
import { academicSemesterModel } from "../academicSemester/academicSemester.model"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import UserModel from "./user.model"
import { generateStudentId } from "./user.utils"
import { TnewUser } from "./users.interface"


const creatStudenIntoDB = async (password: string, studentData: TStudent) => {
    const user :TnewUser = {
        password: "",
        role: "",
        id: ""
    }
    // set an default password

    user.password = password || confiq.default_password as string
    // set role 
    user.role ="student"
    // find student by academicSemester id 

    const admissionSemester = await academicSemesterModel.findById(studentData.admissionSemester)
    if (!admissionSemester) {
        throw new Error('Admission semester not found');
      }
    // set genaret id
    user.id = await generateStudentId(admissionSemester) 
    
    const userCreate = await UserModel.create(user)

    if(Object.keys(userCreate).length){
        studentData.id = userCreate.id
        studentData.user = userCreate._id
        const newStudent = await Student.create(studentData)
        return newStudent
    }
}

export const userSevice = {
    creatStudenIntoDB
}