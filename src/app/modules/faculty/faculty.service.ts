import { TFaculty } from "./faculty.interface"
import { FacultyModel } from "./faculty.model"

const getAllFacultyFormDB = async() =>{
    const result = await FacultyModel.find()
    return result
}

const getSingelFormDB = async(facultyID : string) =>{
    const result = await FacultyModel.findById(facultyID)
    return result
}

const deleteFacultyFormDB = async(facultyID :string)=>{
    const result = await FacultyModel.findByIdAndUpdate(facultyID,{
        isDeleted : true,
        new : true
    } )

    return result
}

const updateFacultyFormDB = async(facultyID:string, payload:TFaculty)=>{
    const result =  FacultyModel.findByIdAndUpdate(facultyID, payload, {new:true})
    return result
}

export const FacultyService = {
    getAllFacultyFormDB,
    getSingelFormDB,
    deleteFacultyFormDB,
    updateFacultyFormDB
}