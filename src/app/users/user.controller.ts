import { Request, Response } from "express";
import { userSevice } from "./user.service";



const studentCreate = async(req:Request, res:Response)=>{
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
        console.log(error)
        // res.status(500).json({
        //     success : false,
        //     messege : "student post wrong",
        //     data : error
        
        // })
    }
} 

export const userController = {
    studentCreate
}