import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterModel } from "./academicSemester.model";


const createAcdemicSemesterInToDB = async(payload: TAcademicSemester)=>{
    const result = await academicSemesterModel.create(payload)
    return result
}

const getAllAcademicSemestersFormDB = async()=>{
    const result = await academicSemesterModel.find()
    return result
}





export const AcademicSemesterServices = {
    createAcdemicSemesterInToDB,
    getAllAcademicSemestersFormDB
}