import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

const createCourse = catchAsync(async(req:Request, res:Response)=>{
    const body = req.body
    console.log(body)
})



export const CourseController = {
    createCourse
}