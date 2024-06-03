import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/errorInterface";

const handelMongooseCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    const errorSources: TErrorSources = [
        {
            path: err?.path,
            message: err?.message
        }
    ]
    const statusCode = 400
    return {
        statusCode: statusCode,
        message: "invalid Id",
        errorSources
    }
}

export default handelMongooseCastError