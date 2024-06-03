import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interface/errorInterface";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCord = 500
    let message = err.message || 'Something went wrong!'
    let  errorSources : TErrorSources = {
        path:"",
        message:"Something went wrong!",
    }

    res.status(statusCord).json({
        success: false,
        message,
        errorSources,
        error: err
    })
}

export default globalErrorHandler