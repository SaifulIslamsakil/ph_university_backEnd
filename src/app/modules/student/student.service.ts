import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import UserModel from '../users/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async (query: any) => {
  const searchParamsField = ["email", "name.firstName", "name.lastName", "contactNo"]
  const copyQuray = { ...query }

  let searchParams = ''
  if (query?.searchParams) {
    searchParams = query?.searchParams as string
  }

  const searchParamsData = Student.find({
    $or: searchParamsField.map((field) => ({
      [field]: { $regex: searchParams, $options: "i" }
    }))
  })

  // filtering 

  const deletedField = ["searchParams", "sort", "limit"]

  deletedField.forEach(element => delete copyQuray[element]);

  const filteringData = searchParamsData.find(copyQuray)

  //  sorting

  let sort = '-createdAt'
  if (query?.sort) {
    sort = query?.sort
  }

  const sortData = filteringData.sort(sort)

  // limit data 
  let limit = 1
  if (query?.limit) {
    limit = query?.limit
  }
  const limitedData = await filteringData.limit(limit)


  return limitedData;
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
    if (!deletUser || deletUser.isDeleted) {
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

const updateStudentFromDB = async (id: string, payload: TStudent) => {
  const { name, localGuardian, guardian, ...remainingStudentData } = payload
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  console.log(modifiedUpdatedData)

  const result = await Student.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true }
  )
  return result
}

export const StudentServices = {
  // createStudent,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB
};