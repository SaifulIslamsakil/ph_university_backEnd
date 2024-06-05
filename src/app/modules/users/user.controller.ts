import { Request, Response } from "express";
import { userSevice } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";



const studentCreate = catchAsync(async (req: Request, res: Response) => {
    const studentData = req.body
    const { password } = studentData
    const result = await userSevice.creatStudenIntoDB(password, studentData)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created succesfully',
        data: result,
    })
});


const facultyCreate = catchAsync(async (req: Request, res: Response) => {
    const {password,faculty} = req?.body
    const result = await userSevice.createFacultInToDB(password, faculty)
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:"Faculty is created succesfully",
        data:result
    })
})
export const userController = {
    studentCreate,
    facultyCreate
}