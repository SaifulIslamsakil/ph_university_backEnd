import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import UserModel from '../users/user.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  console.log(id)
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    )

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student")
    }
    const deletUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    )
    if (!deletUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failded to delete user")
    }

    await session.commitTransaction()
    await session.endSession()

    return deleteStudent;
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
};

export const StudentServices = {
  // createStudent,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};