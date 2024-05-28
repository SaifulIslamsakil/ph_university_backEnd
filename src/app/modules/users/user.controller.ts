import { NextFunction, Request, Response } from "express";
import { userSevice } from "./user.service";



const studentCreate = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const   studentData  = req.body
        const {password} = studentData
        console.log(password)
        const result = await userSevice.creatStudenIntoDB( password, studentData)

        res.status(200).json({
            success : true,
            messege : "student post done",
            data : result
        })
    } catch (error) {
       next(error)
    }
} 

export const userController = {
    studentCreate
}