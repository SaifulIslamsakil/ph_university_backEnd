import { Request, Response } from "express";
import { userSevice } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../student/catchAsync";



const studentCreate = catchAsync(async (req: Request, res: Response) => {
    const studentData = req.body
    const { password } = studentData
    console.log(password)
    const result = await userSevice.creatStudenIntoDB(password, studentData)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created succesfully',
        data: result,
    })
});

export const userController = {
    studentCreate
}