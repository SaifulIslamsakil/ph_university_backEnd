import { Schema } from "mongoose";
import { TAcademicSemester } from "./admissionSemester.interface";
import { academicSemesterModel } from "./admissionSemester.model";
import { academicSemesterNameCodeMapper } from "./admissionSemester.constant";


const createAcdemicSemesterInToDB = async (payload: TAcademicSemester) => {
    if(academicSemesterNameCodeMapper[payload.name]!== payload.code){
        throw new Error(" Invalid semester cord")
    }
    const result = await academicSemesterModel.create(payload)
    return result
}

const getAllAcademicSemestersFormDB = async () => {
    const result = await academicSemesterModel.find()
    return result
}

const getSingelAcademicSemesterFormDB = async (id: string) => {
    const result = await academicSemesterModel.findById(id)
    return result
}

const updateAcademicSemesterFormDB = async (id: string, payload: TAcademicSemester) => {

    if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code ){
        throw new Error('Invalid Semester Code');
    }
    const resutl = await academicSemesterModel.findByIdAndUpdate({ _id :id }, payload, {new:true} )
    return resutl
}





export const AcademicSemesterServices = {
    createAcdemicSemesterInToDB,
    getAllAcademicSemestersFormDB,
    getSingelAcademicSemesterFormDB,
    updateAcademicSemesterFormDB
}