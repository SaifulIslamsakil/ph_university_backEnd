"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handelZodError_1 = __importDefault(require("../errors/handelZodError"));
const handelMongooseValidationErrors_1 = __importDefault(require("../errors/handelMongooseValidationErrors"));
const handelMogooseCastError_1 = __importDefault(require("../errors/handelMogooseCastError"));
const handleMongooseDuplicateError_1 = __importDefault(require("../errors/handleMongooseDuplicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
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
        statusCord = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = (0, handelMongooseValidationErrors_1.default)(err);
        statusCord = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err.name === "CastError") {
        const simplifiedError = (0, handelMogooseCastError_1.default)(err);
        statusCord = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err.code === 11000) {
        const simplifiedError = (0, handleMongooseDuplicateError_1.default)(err);
        statusCord = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCord = err.statusCode;
        message = err.message;
        errorSources = [{
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message
            }];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [{
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message
            }];
    }
    res.status(statusCord).json({
        success: false,
        message,
        errorSources,
        errorss: err
    });
};
exports.default = globalErrorHandler;
