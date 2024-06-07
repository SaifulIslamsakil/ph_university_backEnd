import exoress from "express"
import { StudentRoutes } from "../modules/student/student.route"
import UserRoute from "../modules/users/user.route"
import { AcademicSemesterRoute } from "../modules/admissionSemester/admissionSemester.route"
import { AcademicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route"
import { AcademicDepartmentRoute } from "../modules/academicDepartment/academicDepartment.route"
import { FacultyRoute } from "../modules/faculty/faculty.route"
import { AdminRoute } from "../modules/admin/admin.route"



const router = exoress.Router()


const moduleRoute = [
    {
        path: '/student',
        route: StudentRoutes,
    },
    {
        path: '/user',
        route: UserRoute,
    },
    {
        path: '/academic-semister',
        route: AcademicSemesterRoute,
    },
    {
        path: '/academic-faculty',
        route: AcademicFacultyRoute,
    },
    {
        path: '/academic-department',
        route: AcademicDepartmentRoute,
    },
    {
        path: '/faculty',
        route: FacultyRoute,
    },
    {
        path: '/admin',
        route: AdminRoute,
    },
   
]

moduleRoute.forEach(route=> router.use(route.path, route.route))

export default router