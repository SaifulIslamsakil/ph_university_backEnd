import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
// import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation ';

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

const getSingleStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);

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
        })
    } catch (err) {
        next(err);
    }
};

const getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        })
    } catch (err) {
        next(err);
    }
};

const deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        })
    } catch (err) {
        next(err);
    }
};

export const StudentControllers = {
    // createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
};