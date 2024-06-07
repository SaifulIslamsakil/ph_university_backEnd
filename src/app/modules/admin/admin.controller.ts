import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AdminService } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllAdmin = catchAsync(async(req:Request, res:Response)=>{
    const query = req.query
    const result  = await AdminService.getAllAdminFromDB(query)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"All Admin recived successfuly",
        data:result
    })
})
const getSingelAdmin = catchAsync(async(req:Request, res:Response)=>{
    const {adminId}= req.params
    const result  = await AdminService.getSingelAdminFromDB(adminId)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Singel Admin recived successfuly",
        data:result
    })
})
const deleteAdmin = catchAsync(async(req:Request, res:Response)=>{
    const {adminId}= req.params
    const result  = await AdminService.deletedAdminFormDB(adminId)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:" Admin deleted successfuly",
        data:result
    })
})
const updateAdmin = catchAsync(async(req:Request, res:Response)=>{
    const {adminId}= req.params
    const body = req.body
    const result  = await AdminService.updateAdminFormDB(adminId, body)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:" Admin updated successfuly",
        data:result
    })
})

export const AdminController = {
    getAllAdmin,
    getSingelAdmin,
    deleteAdmin,
    updateAdmin
}