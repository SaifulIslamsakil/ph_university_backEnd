import { StudentModel, TStudent } from './student.interface';
import { Student } from './student.model';


const createStudent = async(value :any )=>{
    const result = Student.create(value)
    return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
    createStudent,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};