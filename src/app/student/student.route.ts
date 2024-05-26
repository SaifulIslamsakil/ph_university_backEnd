import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.post("/created", StudentControllers.createStudent )

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;