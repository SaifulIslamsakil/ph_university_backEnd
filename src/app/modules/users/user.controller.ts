import { NextFunction, Request, Response } from "express";
import { userSevice } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";



const studentCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
        next(error)
    }
}

export const userController = {
    studentCreate
}