import Joi from 'joi';
import { CreateAttendanceDTO, UpdateAttendanceDTO } from '../../interfaces/attendance';

export const createAttendanceSchema = Joi.object<CreateAttendanceDTO>({
  employee_id: Joi.number().integer().positive().required(),
  date: Joi.date().required(),
  check_in_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required()
    .messages({
      'string.pattern.base': 'check_in_time must be in HH:MM:SS format',
    }),
});

export const updateAttendanceSchema = Joi.object<UpdateAttendanceDTO>({
  employee_id: Joi.number().integer().positive(),
  date: Joi.date(),
  check_in_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
});