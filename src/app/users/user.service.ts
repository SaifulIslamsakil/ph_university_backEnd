import confiq from "../confiq"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import UserModel from "./user.model"
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
    // set genaret id
    user.id = "2023102222"

    const userCreate = await UserModel.create(user)

    if(Object.keys(userCreate).length){
        studentData.id = userCreate.id
        studentData.user = userCreate._id
        const newStudent = await Student.create(studentData)
        return newStudent
    }
    console.log(studentData)
}

export const userSevice = {
    creatStudenIntoDB
}