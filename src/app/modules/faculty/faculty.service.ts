
import httpStatus from "http-status";
import QueryBuilder from "../../bulders/QureyBulder"
import AppError from "../../errors/AppError";
import { TFaculty } from "./faculty.interface"
import { FacultyModel } from "./faculty.model"
import UserModel from "../users/user.model";
import mongoose from "mongoose";

const getAllFacultyFormDB = async (query: Record<string, unknown>) => {
    const FacultySearchableFields = [
        'email',
        'id',
        'contactNo',
        'emergencyContactNo',
        'name.firstName',
        'name.lastName',
        'name.middleName',
    ];
    const faculty = new QueryBuilder(
        FacultyModel.find().populate('academicDepartment'), query

    ).search(FacultySearchableFields).filter().sort().fields().paginate()


    const result = await faculty.modelQuery
    return result
}

const getSingelFormDB = async (facultyID: string) => {
    const result = await FacultyModel.findById(facultyID)
    return result
}

const deleteFacultyFormDB = async (facultyID: string) => {

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedFaculty = await FacultyModel.findByIdAndUpdate(
            facultyID,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedFaculty) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
        }

        // get user _id from deletedFaculty
        const userId = deletedFaculty.user;

        const deletedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
}


const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
    const { name, ...remainingFacultyData } = payload
    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingFacultyData
    }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
          modifiedUpdatedData[`name.${key}`] = value;
        }
      }

      const result = await FacultyModel.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
      });

      return result
}


export const FacultyService = {
    getAllFacultyFormDB,
    getSingelFormDB,
    deleteFacultyFormDB,
    updateFacultyIntoDB
}