"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
// import sendResponse from '../../utils/sendResponse';
const student_service_1 = require("./student.service");
// const createStudent = async (req: Request, res: Response) => {
//     try {
//         const studentData = req.body
//          const zodParsedData = studentValidationSchema.parse(studentData);
//          if(!zodParsedData){
//             return
//          }
//          const result = await StudentServices.createStudent(zodParsedData)
//          res.status(200).json({
//             success: true,
//             message: 'Student is retrieved succesfully',
//             data: result,
//          })
//     } catch (error) {
//         console.log(error)
//     }
// }
const getSingleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.getSingleStudentFromDB(studentId);
        // sendResponse(res, {
        //   statusCode: httpStatus.OK,
        //   success: true,
        //   message: 'Student is retrieved succesfully',
        //   data: result,
        // });
        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.deleteStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.StudentControllers = {
    // createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
};
