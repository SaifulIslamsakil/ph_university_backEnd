import { Admin } from "../admin/admin.model";
import { TAcademicSemester } from "../admissionSemester/admissionSemester.interface";
import UserModel from "./user.model";

const findLastStudentId = async () => {
    const lastStudent = await UserModel.findOne(
        {
            role: 'student',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastStudent?.id ? lastStudent?.id : undefined;
}

export const generateStudentId = async (payload: TAcademicSemester) => {
    let currentId = (0).toString()
    const lastStudentId = await findLastStudentId()
    const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
    const currentSemesterCode = payload.code;
    const currentSemesterYear = payload.year;
    if (
        lastStudentId &&
        lastStudentSemesterCode === currentSemesterCode &&
        lastStudentSemesterYear === currentSemesterYear
    ) {
        currentId = lastStudentId.substring(6); // 00001
    }



    console.log(currentId)
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0")
    incrementId = `${payload.year}${payload.code}${incrementId}`

    return incrementId
}


export const findLastFacultyId = async () => {
    const lastFacult = await UserModel.findOne(
        {
            role: "faculty"
        },
        {
            _id: 1,
            id: 1
        },

    ).sort({
        createdAt: -1,
    }).lean()

    return lastFacult?.id ? lastFacult?.id.substring(2) : undefined
}

export const generateFacultyId = async () => {
    let currentId = (0).toString()
    const lastFacultId = await findLastFacultyId()
    if (lastFacultId) {
        currentId = lastFacultId.substring(2);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0")
    incrementId = `F-${incrementId}`


    return incrementId
}

const findLastAdminId = async () => {
    const lastAdmin = await Admin.findOne(
        {
            role: "admin"
        },
        {
            _id: 1,
            id: 1
        }
    ).sort({
        createdAt: -1,
    }).lean()

    return lastAdmin?.id ? lastAdmin?.id.substring(2) : undefined
}

export const genaretAdminId = async()=>{
    let currentId = (0).toString()
    const lastAdminId = await findLastAdminId()
    if(lastAdminId){
        currentId = lastAdminId.substring(2)
    }
    let incrementId = (Number(currentId)+1).toString().padStart(4, "0")
    incrementId = `A-${incrementId}`

    return incrementId
}