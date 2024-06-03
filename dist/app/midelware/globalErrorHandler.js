"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handelZodError_1 = __importDefault(require("../errors/handelZodError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCord = 500;
    let message = err.message || 'Something went wrong!';
    let errorSources = [
        {
            path: "",
            message: "Something went wrong!",
        }
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handelZodError_1.default)(err);
        statusCord = simplifiedError.statusCode,
            message = simplifiedError.message,
            errorSources = simplifiedError.errorSources;
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = ;
    }
    res.status(statusCord).json({
        success: false,
        message,
        errorSources,
        errorss: err
    });
};
exports.default = globalErrorHandler;
