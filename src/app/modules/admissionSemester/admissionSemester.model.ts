import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './admissionSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './admissionSemester.constant';


const acdemicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

acdemicSemesterSchema.pre("save", async function (next) {
  const isSemestersExists = await academicSemesterModel.findOne({
    name: this.name,
    year: this.year
  })
  if (isSemestersExists) {
    throw new Error("Semester is alrady Exists")
  }
  next()
})


export const academicSemesterModel = model<TAcademicSemester>("AcademicSemester", acdemicSemesterSchema)