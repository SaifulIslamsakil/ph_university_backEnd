import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { FacultyService } from "./faculty.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { boolean } from "zod";


const getAllfaculty = catchAsync(async (req: Request, res: Response) => {
    const query = req?.query
    const result = await FacultyService.getAllFacultyFormDB(query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty data in recived successfully",
        data: result
    })
})

const getSingelFaculty = catchAsync(async (req: Request, res: Response) => {
    const facultyId = req?.params?.facultyId
    const result = await FacultyService.getSingelFormDB(facultyId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "singel Faculty data in recived successfully",
        data: result
    })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
    const facultyId = req?.params?.facultyId
    const result = await FacultyService.deleteFacultyFormDB(facultyId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty data in deleted successfully",
        data: result
    })
})


const updatefaculty = catchAsync(async (req: Request, res: Response) => {
    const { facultyId } = req?.params
    const body = req.body
    const result = await FacultyService.updateFacultyIntoDB(facultyId, body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty data is updated successfully",
        data: result

    })
})

export const FacultyControllers = {
    getAllfaculty,
    getSingelFaculty,
    deleteFaculty,
    updatefaculty
}