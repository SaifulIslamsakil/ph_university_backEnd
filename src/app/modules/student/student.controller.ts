import { Request, Response } from 'express';
import httpStatus from 'http-status';;
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';



const getSingleStudent = catchAsync(async (
    req: Request,
    res: Response,
) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is retrieved succesfully',
        data: result,
    });
});


const getAllStudents = catchAsync(async (
    req: Request,
    res: Response,
) => {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student is retrieved succesfully",
        data: result

    })

});

const deleteStudent = catchAsync(async (
    req: Request,
    res: Response,
) => {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is delete succesfully',
        data: result
    })
});

const updateStudent = catchAsync(async (
    req: Request,
    res: Response
) => {
    const id = req.params.studentId
    const body = req.body
    const reuslt = await StudentServices.updateStudentFromDB(id, body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is updated succesfully',
        data: reuslt
    })

})

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent
};