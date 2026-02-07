import { Router, type Router as ExpressRouter } from "express";
import attendanceController from './attendance.controller';
import { validate } from '../../middleware/validation';
import { auth } from '../../middleware/auth';
import {
  createAttendanceSchema,
  updateAttendanceSchema,
} from './attendance.validation';

const router: ExpressRouter = Router();

router.use(auth);

router
  .route('/')
  .get(attendanceController.getAttendances)
  .post(validate(createAttendanceSchema), attendanceController.createAttendance);

router
  .route('/:id')
  .get(attendanceController.getAttendance)
  .put(validate(updateAttendanceSchema), attendanceController.updateAttendance)
  .delete(attendanceController.deleteAttendance);

export default router;