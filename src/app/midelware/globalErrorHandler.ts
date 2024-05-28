import { NextFunction, Request, Response } from "express";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCord = 500
    const message = err.message || 'Something went wrong!'
    res.status(statusCord).json({
        success: false,
        dd:"sss",
        message,
        error: err
    })
}

export default globalErrorHandler