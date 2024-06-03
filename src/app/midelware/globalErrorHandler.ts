import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interface/errorInterface";
import { ZodError } from "zod";
import handelZodError from "../errors/handelZodError";
import handelMongooseValidationErrors from "../errors/handelMongooseValidationErrors";
import handelMongooseCastError from "../errors/handelMogooseCastError";
import handleMongooseDuplicateError from "../errors/handleMongooseDuplicateError";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCord = 500
    let message = err.message || 'Something went wrong!'
    let errorSources: TErrorSources = [
        {
            path: "",
            message: "Something went wrong!",
        }
    ]
    if (err instanceof ZodError) {
        const simplifiedError = handelZodError(err)
        statusCord = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = handelMongooseValidationErrors(err)
        statusCord = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources
    }
    else if (err.name === "CastError") {
        const simplifiedError = handelMongooseCastError(err)
        statusCord = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources
    }
    else if(err.code === 11000){
        const simplifiedError = handleMongooseDuplicateError(err)
        statusCord = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources
    }

    res.status(statusCord).json({
        success: false,
        message,
        errorSources,
        errorss: err
    })
}

export default globalErrorHandler