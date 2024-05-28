"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    const statusCord = 500;
    const message = err.message || 'Something went wrong!';
    res.status(statusCord).json({
        success: false,
        dd: "sss",
        message,
        error: err
    });
};
exports.default = globalErrorHandler;