import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createAcdemicSemester =catchAsync(async (req: Request, res:Response)=>{
    const body = req.body
    const result = await AcademicSemesterServices.createAcdemicSemesterInToDB(body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success:true,
        message:"Academic Semester created succesfully",
        data:result
    })
})


const getAllAcademicSemesters = catchAsync(async(req:Request, res:Response)=>{
    const result = await AcademicSemesterServices.getAllAcademicSemestersFormDB()
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Semester resived succesfully",
        data:result
    })
})

const getSingelAcademicSemester = catchAsync( async(req:Request, res:Response)=>{
    const result = await AcademicSemesterServices.getSingelAcademicSemesterFormDB(req.params.semesterID)

    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:"singel Academic Semester resived succesfully",
        data:result
    })
})
export const AcademicSemesterController = {
    createAcdemicSemester,
    getAllAcademicSemesters,
    getSingelAcademicSemester
}