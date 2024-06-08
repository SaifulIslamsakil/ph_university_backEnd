import { TCourse } from "./course.interface";

const createCourseIntoDB = async(payload : TCourse)=>{
    console.log(payload)
}


export const CourseService = {
    createCourseIntoDB,
}