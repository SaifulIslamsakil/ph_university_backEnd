import { Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterModel } from "./academicSemester.model";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";


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
    const resutl = await academicSemesterModel.findByIdAndUpdate({ _id :id }, payload, {new:true} )
    return resutl
}





export const AcademicSemesterServices = {
    createAcdemicSemesterInToDB,
    getAllAcademicSemestersFormDB,
    getSingelAcademicSemesterFormDB,
    updateAcademicSemesterFormDB
}